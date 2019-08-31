from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'name': reset_password_token.user.name,
        'email': reset_password_token.user.email,
        'reset_password_url': f'http://getpet.surge.sh/redefinir-senha/{reset_password_token.key}'
        # 'reset_password_url': "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    # msg = EmailMultiAlternatives(
    #     # title:
    #     "Password Reset for {title}".format(title="Some website title"),
    #     # message:
    #     email_plaintext_message,
    #     # from:
    #     "noreply@somehost.local",
    #     # to:
    #     [reset_password_token.user.email]
    # )
    # msg.attach_alternative(email_html_message, "text/html")
    # msg.send()

    message = Mail(
        from_email='bfatskih@gmail.com',
        to_emails=reset_password_token.user.email,
        subject="Requisição para resetar a senha de {title}".format(title="Codenation Escale Pet"),
        html_content=email_html_message)
    try:
        sg = SendGridAPIClient('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')
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)