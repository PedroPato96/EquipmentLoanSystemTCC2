import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import EquipmentTable from "../components/EquipmentTable";
import { useHistory } from "react-router-dom";

interface Equipment {
  id: number;
  timestamp: string;
  employee: string;
  equipment: string;
  model: string;
  serialNumber: string;
  assetNumber: string;
  accessories: string;
  returned: boolean;
  signedContract: boolean;
  observations: string;
}

const MyEquipments: React.FC = () => {
  const history = useHistory();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const usuario = "nome_do_usuario";  // Substitua por como você obtém o nome do usuário

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/meus-equipamentos?funcionario=${usuario}`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar os dados: ${response.statusText}`);
        }
        const data = await response.json();
        setEquipments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [usuario]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Equipamentos em Meu Nome</IonTitle>
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
          <EquipmentTable
            equipmentData={equipments} // Passando os equipamentos para a tabela
          />
        )}
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" color="primary" onClick={handleBack}>
                Voltar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyEquipments;
