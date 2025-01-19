from django.core.mail import send_mail

def enviar_email(destinatario, assunto, mensagem):
    """
    Envia um e-mail para o destinatário especificado.
    """
    send_mail(
        assunto,
        mensagem,
        'seu_email@gmail.com',  # Remetente
        [destinatario],        # Destinatário
        fail_silently=False,   # Define se erros devem ser ignorados
    )
