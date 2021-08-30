from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.


class Recipe(models.Model):
    title = models.CharField(max_length=200)
    dish = models.ForeignKey('Dish', on_delete=models.CASCADE)
    recipe = models.TextField()
    method = models.TextField()

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['title']


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

    class Meta:
        ordering = ['title']


class Dish(models.Model):
    TYPE = (
        ('Starters', 'Starters'),
        ('Mains', 'Mains'),
        ('Desserts', 'Desserts'),
        ('Breaks', 'Breaks'),
        ('Buffets', 'Buffets'),
        ('Bespoke', 'Bespoke')
    )
    title = models.CharField(max_length=200)
    #recipes = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    drink = models.ForeignKey('Beverage', on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=TYPE)
    image = models.FileField(upload_to='media')

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['title']


class Menu(models.Model):
    title = models.CharField(max_length=200)
    dish = models.ForeignKey('Dish', on_delete=models.CASCADE,)
    drinks = models.ForeignKey('Beverage', on_delete=models.CASCADE,)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['title']
