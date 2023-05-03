# we edited this file
from django.contrib import admin
from .models import User, Student, Teacher
# Register your models here.
# admin.site.register(Users) # registering athe model so that it cna be displayed in the admin panel 

# @admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role',) # fileds to be dsiplayed in admin panel
    radio_fields = {'role': admin.HORIZONTAL} # displaying radio fields horizontally (default: vertical)
    list_editable = ('role',) # creating editable list so that we dont need to select that object and change roles directly instead of going to another page
    ordering = ('first_name', ) # ordering name display order in ascending order by referencing firstName

    actions = ['assign_role']
    def assign_role(self, request, queryset, role):
        queryset.update(role=role)

    assign_role.short_description = "Assign selected people a role"
    user = User.objects.all()

    def save_model(self, request, obj, form, change):
        # saves user to either 'Student' or 'Teacher' model based on the user's role
        role = request.POST.get('role')
        if obj.role == 'S':
            student = Student.objects.create(user=obj)
            student.save()
        elif role == 'T':
            teacher = Teacher(user=obj)
            teacher.save()

class StudentAdmin(admin.ModelAdmin):
    list_display=('name', 'email')

class TeacherAdmin(admin.ModelAdmin):
    list_display=('name', 'email')
    

admin.site.register(User, UserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
