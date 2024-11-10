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
import './RequestStatus.css'; // Importar o CSS

const RequestStatus: React.FC = () => {
  // Simulação de dados de solicitações
  const requests = [
    { id: 1, equipment: "Computador", status: "Aprovado" },
    { id: 2, equipment: "Projetor", status: "Pendente" },
    { id: 3, equipment: "Mesa", status: "Rejeitado" },
  ];

  return (
    <IonPage className="page-request-status"> {/* Aplicando a classe CSS */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Status das Solicitações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {requests.map((request) => (
            <IonItem key={request.id}>
              <IonLabel>
                <h2>{request.equipment}</h2>
                <p>Status: {request.status}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Botão de navegação */}
        <NavigationButton />
      </IonContent>
    </IonPage>
  );
};

export default RequestStatus;
