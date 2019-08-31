from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django_resized import ResizedImageField
from . import signals

class User(AbstractUser):
  name = models.CharField(max_length=100, blank=True, null=True)
  cellphone = models.CharField(max_length=25, blank=True, null=True)
  # add additional fields in here

  def __str__(self):
    return self.email

CATEGORIES = (
    ('Achado - Estou procurando meu dono', 'Achado - Estou procurando meu dono'),
    ('Achado - Achei meu dono', 'Achado - Achei meu dono'),
    ('Perdido - Estou procurando meu Pet', 'Perdido - Estou procurando meu Pet'),
    ('Perdido - Encontrei meu Pet', 'Perdido - Encontrei meu Pet'),
    ('Adoção - Estou procurando um Lar', 'Adoção - Estou procurando um Lar'),
    ('Adoção - Encontrei um Lar', 'Adoção - Encontrei um Lar')
    )

STATUS = (
    ('disponível', 'disponível'),
    ('indisponível', 'indisponível'),
)

SIZE = (
    ('pequeno', 'pequeno'),
    ('médio', 'médio'),
    ('grande', 'grande'),
)

GENDER = (
    ('fêmea', 'fêmea'),
    ('macho', 'macho'),
    ('não identificado', 'não identificado'),
)

TYPE_PET = (
    ('cachorro', 'cachorro'),
    ('gato', 'gato'),
    ('pássaro', 'pássaro'),
    ('roedor', 'roedor'),
    ('cavalo', 'cavalo'),
    ('outros', 'outros'),
)

class Pet(models.Model):
  class Meta:
    db_table = 'pet'

  name = models.CharField(max_length=200, blank=True, null=True)
  category = models.CharField("Pet Category", max_length=255, choices=CATEGORIES, blank=True, null=True)
  status =  models.CharField("Pet Status", max_length=200, choices=STATUS, blank=True, null=True)
  breed = models.CharField(max_length=200, blank=True, null=True) # raça
  size =  models.CharField("Pet Size", max_length=200, choices=SIZE, blank=True, null=True)
  gender =  models.CharField("Pet Gender", max_length=200, choices=GENDER, blank=True, null=True)
  pet_type =  models.CharField("Pet type", max_length=200, choices=TYPE_PET, blank=True, null=True)
  photo = ResizedImageField(size=[800, 600], upload_to="imgs/pets/", null=True)
  location = models.CharField(max_length=200, blank=True, null=True)
  description = models.CharField(max_length=500, blank=True, null=True)
  contact = models.ForeignKey(User, related_name='user_contact', on_delete=models.CASCADE, blank=True, null=True)
  date = models.DateTimeField(default=datetime.now, blank=True)

  def __str__(self):
    return f"Nome: {self.name} - Raça: {self.breed} - {self.description}" 
