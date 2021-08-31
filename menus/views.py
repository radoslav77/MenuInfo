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


def recipe(request):
    data = Menu.objects.all()
    title = []
    dish = []
    drinks = []
    for i in data:
        title.append(i.title)
        dish.append(i.dish)
        drinks.append(i.drinks)
    return render(request, 'menus/recipes.html', {
        'data': title,
        'dish': dish,
        'drinks': drinks
    })
