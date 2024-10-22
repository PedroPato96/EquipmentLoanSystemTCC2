import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import EquipmentTable from '../components/EquipmentTable';

const PendingRequests: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      timestamp: new Date().toLocaleString(),
      employee: 'Maria',
      equipment: 'Projetor',
      model: 'BenQ',
      serialNumber: '98765',
      assetNumber: '67890',
      accessories: 'Cabo HDMI',
      returned: false,
      signedContract: false,
      observations: 'Necessário para apresentação',
    },
  ]);

  const handleApprove = (id: number) => {
    // Aqui você pode implementar a lógica de aprovação
    console.log(`Pedido ${id} aprovado`);
    // Por exemplo, você poderia adicionar o pedido aprovado a um histórico ou removê-lo da lista
    setPendingRequests(prevData => prevData.filter(item => item.id !== id));
  };

  const handleReject = (id: number) => {
    // Aqui você pode implementar a lógica de rejeição
    console.log(`Pedido ${id} rejeitado`);
    setPendingRequests(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Solicitações Pendentes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <EquipmentTable
          equipmentData={pendingRequests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </IonContent>
    </IonPage>
  );
};

export default PendingRequests;
