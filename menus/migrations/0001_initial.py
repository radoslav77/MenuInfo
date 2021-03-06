# Generated by Django 3.2.6 on 2021-09-08 17:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beverage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('type_alcochol', models.CharField(choices=[('Wine', 'Wine'), ('Spirits', 'Spirits'), ('Beers', 'Beers'), ('Softdrinks', 'Softdrinks'), ('Coffee', 'Coffee'), ('Tea', 'Tea'), ('Champagnes', 'Champagnes')], max_length=200)),
                ('description', models.TextField(max_length=2000)),
                ('brand', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('type', models.CharField(choices=[('Starters', 'Starters'), ('Mains', 'Mains'), ('Desserts', 'Desserts'), ('Breaks', 'Breaks'), ('Buffets', 'Buffets'), ('Bespoke', 'Bespoke')], max_length=100)),
                ('description', models.TextField(max_length=2000)),
                ('image', models.FileField(upload_to='media')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('selector', models.CharField(choices=[('main', 'Main'), ('starter', 'Starter'), ('dessert', 'Dessert'), ('breakfast', 'Breakfast'), ('ddrbreaks', 'DDRbreaks')], max_length=50)),
                ('title', models.CharField(max_length=200)),
                ('for_dish', models.CharField(default=None, max_length=200)),
                ('recipe', models.TextField()),
                ('method', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('dessert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dessert', to='menus.dish')),
                ('drinks', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menus.beverage')),
                ('main', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='main', to='menus.dish')),
                ('starter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='startee', to='menus.dish')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.AddField(
            model_name='beverage',
            name='dish',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menus.recipe'),
        ),
    ]
