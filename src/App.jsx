import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/admin/Dashboard';

// Mocks limpos das páginas (o Header e a Sidebar agora cuidam da interface principal)
const AdminDashboard = () => <div className="text-2xl font-bold text-slate-800">Dashboard Administrativo</div>;
const EmpresaPainel = () => <div className="text-2xl font-bold text-emerald-700">Painel da Empresa</div>;
const ProdutorScanner = () => <div className="text-2xl font-bold text-amber-600">Módulo de Campo (Scanner)</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Camada 1: Segurança (Proteção de Rotas) */}
        <Route element={<ProtectedRoute />}>
          
          {/* Camada 2: Estrutura Visual (App Shell com Sidebar e Header) */}
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/empresa/painel" element={<EmpresaPainel />} />
            <Route path="/produtor/scanner" element={<ProdutorScanner />} />
          </Route>
          
        </Route>
        
        {/* Fallback universal */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}