from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Conectar ao PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )
    return conn

# Endpoint para listar todos os empréstimos
@app.route('/api/emprestimos', methods=['GET'])
def get_emprestimos():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM emprestimos;')
    emprestimos = cursor.fetchall()
    cursor.close()
    conn.close()

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
            "observacoes": e[10],
        }
        for e in emprestimos
    ]
    return jsonify(emprestimos_list)

# Endpoint para adicionar um novo empréstimo
@app.route('/api/emprestimos', methods=['POST'])
def create_emprestimo():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''
        INSERT INTO emprestimos (data_in, funcionario, equipamento, modelo_equipamento, numero_serie, numero_patrimonio, acessorios, devolvido, contrato_assinado, observacoes)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;
        ''',
        (data['data_in'], data['funcionario'], data['equipamento'], data['modelo_equipamento'], data['numero_serie'], data['numero_patrimonio'], data['acessorios'], data['devolvido'], data['contrato_assinado'], data['observacoes'])
    )
    novo_emprestimo = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()

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
        "observacoes": novo_emprestimo[10],
    })

# Endpoint para aprovar um empréstimo
@app.route('/api/emprestimos/<int:id>/aprovar', methods=['POST'])
def aprovar_emprestimo(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Atualiza o status do empréstimo para aprovado (devolvido = TRUE)
        cursor.execute(
            '''
            UPDATE emprestimos
            SET devolvido = TRUE
            WHERE id = %s
            RETURNING *;
            ''',
            (id,)
        )
        emprestimo_aprovado = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        if emprestimo_aprovado:
            return jsonify({
                "id": emprestimo_aprovado[0],
                "message": "Empréstimo aprovado com sucesso."
            }), 200
        else:
            return jsonify({"error": "Empréstimo não encontrado."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para rejeitar um empréstimo
@app.route('/api/emprestimos/<int:id>/rejeitar', methods=['POST'])
def rejeitar_emprestimo(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Remove o empréstimo da base de dados
        cursor.execute(
            '''
            DELETE FROM emprestimos
            WHERE id = %s
            RETURNING id;
            ''',
            (id,)
        )
        emprestimo_rejeitado = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        if emprestimo_rejeitado:
            return jsonify({
                "id": emprestimo_rejeitado[0],
                "message": "Empréstimo rejeitado com sucesso."
            }), 200
        else:
            return jsonify({"error": "Empréstimo não encontrado."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
