import { useState, useEffect } from 'react';
import { Users, Hexagon, Sprout, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // MOCK: Simulação de latência de rede para renderização dos Skeletons (Task 124)
  // Na Sprint 3, substituiremos este useEffect pelo fetch real no Supabase.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const kpis = [
    { title: 'Empresas Parceiras', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Colmeias Ativas', value: '348', icon: Hexagon, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Área Restaurada (ha)', value: '1.2k', icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Alertas de Manejo', value: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  const recentActivities = [
    { id: 1, producer: 'João Silva', location: 'Fazenda Vale Verde', action: 'Divisão de Enxame', date: '14 Abr 2026', status: 'Concluído' },
    { id: 2, producer: 'Maria Oliveira', location: 'Sítio das Flores', action: 'Alimentação', date: '13 Abr 2026', status: 'Concluído' },
    { id: 3, producer: 'Carlos Santos', location: 'Reserva Natural', action: 'Inspeção Sanitária', date: '12 Abr 2026', status: 'Atenção' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
        <p className="text-sm text-slate-500">Acompanhe as métricas globais do projeto de conservação.</p>
      </div>

      {/* Grid de Cards com Skeleton Loading */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="h-12 w-12 rounded-lg bg-slate-200"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-24 rounded bg-slate-200"></div>
                    <div className="h-6 w-16 rounded bg-slate-200"></div>
                  </div>
                </div>
              </div>
            ))
          : kpis.map((kpi, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${kpi.bg}`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Tabela com Skeleton Loading */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Atividades de Campo Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Produtor</th>
                <th className="px-6 py-4 font-medium">Localização</th>
                <th className="px-6 py-4 font-medium">Ação Realizada</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 w-32 rounded bg-slate-200"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-40 rounded bg-slate-200"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-28 rounded bg-slate-200"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-slate-200"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-slate-200"></div></td>
                    </tr>
                  ))
                : recentActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">{activity.producer}</td>
                      <td className="whitespace-nowrap px-6 py-4">{activity.location}</td>
                      <td className="whitespace-nowrap px-6 py-4">{activity.action}</td>
                      <td className="whitespace-nowrap px-6 py-4">{activity.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border
                          ${activity.status === 'Concluído' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'}
                        `}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}