import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca a sessão atual no carregamento do componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Opcional: Escuta mudanças de estado (ex: caso o usuário limpe os cookies manualmente)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></span>
      </div>
    );
  }

  // Se tiver sessão, renderiza as páginas internas (<Outlet />). Se não, volta pro Login.
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}