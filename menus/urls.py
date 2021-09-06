
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
]
