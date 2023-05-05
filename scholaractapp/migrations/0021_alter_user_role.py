# Generated by Django 4.2 on 2023-05-05 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0020_alter_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('S', 'Student'), ('T', 'Teacher')], max_length=1),
        ),
    ]
