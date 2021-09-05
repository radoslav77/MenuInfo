from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib.auth import login, logout, authenticate
from django.urls import reverse

# Create your views here.
from .models import *
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
        image = Dish.objects.filter(image=i.dish.image)
        print(image)
        for pic in image:
            picture = pic.image
            dish.append(pic)
            # print(picture)
        drinks.append(i.drinks)
    # print(dish[0])
    return render(request, 'menus/recipes.html', {
        'data': title[0],
        'dish': dish[0],
        'drinks': drinks[0]
    })


def dish_input(request):
    if request.method == 'POST':
        form = Dish(request.POST, request.FILES)
        print(form)

    return render(request, 'menus/recipe-input.html', {
        'form': Dish()
    })
