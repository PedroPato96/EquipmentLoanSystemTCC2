import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonToast,
} from "@ionic/react";

import NavigationButton from "../components/NavigationButton"; // Importar o NavigationButton
import "./RequestStatus.css"; // Importar o CSS

interface Request {
  id: number;
  equipamento: string;
  status: string;
}

const RequestStatus: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/emprestimos");
        if (!response.ok) {
          throw new Error(`Erro ao carregar os dados: ${response.statusText}`);
        }
        const data = await response.json();

        // Transformar os dados para incluir um campo de status fictício
        const formattedRequests = data.map((request: any) => ({
          id: request.id,
          equipamento: request.equipamento,
          status: request.devolvido ? "Aprovado" : "Pendente", // Exemplo de lógica para status
        }));

        setRequests(formattedRequests);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <IonPage className="page-request-status"> {/* Aplicando a classe CSS */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Status das Solicitações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : error ? (
          <IonToast
            isOpen={!!error}
            message={error}
            duration={3000}
            onDidDismiss={() => setError(null)}
          />
        ) : (
          <IonList>
            {requests.map((request) => (
              <IonItem key={request.id}>
                <IonLabel>
                  <h2>{request.equipamento}</h2>
                  <p>Status: {request.status}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {/* Botão de navegação */}
        <NavigationButton />
      </IonContent>
    </IonPage>
  );
};

export default RequestStatus;
