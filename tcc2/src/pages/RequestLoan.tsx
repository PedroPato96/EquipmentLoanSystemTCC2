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
  IonToast,
} from '@ionic/react';

import NavigationButton from '../components/NavigationButton';
import './RequestLoan.css'; // Certifique-se de que o CSS foi importado

const RequestLoan: React.FC = () => {
  const [equipmentType, setEquipmentType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [dates, setDates] = useState<string[]>([]);
  const [usagePeriod, setUsagePeriod] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDateChange = (e: CustomEvent) => {
    const selectedDates = e.detail.value as string;
    const datesArray = selectedDates.split(',');
    setDates(datesArray);
  };

  const handleSubmit = async () => {
    const requestData = {
      equipamento: equipmentType,
      data_in: dates[0], // Considerando a primeira data como data de início
      funcionario: "Nome do Funcionário", // Substituir por dados reais
      modelo_equipamento: "Modelo Exemplo", // Adapte conforme necessário
      numero_serie: "12345", // Adapte conforme necessário
      numero_patrimonio: "67890", // Adapte conforme necessário
      acessorios: "Acessórios Exemplares", // Adapte conforme necessário
      devolvido: false,
      contrato_assinado: false,
      observacoes: "Sem observações",
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/emprestimos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setToastMessage('Empréstimo solicitado com sucesso!');
      } else {
        const error = await response.json();
        setToastMessage(`Erro: ${error.message}`);
      }
    } catch (error) {
      setToastMessage('Erro ao se conectar ao servidor.');
    }
  };

  return (
    <IonPage className="page-request-loan">
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
              multiple={false}
              onIonChange={handleDateChange}
              placeholder="Selecione as datas"
            />
          </IonItem>
        </IonList>

        <IonButton expand="full" onClick={handleSubmit}>
          Solicitar Empréstimo
        </IonButton>

        <NavigationButton />

        {toastMessage && (
          <IonToast
            isOpen={!!toastMessage}
            message={toastMessage}
            duration={3000}
            onDidDismiss={() => setToastMessage(null)}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default RequestLoan;
