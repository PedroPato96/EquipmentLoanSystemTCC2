// src/pages/login.tsx

import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const { login, isAuthenticated, userRole } = useAuth(); // Obtenha a função de login e o estado de autenticação do contexto
  const history = useHistory(); // Obtenha o history para redirecionar
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verifica se já foi feito o recarregamento
    if (!sessionStorage.getItem('hasReloaded') && !isAuthenticated) {
      sessionStorage.setItem('hasReloaded', 'true'); // Marca que a página foi recarregada
      window.location.reload(); // Força o recarregamento da página
    } else if (isAuthenticated) {
      // Se já estiver autenticado, redireciona para a página correta
      const redirectPath = userRole === 'admin' ? '/admin-home' : '/home';
      history.replace(redirectPath);
    }
  }, [isAuthenticated, userRole, history]);

  const handleLogin = () => {
    // Chame a função de login
    login(username, password);

    // Se o login for bem-sucedido, redirecione
    if (isAuthenticated) {
      const redirectPath = userRole === 'admin' ? '/admin-home' : '/home';
      history.push(redirectPath);
    } else {
      setError('Usuário ou senha incorretos.'); // Define uma mensagem de erro
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
        <IonItem>
          <IonLabel position="floating">Usuário</IonLabel>
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro */}
        <IonButton expand="full" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
