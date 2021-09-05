from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib.auth import login, logout, authenticate
from django.urls import reverse


# Create your views here.
from .models import Recipe, Dish, Beverage, Menu
from .models import Recipe as recipedata
from .forms import *


def index(request):

    res = recipedata.objects.all()

    results = []
    for i in res:
        if i.for_dish not in results:
            results.append(i.for_dish)

    print(results)
    return render(request, 'menus/index.html', {
        'results': results
    })


def recipe(request):
    data = Menu.objects.all()
    title = []
    dish = []
    drinks = []
    for i in data:
        title.append(i.title)
        image = Dish.objects.filter(image=i.dish.image)
       # print(image)
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
        form1 = Recipe(request.POST, request.FILES)
        if form.is_valid and form1.is_valid:
            data = form.save(commit=False)
            data.save()
            data1 = form1.save(commit=False)
            data1.save()

            return redirect('index')

    return render(request, 'menus/dish-input.html', {
        'form': Dish(),
        'form1': Recipe()
    })


def recipe_input(request):
    if request.method == 'POST':
        form = Recipe(request.POST, request.FILES)
        if form.is_valid:
            data = form.save(commit=False)
            data.save()
            print(data)
            return redirect('index')

    return render(request, 'menus/recipe-input.html', {
        'form': Recipe()
    })
