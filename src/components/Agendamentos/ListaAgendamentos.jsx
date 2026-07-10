import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const response = await api.get('/agendamentos');
      setAgendamentos(response.data);
    } catch (error) {
      toast.error('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const deletar = async (id) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
    try {
      await api.delete(`/agendamentos/${id}`);
      toast.success('Agendamento cancelado!');
      carregarAgendamentos();
    } catch (error) {
      toast.error('Erro ao cancelar agendamento');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      agendado: 'bg-blue-100 text-blue-800',
      confirmado: 'bg-green-100 text-green-800',
      em_andamento: 'bg-yellow-100 text-yellow-800',
      finalizado: 'bg-gray-100 text-gray-800',
      cancelado: 'bg-red-100 text-red-800',
      nao_compareceu: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Agendamentos</h1>
        <button
          onClick={() => navigate('/agendamentos/novo')}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Barbeiro</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Serviço</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Data/Hora</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agendamentos.map((agendamento) => (
                <tr key={agendamento.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{agendamento.Cliente?.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{agendamento.Barbeiro?.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{agendamento.Servico?.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-gray-400" />
                      {new Date(agendamento.data_hora).toLocaleDateString()}
                      <FiClock className="w-4 h-4 text-gray-400 ml-2" />
                      {new Date(agendamento.data_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agendamento.status)}`}>
                      {agendamento.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/agendamentos/editar/${agendamento.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletar(agendamento.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}