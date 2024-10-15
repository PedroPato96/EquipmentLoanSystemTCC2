import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonDatetime,
  IonInput,
  IonList,
} from '@ionic/react';

import NavigationButton from '../components/NavigationButton';

const RequestLoan: React.FC = () => {
  const [equipmentType, setEquipmentType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [dates, setDates] = useState<string[]>([]);
  const [usagePeriod, setUsagePeriod] = useState('');

  const handleDateChange = (e: CustomEvent) => {
    const selectedDates = e.detail.value as string; // Recebe as datas selecionadas
    const datesArray = selectedDates.split(','); // Separa as datas em um array
    setDates(datesArray); // Atualiza o estado com as datas selecionadas
  };

  const handleSubmit = () => {
    // Aqui você pode fazer o que for necessário com os dados, como enviar para um servidor
    console.log('Tipo de equipamento:', equipmentType);
    console.log('Quantidade:', quantity);
    console.log('Datas selecionadas:', dates);
    console.log('Período de uso:', usagePeriod);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Solicitar Empréstimo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Tipo de Equipamento</IonLabel>
            <IonInput
              value={equipmentType}
              onIonChange={(e) => setEquipmentType(e.detail.value!)}
              placeholder="Digite o tipo de equipamento"
            />
          </IonItem>

          <IonItem>
            <IonLabel>Quantidade</IonLabel>
            <IonInput
              type="number"
              value={quantity}
              onIonChange={(e) => setQuantity(parseInt(e.detail.value!, 10))}
              placeholder="Digite a quantidade"
            />
          </IonItem>

          <IonItem>
            <IonLabel>Datas de Uso</IonLabel>
            <IonDatetime
              multiple={true}
              onIonChange={handleDateChange}
              placeholder="Selecione as datas"
            />
          </IonItem>
        </IonList>

        <IonButton expand="full" onClick={handleSubmit}>
          Solicitar Empréstimo
        </IonButton>

        <NavigationButton />
      </IonContent>
    </IonPage>
  );
};

export default RequestLoan;

