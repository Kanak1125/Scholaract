# Generated by Django 4.2 on 2023-05-07 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0032_student_classes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='class',
            name='created_by',
        ),
    ]
