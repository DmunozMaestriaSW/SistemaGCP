# Generated by Django 4.1.2 on 2022-11-14 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seguridad', '0009_alter_logactivity_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logactivity',
            name='content_type',
            field=models.CharField(max_length=160, null=True),
        ),
    ]
