import React from 'react';
import { IonButton } from '@ionic/react';

interface Equipment {
  timestamp: string;
  employee: string;
  equipment: string;
  model: string;
  serialNumber: string;
  assetNumber: string;
  accessories: string;
  returned: boolean;
  signedContract: boolean;
  observations: string;
}

interface EquipmentTableProps {
  equipmentData: Equipment[];
  onDelete: (id: number) => void;
  showDeleteButton: boolean; // Nova prop
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipmentData, onDelete, showDeleteButton }) => {
  return (
    <table className="equipments-table">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Funcionário</th>
          <th>Equipamento</th>
          <th>Modelo</th>
          <th>Número de Série</th>
          <th>Número Patrimônio</th>
          <th>Acessórios</th>
          <th>Devolvido?</th>
          <th>Contrato Assinado?</th>
          <th>Observações</th>
          {showDeleteButton && <th>Ações</th>} {/* Condicional para o botão */}
        </tr>
      </thead>
      <tbody>
        {equipmentData.map((equipment, index) => (
          <tr key={index}>
            <td>{equipment.timestamp}</td>
            <td>{equipment.employee}</td>
            <td>{equipment.equipment}</td>
            <td>{equipment.model}</td>
            <td>{equipment.serialNumber}</td>
            <td>{equipment.assetNumber}</td>
            <td>{equipment.accessories}</td>
            <td>{equipment.returned ? "Sim" : "Não"}</td>
            <td>{equipment.signedContract ? "Sim" : "Não"}</td>
            <td>{equipment.observations}</td>
            {showDeleteButton && ( // Renderiza o botão somente se a prop for verdadeira
              <td>
                <IonButton color="danger" onClick={() => onDelete(equipment.id)}>
                  Remover
                </IonButton>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
