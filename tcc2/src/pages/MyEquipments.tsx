import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import EquipmentTable from '../components/EquipmentTable';
import { useState } from "react";
import { useHistory } from "react-router-dom"; // Importando useHistory

const MyEquipments: React.FC = () => {
  const history = useHistory(); // Inicializando o hook useHistory
  const [equipments, setEquipments] = useState([
    { id: 1, timestamp: new Date().toLocaleString(), employee: 'João', equipment: 'Computador', model: 'Dell', serialNumber: '12345', assetNumber: '54321', accessories: 'Mouse', returned: false, signedContract: true, observations: 'N/A' },
    { id: 2, timestamp: new Date().toLocaleString(), employee: 'Maria', equipment: 'Projetor', model: 'BenQ', serialNumber: '67890', assetNumber: '09876', accessories: 'Cabo HDMI', returned: false, signedContract: false, observations: 'N/A' },
  ]);

  const handleBack = () => {
    history.goBack(); // Função para voltar à página anterior
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
          equipmentData={equipments} // Passando os equipamentos para a tabela
        />
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" color="primary" onClick={handleBack}>
                Voltar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyEquipments;
