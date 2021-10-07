# Generated by Django 3.2.6 on 2021-09-30 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0009_alter_recipe_selector'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='selector',
            field=models.CharField(choices=[('main', 'Main'), ('starter', 'Starter'), ('dessert', 'Dessert'), ('breakfast', 'Breakfast'), ('ddrbreaks', 'DDRbreaks')], max_length=50),
        ),
    ]