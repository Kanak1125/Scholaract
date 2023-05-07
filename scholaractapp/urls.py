# we edited this file
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landingPage, name = "landingPage"),
    path('aboutUs/', views.aboutUs, name = "aboutUs"),
    path('signup/',views.signup, name = "signup"),
    path('login/',views.login, name = "login"),
    path('success/',views.success, name = "success"), # temporary url (might be changed later)
    path('classes/',views.classes, name = "classes"), 
    path('class/',views.single_class, name = "class"), 
    path('logout/',views.logout, name = "logout"), 
]