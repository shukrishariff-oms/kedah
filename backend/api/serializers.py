from rest_framework import serializers
from .models import District, Place, Photo, Parliament, DUN

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'caption']

class PlaceSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    district_name = serializers.CharField(source='district.name', read_only=True)

    class Meta:
        model = Place
        fields = ['id', 'district', 'district_name', 'name', 'slug', 'description', 'address', 'lat', 'lng', 'categories', 'opening_hours', 'phone', 'google_maps_url', 'photos', 'view_count']

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'slug', 'polygon_geojson', 'center_lat', 'center_lng', 'description', 'specialties', 'paddy_status']

class DUNSerializer(serializers.ModelSerializer):
    parliament_name = serializers.CharField(source='parliament.name', read_only=True)

    class Meta:
        model = DUN
        fields = ['id', 'parliament', 'parliament_name', 'code', 'name', 'slug', 'dun_lat', 'dun_lng', 'adun_name', 'adun_party', 'adun_photo_url']

class ParliamentSerializer(serializers.ModelSerializer):
    duns = DUNSerializer(many=True, read_only=True)

    class Meta:
        model = Parliament
        fields = ['id', 'code', 'name', 'slug', 'parliament_lat', 'parliament_lng', 'mp_name', 'mp_party', 'mp_photo_url', 'duns']
