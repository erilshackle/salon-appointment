# Agendamento Salão

##### quick-start _once installed_
``` bash
# na raiz do repositorio
venv\Scripts\activate               # ativar o ambiente virtual
python backend/manage.py runserver  # iniciar o backend
cd frontend npm run dev             # iniciar o frontend
```

### Clonando e rodando o repositorio __once cloned__

- **Install Project**
| Depois de clonar, deve-se ver uma pasta frontend e backend (recomendo abrir um terminal na pasta frontend e outro na pasta backend)
``` bash
# para o backend (cd backend):
python -m venv venv
venv\Scripts\activate   # (No OS: source venv/bin/activate)
pip install -r requirements.txt
```
``` bash
#para o frontend (cd frontend):
npm install
```

- **Setup Project**
| tenha uma conexao com a base de dados mysql e crie uma BD chamada: salao_agenda (apenas crie, vazia mesmo)
``` bash
# no backend
python manage.py makemigrations
python manage.py migrate
python manage.py shell
>>> from agenda.seeds import *
>>> seed()
>>> exit()
```

- **Start/Run Project**
|Antes, inicie a conexao com a base de dados mysql (asegure de ter uma base de dados salao_agenda criada)
``` bash
# no backend
python manage.py runserver
```
``` bash
# no frontend
npm run dev
```