from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from . import views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'pet', views.PetViewSet)
#Route for pet search
router.register(r'petfind', views.PetFind)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^signup', views.SignUpView.as_view(), name='signup'),
    path('login', views.login),
    url(r'^logout/', views.Logout.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]