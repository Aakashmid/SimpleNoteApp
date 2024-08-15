from . import views 
from django.urls import path
urlpatterns = [
    path("notes/", views.CreateListNoteView.as_view(), name="notes-list"),
    path("notes/delete/<int:pk>/", views.DeleteNoteView.as_view(), name="delete-note")
]
