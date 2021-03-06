from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import TextField

# Create your models here.


class Dish(models.Model):
    TYPE = (
        ('Starters', 'Starters'),
        ('Mains', 'Mains'),
        ('Desserts', 'Desserts'),
        ('Breaks', 'Breaks'),
        ('Buffets', 'Buffets'),
        ('Bespoke', 'Bespoke')
    )
    title_dish = models.CharField(max_length=200)
    type = models.CharField(max_length=100, choices=TYPE)
    description = models.TextField(max_length=2000)
    image = models.FileField(upload_to='media')

    def __str__(self):
        return f'{self.title_dish}'

    class Meta:
        ordering = ['title_dish']


class Beverage(models.Model):
    TYPE_ALCOHOL = (
        ('Wine', 'Wine'),
        ('Spirits', 'Spirits'),
        ('Beers', 'Beers'),
        ('Softdrinks', 'Softdrinks'),
        ('Coffee', 'Coffee'),
        ('Tea', 'Tea'),
        ('Champagnes', 'Champagnes')

    )
    title = models.CharField(max_length=200)
    type_alcochol = models.CharField(max_length=200, choices=TYPE_ALCOHOL)
    description = models.TextField(max_length=2000)
    brand = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.title}'


class Recipe(models.Model):
    RANGE = (
        ('main', 'Main'),
        ('starter', 'Starter'),
        ('dessert', 'Dessert'),
        ('breakfast', 'Breakfast'),
        ('ddrbreaks', 'DDRbreaks')
    )
    selector = models.CharField(choices=RANGE, max_length=50)
    title = models.CharField(max_length=200)
    for_dish = models.CharField(max_length=200, default=None)
    recipe = models.TextField()
    method = models.TextField()

    objects = models.Manager()

    def __str__(self):
        return f'{self.title}'


class Menu(models.Model):
    title = models.CharField(max_length=200)
    starter = models.ForeignKey(
        'Dish', on_delete=models.CASCADE, related_name='startee')
    main = models.ForeignKey(
        'Dish', on_delete=models.CASCADE, related_name='main')
    dessert = models.ForeignKey(
        'Dish', on_delete=models.CASCADE, related_name='dessert')
    drinks = models.ForeignKey('Beverage', on_delete=models.CASCADE,)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['title']


class Pairing(models.Model):
    dish = models.CharField(max_length=200)
    drink = models.ForeignKey('Beverage', on_delete=models.CASCADE)

    class Meta:
        ordering = ['dish']


class Beverage_allergets(models.Model):
    name = models.CharField(max_length=200)
    ing = models.TextField()

    def __str__(self):
        return f'{self.name}'
