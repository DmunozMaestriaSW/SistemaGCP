# Generated by Django 4.1.2 on 2022-11-13 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seguridad', '0003_logactivity_content_type_logactivity_method_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logactivity',
            name='content_type',
            field=models.CharField(max_length=80, null=True),
        ),
    ]
