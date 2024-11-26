from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Função para conectar ao PostgreSQL
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT")
        )
        return conn
    except psycopg2.Error as e:
        print("Erro ao conectar ao banco de dados:", str(e))
        raise

# Endpoint para listar todos os empréstimos (pendentes e aprovados)
@app.route('/api/emprestimos', methods=['GET'])
def get_emprestimos():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    SELECT * FROM emprestimos 
                    WHERE rejeitado = FALSE;
                ''')
                emprestimos = cursor.fetchall()

                # Transformar em JSON
                emprestimos_list = [
                    {
                        "id": e[0],
                        "data_in": e[1],
                        "funcionario": e[2],
                        "equipamento": e[3],
                        "modelo_equipamento": e[4],
                        "numero_serie": e[5],
                        "numero_patrimonio": e[6],
                        "acessorios": e[7],
                        "devolvido": e[8],
                        "contrato_assinado": e[9],
                        "aprovado": e[10],
                        "rejeitado": e[11],
                        "observacoes": e[12],
                    }
                    for e in emprestimos
                ]
                return jsonify(emprestimos_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para adicionar um novo empréstimo
@app.route('/api/emprestimos', methods=['POST'])
def create_emprestimo():
    data = request.json
    print("Dados recebidos:", data)  # Log para depuração

    # Validações de entrada
    if not data.get('data_in') or not data.get('funcionario') or not data.get('equipamento'):
        return jsonify({"error": "Os campos 'data_in', 'funcionario' e 'equipamento' são obrigatórios."}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    '''
                    INSERT INTO emprestimos (data_in, funcionario, equipamento, modelo_equipamento, numero_serie, numero_patrimonio, acessorios, devolvido, contrato_assinado, aprovado, rejeitado, observacoes)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;
                    ''',
                    (
                        data['data_in'], data['funcionario'], data['equipamento'],
                        data['modelo_equipamento'], data['numero_serie'], data['numero_patrimonio'],
                        data['acessorios'], False, False, False, False, data['observacoes']
                    )
                )
                novo_emprestimo = cursor.fetchone()
                conn.commit()

                return jsonify({
                    "id": novo_emprestimo[0],
                    "data_in": novo_emprestimo[1],
                    "funcionario": novo_emprestimo[2],
                    "equipamento": novo_emprestimo[3],
                    "modelo_equipamento": novo_emprestimo[4],
                    "numero_serie": novo_emprestimo[5],
                    "numero_patrimonio": novo_emprestimo[6],
                    "acessorios": novo_emprestimo[7],
                    "devolvido": novo_emprestimo[8],
                    "contrato_assinado": novo_emprestimo[9],
                    "aprovado": novo_emprestimo[10],
                    "rejeitado": novo_emprestimo[11],
                    "observacoes": novo_emprestimo[12],
                }), 201
    except Exception as e:
        print("Erro ao inserir empréstimo:", str(e))
        return jsonify({"error": str(e)}), 500

# Endpoint para aprovar um empréstimo
@app.route('/api/emprestimos/<int:id>/aprovar', methods=['POST'])
def aprovar_emprestimo(id):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                # Atualiza o empréstimo, além de "aprovado", marca "devolvido" como True
                cursor.execute(
                    '''
                    UPDATE emprestimos
                    SET aprovado = TRUE, devolvido = TRUE
                    WHERE id = %s
                    RETURNING id, aprovado, devolvido;
                    ''',
                    (id,)
                )
                emprestimo_aprovado = cursor.fetchone()
                conn.commit()

                if emprestimo_aprovado:
                    print(f"Empréstimo {id} aprovado e devolvido com sucesso: {emprestimo_aprovado}")  # Log de aprovação
                    return jsonify({
                        "id": emprestimo_aprovado[0],
                        "aprovado": emprestimo_aprovado[1],
                        "devolvido": emprestimo_aprovado[2],
                        "message": "Empréstimo aprovado com sucesso."
                    }), 200
                else:
                    return jsonify({"error": "Empréstimo não encontrado."}), 404
    except Exception as e:
        print("Erro ao aprovar empréstimo:", str(e))
        return jsonify({"error": str(e)}), 500

# Endpoint para rejeitar um empréstimo
@app.route('/api/emprestimos/<int:id>/rejeitar', methods=['POST'])
def rejeitar_emprestimo(id):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    '''
                    UPDATE emprestimos
                    SET rejeitado = TRUE
                    WHERE id = %s
                    RETURNING id;
                    ''',
                    (id,)
                )
                emprestimo_rejeitado = cursor.fetchone()
                conn.commit()

                if emprestimo_rejeitado:
                    return jsonify({"id": emprestimo_rejeitado[0], "message": "Empréstimo rejeitado com sucesso."}), 200
                else:
                    return jsonify({"error": "Empréstimo não encontrado."}), 404
    except Exception as e:
        print("Erro ao rejeitar empréstimo:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
