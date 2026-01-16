from django.db import models
from django.utils.text import slugify

class District(models.Model):
    PADDY_STATUS_CHOICES = (
        ('planting', 'Planting (Menanam)'),
        ('growing', 'Growing (Membesar)'),
        ('harvesting', 'Harvesting (Menuai)'),
        ('fallow', 'Fallow (Jerami/Rehat)'),
    )

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    polygon_geojson = models.JSONField(help_text="Full GeoJSON for district boundaries", null=True, blank=True)
    center_lat = models.FloatField()
    center_lng = models.FloatField()
    description = models.TextField(blank=True)
    specialties = models.JSONField(default=list, help_text="e.g. ['Laksa Kedah', 'Paddy Fields']")
    paddy_status = models.CharField(max_length=20, choices=PADDY_STATUS_CHOICES, default='growing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Parliament(models.Model):
    code = models.CharField(max_length=10, unique=True, help_text="e.g. P009")
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    parliament_lat = models.FloatField()
    parliament_lng = models.FloatField()
    mp_name = models.CharField(max_length=200, help_text="Member of Parliament name")
    mp_party = models.CharField(max_length=100, help_text="e.g. PAS, PKR, UMNO")
    mp_photo_url = models.URLField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.code}-{self.name}")
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.code} {self.name}"

class DUN(models.Model):
    parliament = models.ForeignKey(Parliament, on_delete=models.CASCADE, related_name='duns')
    code = models.CharField(max_length=10, unique=True, help_text="e.g. N12")
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    dun_lat = models.FloatField()
    dun_lng = models.FloatField()
    adun_name = models.CharField(max_length=200, help_text="ADUN name")
    adun_party = models.CharField(max_length=100, help_text="e.g. PAS, PKR, UMNO")
    adun_photo_url = models.URLField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.code}-{self.name}")
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.code} {self.name}"

class Place(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    district = models.ForeignKey(District, on_delete=models.CASCADE, related_name='places')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    description = models.TextField()
    address = models.TextField(blank=True)
    lat = models.FloatField()
    lng = models.FloatField()
    categories = models.JSONField(default=list, help_text="List of categories e.g. ['Nature', 'Food']")
    
    # Extra fields
    opening_hours = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    google_maps_url = models.URLField(blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    view_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Photo(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='place_photos/')
    caption = models.CharField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for {self.place.name}"
