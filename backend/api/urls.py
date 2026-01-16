from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import DistrictViewSet, PlaceViewSet, PhotoViewSet, StatsView, ParliamentViewSet, DUNViewSet

router = DefaultRouter()
router.register(r'districts', DistrictViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'photos', PhotoViewSet)
router.register(r'parliaments', ParliamentViewSet)
router.register(r'duns', DUNViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', StatsView.as_view(), name='stats'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
