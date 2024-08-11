from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import AllowAny
from .models import Note
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

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
    
    


    