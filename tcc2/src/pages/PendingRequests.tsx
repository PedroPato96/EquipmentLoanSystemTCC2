import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './PendingRequests.css';

const PendingRequests: React.FC = () => {
  const history = useHistory(); // Hook para usar a navegação
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros

  // Buscar dados da API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/emprestimos');
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
        const data = await response.json();
        setPendingRequests(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleDelete = (id: number) => {
    setPendingRequests((prevData) => prevData.filter((item) => item.id !== id));
    // Lógica adicional para deletar do backend pode ser implementada aqui
  };

  const handleApprove = (id: number) => {
    console.log(`Solicitação ${id} aprovada.`);
    // Lógica para enviar aprovação ao backend pode ser implementada aqui
  };

  const handleReject = (id: number) => {
    console.log(`Solicitação ${id} rejeitada.`);
    // Lógica para enviar rejeição ao backend pode ser implementada aqui
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Carregando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Erro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>{error}</p>
          <IonButton onClick={() => history.goBack()} color="primary">
            Voltar
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

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
                <td>{request.funcionario}</td>
                <td>{request.equipamento}</td>
                <td>{request.modelo_equipamento || 'N/A'}</td>
                <td>{request.numero_serie}</td>
                <td>{request.numero_patrimonio}</td>
                <td>{request.acessorios || 'N/A'}</td>
                <td>{request.devolvido ? 'Sim' : 'Não'}</td>
                <td>{request.contrato_assinado ? 'Sim' : 'Não'}</td>
                <td>{request.observacoes || 'N/A'}</td>
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
