// src/components/LogoffButton.tsx

import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LogoffButton: React.FC<{ onLogoff: () => void }> = ({ onLogoff }) => {
  const history = useHistory();

  const handleLogoff = () => {
    // Chame a função que limpa o estado do usuário
    onLogoff();
    // Redirecione para a página de login
    history.push('/login'); // Mude o caminho de acordo com sua rota de login
  };

  return (
    <IonButton onClick={handleLogoff}>
      Logoff
    </IonButton>
  );
};

export default LogoffButton;
