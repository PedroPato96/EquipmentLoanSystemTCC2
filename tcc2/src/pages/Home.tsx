import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { addCircleOutline, listOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Empréstimo de Equipamentos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h2>Bem-vindo ao Sistema de Empréstimo de Equipamentos!</h2>
            <p>Aqui você pode solicitar e gerenciar o empréstimo de equipamentos da escola.</p>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" color="primary" routerLink="/solicitar-emprestimo">
          <IonIcon slot="start" icon={addCircleOutline} />
          Solicitar Empréstimo
        </IonButton>

        <IonButton expand="block" color="secondary" routerLink="/equipamentos">
          <IonIcon slot="start" icon={listOutline} />
          Ver Equipamentos Disponíveis
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
