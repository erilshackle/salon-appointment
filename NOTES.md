#### Commands

#### backend

- python -m venv venv
- venv\Scripts\activate
- pip install django mysqlclient
- python -m pip install --upgrade pip
- python manage.py migrate
- pip install djangorestframework
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

Essa estrutura facilita o desenvolvimento, porque você pode trabalhar no backend e no frontend de forma independente. Quando precisar integrar os dois, pode usar APIs REST ou GraphQL no backend para o frontend consumir. 🚀 

Se precisar de ajuda para configurar algo mais detalhado, é só pedir!