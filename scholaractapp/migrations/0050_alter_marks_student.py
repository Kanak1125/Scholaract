# Generated by Django 4.2.1 on 2023-07-14 04:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0049_alter_marks_student'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marks',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scholaractapp.student'),
        ),
    ]
