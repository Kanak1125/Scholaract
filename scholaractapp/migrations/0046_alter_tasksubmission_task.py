# Generated by Django 4.2.1 on 2023-07-04 09:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scholaractapp', '0045_alter_tasksubmission_student'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasksubmission',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='scholaractapp.task'),
        ),
    ]
