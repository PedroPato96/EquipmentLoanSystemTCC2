import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';

interface Equipment {
  id: number;
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
  onDelete: (id: number) => void; // Adicionei a propriedade onDelete aqui
  onApprove?: (id: number) => void; // Adicionei a propriedade onApprove opcional
  onReject?: (id: number) => void; // Adicionei a propriedade onReject opcional
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipmentData, onDelete, onApprove, onReject }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="1"><strong>ID</strong></IonCol>
        <IonCol size="2"><strong>Timestamp</strong></IonCol>
        <IonCol size="2"><strong>Funcionário</strong></IonCol>
        <IonCol size="2"><strong>Equipamento</strong></IonCol>
        <IonCol size="2"><strong>Modelo</strong></IonCol>
        <IonCol size="2"><strong>Número de Série</strong></IonCol>
        <IonCol size="1"><strong>Ações</strong></IonCol>
      </IonRow>
      {equipmentData.map((item) => (
        <IonRow key={item.id}>
          <IonCol size="1">{item.id}</IonCol>
          <IonCol size="2">{item.timestamp}</IonCol>
          <IonCol size="2">{item.employee}</IonCol>
          <IonCol size="2">{item.equipment}</IonCol>
          <IonCol size="2">{item.model}</IonCol>
          <IonCol size="2">{item.serialNumber}</IonCol>
          <IonCol size="1">
            {onApprove && <IonButton onClick={() => onApprove(item.id)} color="success">Aprovar</IonButton>}
            {onReject && <IonButton onClick={() => onReject(item.id)} color="danger">Rejeitar</IonButton>}
            <IonButton onClick={() => onDelete(item.id)} color="medium">Remover</IonButton> {/* Botão de remover */}
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default EquipmentTable;
