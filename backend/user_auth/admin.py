from django.contrib import admin
from .models import Auth, UserTokenAuth
from django.utils.html import format_html

# Customizing the admin interface for the Auth model
class AuthAdmin(admin.ModelAdmin):
    list_display = ('userid', 'username', 'email', 'phone_no', 'passwordhash')  # Displaying columns in the list view
    search_fields = ('username', 'email')  # Enable search functionality for username and email
    list_filter = ('usertokenauth__email_verified', 'usertokenauth__phone_verified')  # Filter based on related UserTokenAuth model
    ordering = ('-userid',)  # Default ordering by UserID in descending order
    readonly_fields = ('userid',)  # Make UserID read-only in the admin form

    # Custom method to display the password hash in a more readable format (optional)
    def passwordhash(self, obj):
        return format_html("<span>{}</span>", obj.passwordhash)
    passwordhash.short_description = 'Password Hash'

# Customizing the admin interface for the UserTokenAuth model
class UserTokenAuthAdmin(admin.ModelAdmin):
    list_display = ('id', 'token', 'user', 'request_count', 'last_request_date', 'created', 'otp', 'email_verified', 'phone_verified')  # Displaying columns in the list view
    search_fields = ('token', 'user__username', 'user__email')  # Enable search functionality for token, user username, and email
    list_filter = ('email_verified', 'phone_verified', 'created')  # Filter based on email and phone verification, and creation date
    readonly_fields = ('id', 'token', 'created')  # Make ID, token, and created fields read-only

# Registering the models with the custom admin classes
admin.site.register(Auth, AuthAdmin)
admin.site.register(UserTokenAuth, UserTokenAuthAdmin)
