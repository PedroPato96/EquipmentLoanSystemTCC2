import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./EquipmentList.css" ;

interface Equipment {
  id: number;
  data_in: string;
  funcionario: string;
  equipamento: string;
  modelo_equipamento?: string;
  numero_serie: string;
  numero_patrimonio: string;
  acessorios?: string;
  devolvido: boolean;
  contrato_assinado: boolean;
  observacoes?: string;
}

const EquipmentList: React.FC = () => {
  const history = useHistory();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, "id" | "devolvido" | "contrato_assinado">>({
    data_in: "",
    funcionario: "",
    equipamento: "",
    modelo_equipamento: "",
    numero_serie: "",
    numero_patrimonio: "",
    acessorios: "",
    observacoes: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Carregar equipamentos do backend
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/emprestimos");
        if (!response.ok) throw new Error("Erro ao carregar equipamentos");
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
      }
    };

    fetchEquipments();
  }, []);

  // Adicionar equipamento
  const addEquipment = async () => {
    if (!newEquipment.data_in || !newEquipment.funcionario || !newEquipment.equipamento || !newEquipment.numero_serie || !newEquipment.numero_patrimonio) {
      setToastMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/emprestimos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newEquipment,
          devolvido: false,
          contrato_assinado: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao adicionar equipamento");
      }

      const addedEquipment = await response.json();
      setEquipments((prevEquipments) => [...prevEquipments, addedEquipment]);

      setNewEquipment({
        data_in: "",
        funcionario: "",
        equipamento: "",
        modelo_equipamento: "",
        numero_serie: "",
        numero_patrimonio: "",
        acessorios: "",
        observacoes: "",
      });
      setIsModalOpen(false);
      setToastMessage("Equipamento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
      setToastMessage("Erro ao adicionar equipamento. Tente novamente.");
    }
  };

  // Remover equipamento
  const removeEquipment = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/emprestimos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao remover equipamento");
      }

      setEquipments((prevEquipments) => prevEquipments.filter((item) => item.id !== id));
      setToastMessage("Equipamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover equipamento:", error);
      setToastMessage("Erro ao remover equipamento. Tente novamente.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Equipamentos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => setIsModalOpen(true)}>
          Adicionar Novo Equipamento
        </IonButton>
        <IonButton expand="block" color="light" onClick={() => history.goBack()}>
          Voltar
        </IonButton>

        <table className="equipments-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Funcionário</th>
              <th>Equipamento</th>
              <th>Modelo</th>
              <th>Número de Série</th>
              <th>Número Patrimônio</th>
              <th>Acessórios</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.data_in}</td>
                <td>{equipment.funcionario}</td>
                <td>{equipment.equipamento}</td>
                <td>{equipment.modelo_equipamento || "N/A"}</td>
                <td>{equipment.numero_serie}</td>
                <td>{equipment.numero_patrimonio}</td>
                <td>{equipment.acessorios || "N/A"}</td>
                <td>{equipment.observacoes || "N/A"}</td>
                <td>
                  <IonButton color="danger" onClick={() => removeEquipment(equipment.id)}>
                    Remover
                  </IonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Adicionar Equipamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Data *</IonLabel>
              <IonInput
                type="date"
                value={newEquipment.data_in}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, data_in: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Funcionário *</IonLabel>
              <IonInput
                value={newEquipment.funcionario}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, funcionario: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Equipamento *</IonLabel>
              <IonInput
                value={newEquipment.equipamento}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, equipamento: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Modelo</IonLabel>
              <IonInput
                value={newEquipment.modelo_equipamento}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, modelo_equipamento: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número de Série *</IonLabel>
              <IonInput
                value={newEquipment.numero_serie}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, numero_serie: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número Patrimônio *</IonLabel>
              <IonInput
                value={newEquipment.numero_patrimonio}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, numero_patrimonio: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Acessórios</IonLabel>
              <IonInput
                value={newEquipment.acessorios}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, acessorios: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Observações</IonLabel>
              <IonInput
                value={newEquipment.observacoes}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, observacoes: e.detail.value! })
                }
              />
            </IonItem>
            <IonButton expand="full" onClick={addEquipment}>
              Adicionar Equipamento
            </IonButton>
            <IonButton expand="full" color="light" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

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

export default EquipmentList;
