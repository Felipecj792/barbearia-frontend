import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ListaAgendamentos from './components/Agendamentos/ListaAgendamentos';
import FormAgendamento from './components/Agendamentos/FormAgendamento';
import ListaBarbeiros from './components/Barbeiros/ListaBarbeiros';
import ListaClientes from './components/Clientes/ListaClientes';
import Login from './components/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="agendamentos" element={<ListaAgendamentos />} />
            <Route path="agendamentos/novo" element={<FormAgendamento />} />
            <Route path="barbeiros" element={<ListaBarbeiros />} />
            <Route path="clientes" element={<ListaClientes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;