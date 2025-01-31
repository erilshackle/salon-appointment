#### Commands

#### backend

- python -m venv venv
- venv\Scripts\activate
- pip install django mysqlclient djangorestframework django-cors-headers
- django-admin startproject salon
-  python manage.py startapp agenda
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
http://127.0.0.1:8000/

```
- seed
``` bash
python manage.py shell
>>> from agenda.seeds import *
>>> seed()
>>> exit()
```

##### frontend
- npx create-next-app@latest frontend
``` bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
- 
- 




## como foi feito

```
projeto-agendamento/
│
├── backend/                # Pasta para o backend Django
│   ├── salon/       # Código principal do projeto Django
│   ├── agenda/          # App para gerenciar agendamentos
│   ├── manage.py           # Script principal do Django
│   └── venv/               # Ambiente virtual Python
│
├── frontend/               # Pasta para o frontend Next.js
│   ├── src/                # source do Next.js
│   ├── public/             # Arquivos públicos (imagens, etc.)
│   ├── styles/             # Arquivos de estilo, incluindo Tailwind
│   ├── package.json        # Dependências do frontend
│   └── tailwind.config.js  # Configuração do Tailwind CSS
│
├── requirements.txt    # Dependências do backend
└── README.md               # Documentação do projeto
```

### Como configurar essa estrutura:
