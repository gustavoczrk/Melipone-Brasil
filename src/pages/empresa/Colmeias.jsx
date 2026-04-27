import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { QRCodeCanvas } from 'qrcode.react';

export default function Colmeias() {
  const [colmeias, setColmeias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [identificador, setIdentificador] = useState('');
  
  const [qrCodeData, setQrCodeData] = useState(null);

  useEffect(() => {
    fetchColmeias();
  }, []);

  const fetchColmeias = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('colmeias')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setColmeias(data || []);
    } catch (error) {
      console.error('Erro ao buscar colmeias:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateColmeia = async (e) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('colmeias')
        .insert([
          { 
            identificador: identificador,
            empresa_dona_id: user.id 
          }
        ]);

      if (error) throw error;
      
      setIdentificador('');
      setIsModalOpen(false);
      fetchColmeias();
      
    } catch (error) {
      console.error('Erro ao criar colmeia:', error.message);
      
      if (error.message.includes('duplicate key value')) {
        alert('Atenção: Já existe uma colmeia com este Identificador! Por favor, digite um código único.');
      } else {
        alert('Erro ao registrar colmeia: ' + error.message);
      }
    }
  };

  const handleDeleteColmeia = async (id, identificador) => {
    const confirmacao = window.confirm(`Tem certeza que deseja remover a colmeia ${identificador}? Esta ação não pode ser desfeita.`);
    
    if (!confirmacao) return;

    try {
      const { error } = await supabase
        .from('colmeias')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchColmeias();
      
    } catch (error) {
      console.error('Erro ao remover colmeia:', error.message);
      alert('Erro ao remover: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Colmeias</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          + Nova Colmeia
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identificador</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="3" className="px-6 py-4 text-center">Carregando...</td></tr>
            ) : colmeias.length === 0 ? (
              <tr><td colSpan="3" className="px-6 py-4 text-center">Nenhuma colmeia registrada.</td></tr>
            ) : (
              colmeias.map((colmeia) => (
                <tr key={colmeia.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{colmeia.identificador}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {colmeia.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                    <button 
                      onClick={() => setQrCodeData(colmeia)}
                      className="text-blue-600 hover:text-blue-900 transition cursor-pointer"
                    >
                      Ver QR Code
                    </button>
                    <button 
                      onClick={() => handleDeleteColmeia(colmeia.id, colmeia.identificador)}
                      className="text-red-600 hover:text-red-900 transition cursor-pointer"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Registrar Nova Colmeia</h2>
            <form onSubmit={handleCreateColmeia}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Identificador (Ex: COL-001)</label>
                <input 
                  type="text" 
                  required
                  value={identificador}
                  onChange={(e) => setIdentificador(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrCodeData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">QR Code da Colmeia</h2>
            <p className="text-gray-500 mb-6">{qrCodeData.identificador}</p>
            
            <div className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg" id="qr-label">
              <QRCodeCanvas value={qrCodeData.id} size={200} level="H" />
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setQrCodeData(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                Fechar
              </button>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
              >
                Imprimir Etiqueta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}