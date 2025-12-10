from django.db import models
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError

class Company(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(5)]
    )
    email_id = models.EmailField()
    company_code = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=True
    )
    website = models.URLField(
        blank=True,
        null=True
    )
    created_time = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.company_name.strip() == "":
            raise ValidationError({"company_name": "Company name cannot be empty or blank"})

    def __str__(self):
        return f"{self.company_name} ({self.id})"
