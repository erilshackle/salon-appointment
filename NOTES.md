#### Commands

#### backend

- python -m venv venv
- venv\Scripts\activate
- django-admin startproject salon
- pip install django
- pip install mysqlclient djangorestframework django-cors-headers
- python -m pip install --upgrade pip
- python manage.py migrate
- add to *settings.py*
``` bash
    INSTALLED_APPS = [
    ...,
    'rest_framework',
]
```
- (in app) python manage.py startapp agenda 



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

