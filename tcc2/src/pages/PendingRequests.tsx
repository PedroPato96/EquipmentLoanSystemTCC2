import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './PendingRequests.css';

const PendingRequests: React.FC = () => {
  const history = useHistory();
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch pending requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/emprestimos');
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
        const data = await response.json();

        // Filtra as solicitações pendentes (devolvido: false)
        const pending = data.filter(
          (request: any) => !request.devolvido && !request.rejeitado
        );
        // Filtra as solicitações aprovadas (devolvido: true)
        const approved = data.filter(
          (request: any) => request.devolvido && !request.rejeitado
        );

        setPendingRequests(pending);
        setApprovedRequests(approved);
      } catch (err: any) {
        setError(err.message || 'Erro inesperado ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle API actions (approve or reject)
  const handleAction = async (id: number, action: 'aprovar' | 'rejeitar') => {
    try {
      const endpoint = `http://127.0.0.1:5000/api/emprestimos/${id}/${action}`;
      const response = await fetch(endpoint, { method: 'POST' });

      if (response.ok) {
        // Se for aprovado, mover para a lista de aprovadas
        if (action === 'aprovar') {
          const approvedRequest = pendingRequests.find((request) => request.id === id);
          if (approvedRequest) {
            setApprovedRequests((prevApproved) => [...prevApproved, approvedRequest]);
            setPendingRequests((prevRequests) =>
              prevRequests.filter((request) => request.id !== id)
            );
            setToastMessage('Solicitação aprovada com sucesso!');
          }
        }

        // Se for rejeitado, remover da lista de pendentes
        if (action === 'rejeitar') {
          setPendingRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
          );
          setToastMessage('Solicitação rejeitada com sucesso!');
        }
      } else {
        throw new Error(`Erro ao ${action} a solicitação.`);
      }
    } catch (err: any) {
      setToastMessage(err.message || 'Erro ao realizar a ação.');
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
        {approvedRequests.length > 0 && (
          <div>
            <h2>Solicitações Aprovadas</h2>
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
                  <th>Devolvido</th>
                  <th>Observações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {approvedRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.funcionario}</td>
                    <td>{request.equipamento}</td>
                    <td>{request.modelo_equipamento || 'N/A'}</td>
                    <td>{request.numero_serie}</td>
                    <td>{request.numero_patrimonio}</td>
                    <td>{request.acessorios || 'N/A'}</td>
                    <td>{request.devolvido ? 'Sim' : 'Não'}</td>
                    <td>{request.observacoes || 'N/A'}</td>
                    <td>
                      <IonButton
                        onClick={() => handleAction(request.id, 'rejeitar')}
                        color="danger"
                      >
                        Devolvido
                      </IonButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pendingRequests.length > 0 && (
          <div>
            <h2>Solicitações Pendentes</h2>
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
                  <th>Devolvido</th>
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
                    <td>{request.observacoes || 'N/A'}</td>
                    <td>
                      <IonButton
                        onClick={() => handleAction(request.id, 'aprovar')}
                        color="success"
                      >
                        Aprovar
                      </IonButton>
                      <IonButton
                        onClick={() => handleAction(request.id, 'rejeitar')}
                        color="danger"
                      >
                        Rejeitar
                      </IonButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <IonButton
          expand="full"
          onClick={() => history.goBack()}
          color="primary"
          style={{ marginTop: '20px' }}
        >
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
