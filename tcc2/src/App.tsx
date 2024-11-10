// src/App.tsx

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './context/AuthContext'; 
import Login from './pages/login'; 
import Home from './pages/Home';
import RequestLoan from './pages/RequestLoan';
import RequestStatus from './pages/RequestStatus';
import MyEquipments from './pages/MyEquipments';
import AdminHome from './pages/AdminHome';
import LendToUser from './pages/LendToUser';
import PendingRequests from './pages/PendingRequests';
import ManageEquipment from './pages/ManageEquipment';
import EquipmentList from './pages/EquipmentList';
import EquipmentSummary from './pages/EquipmentSummary';  // Importando a nova página
import PrivateRoute from './components/PrivateRoute';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider> {/* Envolva a aplicação com AuthProvider */}
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Página de Login */}
          <Route exact path="/login">
            <Login />
          </Route>

          {/* Página Inicial do Usuário */}
          <PrivateRoute exact path="/home" requiredRole="user">
            <Home />
          </PrivateRoute>

          {/* Página Inicial do Administrador */}
          <PrivateRoute exact path="/admin-home" requiredRole="admin">
            <AdminHome />
          </PrivateRoute>

          {/* Solicitar Equipamento */}
          <PrivateRoute exact path="/request-loan" requiredRole="user">
            <RequestLoan />
          </PrivateRoute>

          {/* Status das Solicitações */}
          <PrivateRoute exact path="/request-status" requiredRole="user">
            <RequestStatus />
          </PrivateRoute>

          {/* Equipamentos em Meu Nome */}
          <PrivateRoute exact path="/my-equipments" requiredRole="user">
            <MyEquipments />
          </PrivateRoute>

          {/* Admin: Emprestar para Usuário */}
          <PrivateRoute exact path="/lend-to-user" requiredRole="admin">
            <LendToUser />
          </PrivateRoute>

          {/* Admin: Solicitações Pendentes */}
          <PrivateRoute exact path="/pending-requests" requiredRole="admin">
            <PendingRequests />
          </PrivateRoute>

          {/* Admin: Adicionar/Remover Equipamentos */}
          <PrivateRoute exact path="/manage-equipment" requiredRole="admin">
            <ManageEquipment />
          </PrivateRoute>

          {/* Admin: Lista de Equipamentos */}
          <PrivateRoute exact path="/equipment-list" requiredRole="admin">
            <EquipmentList />
          </PrivateRoute>

          {/* Admin: Resumo de Equipamentos por Tipo */}
          <PrivateRoute exact path="/equipment-summary" requiredRole="admin">
            <EquipmentSummary />
          </PrivateRoute>

          {/* Redireciona para a página de login por padrão */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider> {/* Fim do AuthProvider */}
  </IonApp>
);

export default App;
