from flask import Flask
from config.config import init_app
from routes.equipment_routes import equipment_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir requisições do frontend

# Inicializar banco de dados e configuração
init_app(app)

# Registrar blueprint das rotas
app.register_blueprint(equipment_bp, url_prefix='/api/equipments')

# Inicializar servidor
if __name__ == '__main__':
    app.run(debug=True)
