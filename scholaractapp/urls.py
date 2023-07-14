# we edited this file
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.landingPage, name = "landingPage"),
    path('aboutUs/', views.aboutUs, name = "aboutUs"),
    path('faq/', views.faq, name="faq"),
    # path('support/', views.support, name="support"),
    path('signup/',views.signup, name="signup"),
    path('login/',views.login, name="login"),
    path('success/',views.success, name="success"), # temporary url (might be changed later)
    path('classes/',views.classes, name="classes"), 
    path('class/<str:pk>/',views.single_class, name="class"), 
    path('class/deleteMaterial/<str:pk>', views.deleteMaterial, name="deleteMaterial"),    
    path('class/<str:pk>/task/', views.task, name="task"),
    # path('class/task/submitTask/<str:pk>', views.submitTask, name="submitTask"),
    path('class/task/deleteTask/<str:pk>', views.deleteTask, name="deleteTask"),
    # path('class/task/taskInfo/<str:pk>', views.taskInfo, name="taskInfo"),
    path('class/<str:pk>/people/', views.people, name="people"),
    path('class/<str:class_pk>/people/removeStudent/<str:student_pk>', views.removeStudent, name="removeStudent"),
    path('class/<str:pk>/report/', views.report, name="report"),
    path('logout/',views.logout, name="logout"), 
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)