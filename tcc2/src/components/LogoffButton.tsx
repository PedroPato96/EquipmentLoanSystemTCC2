// src/components/LogoffButton.tsx

import React from 'react';
import { IonButton } from '@ionic/react';

const LogoffButton: React.FC<{ onLogoff: () => void }> = ({ onLogoff }) => {

  const handleLogoff = () => {
    // Limpar dados persistentes do navegador
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');

    // Chame a função que limpa o estado do usuário
    onLogoff();

    // Simular pressionamento da tecla F5
    const event = new KeyboardEvent('keydown', {
      key: 'F5',
      keyCode: 116,
      code: 'F5',
      which: 116,
      bubbles: true,
      cancelable: true,
    });

    // Disparar o evento de teclado
    window.dispatchEvent(event);
  };

  return (
    <IonButton onClick={handleLogoff}>
      Logoff
    </IonButton>
  );
};

export default LogoffButton;
