# Generated by Django 5.0.4 on 2024-05-14 14:57

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('administracion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Incidencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoria', models.CharField(choices=[('web', 'Web'), ('programacion', 'Programación'), ('administracion', 'Administración'), ('ciberseguridad', 'Ciberseguridad'), ('telefonia', 'Telefonía'), ('sistemas', 'Sistemas'), ('taller', 'Taller')], max_length=20)),
                ('descripcion', models.TextField()),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('proceso', 'Proceso'), ('pausa', 'Pausa'), ('terminada', 'Terminada')], max_length=20)),
                ('prioridad', models.CharField(choices=[('baja', 'Baja'), ('media', 'Media'), ('importante', 'Importante'), ('urgente', 'Urgente')], max_length=10)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('fecha_inicio', models.DateTimeField(default=datetime.datetime.now)),
                ('fecha_fin', models.DateTimeField(blank=True, null=True)),
                ('cliente', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='administracion.cliente')),
                ('empleado', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='administracion.empleado')),
            ],
        ),
    ]