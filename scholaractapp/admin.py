# we edited this file
from django.contrib import admin
from .models import User, Student, Teacher, Class, CourseMaterial, MaterialFile, Task, TaskFile, TaskSubmission, Marks
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.core.mail import send_mail
# Register your models here.
# admin.site.register(Users) # registering athe model so that it cna be displayed in the admin panel

# @admin.register(User)


class UserAdmin(admin.ModelAdmin):
    # fileds to be dsiplayed in admin panel
    list_display = ('name', 'email', 'role',)
    # displaying radio fields horizontally (default: vertical)
    radio_fields = {'role': admin.HORIZONTAL}
    # creating editable list so that we dont need to select that object and change roles directly instead of going to another page
    list_editable = ('role',)
    # ordering name display order in ascending order by referencing first_name
    ordering = ('first_name', )

    actions = ['assign_role',]

    # def assign_role_button(self, obj):
    #     url = reverse('admin:assign_role', args =[obj.id])
    #     return format_html('<a class = button" href ="{}">Assign</a>',)
    #     # return mark_safe(f'<a href="{url}" class="button">Assign</a>')

    # user = User.objects.all()

    def set_role_student(self, request, queryset):
        queryset.update(role='Student')
    set_role_student.short_description = 'Set role as student'

    def save_model(self, request, obj, form, change):
        # saves user to either 'Student' or 'Teacher' model based on the user's role
        # role = request.POST.get('role')
        role = obj.role
        obj.save()
        # updating the value of role in session after the admin assigns user a role
        if 'user' in request.session:
            user_data = request.session['user']
            user_data['role'] = obj.role
            request.session['user'] = user_data

        # for sending mail after the role is assigned
        subject = 'Welcome to Scholaract'
        message = f'Hi {obj.first_name}, your role has been updated to {role}. '
        from_email = 'mailsender227@gmail.com'
        recipient_list = [obj.email]

        print('Sending email...')
        print('Subject:', subject)
        print('Message:', message)
        print('From:', from_email)
        print('Recipient list:', recipient_list)
        
        send_mail(subject, message, from_email, recipient_list)
        if obj.role == 'Student':
            student = Student(user=obj)
            student.save()
            

        elif obj.role == 'Teacher':
            teacher = Teacher(user=obj)
            teacher.save()

    def assign_role(self, request, queryset):
        print(request.POST)
        role = request.POST.get('role')
        print("Assigning role",role)

        if role is not None:
            queryset.update(role=role)
            
        else:
            self.message_user(
                request, "Please select a valid value for the 'role' field.")
        

    assign_role.short_description = "Assign selected people a role"



    # def assign_role(self, request, queryset, role):
    #     if role == 'student':
    #         # queryset.update(role=role)
    #         for user in queryset:
    #             student = Student.objects.create(
    #                 user=user,
    #             )
    #             user.role = role
    #             # user.student = student
    #             user.save()

    #             student.save()
    #     elif role == 'teacher':
    #         # queryset.update(role=role)
    #         for user in queryset:
    #             teacher = Teacher.objects.create(
    #                 user=user,
    #             )
    #             user.role = role
    #             # user.teacher = teacher
    #             user.save()

    #             teacher.save()
    #     else:
    #         self.message_user(
    #             request, "Please select a valid role value.")
        
    # assign_role.short_description = 'Assign selected users a role'

class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'enrolled_classes')

    def enrolled_classes(self, obj):
        return ", ".join([str(class_obj) for class_obj in obj.classes.all()])
    # obj.classes.all() retrieves all the classes that the current object or instance(student) hase
    # it iterates over each enrolled classes and converts it into string
    #  str(), will use the default string representation defined in the Class model's __str__() method i.e. retturn class_name.
    # join() method is used to concatenate the string representations of the enrolled classes and uses ',' as a separator

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

class ClassAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'class_code', 'teacher')


class MaterialFileInline(admin.StackedInline):
    model = MaterialFile

class CourseMaterialAdmin(admin.ModelAdmin):
    inlines = [MaterialFileInline]
    list_display=('title', 'related_class', 'uploaded_by' )

class TaskFileInline(admin.StackedInline):
    model = TaskFile
    extra = 0

class TaskAdmin(admin.ModelAdmin):
    list_display=('title', 'description', 'related_class', 'due_date', 'display_task_files')

    inlines = [TaskFileInline]
    def display_task_files(self, obj):
        task_files = TaskFile.objects.filter(task=obj)
        return ", ".join([file.file.name for file in task_files])

    display_task_files.short_description = 'Task Files'

class TaskSubmissionAdmin(admin.ModelAdmin):
    list_display=('student', 'task', 'date_of_submission', 'file', 'approved')

# @admin.register(TaskFile)
# class TaskFileAdmin(admin.ModelAdmin):
#     list_display = ('file', 'task')
#     list_filter = ('task',)
#     search_fields = ('task__title',)

class MarksAdmin(admin.ModelAdmin):
    list_display=('student', 'subject', 'marks')
    class Meta:
        verbose_name = 'Marks'
        verbose_name_plural = 'Marks'


admin.site.register(User, UserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Class, ClassAdmin)
admin.site.register(CourseMaterial, CourseMaterialAdmin)
admin.site.register(Task,TaskAdmin)
admin.site.register(TaskSubmission, TaskSubmissionAdmin)
admin.site.register(Marks, MarksAdmin)

