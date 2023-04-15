from django.db import models

# Create your models here.
class Users(models.Model):
    firstName = models.CharField(max_length=300,null=False, blank=False)
    lastName = models.CharField(max_length=300,null=False, blank=False)
    email = models.EmailField(max_length=300,null=False, blank=False)
    password = models.CharField(max_length=300,null=False, blank=False)

    def __str__(self):
        return self.firstName