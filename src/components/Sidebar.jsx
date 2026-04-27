import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ScanLine, ClipboardList, LogOut, Hexagon, Box } from 'lucide-react';

const menuItems = [
  { title: 'Dashboard Geral (Admin)', path: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Painel da Empresa', path: '/empresa/painel', icon: ClipboardList },
  { title: 'Gestão de Colmeias', path: '/empresa/colmeias', icon: Box },
  { title: 'Módulo de Campo', path: '/produtor/scanner', icon: ScanLine },
];

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay para Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transition-transform duration-300 lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 items-center gap-2 px-6">
          <Hexagon className="h-8 w-8 text-emerald-500" />
          <span className="text-xl font-bold tracking-tight">Meliponi Brasil</span>
        </div>

        <nav className="mt-6 space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
          <button 
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-red-900/20 hover:text-red-400 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Sair do Sistema
          </button>
        </div>
      </aside>
    </>
  );
}