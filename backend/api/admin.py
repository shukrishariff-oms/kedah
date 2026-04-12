from django.contrib import admin
from .models import District, Place, Photo
from unfold.admin import ModelAdmin, TabularInline

class PhotoInline(TabularInline):
    model = Photo
    extra = 1

@admin.register(District)
class DistrictAdmin(ModelAdmin):
    list_display = ('name', 'slug', 'center_lat', 'center_lng')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Place)
class PlaceAdmin(ModelAdmin):
    list_display = ('name', 'district', 'status', 'view_count', 'created_at')
    list_filter = ('district', 'status')
    search_fields = ('name', 'description', 'address')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [PhotoInline]

@admin.register(Photo)
class PhotoAdmin(ModelAdmin):
    list_display = ('place', 'caption')
    list_filter = ('place',)
