# Generated by Django 5.0.4 on 2024-06-10 15:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0002_cliente_user_empleado_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='empresa',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='administracion.empresa'),
        ),
    ]
