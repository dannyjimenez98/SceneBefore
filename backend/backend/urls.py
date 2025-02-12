from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# from users.views import RegisterView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('user/', include('users.urls')),
    # path('register/', RegisterView.as_view(), name='register')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)