# Generated by Django 5.0.4 on 2024-05-29 15:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incidencias', '0004_alter_incidencia_fecha_fin_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Line',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('observaciones', models.CharField(max_length=120)),
                ('comienzo', models.TimeField(blank=True, null=True)),
                ('fin', models.TimeField(blank=True, null=True)),
                ('tiempo', models.TimeField(blank=True, null=True)),
                ('empleado', models.ForeignKey(default='empleado no existente', on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
