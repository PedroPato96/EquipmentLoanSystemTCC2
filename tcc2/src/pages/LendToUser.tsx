// src/pages/LendToUser.tsx

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
  } from "@ionic/react";
  import { useState } from "react";
  import NavigationButton from '../components/NavigationButton'; // Importe o NavigationButton
  
  const LendToUser: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [equipment, setEquipment] = useState<string>("");
  
    const handleLend = () => {
      // Implementar a lógica de empréstimo aqui
      console.log(`Emprestando ${equipment} para ${username}`);
      // Resetar campos ou adicionar notificações
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Emprestar para Usuário</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Nome de Usuário</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              placeholder="Digite o nome do usuário"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Tipo de Equipamento</IonLabel>
            <IonInput
              value={equipment}
              onIonChange={(e) => setEquipment(e.detail.value!)}
              placeholder="Digite o tipo de equipamento"
            />
          </IonItem>
          <IonButton expand="full" onClick={handleLend}>
            Emprestar
          </IonButton>
          <NavigationButton />
        </IonContent>
      </IonPage>
    );
  };
  
  export default LendToUser;
  
  