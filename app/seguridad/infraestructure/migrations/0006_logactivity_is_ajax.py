# Generated by Django 4.1.2 on 2022-11-13 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seguridad', '0005_rename_date_at_logactivity_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='logactivity',
            name='is_ajax',
            field=models.BooleanField(null=True),
        ),
    ]
