from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    company_code = serializers.CharField(
        allow_blank=True,
        allow_null=True,
        required=False,
        validators=[UniqueValidator(queryset=Company.objects.all())]
    )

    class Meta:
        model = Company
        fields = [
            'id',
            'company_name',
            'email_id',
            'company_code',
            'website',
            'created_time'
        ]
        read_only_fields = ['id', 'created_time']

    def validate_company_name(self, value):
        if value.strip() == "":
            raise serializers.ValidationError("Company name cannot be empty or whitespace.")
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Company name must be at least 5 characters long.")
        return value.strip()
