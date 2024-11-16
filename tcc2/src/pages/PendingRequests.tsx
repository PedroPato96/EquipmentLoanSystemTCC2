import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './PendingRequests.css';

const PendingRequests: React.FC = () => {
  const history = useHistory(); // Hook para usar a navegação
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Mensagens de feedback

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

  // Ações de aprovação, rejeição e cancelamento
  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/emprestimos/${id}/aprovar`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao aprovar a solicitação.');
      }

      // Atualiza o estado removendo o item aprovado
      setPendingRequests((prevData) => prevData.filter((item) => item.id !== id));

      // Exibe mensagem de sucesso
      setToastMessage('Solicitação aprovada com sucesso!');
    } catch (err: any) {
      setToastMessage(`Erro: ${err.message}`);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/emprestimos/${id}/rejeitar`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao rejeitar a solicitação.');
      }

      // Atualiza o estado removendo o item rejeitado
      setPendingRequests((prevData) => prevData.filter((item) => item.id !== id));

      // Exibe mensagem de sucesso
      setToastMessage('Solicitação rejeitada com sucesso!');
    } catch (err: any) {
      setToastMessage(`Erro: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/emprestimos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao cancelar a solicitação.');
      }

      // Atualiza o estado removendo o item cancelado
      setPendingRequests((prevData) => prevData.filter((item) => item.id !== id));

      // Exibe mensagem de sucesso
      setToastMessage('Solicitação cancelada com sucesso!');
    } catch (err: any) {
      setToastMessage(`Erro: ${err.message}`);
    }
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

export default PendingRequests;
