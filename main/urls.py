from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', RegistrationView.as_view(), name='register'),
    path('validate-username/', csrf_exempt(UsernameValidationView.as_view()) , name='validate-username'),
    path('validate-email/', csrf_exempt(EmailValidationView.as_view()) , name='validate-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('category/', index_page, name='index_page'),
    path('category/<int:pk>/', take_quiz, name='take_quiz'),

]

