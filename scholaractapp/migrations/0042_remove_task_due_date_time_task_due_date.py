# Generated by Django 4.2.1 on 2023-06-03 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0041_alter_task_due_date_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='due_date_time',
        ),
        migrations.AddField(
            model_name='task',
            name='due_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
