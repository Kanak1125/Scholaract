from django.urls import path
from scholaractapp import views

urlpatterns = [
    path('signup/',views.signup, name = "signup"),
    path('login/',views.login, name = "login"),
]