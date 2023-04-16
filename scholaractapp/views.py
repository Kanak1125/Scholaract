from django.shortcuts import render,redirect
from .models import Users # importing Users model from the models.py file
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.

# view for signup page
def signup(request):
    success = ''
    if request.method == 'POST':
        print(request.POST)

        # gets the data of their respective fields
        firstName = request.POST.get('fname')
        lastName = request.POST.get('lname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        hashed_pwd = make_password(password)
        # check_pwd = check_password(password,hashed_pwd)

        user_data = Users(firstName=firstName,lastName=lastName,email=email,password=hashed_pwd) # passes the data received from form to the User model
        
        user_data.save() # saves data into the database into their respective columns

        success = 'Data Inserted successfully'
    return render(request, 'scholaractapp/signup.html', {'success': success})

# view for login page
def login(request):
    return render(request, 'scholaractapp/login.html')