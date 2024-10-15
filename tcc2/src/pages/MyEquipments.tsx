// src/pages/MyEquipments.tsx

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  } from "@ionic/react";
  
  import NavigationButton from '../components/NavigationButton'; // Importar o NavigationButton
  
  const MyEquipments: React.FC = () => {
    // Simulação de dados de equipamentos
    const equipments = [
      { id: 1, equipment: "Computador", borrowedDate: "2024-04-01" },
      { id: 2, equipment: "Projetor", borrowedDate: "2024-04-05" },
    ];
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Equipamentos em Meu Nome</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {equipments.map((equipment) => (
              <IonItem key={equipment.id}>
                <IonLabel>
                  <h2>{equipment.equipment}</h2>
                  <p>Data de Empréstimo: {equipment.borrowedDate}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
  
          {/* Adicione o botão de navegação aqui */}
          <NavigationButton />
        </IonContent>
      </IonPage>
    );
  };
  
  export default MyEquipments;
  