from django.shortcuts import render

def index(request):
    """Home page view"""
    return render(request, 'main/index.html')

def work_experience(request):
    """Work and Experience page view"""
    return render(request, 'main/wie.html')

def news(request):
    """News page view"""
    return render(request, 'main/news.html')