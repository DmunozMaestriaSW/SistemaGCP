# Generated by Django 4.1.2 on 2022-11-01 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto', '0004_paso_caso_prueba'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paso',
            name='caso_prueba',
        ),
        migrations.AddField(
            model_name='casoprueba',
            name='pasos',
            field=models.TextField(blank=True, max_length=250, null=True),
        ),
    ]
