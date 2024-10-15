// src/pages/EquipmentList.tsx

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
  } from "@ionic/react";
  
import NavigationButton from '../components/NavigationButton';

  const EquipmentList: React.FC = () => {
    // Simulação de dados de equipamentos
    const equipments = [
      { id: 1, name: "Computador" },
      { id: 2, name: "Projetor" },
      { id: 3, name: "Mesa" },
      { id: 4, name: "Cadeira" },
    ];
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lista de Equipamentos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {equipments.map((equipment) => (
              <IonItem key={equipment.id}>
                <IonLabel>{equipment.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
          <NavigationButton />
        </IonContent>
      </IonPage>
    );
  };
  
  export default EquipmentList;
  