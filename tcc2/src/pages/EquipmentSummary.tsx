import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  } from "@ionic/react";
  import { useEffect, useState } from "react";
  import { useHistory } from "react-router-dom";
  import './EquipmentSummary.css'; // Importando o CSS
  
  // Exemplo de interface de equipamento (você pode alterar conforme o seu modelo)
  interface Equipment {
    type: string;
    model: string;
    inUse: boolean;
  }
  
  const EquipmentSummary: React.FC = () => {
    const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
    const [equipmentSummary, setEquipmentSummary] = useState<{ type: string; model: string; count: number }[]>([]);
    const history = useHistory(); // Usando useHistory para navegação
  
    // Função para agrupar e contabilizar equipamentos por tipo e modelo
    const calculateSummary = (equipments: Equipment[]) => {
      const summary = equipments.reduce((acc: any, equipment) => {
        if (equipment.inUse) {
          const key = `${equipment.type} - ${equipment.model}`;
          if (!acc[key]) {
            acc[key] = { type: equipment.type, model: equipment.model, count: 0 };
          }
          acc[key].count += 1;
        }
        return acc;
      }, {});
  
      setEquipmentSummary(Object.values(summary));
    };
  
    // Simulação de carregamento de dados (substituir por chamada às planilhas)
    useEffect(() => {
      // Exemplo de dados
      const data: Equipment[] = [
        { type: "Notebook", model: "Dell", inUse: true },
        { type: "Notebook", model: "HP", inUse: true },
        { type: "Projetor", model: "BenQ", inUse: true },
        { type: "Notebook", model: "Dell", inUse: true },
        { type: "Notebook", model: "HP", inUse: false }, // Não está em uso
        { type: "Projetor", model: "Sony", inUse: true },
      ];
  
      setEquipmentData(data);
      calculateSummary(data);
    }, []);
  
    // Função para voltar à tela anterior
    const handleBack = () => {
      history.goBack(); // Navega para a página anterior
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Resumo de Equipamentos Emprestados</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <h2 className="page-title">Equipamentos em Uso por Modelo</h2>
                {equipmentSummary.length === 0 ? (
                  <p>Nenhum equipamento em uso.</p>
                ) : (
                  <table className="equipment-table">
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Modelo</th>
                        <th>Quantidade em Uso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipmentSummary.map((item, index) => (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>{item.model}</td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* Botão de Voltar */}
          <IonButton expand="full" color="light" onClick={handleBack}>
            Voltar
          </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default EquipmentSummary;
  