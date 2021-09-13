
from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('your-menu', views.your_menu, name='your_menu'),
    path('recipe-input', views.recipe_input, name='recipe_input'),
    path('dish-input', views.dish_input, name='dish_input'),
    path('menu-input', views.menu_input, name='menu_input'),
    path('plated', views.plated, name='plated'),
    path('detail/<str:data>', views.detail, name='detail'),
    path('beverage', views.beverage, name='beverage'),
    path('pair/<str:img>', views.pairing, name='pairing'),
    path('register', views.register, name='register'),
    path('login', views.login_user, name='login_user'),
    path('logout', views.logout_user, name='logout_user'),

    # API
    path('drinks', views.drinks, name='drinks'),
    path('alergy', views.alergy, name='alergy')
]
