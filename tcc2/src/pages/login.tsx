import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonCard,
    IonCardContent,
    IonToast,  // Importando o IonToast para mostrar mensagens de erro
  } from "@ionic/react";
  import { useState } from "react";
  import { useHistory } from "react-router-dom";
  
  const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);  // Estado para controlar a exibição do erro
    const history = useHistory();
  
    const handleLogin = () => {
      // Aqui você pode implementar a lógica de autenticação
      if (username === "admin" && password === "admin") {
        // Exemplo de credenciais válidas
        history.push("/home");
      } else {
        // Se as credenciais não forem reconhecidas, mostra a mensagem de erro
        setShowError(true);
      }
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Nome de Usuário</IonLabel>
                <IonInput
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
              <IonButton expand="full" onClick={handleLogin}>
                Login
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonToast
            isOpen={showError}
            onDidDismiss={() => setShowError(false)}
            message="Credenciais inválidas. Tente novamente."
            duration={2000}
            color="danger"  // A cor do toast pode ser alterada
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  