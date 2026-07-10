import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiUser, FiMail, FiPhone, FiScissors } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ListaBarbeiros() {
  const [barbeiros, setBarbeiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarBarbeiros();
  }, []);

  const carregarBarbeiros = async () => {
    try {
      const response = await api.get('/barbeiros');
      setBarbeiros(response.data);
    } catch (error) {
      toast.error('Erro ao carregar barbeiros');
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Barbeiros</h1>
        <p className="text-gray-500 mt-1">Gerencie os profissionais da barbearia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbeiros.map((barbeiro) => (
          <div key={barbeiro.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <FiUser className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{barbeiro.nome}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${barbeiro.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {barbeiro.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FiMail className="w-4 h-4" />
                {barbeiro.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiPhone className="w-4 h-4" />
                {barbeiro.telefone || 'Não informado'}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiScissors className="w-4 h-4" />
                {barbeiro.especialidade || 'Geral'}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between text-sm">
              <span className="text-gray-500">Comissão: {barbeiro.comissao_percentual}%</span>
              <span className="text-gray-500">{barbeiro.horario_inicio} - {barbeiro.horario_fim}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}