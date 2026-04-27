import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/admin/Dashboard';
import Colmeias from './pages/empresa/Colmeias'; 

// Mocks das outras páginas
const EmpresaPainel = () => <div className="p-6 text-2xl font-bold text-emerald-700">Painel da Empresa (Em Breve)</div>;
const ProdutorScanner = () => <div className="p-6 text-2xl font-bold text-amber-600">Módulo de Campo - Scanner (Em Breve)</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Camada 1: Segurança (Proteção de Rotas) */}
        <Route element={<ProtectedRoute />}>
          
          {/* Camada 2: Estrutura Visual (App Shell com Sidebar e Header) */}
          <Route element={<Layout />}>
            
            {/* ROTAS DO ADMIN (Renato) */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            
            {/* ROTAS DA EMPRESA (Cliente) */}
            <Route path="/empresa/painel" element={<EmpresaPainel />} />
            <Route path="/empresa/colmeias" element={<Colmeias />} />
            
            {/* ROTAS DO PRODUTOR (Campo) */}
            <Route path="/produtor/scanner" element={<ProdutorScanner />} />
            
          </Route>
        </Route>
        
        {/* Fallback universal: Se digitar rota errada, volta pro login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}