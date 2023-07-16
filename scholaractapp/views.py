# we edited this file
from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.http import JsonResponse
from django.core import serializers

# importing Users model from the models.py file
from django.db.models import Count, Sum

from .models import User, Class, Student, CourseMaterial, MaterialFile, Task, TaskFile, TaskSubmission, Marks
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

def faq(request):
    return render(request,'scholaractapp/faq.html')

# def support(request):
#     return render(request, 'scholaractapp/support.html')


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

    context = {
        'error_message': error_message,
    }
    return render(request, 'scholaractapp/signup.html', context)

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

    context = {
        'error_email': error_email,
        'error_password': error_password,
        'error_role': error_role,
    }

    return render(request, 'scholaractapp/login.html', context)
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

    context = {
        'classes_json': classes_json,
        'name': user_name,
        'role': role,
    }

    # now only classes.html file can use the 'classes_json' data...
    return render(request, 'scholaractapp/classes.html', context)


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

    # retrives all the clasees the student has enrolled in
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

    context = {
        'classes_json': classes_json,
        'name': user_name,
        'role': role,
        'error_message': error_message,
    }

    # now only classes.html file can use the 'classes_json' data...
    return render(request, 'scholaractapp/classes.html', context)


def single_class(request, pk):
    classObj = Class.objects.get(id=pk)
    related_class = classObj
    print(request.POST)
    if request.method == "POST":
        title = request.POST.get('post_title')
        description = request.POST.get('post_description')
        files = request.FILES.getlist('post_file')

        user_data = request.session.get('user')
        user_id = user_data['id']
        uploaded_by = User.objects.get(id=user_id)

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

    course_json = json.dumps(course_list)
    print(course)

    context = {
        'course_json': course_json,
        'class': classObj,
    }
    return render(request, 'scholaractapp/class/stream.html', context)

# def updateMaterial(request, pk):
#     material = CourseMaterial.objects.get(id=pk)
#     if request.method == 'POST':
        
#     return render(request, 'scholaractapp/class/stream.html')
def deleteMaterial(request, pk):
    material = CourseMaterial.objects.get(id=pk)
    print(pk)
    if request.method == 'POST':
        material.delete()
        # Redirect to the desired page after deleting the task
        return redirect('class', pk=material.related_class.pk)
    
    return render(request, 'scholaractapp/class/stream.html')

def updateMaterial(request, pk):
    material = CourseMaterial.objects.get(id=pk)
    if request.method == 'POST':
        pass

    return render(request, 'scholaractapp/class/stream.html')


# class SingleClassEncoder(DjangoJSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, Class):
#             # Serialize the 'Class' object as a dictionary
#             return {
#                 'id': obj.id,
#                 'class_name': obj.class_name,
#                 # Include other serializable attributes
#             }
#         elif isinstance(obj, CourseMaterial):
#             # Serialize the 'CourseMaterial' object as a dictionary
#             return {
#                 'id': obj.id,
#                 'title': obj.title,
#                 'description': obj.description,
#                 # Include other serializable attributes
#             }
#         return super().default(obj)
    
# def single_class(request, pk):
#     classObj = Class.objects.get(id=pk)
#     related_class = classObj
#     # print(request.POST)
#     if request.method == "POST":
#         title = request.POST.get('post_title')
#         description = request.POST.get('post_description')
#         files = request.FILES.getlist('post_file')

#         user_data = request.session.get('user')
#         user_id = user_data['id']
#         uploaded_by = User.objects.get(id=user_id)

#         file_count = len(files)
#         print(f"Number of files uploaded: {file_count}")
#         material = CourseMaterial.objects.create(
#             title=title, description=description, related_class=related_class, uploaded_by=uploaded_by,)

#         print(related_class)
#         print(files)

#         for file in files:
#             MaterialFile.objects.create(file=file, course_material=material)
#         class_pk = classObj.pk

#         # Redirect to the class page with class_pk as parameter
#         return redirect('class', pk=class_pk)

#     course = CourseMaterial.objects.filter(related_class=related_class)
#     course_list = []
#     for material in course:
#         material_data = {
#             'id': material.id,
#             'title': material.title,
#             'description': material.description,
#             'uploaded_by': material.uploaded_by.name(),
#             'files': []
#         }

#         material_files = MaterialFile.objects.filter(course_material=material)

#         for material_file in material_files:
#             file_data = {
#                 'file_name': material_file.file.name,
#                 'file_url': material_file.file.url,
#                 # The os.path.splitext() function splits the filename by identifying the last occurrence of a dot ('.') character. It considers everything before the dot as the base name and everything after the dot (including the dot) as the extension.
#                 'file_extension': os.path.splitext(material_file.file.name)[1]
#             }
#             material_data['files'].append(file_data)
#         course_list.append(material_data)

#     # course_json = json.dumps(course_list)
#     print(course)
#     print("pk:",pk)
#     context = {
#         # 'pk': classObj.pk,
#         'pk' : pk,
#         'course_list': course_list,
#         'class': classObj,
#     }   
#     if request.headers.get('Accept') == 'application/json':
#         return JsonResponse(context, encoder = SingleClassEncoder)
#     # print(request.headers.get('Accept'))
#     return render(request, 'scholaractapp/class/stream.html', {'class': classObj, 'pk': pk})



class DateEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.strftime('%d-%m-%Y')  # strftime = string format time
        return super().default(obj)


def task(request, pk):
    # session data
    user_data = request.session.get('user')

    # since role is being assigned by admin, it is being accessed this way
    role = user_data.get('role')
    if role == "Teacher":
        return task_teacher(request, pk)
    elif role == "Student":
        return task_student(request, pk)
    else:
        return HttpResponse("Invalid role")

def task_teacher(request, pk):
    classObj = Class.objects.get(id=pk)
    related_class = classObj

    # session data
    # user_data = request.session.get('user')
    # user_name = user_data['fname']
    # user_id = user_data['id']
    # role = user_data.get('role')

    # print(request.POST)
    task_submitted_json = ""
    if request.method == "POST":
        form_identifier = request.POST.get('form_identifier')
        print("Form Identifier:", form_identifier)
        if form_identifier == "assign_task_form":
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

        if form_identifier == "task_id_identifier":
            task_id = request.POST.get('task_id')
            print(f"Task id is {task_id}")

            # filters the tasks submitted by student which has the same task id as the one being passed and counts them
            task_submitted = TaskSubmission.objects.filter(task_id=task_id)
            total_submitted = task_submitted.count() 
            print(f"The total number of entries is: {total_submitted}")

            # task_submitted_list = []
            # for task in task_submitted:
            #     task_data = {
            #         'name': task.student,
            #         'date_of_submission': task.date_of_submission,
            #         'file_url': task.file.url,
            #     }
            task_submitted_list = list(task_submitted.values('date_of_submission'))

            for submission in task_submitted:
                name = submission.student.name()
                file_url = submission.file.url
                task_submitted_list.append(file_url)
                task_submitted_list.append(name)
            print(task_submitted_list)


            task_submitted_json = json.dumps(task_submitted_list, cls=DateEncoder)
        


    current_task = Task.objects.filter(related_class=related_class)
    task_list = []
    
    # for counting total number of tasks submitted 
    # total_task_filter = Task.objects.filter(related_class=pk)
    # total_task = total_task_filter.count()
    # print(total_task)
    
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


    # total_tasks_submitted = TaskSubmission.objects.aggregate(total=Count(3))['total']
    # print(total_tasks_submitted)

    context = {
        'task_json': task_json,
        'class': classObj,
        'task_submitted_json': task_submitted_json,
    }
    return render(request, 'scholaractapp/class/task.html', context)


# def task_student(request, pk):
#     classObj = Class.objects.get(id=pk)
#     related_class = classObj
#     if request.method == "POST":
#         files = request.FILES.getlist('post_file')
#         task_id = request.POST.get('task_id')

#         task = Task.objects.get(id=task_id)

#         user_data = request.session.get('user')
#         user_id = user_data['id']
#         uploaded_by = User.objects.get(id=user_id)
                                       
#         for file in files:
#             TaskSubmission.objects.create(file=file, task=task, student=uploaded_by)

#         task_submissions = TaskSubmission.objects.filter(task=task, student=uploaded_by)
#         file_list = []
            
#         for submission in task_submissions:
#             file_data = {
#                 'file_name': submission.file.name,
#                 'file_url': submission.file.url,
#                 'file_extension': os.path.splitext(submission.file.name)[1]
#             }
#             file_list.append(file_data)

#         task_submissions_json = json.dumps(file_list)
    
#         print(task_submissions_json)
#     context = {
#         'task_submissions_json': task_submissions_json,
#         'class': classObj,
#     }
#     return render(request, 'scholaractapp/class/task.html', context)


def task_student(request, pk):
    classObj = Class.objects.get(id=pk)
    related_class = classObj

    user_data = request.session.get('user')
    user_id = user_data['id']
    uploaded_by = User.objects.get(id=user_id)

    # listing tasks assigned for current class
    current_tasks = Task.objects.filter(related_class = related_class)
    task_list = []
    for single_task in current_tasks:
        task_dict = {
            'id': single_task.id,
            'title': single_task.title,
            'description': single_task.description,
            'due_date': single_task.due_date,
            'files': [],
        }

        task_files = TaskFile.objects.filter(task=single_task)
        for task_file in task_files:
            file_data = {
                'file_name': task_file.file.name,
                'file_url': task_file.file.url,
                # The os.path.splitext() function splits the filename by identifying the last occurrence of a dot ('.') character. It considers everything before the dot as the base name and everything after the dot (including the dot) as the extension.
                'file_extension': os.path.splitext(task_file.file.name)[1]
            }
            task_dict['files'].append(file_data)
        
        task_list.append(task_dict)
    task_json = json.dumps(task_list, cls = DateEncoder)



    if request.method == 'POST':
        print(request.POST)
        form_identifier = request.POST.get('form_identifier')
        print("Form Identifier:", form_identifier)
        if form_identifier == "task_id_identifier":
            task_id = request.POST.get('task_id')
            request.session['task_id'] = task_id # storing task id in session
            # print(task_id)

        elif form_identifier == "submit_task_form":
            # task_id = request.POST.get('task_id')
            task_id = request.session.get('task_id') # accessing task id from session
            task = Task.objects.get(id=task_id)
            print(task_id)
            files = request.FILES.getlist('post_file')
            print(request.FILES)
            
            
            for file in files:
                TaskSubmission.objects.create(file=file, task=task, student=uploaded_by, date_of_submission=date.today())
                print(file)

            # class_pk = classObj.pk
            return redirect('task', pk=related_class.pk)
            

    context = {
        'task_json': task_json,
        'class': classObj,
    }
    
    return render(request, 'scholaractapp/class/task.html', context)

# def submitTask(request, pk):
#     task = Task.objects.get(id=pk)
#     print(pk)
#     context = {
#         'task': task,
#     }

#     return render(request, 'scholaractapp/class/task.html', context)

def deleteTask(request, pk):
    task = Task.objects.get(id=pk)
    if request.method == 'POST':
        task.delete()
        # Redirect to the desired page after deleting the task
        return redirect('task', pk=task.related_class.pk)
    context = {
        'task': task,
    }
    return render(request, 'scholaractapp/class/task.html', context)


def people(request, pk):
    classObj = Class.objects.get(id=pk)
    # 'student' has ManyToManyField realtionship with 'class' model. Django creates reverse relation from 'student' to 'class'. this reverse relation is named 'student_set'
    # The reverse relation allows you to access related objects from the other side of the relationship.
    enrolled_students = classObj.student_set.all()
    created_by = classObj.teacher  # teachers name

    # names of studnets who enrolled to the current class
    # for student in enrolled_students:
    #     name = student.user.name
    #     print(name)

    # print(created_by)  # teachers name

    context = {
        'class': classObj,
        'enrolled_students': enrolled_students,
        'created_by': created_by,
    }
    return render(request, 'scholaractapp/class/people.html', context)

def removeStudent(request, class_pk, student_pk):
    # classObj = Class.objects.get(pk=class_pk)
    student = Student.objects.get(pk=student_pk)

    if request.method == 'POST':
        student.classes.remove(class_pk)

    return redirect('people', pk=class_pk)

# def report(request, pk):
#     classObj = Class.objects.get(id=pk)
#     context = {
#         'class': classObj,
#     }
#     return render(request, 'scholaractapp/class/report.html', context)


def report(request, pk):
    # session data
    user_data = request.session.get('user')

    # since role is being assigned by admin, it is being accessed this way
    role = user_data.get('role')
    if role == "Teacher":
        return report_teacher(request, pk)
    elif role == "Student":
        return report_student(request, pk)
    else:
        return HttpResponse("Invalid role")
    
def report_teacher(request, pk):
    classObj = Class.objects.get(id=pk)
    related_class = classObj

    enrolled_students = classObj.student_set.all()

    if request.method == 'POST':
        print(request.POST)
        student_ids = request.POST.getlist('student_id')
        marks_values = request.POST.getlist('marks')
        # class_id = request.POST.get('teacher_id')
        # teacher_id=Class.objects.get(teacher=pk)
        print(student_ids)
        print(marks_values)
        
        subject = Class.objects.get(id=pk)
        for student_id, marks in zip(student_ids, marks_values):
            student = Student.objects.get(pk=student_id)
            # print(f"Student id is {student_id}")
            # print(f"Class id is {pk}")    
            marks = Marks.objects.create(student=student, subject=subject, marks=marks)
        return redirect('report', pk=classObj.id)
    
    context = {
        'class': classObj,
        'enrolled_students': enrolled_students,
        # 'created_by': created_by,
    }
    return render(request, 'scholaractapp/class/report.html', context)

def report_student(request, pk):
    classObj = Class.objects.get(id=pk)
    user_data = request.session.get('user')
    user_id = user_data['id']
    print(user_id)

    subjects = Marks.objects.filter(student=user_id) # filtering instances of Marks model which has student field or attribute same as or corresponding to the user id
    # print(subjects)
    context={
        'class': classObj,
        'subjects': subjects,
    }
    
    return render(request, 'scholaractapp/class/report.html', context)

def popUp(request):
    return render(request, 'scholaractapp/popUp.html')

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
