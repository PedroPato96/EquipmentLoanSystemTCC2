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
  IonTextarea,
  IonCheckbox,
} from "@ionic/react";
import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import "./EquipmentList.css";

interface Equipment {
  id: number; // ID único de cada equipamento
  timestamp: string; // Data de criação/atualização
  employee: string;
  equipment: string;
  model: string;
  serialNumber: string;
  assetNumber: string;
  accessories: string;
  returned: boolean;
  contractSigned: boolean;
  notes: string;
}

const EquipmentsList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, "id" | "timestamp">>({
    employee: "",
    equipment: "",
    model: "",
    serialNumber: "",
    assetNumber: "",
    accessories: "",
    returned: false,
    contractSigned: false,
    notes: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar equipamentos da API ao montar o componente
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/emprestimos");
        if (!response.ok) throw new Error("Erro ao carregar os equipamentos");
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
      }
    };

    fetchEquipments();
  }, []);

  // Adicionar novo equipamento
  const addEquipment = async () => {
    if (
      !newEquipment.employee ||
      !newEquipment.equipment ||
      !newEquipment.model ||
      !newEquipment.serialNumber ||
      !newEquipment.assetNumber
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/emprestimos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEquipment),
      });

      if (!response.ok) throw new Error("Erro ao adicionar equipamento");

      const addedEquipment = await response.json();
      setEquipments((prevEquipments) => [...prevEquipments, addedEquipment]);

      // Resetar o formulário
      setNewEquipment({
        employee: "",
        equipment: "",
        model: "",
        serialNumber: "",
        assetNumber: "",
        accessories: "",
        returned: false,
        contractSigned: false,
        notes: "",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
      alert("Erro ao adicionar equipamento. Tente novamente.");
    }
  };

  // Remover equipamento
  const removeEquipment = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/emprestimos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao remover equipamento");

      setEquipments((prevEquipments) => prevEquipments.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao remover equipamento:", error);
      alert("Erro ao remover equipamento. Tente novamente.");
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

        {/* Tabela de equipamentos */}
        <table className="equipments-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Funcionário</th>
              <th>Equipamento</th>
              <th>Modelo</th>
              <th>Número de Série</th>
              <th>Número Patrimônio</th>
              <th>Acessórios</th>
              <th>Devolvido?</th>
              <th>Contrato Assinado?</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.timestamp}</td>
                <td>{equipment.employee}</td>
                <td>{equipment.equipment}</td>
                <td>{equipment.model}</td>
                <td>{equipment.serialNumber}</td>
                <td>{equipment.assetNumber}</td>
                <td>{equipment.accessories}</td>
                <td>{equipment.returned ? "Sim" : "Não"}</td>
                <td>{equipment.contractSigned ? "Sim" : "Não"}</td>
                <td>{equipment.notes}</td>
                <td>
                  <IonButton color="danger" onClick={() => removeEquipment(equipment.id)}>
                    Remover
                  </IonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para adicionar novo equipamento */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Adicionar Equipamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {/* Formulário do modal */}
            <IonItem>
              <IonLabel position="floating">Funcionário *</IonLabel>
              <IonInput
                value={newEquipment.employee}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, employee: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Equipamento *</IonLabel>
              <IonInput
                value={newEquipment.equipment}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, equipment: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Modelo *</IonLabel>
              <IonInput
                value={newEquipment.model}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, model: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número de Série *</IonLabel>
              <IonInput
                value={newEquipment.serialNumber}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, serialNumber: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número Patrimônio *</IonLabel>
              <IonInput
                value={newEquipment.assetNumber}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, assetNumber: e.detail.value! })
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

        <NavigationButton />
      </IonContent>
    </IonPage>
  );
};

export default EquipmentsList;
