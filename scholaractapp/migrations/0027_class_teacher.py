# Generated by Django 4.2 on 2023-05-06 12:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0026_alter_class_class_code_alter_class_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='scholaractapp.teacher'),
        ),
    ]
