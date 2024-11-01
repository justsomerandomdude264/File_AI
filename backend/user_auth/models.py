from django.db import models

# user Authentication data table model
class Auth(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True) 
    username = models.CharField(db_column='Username', unique=True, max_length=255)  
    email = models.CharField(db_column='Email', unique=True, max_length=255)  
    passwordhash = models.CharField(db_column='PasswordHash', max_length=64) 

    class Meta:
        managed = False
        app_label = 'user_auth'
        db_table = 'auth'

    def __str__(self):
        return self.username

# Token Authentication and Request Limit
class UserTokenAuth(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)  
    token = models.CharField(db_column='token', max_length=40, unique=True) 
    user = models.ForeignKey(Auth, on_delete=models.CASCADE, db_column='user_id')  
    request_count = models.IntegerField(db_column='request_count', default=0) 
    last_request_date = models.DateField(db_column='last_request_date', null=True, blank=True)  
    created = models.DateTimeField(db_column='created', auto_now_add=True)  

    class Meta:
        managed = False
        app_label = 'user_auth'
        db_table = 'usertokenauth'

    def __str__(self):
        return f"Token {self.token} for User ID {self.user_id}"

        