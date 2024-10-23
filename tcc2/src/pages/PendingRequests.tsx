// src/pages/PendingRequests.tsx

import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import EquipmentTable from '../components/EquipmentTable';
import { useHistory } from 'react-router-dom';

const PendingRequests: React.FC = () => {
  const history = useHistory(); // Hook para usar a navegação

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 2,
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

  const handleDelete = (id: number) => {
    setPendingRequests((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Solicitações Pendentes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <EquipmentTable equipmentData={pendingRequests} onDelete={handleDelete} />
        <IonButton expand="full" onClick={() => history.goBack()} color="primary" style={{ marginTop: '20px' }}>
          Voltar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PendingRequests;
