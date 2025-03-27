from EcoFinAI.views import Registration,Login,Evalute
from django.urls import path
urlpatterns = [
    path('register/',Registration.as_view()),
    path('login/',Login.as_view()),
    path('evalute/',)
]
