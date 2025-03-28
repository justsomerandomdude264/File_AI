import random
import os
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To

def generate_otp(test: bool) -> int:
    """Generate a 7-digit OTP, using a fixed value for testing."""
    return random.randint(1000000, 9999999) if not test else 6942000

def send_email_otp(email: str, test: bool = True) -> dict:
    """Send an OTP to the specified email using SendGrid."""
    otp = generate_otp(test)

    if test:
        return {"status": True, "otp": otp}

    try:
        # Define email content
        from_email = Email("example@fileai.com")
        to_email = To(email)
        subject = "Your FileAI OTP Code"
        
        # HTML email template with branding
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
                <table align="center" width="100%" cellpadding="0" cellspacing="0" 
                    style="max-width: 600px; background-color: #ffffff; border-radius: 10px; 
                           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="padding: 20px 0; background-color: #4CAF50; 
                                                border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            <h1 style="color: #ffffff; margin: 0;">FileAI</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; color: #333333;">
                            <h2>Your One-Time Password (OTP)</h2>
                            <p style="font-size: 16px;">Use the following OTP to complete your verification:</p>
                            <p style="font-size: 28px; font-weight: bold; color: #4CAF50;">{otp}</p>
                            <p style="font-size: 14px; color: #888888;">This OTP is valid for the next 10 minutes. 
                               Please do not share it with anyone.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
        """
        
        mail = Mail(from_email=from_email, to_emails=to_email, subject=subject, html_content=html_content)
        
        # Send the email using SendGrid
        sg = SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
        response = sg.send(mail)
        
        return {"status": response.status_code == 202, "otp": otp}
    except Exception as e:
        print(f"Error sending email: {e}")
        return {"status": False, "otp": otp}

def send_otp_phone(phone_no: str, test: bool = True) -> dict:
    """Send an OTP to the specified phone number using Twilio."""
    otp = generate_otp(test)

    if test:
        return {"status": True, "otp": otp}

    try:
        # Twilio credentials from environment variables
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        client = Client(account_sid, auth_token)

        # SMS message template with branding
        message_body = f"""
        Your FileAI OTP is {otp}.
        Please use this code to verify your account.
        Do not share this OTP with anyone. It is valid for 10 minutes.
        
        Thank you,
        FileAI Team
        """
        
        message = client.messages.create(body=message_body, from_="+12345678901", to=phone_no)
        
        return {"status": True, "otp": otp, "message_sid": message.sid}
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return {"status": False, "otp": otp}