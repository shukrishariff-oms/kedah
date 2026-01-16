from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
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
