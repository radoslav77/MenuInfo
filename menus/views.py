from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib.auth import login, logout, authenticate
from django.urls import reverse


# Create your views here.
from .models import Recipe, Dish, Beverage, Menu
from .models import Recipe as recipedata
from .models import Menu as menudata
from .models import Dish as dishdata
from .forms import *


def index(request):

    return render(request, 'menus/index.html', {

    })


def your_menu(request):
    data = menudata.objects.all()
    title = []
    dish = []
    drinks = []
    for i in data:
        title.append(i.title)
        image = dishdata.objects.filter(image=i.main.image)
        image1 = dishdata.objects.filter(image=i.starter.image)
        image2 = dishdata.objects.filter(image=i.dessert.image)

        for pic in image:
            dish.append(pic)
        for pic in image1:
            dish.append(pic)
        for pic in image2:
            dish.append(pic)
        drinks.append(i.drinks)
    # print(dish[])
    return render(request, 'menus/recipes.html', {
        'data': title[0],
        'dish': dish[0],
        'dish1': dish[1],
        'dish2': dish[2],
        'drinks': drinks[0],
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

            return redirect('index')

    return render(request, 'menus/recipe-input.html', {
        'form': Recipe()
    })


def menu_input(request):
    if request.method == 'POST':
        form = Menu(request.POST)
        if form.is_valid:
            data = form.save(commit=False)
            data.save()
            print(data)

            return redirect('index')

    return render(request, 'menus/menu-input.html', {
        'form': Menu()
    })


def plated(request):
    res = recipedata.objects.all()

    results = []
    for i in res:
        if i.for_dish not in results:
            results.append(i.for_dish)

    # print(results)
    return render(request, 'menus/plated.html', {
        'results': results
    })


def detail(request, data):
    data1 = recipedata.objects.filter(title=data)
    img = dishdata.objects.filter(title=data)
    image = []
    for pic in img:
        image.append(pic)
        print(pic)

    ing = []
    ingr = []
    for i in data1:
        ingr = i.recipe.split(',')
        ing.append(ingr[0:-1])

        for j in ing:
            i = j[0][0]
            ingr.append(i[0:-1])

    return render(request, 'menus/detail.html', {
        'data': data1[0],
        'ing': ingr,
        'img': image[0]
    })
