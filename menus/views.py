from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib.auth import login, logout, authenticate
from django.urls import reverse
from django.http import JsonResponse
import json


# Create your views here.

from .models import Recipe as recipedata
from .models import Menu as menudata
from .models import Dish as dishdata
from .models import Pairing as pairdata
from .models import Beverage as beveragedata
from .models import Beverage_allergets as beverage_allergets
from .forms import *


GLOBAL_TITLE = ''
bev = []
descriptions = []


def index(request):
   # print(bev)

    return render(request, 'menus/index.html', {

    })


def drinks(request):

    return HttpResponse(json.dumps(bev), content_type="application/json")


def alergy(request):
    data = recipedata.objects.all()
    recipe_data = []
    for i in data:
        recipe_data.append({
            'title': i.title,
            'dish': i.for_dish,
            'recipe': i.recipe,
        })
    # print(recipe_data)
    return HttpResponse(json.dumps(recipe_data), content_type="application/json")


def drink_sammary(request):
    drinks_discription = beveragedata.objects.all()
    drinks_data = []
    for i in drinks_discription:
        drinks_data.append({
            'title': i.title,
            'description': i.description,
            'type': i.type_alcochol
        })
    return HttpResponse(json.dumps(drinks_data), content_type="application/json")


def description_api(request):
    return HttpResponse(json.dumps(descriptions), content_type="application/json")


def beverage_ing(request):
    bev_ing = beverage_allergets.objects.all()
    bev_ingredients = []
    for i in bev_ing:
        bev_ingredients.append({
            'title': i.name,
            'ingredients': i.ing
        })
    return HttpResponse(json.dumps(bev_ingredients), content_type="application/json")


def js_form(requets):
    form = Recipe()
    elements = []
    for el in form:
        elements.append(el)
    print(elements)
    return redirect('index')
    # return HttpResponse(json.dumps(elements), content_type="application/json")


def your_menu(request):
    data = menudata.objects.all()
    beverage = pairdata.objects.all()
    dish_recipe = recipedata.objects.all()

    title = []
    dish = []
    drinks = []
    dishs = []

    for i in data:
        title.append(i.title)
        image = dishdata.objects.filter(image=i.main.image)
        image1 = dishdata.objects.filter(image=i.starter.image)
        image2 = dishdata.objects.filter(image=i.dessert.image)

        for pic in image:
            dish.append(pic)
            des = dishdata.objects.filter(title=i.main.title)
            for d in des:
                descriptions.append({
                    'title': d.title,
                    'description': d.description
                })
        for pic in image1:
            dish.append(pic)
            des = dishdata.objects.filter(title_dish=i.starter.title)
            for d in des:
                descriptions.append({
                    'title': d.title,
                    'description': d.description
                })
        for pic in image2:
            dish.append(pic)
            des = dishdata.objects.filter(title_dish=i.dessert.title)
            for d in des:
                descriptions.append({
                    'title': d.title,
                    'description': d.description
                })

        drinks.append(i.drinks)

    for t in dish_recipe:
        dishs.append(t.title)
    bev_drink = []
    for b in beverage:

        if b.dish in dishs:
            bev_data = pairdata.objects.filter(dish=b.dish)

            for d in bev_data:
                # print(d.drink)
                bev_drink.append({
                    'dish': d.dish,
                    'drink': d.drink.title,
                })
    bev.append(bev_drink)

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
            # print(data)

            return redirect('index')

    return render(request, 'menus/menu-input.html', {
        'form': Menu()
    })


def plated(request):
    res = recipedata.objects.all()
    res_dish = dishdata.objects.all()

    pairs_starters = []
    pair_main = []
    pair_desserts = []
    results = []
    starters = []
    desserts = []
    mains = []
    for i in res:
        #print(f'{i} - {i.selector}')
        if i.for_dish not in results:
            results.append(i.for_dish)
        if i.selector == 'dessert':
            desserts.append(i)
        elif i.selector == 'main':
            mains.append(i)
        elif i.selector == 'starter':
            starters.append(i)
            for name in starters:
                if name.for_dish == i.title:
                    pairs_starters.append(name)

    # for i in starters:
       # print(f'{i} -- {i.for_dish}')
        # if i.for_dish in pairs_starters:
          #  pairs_starters.append(i)
        # for dish in res_dish:
        # if dish == i.for_dish:
        # if dish == i.for_dish:

        #  pairs_starters.append(dish)

        #print(f'{dish} - {dish.type}')
        for starter in starters:
            for title in res_dish:
                if starter.for_dish == title.title_dish:
                    pairs_starters.append(starter)
        pairstarters = list(dict.fromkeys(pairs_starters))

        for main in mains:
            for title in res_dish:
                if main.for_dish == title.title_dish:
                    pair_main.append(main)
        pairmain = list(dict.fromkeys(pair_main))

        for dessert in desserts:
            for title in res_dish:
                if dessert.for_dish == title.title_dish:
                    pair_desserts.append(dessert)
        pairdesserts = list(dict.fromkeys(pair_desserts))

    return render(request, 'menus/plated.html', {
        'results': results,
        'mains': pairmain,
        'desserts': pairdesserts,
        'pairs_starters': pairstarters
    })


def detail(request, data):

    data1 = recipedata.objects.filter(title=data)
    drink = pairdata.objects.filter(dish=data)
    recipe = recipedata.objects.all()

    for dish in data1:
        img = dishdata.objects.filter(title_dish=dish)
        image = []
        for pic in img:
            image.append(pic)

    sug_drink = []
    for t in drink:
        sug_drink.append(t.drink)

    title_drink = []
    for d in sug_drink:
        title_drink.append(d.title)

    ing = []
    ingr = []
    for i in data1:
        ingr = i.recipe.split(',')
        ing.append(ingr[0:-1])

        for j in ing:
            i = j[0][0]
            ingr.append(i[0:-1])
    subrecipe = []
    for sub in recipe:
        if sub.for_dish == data:
            if sub.title != data:
                subrecipe.append(sub)

    return render(request, 'menus/detail.html', {
        'data': data1,
        'ing': ingr,
        'img': image,
        'drink': title_drink,
        'subrecipe': subrecipe
    })


def beverage(request):
    if request.method == 'POST':
        form = Beverage(request.POST)
        title = request.POST['title']
        ingr = request.POST['ing']
        if form.is_valid:
            data = form.save(commit=False)
            data.save()
            data1 = beverage_allergets(name=title, ing=ingr)
            print(data1)
            data1.save()

            return redirect('index')
    global GLOBAL_TITLE

    return render(request, 'menus/beverage.html', {
        'form': Beverage(),
        'form1': Beverage_allergets(),
        'title': GLOBAL_TITLE

    })


def pairing(request, title):

    if request.method == 'POST':
        form = Pairing(request.POST)
        if form.is_valid:
            data = form.save(commit=False)
            data.save()

            return redirect('plated')

    return render(request, 'menus/pairing.html', {
        'form': Pairing(),
        'title': title
    })


def register(request):
    if request.user.is_authenticated:
        return redirect('index')

    elif request.method == 'POST':
        form = registrationForm(request.POST or None)
        if form.is_valid():
            user = form.save()

            raw_password = form.cleaned_data.get('password1')

            user = authenticate(username=user.username,
                                password=raw_password)
            # login user
            login(request, user)
            return redirect('index')
    else:
        form = registrationForm()
    return render(request, 'menus/register.html', {'form': form})


def login_user(request):
    if request.user.is_authenticated:
        return redirect('index')
        # if not logged in then log in
    else:
        if request.method == "POST":
            username = request.POST['username']
            password = request.POST['password']

            # Check credential
            user = authenticate(username=username, password=password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('index')
                else:
                    return render(request, 'menus/login.html', {'error': "Your account has been desaibled."})

            else:
                return render(request, 'menus/login.html', {'error': 'Invalid username or password. Try Again.'})

        return render(request, 'menus/login.html')


def logout_user(request):
    if request.user.is_authenticated:

        logout(request)
        return redirect('login_user')
    else:
        return redirect('login_user')
