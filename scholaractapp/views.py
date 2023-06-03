# we edited this file
from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.http import JsonResponse
from django.core import serializers

# importing Users model from the models.py file
from .models import User, Class, Student, CourseMaterial, MaterialFile, Task, TaskFile
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required

# from django.core.exceptions import ValidationError
# from django.core.mail import send_mail
import json
from django.core.serializers.json import DjangoJSONEncoder
from datetime import date

# os module for that will be used to extract the extension of the file...
import os

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
        hashed_pwd = make_password(password)  # hashing the password using

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
            elif not user.role:  # checks if the user is assgned a role, if not the then hew wont be able to login
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
    # renders the dictionary {} to the 'scholaractapp/login.html' page...

# @login_required(login_url='/login/')


def classes(request):
    # session data
    user_data = request.session.get('user')

    # since role is being assigned by admin, it is being accessed this way
    role = user_data.get('role')
    if role == "Teacher":
        return classes_teacher(request)
    elif role == "Student":
        return classes_student(request)
    else:
        return HttpResponse("Invalid role")


def classes_teacher(request):

    # session data
    user_data = request.session.get('user')
    # accessing fname this way because we are sure it will exist in the db and absence of the fname is considered an error
    user_name = user_data['fname']
    user_id = user_data['id']
    # since role is being assigned by admin, it is being accessed this way
    # accessing role this way becaues it initially does not exist or is set to None. It is used because when the role doesnot have a value, it will not return an error and role can be set as None too
    role = user_data.get('role')
    # retrieves a single record that matches the user_id that we got from session
    teacher = User.objects.get(id=user_id)
    print(role)

    print(request.POST)
    if request.method == 'POST':
        class_name = request.POST.get('classname')
        subject_name = request.POST.get('subject')
        # getting the full name of the teacher that created the class (name() is a method that returns full name of the teacher)
        class_data = Class(teacher=teacher, class_name=class_name,
                           subject_name=subject_name)
        class_data.save()
        return redirect('classes')

    # retrives the record in Class model where the teacher field matches the teacher object given
    classes = Class.objects.filter(teacher=teacher)
    # list() method converts the query set into the python list object...
    cl = list(classes.values('id', 'class_code', 'class_name',
              'subject_name',))
    for item in cl:
        item['created_by'] = teacher.name()
    # it will list the classes that are only created by the currently logged in teacher

    classes_dict = {'classes': cl}
    # json.dumps() encodes the 'classes_dict' as JSON string...
    classes_json = json.dumps(classes_dict)

    # now only classes.html file can use the 'classes_json' data...
    return render(request, 'scholaractapp/classes.html', {'classes_json': classes_json, 'name': user_name, 'role': role})


def classes_student(request):
    # session data
    user_data = request.session.get('user')
    user_name = user_data['fname']
    user_id = user_data['id']
    # since role is being assigned by admin, it is being accessed this way
    role = user_data.get('role')
    # retrieves a single record that matches the user_id that we got from session
    student = Student.objects.get(user_id=user_id)
    print(role)
    error_message = ''

    if request.method == "POST":
        class_code = request.POST.get('class_code')  # retrives the class code

        try:
            selected_class = Class.objects.get(class_code=class_code)
            # checks if the instance with the entered class_code exists
            # if it exists then add the student's enrolled classes
            student.classes.add(selected_class)
            return redirect('classes')
        # triggered when Class.objects.get(class_code=class_code) method is unable to find instacne with the class_code entered by student
        except Class.DoesNotExist:
            error_message = 'Invalid class code. Please try again.'

    # retrives all the clasees the srusnt has enrolled in
    # value method selects specific fields
    # teacher = selected_class.teacher.name()
    cl = list(student.classes.values(
        'id', 'class_code', 'class_name', 'subject_name'))

    for item in cl:
        try:
            # retrieving a single object from 'Class' model that corresponds to the class_code of the
            class_obj = Class.objects.get(class_code=item['class_code'])
            item['created_by'] = class_obj.teacher.name()
        except Class.DoesNotExist:
            item['created_by'] = ''
    # The class information is extracted and converted into a dictionary format, stored in classes_dict.
    classes_dict = {'classes': cl}
    # it will list the classes that are joined by the current logged in student

    # json.dumps() encodes the 'classes_dict' as JSON string...
    classes_json = json.dumps(classes_dict)

    # now only classes.html file can use the 'classes_json' data...
    return render(request, 'scholaractapp/classes.html', {'classes_json': classes_json, 'name': user_name, 'role': role, 'error_message': error_message})


def single_class(request, pk):
    classObj = Class.objects.get(id=pk)
    related_class = classObj
    print(request.POST)
    if request.method == "POST":
        title = request.POST.get('post_title')
        description = request.POST.get('post_description')
        # file = request.FILES.get('post_file')
        files = request.FILES.getlist('post_file')

        user_data = request.session.get('user')
        # user_name = user_data['fname']
        user_id = user_data['id']
        uploaded_by = User.objects.get(id=user_id)
        # uploaded_by =

        file_count = len(files)
        print(f"Number of files uploaded: {file_count}")
        material = CourseMaterial.objects.create(
            title=title, description=description, related_class=related_class, uploaded_by=uploaded_by,)

        print(related_class)
        print(files)

        for file in files:
            MaterialFile.objects.create(file=file, course_material=material)
        class_pk = classObj.pk

        # Redirect to the class page with class_pk as parameter
        return redirect('class', pk=class_pk)

    course = CourseMaterial.objects.filter(related_class=related_class)
    course_list = []
    for material in course:
        material_data = {
            'id': material.id,
            'title': material.title,
            'description': material.description,
            # 'file_name': material.file.name,
            # 'file_url': material.file.url,
            'uploaded_by': material.uploaded_by.name(),
            'files': []
        }

        material_files = MaterialFile.objects.filter(course_material=material)

        for material_file in material_files:
            file_data = {
                'file_name': material_file.file.name,
                'file_url': material_file.file.url,
                # The os.path.splitext() function splits the filename by identifying the last occurrence of a dot ('.') character. It considers everything before the dot as the base name and everything after the dot (including the dot) as the extension.
                'file_extension': os.path.splitext(material_file.file.name)[1]
            }
            material_data['files'].append(file_data)
        course_list.append(material_data)
        # if material_files:
        #     file_data = []
        #     for material_file in material_files:
        #         file_data.append({
        #             'file_name': material_file.file.name,
        #             'file_url': material_file.file.url,
        #             'file_extension':os.path.splitext(material_file.file.name)[1] # The os.path.splitext() function splits the filename by identifying the last occurrence of a dot ('.') character. It considers everything before the dot as the base name and everything after the dot (including the dot) as the extension.
        #         })
        #     material_data['files'] = file_data
        # course_list.append(material_data)

        # material_data['file_name'] = material.file.name
        # material_data['file_url'] = material.file.url
        # file_extension = os.path.splitext(material.file.name)[1] # The os.path.splitext() function splits the filename by identifying the last occurrence of a dot ('.') character. It considers everything before the dot as the base name and everything after the dot (including the dot) as the extension.
        # material_data['file_extension'] = file_extension
        # course_list.append(material_data)

    # print(course_list)

    course_json = json.dumps(course_list)
    print(course)
    return render(request, 'scholaractapp/class/stream.html', {'course_json': course_json, 'class': classObj, })


class DateEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.strftime('%d-%m-%Y')  # strftime = string format time
        return super().default(obj)


def task(request, pk):
    classObj = Class.objects.get(id=pk)
    related_class = classObj

    # session data
    user_data = request.session.get('user')
    # user_name = user_data['fname']
    # user_id = user_data['id']
    role = user_data.get('role')
    print(request.POST)
    if request.method == "POST":
        title = request.POST.get('post_title')
        description = request.POST.get('post_description')
        files = request.FILES.getlist('post_file')
        due_date = request.POST.get('due-date')

        task = Task.objects.create(
            title=title, description=description, related_class=related_class, due_date=due_date)

        for file in files:
            TaskFile.objects.create(file=file, task=task)
        class_pk = classObj.pk

        return redirect('task', pk=class_pk)

    current_task = Task.objects.filter(related_class=related_class)
    task_list = []

    for task in current_task:
        task_data = {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'due_date': task.due_date,
            # 'file_name': material.file.name,
            # 'file_url': material.file.url,
            'files': []
        }

        task_files = TaskFile.objects.filter(task=task)

        for task_file in task_files:
            file_data = {
                'file_name': task_file.file.name,
                'file_url': task_file.file.url,
                # The os.path.splitext() function splits the filename by identifying the last occurrence of a dot ('.') character. It considers everything before the dot as the base name and everything after the dot (including the dot) as the extension.
                'file_extension': os.path.splitext(task_file.file.name)[1]
            }
            task_data['files'].append(file_data)
        task_list.append(task_data)
    # cls=DateEncoder is provided to specify a custom JSON encoder class for serializing objects that are not natively serializable by default. In this case, we have defined a custom encoder class called DateEncoder that subclasses DjangoJSONEncoder and overrides its default() method.
    task_json = json.dumps(task_list, cls=DateEncoder)

    return render(request, 'scholaractapp/class/task.html', {'task_json': task_json, 'class': classObj, })


def people(request, pk):
    classObj = Class.objects.get(id=pk)
    # students =
    return render(request, 'scholaractapp/class/people.html', {'class': classObj, })


def report(request, pk):
    classObj = Class.objects.get(id=pk)

    return render(request, 'scholaractapp/class/report.html', {'class': classObj, })


def logout(request):
    # Delete the session data
    Session.objects.filter(session_key=request.session.session_key).delete()

    # Clear any authentication-related variables
    request.session.flush()

    return redirect('login')

# def updateMaterial(request, pk):
#     # material = get_object_or_404(CourseMaterial, id=pk)
#     material = CourseMaterial.objects.get(id=id)

#     if request.method == "POST":
#         title = request.POST.get('post_title')
#         description = request.POST.get('post_description')
#         file = request.FILES.get('post_file')

#         if file:
#             material.title = title
#             material.description = description
#             material.file = file
#         material.save()
#         related_class = material.related_class
#     course = CourseMaterial.objects.filter(related_class=related_class)
#     course_list = []
#     for material in course:
#         material_data = {
#             'title': material.title,
#             'description': material.description,
#             'uploaded_by': material.uploaded_by.name(),

#         }
#         if material.file:
#             material_data['file_name'] = material.file.name
#             material_data['file_url'] = material.file.url
#         course_list.append(material_data)

#     course_json = json.dumps(course_list)

#     return render(request, 'scholaractapp/class/stream.html', {'course_json': course_json, 'class': related_class})
