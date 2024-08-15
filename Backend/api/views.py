from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,status
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Note

from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

# when user register
class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

'''
- default authentication class to all views is IsAuthenticated
'''

class CreateListNoteView(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    def get_queryset(self):
        '''Only shows notes of current user '''
        return Note.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        '''
        perform_create just do additional action before saving object being created
        '''
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class DeleteNoteView(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    def get_queryset(self):
        '''Queryset from where user can delete a note'''
        return Note.objects.filter(author=self.request.user)
    
    


    