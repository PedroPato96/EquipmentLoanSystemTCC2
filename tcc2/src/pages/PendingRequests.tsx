// src/pages/PendingRequests.tsx
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
  
  const PendingRequests: React.FC = () => {
    // Simulação de dados de solicitações pendentes
    const pendingRequests = [
      { id: 1, user: "João", equipment: "Computador" },
      { id: 2, user: "Maria", equipment: "Projetor" },
    ];
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Solicitações Pendentes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {pendingRequests.map((request) => (
              <IonItem key={request.id}>
                <IonLabel>
                  <h2>{request.equipment}</h2>
                  <p>Solicitante: {request.user}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
  
          {/* Coloque o NavigationButton aqui */}
          <NavigationButton />
        </IonContent>
      </IonPage>
    );
  };
  
  export default PendingRequests;
  
  