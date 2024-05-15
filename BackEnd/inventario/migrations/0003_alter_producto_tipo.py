# Generated by Django 5.0.4 on 2024-05-15 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventario', '0002_producto_tipo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='tipo',
            field=models.CharField(choices=[('portatil', 'Portátil'), ('placa', 'Placa'), ('teclado', 'Teclado'), ('raton', 'Ratón'), ('tablet', 'Tablet')], max_length=20),
        ),
    ]
