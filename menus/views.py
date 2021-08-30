from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib.auth import login, logout, authenticate
from django.urls import reverse

# Create your views here.
from .models import *


def index(request):
    contex = Recipe.objects.all()
    print(contex)
    return render(request, 'menus/index.html', {
        'results': contex
    })
