from functools import cached_property
from django.forms.widgets import CheckboxInput
from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import Group
from django.contrib.auth.models import update_last_login
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
    users = User.objects.all()

    for user in users:
        if user.groups.filter(name='chef'):
            return render(request, 'menus/index.html', {
                'user_title': 'Chef'
            })
        elif user.groups.filter(name='sommelier'):
            return render(request, 'menus/index.html', {
                'user_title': 'Sommelier'
            })
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
    recipe = recipedata.objects.all()
    recipe_data = []
    for i in recipe:
        recipe_data.append({
            'type': i.selector,
            'title': i.title,
            'dish': i.for_dish,
            'recipe': i.recipe,
            'method': i.method,

        })
    return HttpResponse(json.dumps(recipe_data), content_type="application/json")


def js_memu_input(request):
    data = recipedata.objects.all()

    data_form = []
    for dish in data:
        data_form.append({
            'title': dish.title,
            'type': dish.selector
        })

    return HttpResponse(json.dumps(data_form), content_type="application/json")


def menus(request):
    if request.user.is_authenticated:

        data = menudata.objects.all()
        return render(request, 'menus/dinnermenus.html', {
            'menus': data
        })
    return render(request, 'menus/notallowed.html', {
        'msg': 'Please Log In !'
    })


def your_menu(request, title):
    data = menudata.objects.filter(title=title)
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

            des = dishdata.objects.all()
            for d in des:
                descriptions.append({
                    'title': d.title_dish,
                    'description': d.description
                })
        for pic in image1:
            dish.append(pic)
            des = dishdata.objects.all()
            for d in des:
                descriptions.append({
                    'title': d.title_dish,
                    'description': d.description
                })
        for pic in image2:
            dish.append(pic)
            des = dishdata.objects.all()
            for d in des:
                descriptions.append({
                    'title': d.title_dish,
                    'description': d.description
                })

        drinks.append(i.drinks)
    print(dish[0].image)
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
        'data': title,
        'dish': dish[0],
        'dish1': dish[1],
        'dish2': dish[2],
        'drinks': drinks,

    })


def dish_input(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chef'):

            if request.method == 'POST':
                form = Dish(request.POST, request.FILES)
                form1 = Recipe(request.POST, request.FILES)
                if form.is_valid and form1.is_valid:
                    data = form.save(commit=False)
                    data.save()
                    data1 = form1.save(commit=False)
                    data1.save()

                    checked = request.POST.get('addrecipe', False)

                    if checked == 'on':
                        for_dish = request.POST['title_dish']
                        form = Recipe()
                        return render(request, 'menus/recipe-input.html', {
                            'title': for_dish,
                            'form': form
                        })

                    return redirect('index')
        else:
            return render(request, 'menus/dish-input.html', {
                'msg': 'You are not autorised to perform this action'
            })
    else:
        return render(request, 'menus/dish-input.html', {
            'msg': 'Please log in to use this function!'
        })
    return render(request, 'menus/dish-input.html', {
        'form': Dish(),
        'form1': Recipe()
    })


def add_recipe(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chef'):

            form = Recipe(request.POST, request.FILES)
            if form.is_valid:
                data = form.save(commit=False)
                data.save()
                return redirect('index')
        return render(request, 'menus/recipe-input.html', {})


def recipe_input(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chef'):
            if request.method == 'POST':
                form = Recipe(request.POST, request.FILES)
                if form.is_valid:
                    data = form.save(commit=False)
                    data.save()

                    return redirect('index')
        else:
            return render(request, 'menus/dish-input.html', {
                'msg': 'You are not autorised to perform this action'
            })
    else:
        return render(request, 'menus/dish-input.html', {
            'msg': 'Please log in to use this function!'
        })
    return render(request, 'menus/recipe-input.html', {
        'form': Recipe()
    })


def menu_input(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='bqt'):

            if request.method == 'POST':
                form = Menu(request.POST)
                if form.is_valid:
                    data = form.save(commit=False)
                    data.save()
                    # print(data)

                    return redirect('index')
        else:
            return render(request, 'menus/dish-input.html', {
                'msg': 'You are not autorised to perform this action'
            })
    else:
        return render(request, 'menus/dish-input.html', {
            'msg': 'Please log in to use this function!'
        })
    return render(request, 'menus/menu-input.html', {
        'form': Menu()
    })


def dishes(request):
    if request.user.is_authenticated:
        all_data = dishdata.objects.all()
        starters = []
        mains = []
        desserts = []
        for i in all_data:

            if i.type == 'Starters':
                starters.append(i)
            elif i.type == 'Mains':
                mains.append(i)
            elif i.type == 'Desserts':
                desserts.append(i)
        starters = list(dict.fromkeys(starters))
        mains = list(dict.fromkeys(mains))
        desserts = list(dict.fromkeys(desserts))
        return render(request, 'menus/dish.html', {
            # 'results': results,
            'mains': mains,
            'desserts': desserts,
            'pairs_starters': starters
        })
    return render(request, 'menus/notallowed.html', {
        'msg': 'Please Log In !'
    })


def plated(request):
    if request.user.is_authenticated:
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
            # print(f'{i} - {i.selector}')
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

            # print(f'{dish} - {dish.type}')
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
    return render(request, 'menus/notallowed.html', {
        'msg': 'Please Log In !'
    })


def detail(request, data):

    data1 = recipedata.objects.filter(title=data)

    drink = pairdata.objects.filter(dish=data)
    recipe = recipedata.objects.all()
    image = []
    methods = []
    for method in data1:
        methods.append(method.method)

    for dish in data1:
        img = dishdata.objects.filter(title_dish=dish)

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
        'method': methods[0],
        'data': data1,
        'ing': ingr,
        'img': image,
        'drink': title_drink,
        'subrecipe': subrecipe
    })


def beverage(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='sommelier'):
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
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })


def pairing(request, title):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='sommelier'):
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
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })


def drinks_data(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='sommelier'):
            data = beveragedata.objects.all()
            drink_data = []
            for d in data:
                drink_data.append(d)
            print(drink_data)
            return render(request, 'menus/bev.html', {
                'data': drink_data
            })
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })


def drink_detail(request, title):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='sommelier'):
            drink = beveragedata.objects.filter(title=title)
            print(drink)
        return render(request, 'menus/drink.html', {
            'drinkinfo': drink
        })
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })


def delete_beverage(request, title):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='sommelier'):
            beverage_data = beveragedata.objects.filter(title=title)
            beverage_data.delete()
            return redirect('drinks_data')
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })


def edit_recipe(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chef'):
            if request.method == 'POST':
                title = request.POST['title']
                entry = recipedata.objects.filter(title=title)
                entry.delete()
                type_recipe = request.POST['type']

                for_dish = request.POST['for_dish']

                recipe = request.POST['recipe']

                method = request.POST['method']

                form = recipedata(selector=type_recipe, title=title,
                                  for_dish=for_dish, recipe=recipe, method=method)
                form.save()

            return redirect('plated')
        else:
            return render(request, 'menus/dish-input.html', {
                'msg': 'You are not autorised to perform this action'
            })
    else:
        return render(request, 'menus/dish-input.html', {
            'msg': 'Please log in to use this function!'
        })


def delete_dish(request, title):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chef'):
            dish = dishdata.objects.filter(title_dish=title)
            recipe = recipedata.objects.filter(title=title)
            dish.delete()
            recipe.delete()
            return redirect('dishes')
        else:
            return render(request, 'menus/dish-input.html', {
                'msg': 'You are not autorised to perform this action'
            })
    else:
        return render(request, 'menus/dish-input.html', {
            'msg': 'Please log in to use this function!'
        })


def delete_recipe(request, title):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chef'):
            recipe = recipedata.objects.filter(title=title)
            recipe.delete()
            return redirect('plated')
        else:
            return render(request, 'menus/dish-input.html', {
                'msg': 'You are not autorised to perform this action'
            })
    else:
        return render(request, 'menus/dish-input.html', {
            'msg': 'Please log in to use this function!'
        })


def ddrbreaks(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chefs') or request.user.groups.filter(name='chef'):
            dishs = recipedata.objects.all()
            ddrbreaks = []
            subrecipe = []
            for dish in dishs:
                if dish.selector == 'ddrbreaks':
                    ddrbreaks.append(dish)
                    for sub in ddrbreaks:

                        if sub.title != sub.for_dish:
                            subrecipe.append(sub)
            ddrbreaks = list(dict.fromkeys(ddrbreaks))

            print(subrecipe)
            return render(request, 'menus/ddr.html', {
                'items': ddrbreaks,
                'subrecipe': subrecipe
            })
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })


def breakfast(request):
    if request.user.is_authenticated:
        if request.user.groups.filter(name='chefs') or request.user.groups.filter(name='chef'):
            dishs = recipedata.objects.all()
            breakfast = []
            subrecipe = []
            for dish in dishs:
                if dish.selector == 'breakfast':
                    breakfast.append(dish)
                    for sub in breakfast:

                        if sub.title != sub.for_dish:
                            subrecipe.append(sub)
            breakfast = list(dict.fromkeys(breakfast))

        # print(subrecipe)
            return render(request, 'menus/breakfast.html', {
                'items': breakfast,
                'subrecipe': subrecipe
            })
    return render(request, 'menus/notallowed.html', {
        'msg': 'You are not allowd to acses this page! Contact your administrater!'
    })

# need to work on


def register(request):
    if request.user.is_authenticated:
        return redirect('index')

    elif request.method == 'POST':
        form = registrationForm(request.POST or None)
        group_name = request.POST['groups']
        groups = Group.objects.all()
        print(groups)
        print(group_name)
        name = []
        for i in groups:

            print(i)
        if form.is_valid():
            user = form.save()

            raw_password = form.cleaned_data.get('password1')

            user = authenticate(username=user.username,
                                password=raw_password)
            group = Group.objects.get(name=group_name)
            user.groups.add(group)
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
            user_last_login = User.objects.get(username=username).last_login

            # Check credential
            user = authenticate(username=username, password=password)

            if user:
                if not user_last_login:
                    update_last_login(None, user=user)
                    return render(request, 'menus/change-password.html', {
                        'user': user
                    })

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('index')
                else:
                    return render(request, 'menus/login.html', {'error': "Your account has been desaibled."})

            else:
                return render(request, 'menus/login.html', {'error': 'Invalid username or password. Try Again.'})

        return render(request, 'menus/login.html')


def change_password(request, user):

    print(user)
    if request.method == 'POST':
        u = User.objects.get(username=user)
        new_password = request.POST['password1']
        re_password = request.POST['password2']
        if new_password != re_password:
            return render(request, 'menus/change-password.html', {
                'msg': 'Your password DO NOT mutch! Please try again! '
            })
        else:
            u.set_password(new_password)
            u.save()
            return redirect('login_user')
    return render(request, 'menus/change-password.html')


def logout_user(request):
    if request.user.is_authenticated:

        logout(request)
        return redirect('login_user')
    else:
        return redirect('login_user')
