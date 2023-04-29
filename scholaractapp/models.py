# we edited this file
from django.db import models

# Create your models here.
# We created our model Users, it is just like creating a table using MySQL queries but the syntax are different
class Users(models.Model):
    class Meta:
        verbose_name = "Users" # label for the model in django admin panel
        # previously in admin panel, when we created models with a plural name, it appended 's' at the end ogf the model name'jazzmin',
        verbose_name_plural = "Users" # assinging the verbose_name_plural value as given overcomes this problem

    firstName = models.CharField(max_length=300,null=False, blank=False) # columns
    lastName = models.CharField(max_length=300,null=False, blank=False)
    email = models.EmailField(max_length=300,null=False, blank=False)
    password = models.CharField(max_length=300,null=False, blank=False)

    roles_choices = [
        ('Student', 'Student'), #('Student', 'Student'), the first element in the tuple, 'Student', represents the value that will be stored in the database when the user selects the "Student" option in the form. The second element in the tuple, 'Student', is the human-readable label that will be displayed to the user in the form.
        ('Teacher', 'Teacher'),
    ]
    role = models.CharField(max_length=7, choices=roles_choices, null=False, blank=False,)

    # for django admin panel so that the entries can be displayed with the users first and lastname in the admin panel
    # def __str__(self):
    #     return self.firstName + ' ' + self.lastName 
    
    def name(self): # creating new function name so that the full name (combining first and last name) can be displayed in admin panel
        return f"{self.firstName} {self.lastName}" # this is how we display variables in python
    