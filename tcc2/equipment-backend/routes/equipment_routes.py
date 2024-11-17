from flask import Blueprint, jsonify, request
from models.equipment import Equipment
from config.config import db

equipment_bp = Blueprint('equipment_bp', __name__)

# Rota para obter o resumo dos equipamentos
@equipment_bp.route('/summary', methods=['GET'])
def get_equipment_summary():
    try:
        # Busca equipamentos que estão em uso
        equipments = Equipment.query.filter_by(in_use=True).all()

        # Agrupando e somando por tipo e modelo
        summary = {}
        for equipment in equipments:
            key = f"{equipment.type} - {equipment.model}"
            if key not in summary:
                summary[key] = {'type': equipment.type, 'model': equipment.model, 'count': 0}
            summary[key]['count'] += 1

        return jsonify(list(summary.values())), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para adicionar um novo equipamento
@equipment_bp.route('/add', methods=['POST'])
def add_equipment():
    try:
        data = request.json
        new_equipment = Equipment(
            type=data['type'],
            model=data['model'],
            in_use=data.get('in_use', False)
        )
        db.session.add(new_equipment)
        db.session.commit()
        return jsonify({
            'message': 'Equipamento adicionado com sucesso.',
            'equipment': {
                'id': new_equipment.id,
                'type': new_equipment.type,
                'model': new_equipment.model,
                'in_use': new_equipment.in_use
            }
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para atualizar um equipamento
@equipment_bp.route('/update/<int:equipment_id>', methods=['PUT'])
def update_equipment(equipment_id):
    try:
        data = request.json
        equipment = Equipment.query.get(equipment_id)

        if not equipment:
            return jsonify({'error': 'Equipamento não encontrado.'}), 404

        # Atualiza os campos fornecidos
        equipment.type = data.get('type', equipment.type)
        equipment.model = data.get('model', equipment.model)
        equipment.in_use = data.get('in_use', equipment.in_use)

        db.session.commit()
        return jsonify({
            'message': 'Equipamento atualizado com sucesso.',
            'equipment': {
                'id': equipment.id,
                'type': equipment.type,
                'model': equipment.model,
                'in_use': equipment.in_use
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para deletar um equipamento
@equipment_bp.route('/delete/<int:equipment_id>', methods=['DELETE'])
def delete_equipment(equipment_id):
    try:
        equipment = Equipment.query.get(equipment_id)

        if not equipment:
            return jsonify({'error': 'Equipamento não encontrado.'}), 404

        db.session.delete(equipment)
        db.session.commit()
        return jsonify({'message': 'Equipamento deletado com sucesso.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
