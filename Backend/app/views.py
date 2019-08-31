from django.contrib.auth import authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import generics, permissions, viewsets, filters
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from .serializers import UserSerializer, PetSerializer
from .models import User, Pet

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        return instance.save()

class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def perform_create(self, serializer):
        serializer.save(contact=self.request.user)

class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        return instance.save()

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'id': user.id },
                    status=HTTP_200_OK)

class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=HTTP_200_OK)

class PetFind(viewsets.ReadOnlyModelViewSet):
    '''This view provides an endpoint for searching pets
    the search could be done by the fields below
    '''
    permission_classes = [permissions.AllowAny]
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = [
        'name', 
        'status', 
        'breed', 
        'size', 
        'gender', 
        'pet_type', 
        'location', 
        'description',
        'date',
        'contact__email'
    ]
