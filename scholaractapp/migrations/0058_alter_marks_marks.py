# Generated by Django 4.2.3 on 2023-08-14 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0057_alter_coursematerial_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marks',
            name='marks',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=4),
        ),
    ]