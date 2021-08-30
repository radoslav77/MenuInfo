from django.contrib import admin
from django.contrib.auth.models import User
from django.db.models.base import Model
from .models import *

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "password")


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'dish')


admin.site.register(Recipe, RecipeAdmin)


class BeverageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'brand', 'type_alcochol')


admin.site.register(Beverage, BeverageAdmin)


class DishAdmin(admin.ModelAdmin):
    list_display = ('id', 'drink', 'type')


admin.site.register(Dish, DishAdmin)


class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'dish', 'drinks')


admin.site.register(Menu, MenuAdmin)
