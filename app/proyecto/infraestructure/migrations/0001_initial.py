# Generated by Django 4.1.2 on 2022-10-30 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('created_by', models.CharField(max_length=50, null=True, verbose_name='Creado por')),
                ('updated_at', models.DateTimeField(null=True)),
                ('updated_by', models.CharField(max_length=50, null=True, verbose_name='Actualizado por')),
                ('nombre', models.CharField(max_length=80)),
                ('descripcion', models.CharField(max_length=250, verbose_name='Descripción')),
                ('activo', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ('nombre',),
                'unique_together': {('nombre',)},
            },
        ),
    ]
