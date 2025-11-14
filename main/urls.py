from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('work-experience/', views.work_experience, name='work_experience'),
    path('news/', views.news, name='news'),
]