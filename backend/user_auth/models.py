from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

# MySQL Table with User Data for Authentication
class Auth(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True) 
    username = models.CharField(db_column='Username', unique=True, max_length=255)  
    email = models.CharField(db_column='Email', unique=True, max_length=255)  
    passwordhash = models.CharField(db_column='PasswordHash', max_length=64) 
    phone_no = models.CharField(
        db_column='PhoneNo',
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ],
        null=False,  
        blank=False,  
        help_text="Enter a valid phone number with up to 15 digits."
    )

    class Meta:
        managed = False
        app_label = 'user_auth'
        db_table = 'auth'

    def __str__(self):
        return f"USERNAME {self.username} | USER ID {self.userid}"

# MYSQL Table for Storing User Tokens and Metadata
class UserTokenAuth(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)  
    token = models.CharField(db_column='token', max_length=40, unique=True) 
    # This field maps to users in the Auth table
    user = models.ForeignKey(Auth, on_delete=models.CASCADE, db_column='user_id')  
    request_count = models.IntegerField(db_column='request_count', default=0) 
    last_request_date = models.DateField(db_column='last_request_date', null=True, blank=True)  
    created = models.DateTimeField(db_column='created', auto_now_add=True)
    otp = models.IntegerField(
        validators=[
            MinValueValidator(1000000),
            MaxValueValidator(9999999)
        ],
        help_text="OTP must be a 7-digit number between 1000000 and 9999999.",
        db_column='OTP'
    ) 
    email_verified = models.BooleanField(db_column="EmailVerified", default=False)
    phone_verified = models.BooleanField(db_column="PhoneVerified", default=False)

    class Meta:
        managed = False
        app_label = 'user_auth'
        db_table = 'usertokenauth'

    def __str__(self):
        return f"Token {self.token} for USER {self.user}"

        