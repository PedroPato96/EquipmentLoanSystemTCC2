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

# Endpoint para listar todos os empréstimos pendentes
@app.route('/api/emprestimos', methods=['GET'])
def get_emprestimos():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM emprestimos WHERE aprovado = FALSE AND rejeitado = FALSE;')
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
            "aprovado": e[9],
            "rejeitado": e[10],
            "observacoes": e[11],
        }
        for e in emprestimos
    ]
    return jsonify(emprestimos_list)

# Endpoint para adicionar um novo empréstimo
@app.route('/api/emprestimos', methods=['POST'])
def create_emprestimo():
    data = request.json
    print("Dados recebidos:", data)  # Log para depuração

    # Verificar se 'data_in' existe
    if 'data_in' not in data:
        return jsonify({"error": "'data_in' é obrigatório."}), 400
    if 'observacoes' not in data:
        data['observacoes'] = 'Sem observações'  # Definir valor padrão se não houver observações

    # Definir valores para os campos opcionais (sem que o usuário precise preenchê-los)
    numero_serie = data.get('numero_serie', 'Não informado')  # Valor default
    numero_patrimonio = data.get('numero_patrimonio', 'Não informado')  # Valor default

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            '''
            INSERT INTO emprestimos (data_in, funcionario, equipamento, modelo_equipamento, numero_serie, numero_patrimonio, acessorios, devolvido, aprovado, rejeitado, observacoes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;
            ''',
            (data['data_in'], data['funcionario'], data['equipamento'], data['modelo_equipamento'], numero_serie, numero_patrimonio, data['acessorios'], False, False, data['observacoes'])
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
            "numero_serie": novo_emprestimo[5],  # Exibe o valor inserido, que pode ser 'Não informado'
            "numero_patrimonio": novo_emprestimo[6],  # Exibe o valor inserido, que pode ser 'Não informado'
            "acessorios": novo_emprestimo[7],
            "devolvido": novo_emprestimo[8],
            "aprovado": novo_emprestimo[9],
            "rejeitado": novo_emprestimo[10],
            "observacoes": novo_emprestimo[11],
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para aprovar um empréstimo
@app.route('/api/emprestimos/<int:id>/aprovar', methods=['POST'])
def aprovar_emprestimo(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Atualiza o status do empréstimo para aprovado
        cursor.execute(
            '''
            UPDATE emprestimos
            SET aprovado = TRUE
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

        # Atualiza o status do empréstimo para rejeitado
        cursor.execute(
            '''
            UPDATE emprestimos
            SET rejeitado = TRUE
            WHERE id = %s
            RETURNING *;
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
