from django.contrib import admin
from .models import Note
# Register your models here.

@admin.register(Note)
class NoteModelAdmin(admin.ModelAdmin):
    pass