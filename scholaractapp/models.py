# we edited this file
from django.db import models
import secrets  # for generating random alphanumeric number for class code
# import uuid


# Create your models here.
# We created our model Users, it is just like creating a table using MySQL queries but the syntax are different


class User(models.Model):
    first_name = models.CharField(
        max_length=300, null=False, blank=False)  # columns
    last_name = models.CharField(max_length=300, null=False, blank=False)
    email = models.EmailField(max_length=300, null=False, blank=False)
    password = models.CharField(max_length=300, null=False, blank=False)

    ROLES_CHOICES = [
        # ('S', 'Student'), the first element in the tuple, 'S', represents the value that will be stored in the database when the admin selects the "Student" option. The second element in the tuple, 'Student', is the human-readable label that will be displayed to the admin.
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
    ]
    role = models.CharField(
        max_length=7, choices=ROLES_CHOICES, null=False, blank=False,)

    def name(self):  # creating new function name so that the full name (combining first and last name) can be displayed in admin panel
        # this is how we display variables in python
        return f"{self.first_name} {self.last_name}"

    # created so that in admin panel the users name will be shown in their info and not User Object
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Student(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    # OneToOneField is a Django model field used to create a one-to-one relationship between two models. In this case, we're using OneToOneField to define a relationship between the Student and Teacher models and the User model.
    # Users: The model that we want to create a relationship with. In this case, we want to create a one-to-one relationship with the Users model.
    # on_delete=models.CASCADE: This specifies what should happen when the related object is deleted. CASCADE means that if the User object is deleted, the corresponding Student or Teacher object should also be deleted.
    # primary_key=True: This indicates that the related User object should also act as the primary key for the Student or Teacher object. In other words, each Student or Teacher object can only be associated with one User object, and vice versa.

    # creates a join table
    classes = models.ManyToManyField('Class', blank=True)
   
    def name(self):  # creating new function name so that the full name (combining first and last name) can be displayed in admin panel
        # this is how we display variables in python
        return f"{self.user.first_name} {self.user.last_name}"
        # here 'self' is like 'this' in php, it is refering to instance of the class that the method is being called on
        # 'user' is a foreign key field that links the Student model to the User model.
        # 'first_name' attribute is an attribute of the User model
        # same for the last_name

    def email(self):  # creating new function name so that the email can be displayed in admin panel, we have to do this because we are taking data from User model so
        return self.user.email  # this is how we display variables in python

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class Teacher(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    # one to one relationship because one teacher can teach only one class
    # 'on_delete=models.PROTECT' protects or prevents teacher object from being delted even if the class object is deleted

    def name(self):
        return f"{self.user.first_name} {self.user.last_name}"

    def email(self):
        return self.user.email

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class Class(models.Model):
    class Meta:
        verbose_name = "Class"  # label for the model in django admin panel
        # previously in admin panel, when we created models with a plural name, it appended 's' at the end ogf the model name'jazzmin',
        # assinging the verbose_name_plural value as given overcomes this problem
        verbose_name_plural = "Classes"

    # the class_code field is nullable, and optional character field...
    class_code = models.CharField(
        max_length=5, null=True, blank=True, unique=True, editable=False)
    class_name = models.CharField(max_length=300, null=True, blank=True)
    subject_name = models.CharField(max_length=300, null=True, blank=True)
   
    

    teacher = models.ForeignKey(User, on_delete=models.CASCADE,null = True)
    # The ForeignKey field is used to establish a many-to-one relationship between the Class model and the Teacher model. It indicates that each Class object can be associated with a single Teacher, while a Teacher can be associated with multiple Class objects.
    

    def save(self, *args, **kwargs):
        if not self.class_code:
            self.class_code = ''.join(secrets.choice(
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for i in range(5))
         
        # if not self.pk:
        #     self.created_by = self.teacher.name()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.class_name


class CourseMaterial(models.Model):
    class Meta:
        verbose_name = "Course Material"
        verbose_name_plural = "Course Materials"

    title = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    # file = models.FileField(upload_to='class_files/', null=True, blank=True)
    related_class = models.ForeignKey(Class, on_delete=models.CASCADE) # to establish many to one relationship
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    
class MaterialFile(models.Model):
    file = models.FileField(upload_to='class_files/', null=True, blank=True) # Each CourseMaterial object can have multiple associated MaterialFile objects, allowing for multiple file uploads
    course_material = models.ForeignKey(CourseMaterial, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.file.name
    
class Task(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    related_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    due_date = models.DateField(null=True, blank=True) 
    
    def __str__(self):
        return self.title
    
class TaskFile(models.Model):
    file = models.FileField(upload_to='task_files/', null=True, blank=True) # Each CourseMaterial object can have multiple associated MaterialFile objects, allowing for multiple file uploads
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.file.name

class TaskSubmission(models.Model):
    # student = models.ForeignKey(Student, on_delete= models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)
    date_of_submission = models.DateField(auto_now_add=True)
    file = models.FileField(upload_to='submission_files/', null=True, blank=True)
    
    def __str__(self):
        return self.file.name    

class Marks(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Class, on_delete=models.CASCADE)
    marks = models.DecimalField(max_digits=4, decimal_places=2)

    
