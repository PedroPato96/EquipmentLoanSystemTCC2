// src/pages/AdminHome.tsx

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
import { useHistory } from "react-router-dom";
import "./AdminHome.css"; 

const AdminHome: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  const handleLogoff = () => {
    console.log('Usuário deslogado'); 
    // Redirecionar para a página de login
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Página Inicial do Administrador</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonButton
                expand="block"
                color="secondary"
                onClick={() => navigateTo("/pending-requests")}
              >
                Solicitações Pendentes
              </IonButton>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonButton
                expand="block"
                color="success"
                onClick={() => navigateTo("/equipment-list")}
              >
                Lista de Equipamentos
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" color="danger" onClick={handleLogoff}>
                Logoff
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AdminHome;
