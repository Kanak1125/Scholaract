from django.db import models

# Create your models here.
# We created our model Users, it is just like creating a table using MySQL queries but the syntax are different
class Users(models.Model):
    firstName = models.CharField(max_length=300,null=False, blank=False) # cloumns
    lastName = models.CharField(max_length=300,null=False, blank=False)
    email = models.EmailField(max_length=300,null=False, blank=False)
    password = models.CharField(max_length=300,null=False, blank=False)

    def __str__(self):
        return self.firstName + ' ' + self.lastName