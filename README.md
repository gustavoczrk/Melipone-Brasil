# Meliponi Brasil 🐝

Plataforma B2B para rastreabilidade de biodiversidade (ESG) e gestão de colmeias, conectando empresas financiadoras a produtores em campo.

## 📌 Status do Projeto
**Fase atual:** Conclusão da Sprint 2 (App Shell, Autenticação e UX Corporativa).

## 🚀 Arquitetura e Tecnologias
O projeto foi desenvolvido sob uma arquitetura moderna baseada em componentes e serviços em nuvem:

* **Frontend:** React.js com Vite para build otimizado.
* **Estilização:** Tailwind CSS (Mobile-first e responsividade nativa).
* **Roteamento:** React Router DOM (Single Page Application com proteção de rotas).
* **Backend as a Service (BaaS):** Supabase (PostgreSQL).
* **Segurança:** Autenticação via JWT, Controle de Acesso Baseado em Funções (RBAC) e Row Level Security (RLS) no banco de dados.
* **CI/CD:** Deploy contínuo configurado na Vercel.

## 📦 Funcionalidades Implementadas (Até Sprint 2)
* [x] Setup do ambiente e configuração de linting.
* [x] Integração do cliente Supabase com proteção de variáveis de ambiente.
* [x] Camada de Autenticação (Login) e bloqueio de rotas não autorizadas.
* [x] Modelagem de Entidade-Relacionamento (MER) para perfis, colmeias e manejos.
* [x] Estrutura do App Shell (Sidebar modular e responsiva).
* [x] Dashboard corporativo com métricas e tabela de atividades.
* [x] Tratamento de latência de rede com estados de *Skeleton Loading*.

## 🛠️ Como rodar o projeto localmente

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/gustavoczrk/Meliponi-brasil.git
\`\`\`

2. Instale as dependências:
\`\`\`bash
cd Meliponi-brasil
npm install
\`\`\`

3. Configuração de Variáveis de Ambiente:
Crie um arquivo \`.env\` na raiz do projeto usando o \`.env.example\` como base e insira as chaves do Supabase:
\`\`\`env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
\`\`\`

4. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

O sistema estará disponível em \`http://localhost:5173\`.
