from flask import Blueprint, jsonify
from models.equipment import Equipment
from config.config import db

equipment_bp = Blueprint('equipment_bp', __name__)

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
