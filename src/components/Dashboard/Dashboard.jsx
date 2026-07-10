import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiUsers, FiUser, FiScissors, FiCalendar, FiDollarSign } from 'react-icons/fi';

export default function Dashboard() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await api.get('/dashboard');
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const cards = [
    { icon: FiUsers, label: 'Clientes', value: dados?.totalClientes || 0, color: 'blue' },
    { icon: FiUser, label: 'Barbeiros', value: dados?.totalBarbeiros || 0, color: 'green' },
    { icon: FiScissors, label: 'Serviços', value: dados?.totalServicos || 0, color: 'purple' },
    { icon: FiCalendar, label: 'Agendamentos Hoje', value: dados?.agendamentosHoje || 0, color: 'orange' },
    { icon: FiDollarSign, label: 'Faturamento Mês', value: `R$ ${dados?.faturamentoMes?.toFixed(2) || '0,00'}`, color: 'red' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral da sua barbearia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-4">{card.value}</h3>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}