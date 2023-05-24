# from .models import User
# from django.dispatch import sender
# from django.core.mail import send_mail
# from django.db.models.signals import post_save
# # post_save = this method is gonna trigger anytime after a model is saved

# # for sending email
# @receiver(post_save, sender=User)
# def send_role_update_email(sender, instance, **kwargs):
#     if kwargs.get('update_fields') == {'role'}:
#         subject = 'Your role has been updated'
#         message = f'Hi {instance.first_name}, your role has been updated to {instance.role}'
#         from_email = 'mailsender227@gmail.com'
#         recipient_list = [instance.email]

        
#         print('Sending email...')
#         print('Subject:', subject)
#         print('Message:', message)
#         print('From:', from_email)
#         print('Recipient list:', recipient_list)
#         send_mail(subject, message, from_email, recipient_list)
