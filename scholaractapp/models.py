# we edited this file
from django.db import models

# Create your models here.
# We created our model Users, it is just like creating a table using MySQL queries but the syntax are different
class User(models.Model):
    # class Meta:
        # verbose_name = "Users" # label for the model in django admin panel
        # # previously in admin panel, when we created models with a plural name, it appended 's' at the end ogf the model name'jazzmin',
        # verbose_name_plural = "Users" # assinging the verbose_name_plural value as given overcomes this problem

    first_name = models.CharField(max_length=300,null=False, blank=False) # columns
    last_name = models.CharField(max_length=300,null=False, blank=False)
    email = models.EmailField(max_length=300,null=False, blank=False)
    password = models.CharField(max_length=300,null=False, blank=False)

    ROLES_CHOICES = [
        ('S', 'Student'), #('Student', 'Student'), the first element in the tuple, 'S', represents the value that will be stored in the database when the admin selects the "Student" option. The second element in the tuple, 'Student', is the human-readable label that will be displayed to the admin.
        ('T', 'Teacher'),
    ]
    role = models.CharField(max_length=7, choices=ROLES_CHOICES, null=False, blank=False,)

    # for django admin panel so that the entries can be displayed with the users first and lastname in the admin panel
    # def __str__(self):
    #     return self.first_name + ' ' + self.last_name 
    def save(self, *args, **kwargs):
        if self.role == 'student':
            student = Student(first_name=self.first_name, last_name=self.last_name, email=self.email, password=self.password)
            student.save()
        # elif self.role == 'teacher':
        #     teacher = Teacher(firstname=self.firstname, lastname=self.lastname, email=self.email, password=self.password)
        #     teacher.save()
        super(User, self).save(*args, **kwargs)
    
    def name(self): # creating new function name so that the full name (combining first and last name) can be displayed in admin panel
        return f"{self.first_name} {self.last_name}" # this is how we display variables in python
    
    # created so that in admin panel the users name will be shown in their info and not User Object
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # OneToOneField is a Django model field used to create a one-to-one relationship between two models. In this case, we're using OneToOneField to define a relationship between the Student and Teacher models and the User model.
    # Users: The model that we want to create a relationship with. In this case, we want to create a one-to-one relationship with the Users model.
    # on_delete=models.CASCADE: This specifies what should happen when the related object is deleted. CASCADE means that if the User object is deleted, the corresponding Student or Teacher object should also be deleted.
    # primary_key=True: This indicates that the related User object should also act as the primary key for the Student or Teacher object. In other words, each Student or Teacher object can only be associated with one User object, and vice versa.

    # first_name = models.CharField(max_length=300,null=True, blank=True) # columns
    # last_name = models.CharField(max_length=300,null=True, blank=True)
    # email = models.EmailField(max_length=300,null=True, blank=True)
    # password = models.CharField(max_length=300,null=True, blank=True)

    def name(self): # creating new function name so that the full name (combining first and last name) can be displayed in admin panel
        return f"{self.user.first_name} {self.user.last_name}" # this is how we display variables in python
        # here 'self' is like 'this' in php, it is refering to instance of the class that the method is being called on
        # 'user' is a foreign key field that links the Student model to the User model. 
        # 'first_name' attribute is an attribute of the User model
        # same for the last_name

    def email(self): # creating new function name so that the email can be displayed in admin panel, we have to do this because we are taking data from User model so
        return self.user.email # this is how we display variables in python

    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # one to one relationship because one teacher can teach only one class
    # 'on_delete=models.PROTECT' protects or prevents teacher object from being delted even if the class object is deleted
    # class_taught = models.OneToOneField('Class', on_delete=models.PROTECT) 
    
    def name(self):
        return f"{self.user.first_name} {self.user.last_name}"
    
    def email(self):
        return self.user.email
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
    
class Class(models.Model):
    class_code = models.CharField(max_length=5, null=False, blank=False)
    class_name = models.CharField(max_length=300, null=False, blank=False)

