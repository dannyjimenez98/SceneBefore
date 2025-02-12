from django.db import models
from django.contrib.auth.models import AbstractUser

# def default_profile_picture():
#     """Returns the default profile picture path"""
#     return 'default_profile_picture.jpeg'

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=10, blank=True)
#     profile_pic = models.ImageField(default='default_profile_picture.jpeg', upload_to='media/')

#     def __str__(self):
#         return self.user.username
    

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    
    def __str__(self):
        return self.email

