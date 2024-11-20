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
    // Limpar os dados de autenticação (como no contexto ou estado global)
    // Após limpar, substitui a página atual pela de login e força o recarregamento
    history.replace('/login');  // Isso substitui a URL na navegação, não adicionando a entrada no histórico
    window.location.reload();  // Força a recarga completa da página, limpando o estado
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
                Resumo de equipamentos emprestados
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
