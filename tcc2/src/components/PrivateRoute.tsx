// src/components/PrivateRoute.tsx

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajuste o caminho conforme necessário

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode; // Permite passar filhos para o componente
  requiredRole: string; // Presumindo que você esteja usando roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth(); // Obtém o estado de autenticação e a função de role do AuthContext

  return (
    <Route
      {...rest}
      render={({ location }) => {
        // Verifica se o usuário está autenticado e se o papel do usuário corresponde ao papel necessário
        if (isAuthenticated) {
          // Se o papel do usuário é o necessário, renderiza os filhos
          if (userRole === requiredRole) {
            return children;
          } else {
            // Se não tem o papel necessário, redireciona para uma página de acesso negado ou outra lógica
            return (
              <Redirect
                to={{
                  pathname: '/login', // Redireciona para a página de login
                  state: { from: location }, // Passa a localização atual para o estado
                }}
              />
            );
          }
        } else {
          // Se não estiver autenticado, redireciona para a página de login
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;


