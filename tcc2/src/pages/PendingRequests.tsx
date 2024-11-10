import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './PendingRequests.css'; // Importar arquivo CSS para estilização

const PendingRequests: React.FC = () => {
  const history = useHistory(); // Hook para usar a navegação

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      timestamp: new Date().toLocaleString(),
      employee: 'João',
      equipment: 'Computador',
      model: 'Dell',
      serialNumber: '12345',
      assetNumber: '54321',
      accessories: 'Mouse',
      returned: false,
      signedContract: true,
      observations: 'N/A',
    },
    {
      id: 2,
      timestamp: new Date().toLocaleString(),
      employee: 'Maria',
      equipment: 'Projetor',
      model: 'BenQ',
      serialNumber: '98765',
      assetNumber: '67890',
      accessories: 'Cabo HDMI',
      returned: false,
      signedContract: false,
      observations: 'Necessário para apresentação',
    },
  ]);

  const handleDelete = (id: number) => {
    setPendingRequests((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleApprove = (id: number) => {
    console.log(`Solicitação ${id} aprovada.`);
    // Lógica para aprovar a solicitação pode ser adicionada aqui
  };

  const handleReject = (id: number) => {
    console.log(`Solicitação ${id} rejeitada.`);
    // Lógica para rejeitar a solicitação pode ser adicionada aqui
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Solicitações Pendentes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <table className="pending-requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Funcionário</th>
              <th>Equipamento</th>
              <th>Modelo</th>
              <th>Número de Série</th>
              <th>Número do Ativo</th>
              <th>Acessórios</th>
              <th>Retornado</th>
              <th>Contrato Assinado</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.employee}</td>
                <td>{request.equipment}</td>
                <td>{request.model}</td>
                <td>{request.serialNumber}</td>
                <td>{request.assetNumber}</td>
                <td>{request.accessories}</td>
                <td>{request.returned ? 'Sim' : 'Não'}</td>
                <td>{request.signedContract ? 'Sim' : 'Não'}</td>
                <td>{request.observations}</td>
                <td>
                  <IonButton onClick={() => handleApprove(request.id)} color="success">Aprovar</IonButton>
                  <IonButton onClick={() => handleReject(request.id)} color="danger">Rejeitar</IonButton>
                  <IonButton onClick={() => handleDelete(request.id)} color="dark">Cancelar</IonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <IonButton expand="full" onClick={() => history.goBack()} color="primary" style={{ marginTop: '20px' }}>
          Voltar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PendingRequests;
