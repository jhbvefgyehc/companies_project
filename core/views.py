from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Company
from .serializers import CompanySerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('-created_time')
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]
