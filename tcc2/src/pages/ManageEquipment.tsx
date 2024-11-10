// src/pages/ManageEquipment.tsx

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonList,
  } from "@ionic/react";
  import { useState } from "react";

import NavigationButton from '../components/NavigationButton';  

  const ManageEquipment: React.FC = () => {
    const [equipment, setEquipment] = useState<string>("");
    const [equipments, setEquipments] = useState<string[]>([]);
  
    const addEquipment = () => {
      if (equipment.trim() !== "") {
        setEquipments([...equipments, equipment.trim()]);
        setEquipment("");
      }
    };
  
    const removeEquipment = (index: number) => {
      const newEquipments = [...equipments];
      newEquipments.splice(index, 1);
      setEquipments(newEquipments);
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Adicionar/Remover Equipamentos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Nome do Equipamento</IonLabel>
            <IonInput
              value={equipment}
              onIonChange={(e) => setEquipment(e.detail.value!)}
              placeholder="Digite o nome do equipamento"
            />
          </IonItem>
          <IonButton expand="full" onClick={addEquipment}>
            Adicionar Equipamento
          </IonButton>
          <IonList>
            {equipments.map((eq, index) => (
              <IonItem key={index}>
                <IonLabel>{eq}</IonLabel>
                <IonButton color="danger" onClick={() => removeEquipment(index)}>
                  Remover
                </IonButton>
              </IonItem>
            ))}
          </IonList>
          <NavigationButton />
        </IonContent>
      </IonPage>
    );
  };
  
  export default ManageEquipment;
  