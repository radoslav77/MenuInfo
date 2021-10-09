from django import forms

from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.forms import fields
from django.views.generic.edit import FormView

from .models import *


class registrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class Recipe(forms.ModelForm):

    class Meta:
        model = Recipe

        fields = ('title', 'selector', 'for_dish', 'recipe', 'method')


class Dish(forms.ModelForm):

    class Meta:
        model = Dish
        fields = ('title_dish', 'type', 'description', 'image',)


class Menu(forms.ModelForm):

    class Meta:
        model = Menu
        fields = ('title', 'starter', 'main', 'dessert', 'drinks')


class Beverage(forms.ModelForm):

    class Meta:
        model = Beverage
        fields = ('title', 'type_alcochol', 'description', 'brand')


class Pairing(forms.ModelForm):

    class Meta:
        model = Pairing
        fields = ('dish', 'drink')


class Beverage_allergets(forms.ModelForm):

    class Meta:
        model = Beverage_allergets
        fields = ('ing',)
