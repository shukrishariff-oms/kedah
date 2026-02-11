from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from django.core.cache import cache
import requests
from .models import District, Place, Photo, Parliament, DUN
from .serializers import DistrictSerializer, PlaceSerializer, PhotoSerializer, ParliamentSerializer, DUNSerializer

class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Place.objects.all()
        district_slug = self.request.query_params.get('district', None)
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('q', None)

        if district_slug:
            queryset = queryset.filter(district__slug=district_slug)
        
        if category:
            # Simple category filtering using JSONField
            queryset = queryset.filter(categories__contains=category)
            
        if search:
            queryset = queryset.filter(name__icontains=search) | queryset.filter(description__icontains=search)

        if not self.request.user.is_authenticated:
            queryset = queryset.filter(status='published')
            
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class ParliamentViewSet(viewsets.ModelViewSet):
    queryset = Parliament.objects.all()
    serializer_class = ParliamentSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class DUNViewSet(viewsets.ModelViewSet):
    queryset = DUN.objects.all()
    serializer_class = DUNSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class StatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_places = Place.objects.count()
        published_places = Place.objects.filter(status='published').count()
        draft_places = Place.objects.filter(status='draft').count()
        by_district = District.objects.annotate(place_count=Count('places')).values('name', 'place_count')
        
        # Most viewed (top 5)
        most_viewed = Place.objects.order_by('-view_count')[:5]
        most_viewed_data = PlaceSerializer(most_viewed, many=True).data

        return Response({
            'total_places': total_places,
            'published_places': published_places,
            'draft_places': draft_places,
            'by_district': by_district,
            'most_viewed': most_viewed_data
        })

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'is_staff': request.user.is_staff,
            'is_superuser': request.user.is_superuser,
        })

class HealthCheckView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({"status": "ok"})

class EconomyView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cache_key = 'kedah_economy_data'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)

        # OpenDOSM API Endpoints
        datasets = {
            'gdp': 'gdp_state_real_supply',
            'hies': 'hies_state',
            'population': 'population_state'
        }
        
        results = {}
        
        try:
            for key, dataset_id in datasets.items():
                response = requests.get(f'https://api.data.gov.my/opendosm?id={dataset_id}')
                response.raise_for_status()
                data = response.json()
                
                # Filter for Kedah
                kedah_data = [d for d in data if d.get('state') == 'Kedah']
                
                # Specific filtering for each dataset to get "overall" stats
                if key == 'gdp':
                    kedah_data = [d for d in kedah_data if d.get('sector') == 'overall']
                elif key == 'population':
                    kedah_data = [d for d in kedah_data if d.get('age') == 'overall_age' and d.get('sex') == 'overall_sex' and d.get('ethnicity') == 'overall_ethnicity']
                
                # Sort by date descending to get the latest
                if kedah_data:
                    kedah_data.sort(key=lambda x: x.get('date', ''), reverse=True)
                    results[key] = kedah_data[0] # Get the latest record
                else:
                    results[key] = None
            
            # Cache for 24 hours
            cache.set(cache_key, results, 60*60*24)
            return Response(results)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
