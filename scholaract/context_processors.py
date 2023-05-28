# Context processors in Django are functions that provide additional context variables to be available in all templates across your Django project.
# By using context processors, you can simplify template code and avoid repetitive passing of common data to templates. 
def user_data(request):
    user_data = request.session.get('user')
    user_name = user_data['fname'] if user_data else None
    user_id = user_data['id'] if user_data else None
    role = user_data.get('role') if user_data else None

    return {
        'user_name': user_name,
        'user_id': user_id,
        'role': role,
    }
