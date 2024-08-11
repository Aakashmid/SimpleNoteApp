from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from api import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls')),

    path('api/user/register',views.CreateUserView.as_view(),name='register'),
    path('api/token/',TokenObtainPairView.as_view(),name='obtain_token'),
    path('api/token/refresh',TokenRefreshView.as_view(),name='refresh_token'),

    path('api/',include('api.urls')),
]
