from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from EcoFinAI.views import Registration,Login

from django.urls import path
urlpatterns = [
    path('Register/',Registration.as_view()),
    path('login/',Login.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login (get token)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
]
