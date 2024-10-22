import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EquipmentTable from '../components/EquipmentTable';
import { useState } from "react";

const MyEquipments: React.FC = () => {
  const [equipments, setEquipments] = useState([
    { id: 1, timestamp: new Date().toLocaleString(), employee: 'João', equipment: 'Computador', model: 'Dell', serialNumber: '12345', assetNumber: '54321', accessories: 'Mouse', returned: false, signedContract: true, observations: 'N/A' },
    { id: 2, timestamp: new Date().toLocaleString(), employee: 'Maria', equipment: 'Projetor', model: 'BenQ', serialNumber: '67890', assetNumber: '09876', accessories: 'Cabo HDMI', returned: false, signedContract: false, observations: 'N/A' },
  ]);

  const handleDelete = (id: number) => {
    setEquipments((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Equipamentos em Meu Nome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <EquipmentTable
          equipmentData={equipments}
          onDelete={handleDelete} // Passando a função onDelete
        />
      </IonContent>
    </IonPage>
  );
};

export default MyEquipments;
