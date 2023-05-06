# we edited this file
from django.shortcuts import render, redirect
from .models import User, Class  # importing Users model from the models.py file
from django.contrib.auth.hashers import make_password, check_password
# from django.core.exceptions import ValidationError
# from django.core.mail import send_mail
import json

# Create your views here.


# view for landing page
def landingPage(request):
    return render(request, 'scholaractapp/landingPage.html')


def aboutUs(request):
    return render(request, 'scholaractapp/aboutUs.html')
# view for signup page


def signup(request):
    success = ''
    error_message = ''
    if request.method == 'POST':
        # gets the data of their respective fields
        first_name = request.POST.get('fname')
        # request: It refers to the HttpRequest object that represents the incoming HTTP request made by a client
        # request.POST: It is a dictionary-like object that holds the submitted POST data. It allows you to access the submitted form data by their respective names.
        # .get('fname'): This method retrieves the value associated with the key 'fname' from the request.POST dictionary. If the key is present, it returns the corresponding value; otherwise, it returns None.
        last_name = request.POST.get('lname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        hashed_pwd = make_password(password) # hashing the password using

        # query which checks if the email entered by the user already exists in yhe db, if it exists it will return true else it will return false
        email_exits = User.objects.filter(email=email).exists()

        if email_exits:
            error_message = "This email already exists please use another email"
        else:

            # passes the data received from form to the User model
            user_data = User(
                first_name=first_name, last_name=last_name, email=email, password=hashed_pwd)

            user_data.save()  # saves data into the database into their respective columns

            return redirect('success')

    return render(request, 'scholaractapp/signup.html', {'error_message': error_message})

# view for temporary solution of redirecting users to a success page after creatig an account to overcome resubmitting of previously submitter data


def success(request):

    return render(request, 'scholaractapp/success.html')

# view for login page


def login(request):
    print(request.POST)
    error_email = ''
    error_password = ''
    error_role = ''
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(User.password)
        try:
            user = User.objects.get(email=email)
            # Users: model defined in models.py file or can also be seen as table
            # objects: manager for the Users model automatically created by django. It is used to query the db and retrieve instances of the model
            # get: method provided by django ORM(Object Relational Mapping) that retrives a single object from the db that matches the given lookup parameter
            # email = email: keyword argument that specifies the lookup parameter for the query. It filters the 'Users' model based in the 'email' field. The value of 'email' field is provided as 'email' variable which is obtained from the 'request.POST' data
        except User.DoesNotExist:
            # 'Users.DoesNot Exist' is an exception class that is raised by the Django ORM when a query using the 'get()' method does not return any object from the database
            error_email = 'Email does not exist'
        else:
            # the following code will be executed if there are no errors
            # check_password: function provided by Django's 'make_password' module. It is used to verify whether a gicen plain text password matches the encrypted password stored in the database
            # password: passsword obtained from the 'request.POST' data (entered by the user). user.password: corresponding password of the entered email
            if not check_password(password, user.password):
                error_password = 'Password does not match'
            if not user.role:  # checks if the user is assgned a role, if not the then hew wont be able to login
                error_role = 'Wait till admin assigns you a role'
            else:
                # creating session, the created session will be stored in db in table 'django_session'
                request.session['user'] = {
                    'id': user.id,
                    'email': user.email,
                    'fname': user.first_name,
                    'role': user.role,  # value is initially none since no role is assigned at first
                }
                # By storing this information in the session dictionary, we can access it from any view that is associated with the same session. This allows us to easily retrieve information about the currently logged-in user without having to query the database every time.

                return redirect('classes')

    return render(request, 'scholaractapp/login.html', {'error_email': error_email, 'error_password': error_password, 'error_role': error_role, })


def classes(request):
    # session data
    user_data = request.session.get('user')
    user_name = user_data['fname']
    user_id = user_data['id']
    role = user_data.get('role') # since role is being assigned by admin, it is being accessed this way
    teacher =  User.objects.get(id = user_id) # retrieves a single record that matches the user_id that we got from session

    print(request.POST)
    if request.method == 'POST':
        class_name = request.POST.get('classname')
        subject_name = request.POST.get('subject')
        created_by = teacher.name() # getting the full name of the teacher that created the class (name() is a method that returns full name of the teacher)
        class_data = Class(teacher=teacher, class_name=class_name, subject_name=subject_name,created_by=created_by)
        class_data.save()

    classes = Class.objects.filter(teacher=teacher) # retrives the record in Class model where the teacher field matches the teacher object given
    # list() method converts the query set into the python list object...
    cl = list(classes.values('class_code', 'class_name', 'subject_name', 'created_by'))
    # it will list the classes that are only created by the currently logged in teacher

    classes_dict = {'classes': cl}
    # json.dumps() encodes the 'classes_dict' as JSON string...
    classes_json = json.dumps(classes_dict)
    
    

    # now only classes.html file can use the 'classes_json' data...
    return render(request, 'scholaractapp/classes.html', {'classes_json': classes_json, 'name': user_name, 'role': role})
