import random
import os
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To

def send_email_otp(email):
    # Generate a 7-digit OTP
    otp = random.randint(1000000, 9999999)

    # Define email content
    from_email = Email("no-reply@fileai.com")  
    to_email = To(email)  
    subject = "Your FileAI OTP Code"

    # HTML content for a good-looking email
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
            <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td align="center" style="padding: 20px 0; background-color: #4CAF50; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                        <h1 style="color: #ffffff; margin: 0;">FileAI</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; color: #333333;">
                        <h2 style="margin: 0 0 10px;">Your One-Time Password (OTP)</h2>
                        <p style="font-size: 16px; margin: 0 0 20px;">Use the following OTP to complete your verification:</p>
                        <p style="font-size: 28px; font-weight: bold; margin: 0; color: #4CAF50;">{otp}</p>
                        <p style="font-size: 14px; margin: 20px 0 0; color: #888888;">
                            This OTP is valid for the next 10 minutes. Please do not share it with anyone.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 20px; font-size: 14px; color: #888888;">
                        <p>Thank you for choosing FileAI. Do not reply to this email as it is computer generated.</p>
                        <p>&copy; {2024} FileAI, Inc. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

    # Create email object with HTML content
    mail = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=subject,
        html_content=html_content
    )

    # Send the email using SendGrid
    try:
        sg = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(mail)

        # Return Success or Failure
        if response.status_code == 202:
            return {"status": True, "otp": otp}
        else:
            return {"status": False, "otp": otp}
    except Exception as e:
        print(f"Error sending email: {e}")
        return {"status": False, "otp": otp}



def send_otp_phone(phone_no):
    # Generate a 7-digit OTP
    otp = random.randint(1000000, 9999999)

    # Account SID and Auth Token
    account_sid = os.environ["TWILIO_ACCOUNT_SID"]
    auth_token = os.environ["TWILIO_AUTH_TOKEN"]
    client = Client(account_sid, auth_token)

    # Message body with branding and OTP
    message_body = f"""
    Your FileAI OTP is {otp}.
    Please use this code to verify your account.
    Do not share this OTP with anyone. It is valid for 10 minutes.

    Thank you,
    FileAI Team
    """

    try:
        # Send the message
        message = client.messages.create(
            body=message_body,
            from_="+91012345678",  # Replace with your Twilio phone number
            to=phone_no,
        )

        # Return success status and OTP
        return {"status": True, "otp": otp, "message_sid": message.sid}
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return {"status": False, "otp": otp}