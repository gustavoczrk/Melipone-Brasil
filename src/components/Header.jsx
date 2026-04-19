import { Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">
      <button 
        className="text-slate-500 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 justify-end px-4">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Gustavo</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
            G
          </div>
        </div>
      </div>
    </header>
  );
}