from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    Crea el token al crear un usuario
    :param instance:
    :param created:
    :param kwargs:
    :return:
    """
    print('create_auth_token')
    if created:
        #Token.objects.create(user=instance)
        pass
