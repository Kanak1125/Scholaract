# we edited this file
from django.contrib import admin
from .models import User, Student, Teacher, Class
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe

# Register your models here.
# admin.site.register(Users) # registering athe model so that it cna be displayed in the admin panel 

# @admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role',) # fileds to be dsiplayed in admin panel
    radio_fields = {'role': admin.HORIZONTAL} # displaying radio fields horizontally (default: vertical)
    list_editable = ('role',) # creating editable list so that we dont need to select that object and change roles directly instead of going to another page
    ordering = ('first_name', ) # ordering name display order in ascending order by referencing first_name

    actions = ['assign_role']
    
    
    # def assign_role_button(self, obj):
    #     url = reverse('admin:assign_role', args =[obj.pk])
    #     return format_html('<a class = button" href ="{}">Assign</a>',)
    #     # return mark_safe(f'<a href="{url}" class="button">Assign</a>')

    


    def save_model(self, request, obj, form, change):
        # saves user to either 'Student' or 'Teacher' model based on the user's role
        role = request.POST.get('role')
        if obj.role == 'S':
            student = Student.objects.create(user=obj)
            student.save()
        elif role == 'T':
            teacher = Teacher(user=obj)
            teacher.save()

    def assign_role(self, request, queryset, role):
        queryset.update(role=role)

    assign_role.short_description = "Assign selected people a role"
    user = User.objects.all()


class StudentAdmin(admin.ModelAdmin):
    list_display=('name', 'email')

class TeacherAdmin(admin.ModelAdmin):
    list_display=('name', 'email')
    

admin.site.register(User, UserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Class)
