import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationButton: React.FC<{ isHome?: boolean }> = ({ isHome }) => {
  const history = useHistory();
  const { logout } = useAuth();

  const handleBack = () => {
    if (isHome) {
      logout(); // Chama a função de logout se for na página Home ou AdminHome
      history.push('/login'); // Redireciona para a página de login
    } else {
      history.goBack(); // Volta para a página anterior
    }
  };

  return (
    <IonButton expand="full" onClick={handleBack}>
      {isHome ? 'Logoff' : 'Voltar'}
    </IonButton>
  );
};

export default NavigationButton;