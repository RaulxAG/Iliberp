# Generated by Django 5.0.6 on 2024-05-18 16:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventario', '0004_alter_producto_foto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='lineas',
        ),
        migrations.AddField(
            model_name='linea',
            name='pedido',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lineas', to='inventario.pedido'),
        ),
    ]
