// src/context/AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

// Defina o tipo para o contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  userRole: string; // Adicione esta linha para incluir userRole
}

// Crie o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Estado para o userRole

  const login = (username: string, password: string) => {
    // Lógica de login
    if (username === 'pedro' && password === '12345') {
      setIsAuthenticated(true);
      setUserRole('admin'); // Define o userRole como admin
    } else if (username === 'user' && password === 'user') {
      setIsAuthenticated(true);
      setUserRole('user'); // Define o userRole como user
    } else {
      // Caso de falha no login
      setIsAuthenticated(false);
      setUserRole(''); // Limpa o userRole
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(''); // Limpa o userRole ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
