from rest_framework import serializers
from .models import TaskSubmission, User, Task, CourseMaterial, MaterialFile



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskSubmissionSerializer(serializers.ModelSerializer):

    student = serializers.StringRelatedField()  # Display student's name
    task = serializers.StringRelatedField()     # Display task's title
    class Meta:
        model=TaskSubmission
        fields=['id', 'student', 'task', 'date_of_submission', 'file', 'approved']

class MaterialFileSerializer(serializers.ModelSerializer):
    class Meta:
        model=MaterialFile
        fields=['id', 'file', 'course_material']

class CourseMaterialSerializer(serializers.ModelSerializer):
    files = MaterialFileSerializer(many=True, read_only=True)

    class Meta:
        model=CourseMaterial
        fields=['id', 'title', 'description', 'related_class', 'uploaded_by', 'files']
