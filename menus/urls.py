
from typing import ChainMap
from django.urls import path
from . import views


urlpatterns = [
    path('index', views.index, name='index'),
    path('<str:title>/your-menu', views.your_menu, name='your_menu'),
    path('recipe-input', views.recipe_input, name='recipe_input'),
    path('dish-input', views.dish_input, name='dish_input'),
    path('add-recipe', views.add_recipe, name='add_recipe'),
    path('menu-input', views.menu_input, name='menu_input'),
    path('menus', views.menus, name='menus'),
    path('delete-menu/<str:title>',
         views.your_menu_delete, name='your_menu_delete'),
    path('plated', views.plated, name='plated'),
    path('detail/<str:data>', views.detail, name='detail'),
    path('beverage', views.beverage, name='beverage'),
    path('pair/<str:title>', views.pairing, name='pairing'),
    path('bev', views.drinks_data, name='drinks_data'),
    path('drinkinfro/<str:title>', views.drink_detail, name='drink_detail'),
    path('delete-beverage/<str:title>',
         views.delete_beverage, name='delete_beverage'),
    path('register', views.register, name='register'),
    path('', views.login_user, name='login_user'),
    path('change-password/<str:user>',
         views.change_password, name='change_password'),
    path('logout', views.logout_user, name='logout_user'),
    path('delete/<str:title>', views.delete_dish, name='delete_dish'),
    path('delete-recipe/<str:title>', views.delete_recipe, name='delete_recipe'),
    path('edit', views.edit_recipe, name='edit_recipe'),
    path('ddrbreaks', views.ddrbreaks, name='ddrbreaks'),
    path('breakfast', views.breakfast, name='breakfast'),
    path('suggested', views.suggested, name='suggested'),

    # API
    path('drinks', views.drinks, name='drinks'),
    path('alergy', views.alergy, name='alergy'),
    path('drink_sammary', views.drink_sammary, name='drink_sammary'),
    path('description_api', views.description_api, name='description_api'),
    path('beverage_ing', views.beverage_ing, name='beverage_ing'),
    path('dishes', views.dishes, name='dishes'),
    path('edit-recipe', views.js_form, name='js_form'),
    path('menu_input', views.js_memu_input, name='js_memu_input')

]
