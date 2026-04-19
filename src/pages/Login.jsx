import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Autenticação na tabela nativa auth.users
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');

      // 2. Consulta à tabela profiles para verificar o "Role" (RBAC)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) throw new Error('Perfil de usuário não configurado.');

      // 3. Redirecionamento Dinâmico
      switch (profile.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'empresa':
          navigate('/empresa/painel');
          break;
        case 'produtor':
          navigate('/produtor/scanner');
          break;
        default:
          throw new Error('Tipo de conta não autorizado.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-1/2 bg-slate-900 lg:block relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Tecnologia e rastreabilidade para a biodiversidade.
          </h2>
          <p className="text-lg text-slate-300">
            Acesse o painel para monitorar colmeias, métricas ESG e o impacto ambiental das operações.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Meliponi Brasil</h1>
            <p className="mt-2 text-sm text-slate-600">Acesse o sistema de gestão corporativa</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                E-mail corporativo
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white p-2.5 pl-10 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:bg-slate-50 disabled:opacity-50"
                  placeholder="usuario@empresa.com.br"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Senha
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="block w-full rounded-md border border-slate-300 bg-white p-2.5 pl-10 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:bg-slate-50 disabled:opacity-50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 p-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Acessar Painel
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}