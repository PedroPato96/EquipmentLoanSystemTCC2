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
import "./AdminHome.css"; // Certifique-se de que o caminho está correto
import NavigationButton from '../components/NavigationButton';

const AdminHome: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
      history.push(path);
  };

  const handleLogoff = () => {
      // Aqui você deve limpar o estado do usuário (se aplicável)
      console.log('Usuário deslogado'); // Adicione a lógica para limpar o estado do usuário
      // Redirecionar para a página de login
      history.push('/login'); // Altere para a rota correta da sua página de login
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
                              color="primary"
                              onClick={() => navigateTo("/lend-to-user")}
                          >
                              Emprestar para Usuário
                          </IonButton>
                      </IonCol>
                      <IonCol size="12" size-md="6">
                          <IonButton
                              expand="block"
                              color="secondary"
                              onClick={() => navigateTo("/pending-requests")}
                          >
                              Solicitações Pendentes
                          </IonButton>
                      </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol size="12" size-md="6">
                          <IonButton
                              expand="block"
                              color="tertiary"
                              onClick={() => navigateTo("/manage-equipment")}
                          >
                              Adicionar/Remover Equipamentos
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
