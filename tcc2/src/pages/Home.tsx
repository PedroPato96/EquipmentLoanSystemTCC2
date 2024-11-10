// src/pages/Home.tsx

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
import "./Home.css"; // Certifique-se de que o caminho está correto
import NavigationButton from '../components/NavigationButton';

const Home: React.FC = () => {
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
          {/* Botão Logoff abaixo de todos os outros */}
          <IonRow>
            <IonCol size="12">
              <IonButton 
                expand="block" 
                color="danger" 
                onClick={handleLogoff}
                style={{ marginTop: '20px' }} // Adiciona uma margem superior
              >
                Logoff
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
