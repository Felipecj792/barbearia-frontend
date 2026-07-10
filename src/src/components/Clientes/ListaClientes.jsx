import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      toast.error('Erro ao carregar clientes');
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
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <p className="text-gray-500 mt-1">Gerencie os clientes da barbearia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUser className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{cliente.nome}</h3>
                {cliente.cpf && (
                  <span className="text-xs text-gray-500">CPF: {cliente.cpf}</span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {cliente.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMail className="w-4 h-4" />
                  {cliente.email}
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <FiPhone className="w-4 h-4" />
                {cliente.telefone}
              </div>
              {cliente.data_nascimento && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(cliente.data_nascimento).toLocaleDateString()}
                </div>
              )}
            </div>

            {cliente.observacoes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500 italic">"{cliente.observacoes}"</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {clientes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum cliente cadastrado ainda</p>
        </div>
      )}
    </div>
  );
}