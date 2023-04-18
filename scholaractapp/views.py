from django.shortcuts import render,redirect
from .models import Users # importing Users model from the models.py file
from django.contrib.auth.hashers import make_password, check_password
# from django.core.exceptions import ValidationError

# Create your views here.

# view for signup page
def signup(request):
    success = ''
    error_message = ''
    if request.method == 'POST':
        print(request.POST)

        # gets the data of their respective fields
        firstName = request.POST.get('fname')
        lastName = request.POST.get('lname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        hashed_pwd = make_password(password)
        
        email_exits = Users.objects.filter(email=email).exists() # query which checks if the email entered by the user already exists in yhe db, if it exists it will return true else it will return false

        if email_exits:
            error_message = "This email already exists please use another email"
        else:


            user_data = Users(firstName=firstName,lastName=lastName,email=email,password=hashed_pwd) # passes the data received from form to the User model
            
            user_data.save() # saves data into the database into their respective columns

            return redirect('success')
            
    return render(request, 'scholaractapp/signup.html', {'error_message': error_message})

# view for temporary solution of redirecting users to a success page after creatig an account to overcome resubmitting of previously submitter data
def success(request):
    
    return render(request, 'scholaractapp/success.html')

# view for login page
def login(request):
    print(request.POST)
    error_email =''
    error_password = ''
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password') 
        print(Users.password)
        try:
            user = Users.objects.get(email = email) 
        except Users.DoesNotExist:
            error_email = 'Email does not exist'
        else:
            if not check_password(password, user.password):
                error_password = 'Password does not match'
            else:
                return redirect('classes')
            
    return render(request, 'scholaractapp/login.html',{'error_email' : error_email, 'error_password': error_password})

def classes(request):
    return render(request, 'scholaractapp/classes.html')