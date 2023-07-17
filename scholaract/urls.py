# we edited this file
"""scholaract URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    # path('admin/login/', admin_views.LoginView.as_view(template_name='scholaractapp/login.html'), name='login'), #new
    path('admin/', admin.site.urls),
    path('',include('scholaractapp.urls')),

    # 'auth_views.PasswordResetView' is a view class provided by Django's authentication view that handles password reset functionality
    # '.as_view()' is a method used to create an instance of the view class as a callable object.
    path('reset_password/', auth_views.PasswordResetView.as_view(template_name="scholaractapp/reset_password.html"), name="reset_password"),
]
