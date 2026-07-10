import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function FormAgendamento() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cliente_id: '',
    barbeiro_id: '',
    servico_id: '',
    data_hora: '',
    observacoes: ''
  });
  const [clientes, setClientes] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [clientesRes, barbeirosRes, servicosRes] = await Promise.all([
        api.get('/clientes'),
        api.get('/barbeiros'),
        api.get('/servicos')
      ]);
      setClientes(clientesRes.data);
      setBarbeiros(barbeirosRes.data);
      setServicos(servicosRes.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/agendamentos', formData);
      toast.success('Agendamento criado com sucesso!');
      navigate('/agendamentos');
    } catch (error) {
      toast.error('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Novo Agendamento</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <select
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.cliente_id}
            onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Barbeiro</label>
          <select
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.barbeiro_id}
            onChange={(e) => setFormData({ ...formData, barbeiro_id: e.target.value })}
          >
            <option value="">Selecione um barbeiro</option>
            {barbeiros.map(barbeiro => (
              <option key={barbeiro.id} value={barbeiro.id}>{barbeiro.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Serviço</label>
          <select
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.servico_id}
            onChange={(e) => setFormData({ ...formData, servico_id: e.target.value })}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map(servico => (
              <option key={servico.id} value={servico.id}>
                {servico.nome} - R$ {servico.preco}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
          <input
            type="datetime-local"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.data_hora}
            onChange={(e) => setFormData({ ...formData, data_hora: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows="3"
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Criar Agendamento'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/agendamentos')}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}