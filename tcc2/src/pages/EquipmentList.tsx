// src/pages/EquipmentsList.tsx

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
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonCheckbox
} from "@ionic/react";
import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";

interface Equipment {
  timestamp: string;
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
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, 'timestamp'>>({
    employee: "",
    equipment: "",
    model: "",
    serialNumber: "",
    assetNumber: "",
    accessories: "",
    returned: false,
    contractSigned: false,
    notes: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar equipamentos do localStorage ao montar o componente
  useEffect(() => {
    const savedEquipments = localStorage.getItem("equipments");
    if (savedEquipments) {
      try {
        setEquipments(JSON.parse(savedEquipments));
      } catch (error) {
        console.error("Erro ao carregar os dados do localStorage:", error);
      }
    }
  }, []);

  // Salvar equipamentos no localStorage quando a lista mudar
  useEffect(() => {
    if (equipments.length > 0) {
      localStorage.setItem("equipments", JSON.stringify(equipments));
    }
  }, [equipments]);

  // Função para adicionar um novo equipamento à lista
  const addEquipment = () => {
    const timestamp = new Date().toLocaleString(); // Gerar timestamp automaticamente
    const equipmentWithTimestamp = { ...newEquipment, timestamp };

    // Adiciona o novo equipamento à lista e atualiza o localStorage
    setEquipments((prevEquipments) => [...prevEquipments, equipmentWithTimestamp]);

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
      notes: ""
    });

    setIsModalOpen(false); // Fechar o modal após adicionar
  };

  // Função para remover um equipamento da lista
  const removeEquipment = (index: number) => {
    const updatedEquipments = equipments.filter((_, i) => i !== index);
    setEquipments(updatedEquipments);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Equipamentos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Botão para abrir o formulário no modal */}
        <IonButton expand="block" onClick={() => setIsModalOpen(true)}>
          Adicionar Novo Equipamento
        </IonButton>

        {/* Tabela de equipamentos */}
        <IonGrid>
          <IonRow>
            <IonCol>Timestamp</IonCol>
            <IonCol>Funcionário</IonCol>
            <IonCol>Equipamento</IonCol>
            <IonCol>Modelo</IonCol>
            <IonCol>Número de Série</IonCol>
            <IonCol>Número Patrimônio</IonCol>
            <IonCol>Acessórios</IonCol>
            <IonCol>Devolvido?</IonCol>
            <IonCol>Contrato Assinado?</IonCol>
            <IonCol>Observações</IonCol>
            <IonCol>Ações</IonCol>
          </IonRow>
          {equipments.map((equipment, index) => (
            <IonRow key={index}>
              <IonCol>{equipment.timestamp}</IonCol>
              <IonCol>{equipment.employee}</IonCol>
              <IonCol>{equipment.equipment}</IonCol>
              <IonCol>{equipment.model}</IonCol>
              <IonCol>{equipment.serialNumber}</IonCol>
              <IonCol>{equipment.assetNumber}</IonCol>
              <IonCol>{equipment.accessories}</IonCol>
              <IonCol>{equipment.returned ? "Sim" : "Não"}</IonCol>
              <IonCol>{equipment.contractSigned ? "Sim" : "Não"}</IonCol>
              <IonCol>{equipment.notes}</IonCol>
              <IonCol>
                <IonButton color="danger" onClick={() => removeEquipment(index)}>
                  Remover
                </IonButton>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        {/* Modal para adicionar novo equipamento */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Adicionar Equipamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Funcionário</IonLabel>
              <IonInput
                value={newEquipment.employee}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, employee: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Equipamento</IonLabel>
              <IonInput
                value={newEquipment.equipment}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, equipment: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Modelo do Equipamento</IonLabel>
              <IonInput
                value={newEquipment.model}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, model: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número de Série</IonLabel>
              <IonInput
                value={newEquipment.serialNumber}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, serialNumber: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número Patrimônio</IonLabel>
              <IonInput
                value={newEquipment.assetNumber}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, assetNumber: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Acessórios</IonLabel>
              <IonTextarea
                value={newEquipment.accessories}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, accessories: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel>Devolvido?</IonLabel>
              <IonCheckbox
                checked={newEquipment.returned}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, returned: e.detail.checked })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel>Contrato Assinado?</IonLabel>
              <IonCheckbox
                checked={newEquipment.contractSigned}
                onIonChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    contractSigned: e.detail.checked,
                  })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Observações</IonLabel>
              <IonTextarea
                value={newEquipment.notes}
                onIonChange={(e) =>
                  setNewEquipment({ ...newEquipment, notes: e.detail.value! })
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

        <NavigationButton /> {/* Botão de navegação/logoff */}
      </IonContent>
    </IonPage>
  );
};

export default EquipmentsList;
