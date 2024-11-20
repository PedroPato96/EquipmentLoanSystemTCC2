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
  IonTextarea,
  IonToast,
} from '@ionic/react';

import NavigationButton from '../components/NavigationButton';
import './RequestLoan.css'; // Certifique-se de que o CSS foi importado

const RequestLoan: React.FC = () => {
  const [equipmentType, setEquipmentType] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState(''); // Campo não visível
  const [assetNumber, setAssetNumber] = useState(''); // Campo não visível
  const [accessories, setAccessories] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [dates, setDates] = useState<string[]>([]);
  const [observations, setObservations] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDateChange = (e: CustomEvent) => {
    const selectedDates = e.detail.value as string;
    const datesArray = selectedDates.split(',');
    setDates(datesArray);
  };

  const handleSubmit = async () => {
    const requestData = {
      equipamento: equipmentType,
      modelo_equipamento: model,
      numero_serie: serialNumber || 'Não Aplicável', // Envia "Não Aplicável" se vazio
      numero_patrimonio: assetNumber || 'Não Aplicável', // Envia "Não Aplicável" se vazio
      acessorios: accessories,
      quantidade: quantity,
      data_in: dates[0], // Data de início do uso
      data_out: dates[1] || '', // Data de término do uso (se aplicável)
      funcionario: "Nome do Funcionário", // Substituir por dados reais
      devolvido: false,
      contrato_assinado: false,
      observacoes: observations || 'Sem observações',
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
        setToastMessage('Erro ao se conectar ao servidor.');
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
            <IonLabel>Modelo</IonLabel>
            <IonInput
              value={model}
              onIonChange={(e) => setModel(e.detail.value!)}
              placeholder="Digite o modelo do equipamento"
            />
          </IonItem>

          {/* Campos ocultos, sem necessidade de exibição */}
          {/* <IonItem>
            <IonLabel>Número de Série</IonLabel>
            <IonInput
              value={serialNumber}
              onIonChange={(e) => setSerialNumber(e.detail.value!)}
              placeholder="Digite o número de série"
            />
          </IonItem>

          <IonItem>
            <IonLabel>Número do Patrimônio</IonLabel>
            <IonInput
              value={assetNumber}
              onIonChange={(e) => setAssetNumber(e.detail.value!)}
              placeholder="Digite o número do patrimônio"
            />
          </IonItem> */}

          <IonItem>
            <IonLabel>Acessórios</IonLabel>
            <IonInput
              value={accessories}
              onIonChange={(e) => setAccessories(e.detail.value!)}
              placeholder="Digite os acessórios incluídos"
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

          <IonItem>
            <IonLabel>Observações</IonLabel>
            <IonTextarea
              value={observations}
              onIonChange={(e) => setObservations(e.detail.value!)}
              placeholder="Digite observações adicionais"
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