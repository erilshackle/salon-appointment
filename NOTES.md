#### Commands

#### backend

- python -m venv venv
- venv\Scripts\activate
- pip install django
- django-admin startproject salon
-  python manage.py startapp agenda
- pip install mysqlclient djangorestframework django-cors-headers
- python -m pip install --upgrade pip
- add to *settings.py*
``` py
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'crosheaders',
    'agenda'
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
   ...
]
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
CORS_ALLOW_ALL_ORIGINS = True
```
- criar os models **agenda/models.py** 
- python manage.py makemigrations
- python manage.py migrate
- pip install dj-rest-auth django-allauth
- python manage.py createsuperuser
  ``` bash
  Username > admin
  Email > admin@mail.com
  Password > admin
  ```
- python manage.py runserver
```
links:
http://127.0.0.1:8000/api/servicos/

```
- seed
``` bash
python manage.py shell
>>> from agenda.seeds import *
>>> seed()
>>> exit()
```

##### frontend
- npm install
- npx create-next-app@latest frontend
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init




## como foi feito

```
projeto-agendamento/
│
├── backend/                # Pasta para o backend Django
│   ├── beauty_salon/       # Código principal do projeto Django
│   ├── schedules/          # App para gerenciar agendamentos
│   ├── manage.py           # Script principal do Django
│   ├── requirements.txt    # Dependências do backend
│   └── venv/               # Ambiente virtual Python
│
├── frontend/               # Pasta para o frontend Next.js
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas do Next.js
│   ├── public/             # Arquivos públicos (imagens, etc.)
│   ├── styles/             # Arquivos de estilo, incluindo Tailwind
│   ├── package.json        # Dependências do frontend
│   └── tailwind.config.js  # Configuração do Tailwind CSS
│
└── README.md               # Documentação do projeto
```

### Como configurar essa estrutura:

1. **Crie a estrutura de diretórios:**
   ```bash
   mkdir projeto-agendamento
   cd projeto-agendamento
   mkdir backend frontend
   ```

2. **Configure o backend Django dentro da pasta `backend`:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   pip install django mysqlclient
   django-admin startproject beauty_salon .
   ```

3. **Configure o frontend Next.js dentro da pasta `frontend`:**
   ```bash
   cd ../frontend
   npx create-next-app@latest . --typescript
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

## codes

``` py
from django.db import models

class Appointment(models.Model):
    customer_name = models.CharField(max_length=100)  # Nome do cliente
    service = models.CharField(max_length=100)  # Serviço solicitado
    date = models.DateField()  # Data do agendamento
    time = models.TimeField()  # Hora do agendamento
    notes = models.TextField(blank=True, null=True)  # Observações adicionais

    def __str__(self):
        return f"{self.customer_name} - {self.service} ({self.date} {self.time})"

```

