// src/pages/Home.tsx

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import NavigationButton from '../components/NavigationButton';
const Home: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Página Inicial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonButton
                expand="block"
                color="primary"
                onClick={() => navigateTo("/request-loan")}
              >
                Solicitar Equipamento
              </IonButton>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonButton
                expand="block"
                color="secondary"
                onClick={() => navigateTo("/request-status")}
              >
                Status das Solicitações
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton
                expand="block"
                color="tertiary"
                onClick={() => navigateTo("/my-equipments")}
              >
                Equipamentos em Meu Nome
              </IonButton>
            </IonCol>
          </IonRow>
          <IonButton>
              <NavigationButton isHome />
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
