# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

Funcionario = get_user_model()  # Isso vai garantir que usamos o modelo Funcionario

class FuncionarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Funcionario
        fields = ['id', 'username', 'email', 'password', 'cargo', 'telefone']

    def create(self, validated_data):
        funcionario = Funcionario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            cargo=validated_data.get('cargo', ''),
            telefone=validated_data.get('telefone', '')
        )
        return funcionario
