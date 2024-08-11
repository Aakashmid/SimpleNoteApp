from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password']
        extra_kwargs={'password':{'write_only':True}}  # this specifies that during creation of user password required but not will return during reading

    # override creation of user
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['title','content','created_at','author']
        extra_kwargs={'author':{'read_only':True}}  # author can not be specified by form during creation of object