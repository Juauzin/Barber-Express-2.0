# Barber-Express-2.0

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan)

Aplicação moderna de agendamento para barbearias, desenvolvida com React + TypeScript + Vite.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
  - [Arquivos de Configuração Raiz](#arquivos-de-configuração-raiz)
  - [Pasta src/](#pasta-src)
- [Funcionalidades](#funcionalidades)

---

## 🎯 Visão Geral

**Barber-Express** é uma aplicação frontend completa para gestão de agendamentos entre clientes e barbeiros. O projeto oferece duas interfaces distintas:

- **Interface do Cliente**: Agendamento de serviços, visualização de barbeiros, gerenciamento de compromissos e favoritos
- **Interface do Barbeiro**: Visualização da agenda, gerenciamento de horários disponíveis

> **Nota:** Este é um projeto frontend-only. Os dados são gerenciados em memória através do Context API do React, sem backend real conectado.

---

## 🚀 Tecnologias Utilizadas

### Core
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.5.3** - Superset tipado do JavaScript
- **Vite 5.4.2** - Build tool e dev server ultrarrápido

### Estilização
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **PostCSS** - Processador CSS
- **Autoprefixer** - Adiciona prefixos CSS automaticamente

### UI & Ícones
- **Lucide React** - Biblioteca de ícones moderna

### Backend (Preparado para integração futura)
- **Supabase JS 2.57.4** - Cliente para integração com Supabase

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para código JavaScript/TypeScript
- **TypeScript ESLint** - Regras específicas para TypeScript

---

## 📦 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. **Clone o repositório**
```powershell
git clone https://github.com/Juauzin/Barber-Express-2.0.git
cd Barber-Express-2.0
```

2. **Instale as dependências**
```powershell
npm install
```

3. **Inicie o servidor de desenvolvimento**
```powershell
npm run dev
```

4. **Acesse a aplicação**
   - Abra seu navegador em: `http://localhost:5173`

### Contas de Demonstração

**Cliente:**
- Email: `joao@gmail.com`
- Senha: `123`

**Barbeiro:**
- Email: `jardel@barber.com`
- Senha: `123`

---

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot-reload |
| `npm run build` | Cria build de produção otimizado |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa ESLint para verificar qualidade do código |
| `npm run typecheck` | Verifica erros de tipagem TypeScript |

---

## 📁 Estrutura do Projeto

```
Barber-Express-2.0/
├── src/                          # Código-fonte da aplicação
│   ├── components/               # Componentes React
│   ├── context/                  # Context API (estado global)
│   ├── types/                    # Definições TypeScript
│   ├── App.tsx                   # Componente raiz da aplicação
│   ├── main.tsx                  # Ponto de entrada
│   ├── index.css                 # Estilos globais + Tailwind
│   └── vite-env.d.ts            # Tipos do Vite
├── index.html                    # HTML base
├── package.json                  # Dependências e scripts
├── vite.config.ts               # Configuração do Vite
├── tailwind.config.js           # Configuração do Tailwind
├── postcss.config.js            # Configuração do PostCSS
├── tsconfig.json                # Configuração TypeScript (geral)
├── tsconfig.app.json            # Configuração TypeScript (app)
├── tsconfig.node.json           # Configuração TypeScript (Node)
├── eslint.config.js             # Configuração do ESLint
└── README.md                     # Este arquivo
```

---

## 📂 Arquivos de Configuração Raiz

### `index.html`
Arquivo HTML principal da aplicação. Serve como ponto de entrada para o Vite e contém:
- Configuração de meta tags
- Div raiz (`#root`) onde o React é montado
- Import do script `main.tsx`

### `package.json`
Manifesto do projeto NPM contendo:
- **Dependências de produção**: React, React DOM, Supabase, Lucide Icons
- **Dependências de desenvolvimento**: Vite, TypeScript, ESLint, Tailwind CSS
- **Scripts**: Comandos para dev, build, lint, etc.
- **Metadados**: Nome, versão e tipo do projeto

### `vite.config.ts`
Configuração do Vite (build tool):
- Plugin do React para JSX/Fast Refresh
- Otimizações de dependências (exclui `lucide-react` do pre-bundling)
- Configurações de build e servidor de desenvolvimento

### `tailwind.config.js`
Configuração do Tailwind CSS:
- Define quais arquivos devem ser escaneados para classes CSS (`content`)
- Extensões de tema personalizadas
- Plugins adicionais (se houver)

### `postcss.config.js`
Configuração do PostCSS:
- Plugin do Tailwind CSS
- Autoprefixer para compatibilidade cross-browser

### `tsconfig.json`
Configuração base do TypeScript:
- Estende outras configs (`tsconfig.app.json`)
- Define opções de compilação globais
- Configuração de paths e módulos

### `tsconfig.app.json`
Configuração TypeScript específica para o código da aplicação:
- Target ES2020
- Modo strict ativado
- Configurações de JSX (React)
- Includes/excludes de arquivos

### `tsconfig.node.json`
Configuração TypeScript para scripts Node.js (arquivos de config):
- Usado para arquivos como `vite.config.ts`
- Configurações específicas para ambiente Node

### `eslint.config.js`
Configuração do ESLint:
- Regras recomendadas para JavaScript e TypeScript
- Plugins: React Hooks, React Refresh
- Regras customizadas (warn/error)
- Ignora pasta `dist`

---

## 📂 Pasta `src/`

### Arquivos Principais

#### `main.tsx`
**Ponto de entrada da aplicação React**
- Renderiza o componente `<App />` no DOM
- Habilita o React Strict Mode (detecção de problemas)
- Importa estilos globais (`index.css`)

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

#### `App.tsx`
**Componente raiz e orquestrador principal**
- Envolve toda aplicação com `AppProvider` (Context API)
- Gerencia fluxo de autenticação (Login/SignUp)
- Decide qual interface renderizar (Cliente ou Barbeiro)
- Controla navegação entre telas de auth

**Lógica:**
1. Se não há usuário logado → mostra Login ou SignUp
2. Se usuário é do tipo 'customer' → renderiza `CustomerApp`
3. Se usuário é do tipo 'barber' → renderiza `BarberApp`

#### `index.css`
**Estilos globais da aplicação**
- Importa diretivas do Tailwind (`@tailwind base/components/utilities`)
- Pode conter estilos CSS customizados globais
- Reset CSS padrão

#### `vite-env.d.ts`
**Definições de tipos para o Vite**
- Tipos para assets (imagens, SVG, etc.)
- Referência aos tipos do Vite client
- Permite importar arquivos estáticos com type-safety

---

### `src/context/`

#### `AppContext.tsx`
**Gerenciador de estado global da aplicação**

**Responsabilidades:**
- Armazena dados mocados (usuários, barbeiros, serviços, agendamentos, slots)
- Fornece funções para manipular dados (login, logout, signUp, addAppointment, etc.)
- Disponibiliza hook `useApp()` para consumir contexto

**Dados Iniciais:**
- `initialUsers`: Lista de usuários (clientes e barbeiros) para demo
- `initialBarbers`: Barbeiros disponíveis com ratings
- `initialServices`: Serviços oferecidos (corte, barba, combo)
- `initialAvailableSlots`: Horários disponíveis por barbeiro/data
- `initialAppointments`: Agendamentos de exemplo

**Principais Funções:**
- `login(email, password)`: Autentica usuário
- `logout()`: Remove usuário da sessão
- `signUp(...)`: Registra novo cliente
- `addAppointment(...)`: Cria novo agendamento
- `updateAvailableSlots(...)`: Atualiza horários disponíveis do barbeiro

---

### `src/types/`

#### `index.ts`
**Definições de tipos TypeScript do projeto**

**Tipos Principais:**

```typescript
// Tipo de usuário (cliente ou barbeiro)
type UserType = 'customer' | 'barber'

// Usuário autenticado
interface User {
  id: number
  name: string
  email: string
  password: string
  type: UserType
  phone?: string
  photoUrl?: string
}

// Barbeiro disponível para agendamento
interface Barber {
  id: number
  name: string
  photoUrl: string
  rating: number
}

// Serviço oferecido
interface Service {
  id: number
  name: string
  price: number
  durationMinutes: number
}

// Horários disponíveis
interface AvailableSlot {
  barberId: number
  date: string
  hours: string[]
}

// Status do agendamento
type AppointmentStatus = 'Scheduled' | 'Completed' | 'Canceled'

// Agendamento
interface Appointment {
  id: number
  customerId: number
  barberId: number
  serviceId: number
  date: string
  time: string
  status: AppointmentStatus
}
```

---

### `src/components/`

#### `CustomerApp.tsx`
**Container principal da interface do cliente**

**Responsabilidades:**
- Gerencia navegação entre telas do cliente
- Controla fluxo de agendamento (wizard multi-step)
- Renderiza barra de navegação inferior (BottomNav)
- Mantém estado do agendamento em progresso

**Telas/Views:**
- `home`: Página inicial com barbeiros disponíveis
- `schedule-barber`: Seleção de barbeiro
- `schedule-datetime`: Seleção de data/hora/serviço
- `schedule-summary`: Resumo do agendamento
- `schedule-success`: Confirmação de sucesso
- `appointments`: Lista de agendamentos do cliente
- `favorites`: Barbeiros favoritos
- `profile`: Perfil do usuário

**Componentes Utilizados:**
- `CustomerHome`, `ScheduleBarber`, `ScheduleDateTime`, etc.
- `BottomNav`: Navegação inferior
- `AIFloatingButton`: Botão flutuante (IA assistente)

#### `BarberApp.tsx`
**Container principal da interface do barbeiro**

**Responsabilidades:**
- Alterna entre visualização de agenda e gerenciamento
- Renderiza telas específicas do barbeiro

**Views:**
- `schedule`: Visualiza agendamentos do dia/semana (`BarberSchedule`)
- `manage`: Gerencia horários disponíveis (`ManageSchedule`)

**Componentes Utilizados:**
- `BarberSchedule`: Grade de horários agendados
- `ManageSchedule`: Interface para definir disponibilidade
- `AIFloatingButton`: Assistente flutuante

#### `AIFloatingButton.tsx`
**Botão flutuante de assistente virtual (IA)**

**Funcionalidades:**
- Botão fixo no canto inferior direito
- Design responsivo e acessível
- Preparado para integração com IA/chatbot
- Visual: ícone de mensagem com gradiente

---

### `src/components/auth/`

#### `Login.tsx`
**Tela de autenticação de usuários**

**Funcionalidades:**
- Formulário de login (email + senha)
- Validação de credenciais
- Mensagens de erro
- Link para tela de cadastro
- Lista de contas demo para testes

**Campos:**
- Email
- Senha

**Ações:**
- Login: Valida e autentica usuário via `AppContext.login()`
- Switch: Alterna para tela de SignUp

#### `SignUp.tsx`
**Tela de cadastro de novos clientes**

**Funcionalidades:**
- Formulário de registro
- Validação de dados
- Criação automática de novo usuário
- Auto-login após cadastro bem-sucedido

**Campos:**
- Nome completo
- Email
- Telefone
- Senha

**Ações:**
- Cadastrar: Cria novo usuário via `AppContext.signUp()`
- Switch: Volta para tela de Login

---

### `src/components/barber/`

#### `BarberSchedule.tsx`
**Painel de visualização da agenda do barbeiro**

**Funcionalidades:**
- Lista agendamentos confirmados
- Exibe detalhes: cliente, serviço, horário, status
- Filtros por data/período
- Botão para acessar gerenciamento de agenda

**Informações Exibidas:**
- Nome e foto do cliente
- Serviço contratado
- Data e horário
- Duração estimada
- Status (Agendado/Concluído/Cancelado)

#### `ManageSchedule.tsx`
**Interface de gerenciamento de disponibilidade**

**Funcionalidades:**
- Define horários disponíveis por dia
- Calendário para seleção de datas
- Grid de horários (8h às 18h)
- Salvar/atualizar disponibilidade
- Voltar para visualização de agenda

**Interação:**
- Seleciona data no calendário
- Marca/desmarca horários disponíveis
- Salva alterações via `AppContext.updateAvailableSlots()`

---

### `src/components/customer/`

#### `BottomNav.tsx`
**Barra de navegação inferior do cliente**

**Ícones/Menus:**
- 🏠 Home (Início)
- 📅 Appointments (Meus Agendamentos)
- ⭐ Favorites (Favoritos)
- 👤 Profile (Perfil)

**Características:**
- Fixada na parte inferior
- Destaque visual no item ativo
- Responsiva e touch-friendly

#### `CustomerHome.tsx`
**Página inicial do cliente**

**Conteúdo:**
- Saudação personalizada com nome do usuário
- Lista de barbeiros disponíveis
- Cards com foto, nome, rating
- Botão "Agendar Agora" para cada barbeiro
- Design clean e moderno

**Ações:**
- Iniciar agendamento: Define barbeiro e navega para próximo passo

#### `Favorites.tsx`
**Lista de barbeiros favoritos**

**Funcionalidades:**
- Exibe barbeiros marcados como favoritos pelo cliente
- Cards similares à home
- Ação rápida de agendamento
- Estado vazio quando não há favoritos

#### `MyAppointments.tsx`
**Histórico e agendamentos futuros do cliente**

**Funcionalidades:**
- Lista todos agendamentos (passados e futuros)
- Filtros por status (Agendado/Concluído/Cancelado)
- Detalhes: barbeiro, serviço, data, hora, valor
- Opções de cancelamento (para agendamentos futuros)

**Informações Exibidas:**
- Foto e nome do barbeiro
- Serviço contratado
- Data e horário
- Status com badge colorido
- Valor total

#### `MyProfile.tsx`
**Perfil do usuário logado**

**Funcionalidades:**
- Exibição de dados pessoais
- Foto de perfil
- Nome, email, telefone
- Estatísticas (agendamentos totais, favoritos)
- Botão de logout
- Opções futuras: editar perfil, configurações

**Informações:**
- Avatar do usuário
- Dados cadastrais
- Histórico resumido
- Preferências

#### `ScheduleBarber.tsx`
**Passo 1: Seleção de barbeiro**

**Funcionalidades:**
- Grid/lista de barbeiros disponíveis
- Filtros e busca (futuro)
- Seleção de barbeiro
- Botão "Próximo" para avançar

**Visual:**
- Cards com foto, nome, rating
- Indicador visual de seleção
- Navegação clara

#### `ScheduleDateTime.tsx`
**Passo 2: Seleção de data, horário e serviço**

**Funcionalidades:**
- Calendário para escolha de data
- Grid de horários disponíveis (baseado em `availableSlots`)
- Lista de serviços com preço e duração
- Validação de disponibilidade
- Botões: Voltar / Próximo

**Lógica:**
- Filtra horários disponíveis do barbeiro selecionado
- Desabilita horários já ocupados
- Calcula disponibilidade em tempo real

#### `ScheduleSummary.tsx`
**Passo 3: Revisão e confirmação do agendamento**

**Funcionalidades:**
- Exibe resumo completo do agendamento
- Informações: barbeiro, serviço, data, hora, valor
- Confirmação final
- Botões: Voltar (editar) / Confirmar

**Dados Exibidos:**
- Card do barbeiro selecionado
- Detalhes do serviço
- Data e horário formatados
- Valor total
- Tempo estimado

**Ação:**
- Confirmar: Cria agendamento via `AppContext.addAppointment()`

#### `ScheduleSuccess.tsx`
**Passo 4: Confirmação de sucesso**

**Funcionalidades:**
- Mensagem de sucesso
- Resumo do agendamento criado
- Animações de celebração
- Botões de ação: Ver Agendamentos / Voltar ao Início

**Visual:**
- Ícone de sucesso (check)
- Card com detalhes do agendamento
- Design positivo e encorajador

---

## ✨ Funcionalidades

### Para Clientes
- ✅ Cadastro e login
- ✅ Visualização de barbeiros disponíveis
- ✅ Agendamento passo-a-passo (wizard)
- ✅ Escolha de serviços, data e horário
- ✅ Histórico de agendamentos
- ✅ Gerenciamento de favoritos
- ✅ Perfil pessoal
- ✅ Interface responsiva

### Para Barbeiros
- ✅ Login
- ✅ Visualização de agenda
- ✅ Gerenciamento de horários disponíveis
- ✅ Calendário interativo
- ✅ Dashboard de agendamentos

### Gerais
- ✅ Autenticação com múltiplos perfis
- ✅ Estado global com Context API
- ✅ Design moderno com Tailwind CSS
- ✅ Tipagem completa com TypeScript
- ✅ Performance otimizada com Vite
- ✅ Código limpo e componentizado

---

## 🔮 Próximos Passos

- [ ] Integração com backend (Supabase)
- [ ] Sistema de notificações
- [ ] Chat entre cliente e barbeiro
- [ ] Pagamentos online
- [ ] Avaliações e reviews
- [ ] Sistema de fidelidade/pontos
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro/claro

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **Juauzin**

---

## 📄 Licença

Este projeto é privado e de uso pessoal
		- `customer/` — telas cliente (`CustomerHome.tsx`, `ScheduleBarber.tsx`, `ScheduleDateTime.tsx`, `ScheduleSummary.tsx`, `ScheduleSuccess.tsx`, `MyAppointments.tsx`, `MyProfile.tsx`, `BottomNav.tsx`, `Favorites.tsx`)
		- `AIFloatingButton.tsx` — botão flutuante presente em todas as telas do cliente
		- `CustomerApp.tsx` / `BarberApp.tsx` — containers que controlam fluxo e navegação interna entre telas (simulação de um app mobile)
	- `types/` — tipos TypeScript compartilhados (ex.: `Service`)

## Fluxos principais (resumo)
- Autenticação
	- `Login.tsx` e `SignUp.tsx` permitem entrar/registrar — o `AppContext` contém lógica simplificada para autenticar com contas demo.

- Cliente (Customer)
	- `CustomerApp.tsx` controla qual tela exibir usando um estado `view`.
	- Fluxo de agendamento:
		1. `ScheduleBarber` — escolhe barbeiro
		2. `ScheduleDateTime` — escolhe data, horário e serviços
		3. `ScheduleSummary` — revisão dos dados e confirmação
		4. `ScheduleSuccess` — confirmação final
	- `MyAppointments`, `MyProfile`, `Favorites` — telas de gerenciamento e visualização.

- Barbeiro
	- `BarberSchedule` — lista os agendamentos do barbeiro
	- `ManageSchedule` — cadastra/edita dias e horários disponíveis

## Dados e formas (contract)
O `AppContext` exporta funções e dados usados pelos componentes. Formas principais:
- User (exemplo): { id: number, name: string, email: string, phone?: string, role: 'customer' | 'barber', photoUrl?: string }
- Appointment: { id: number, customerId: number, barberId: number, serviceId: number, date: string (YYYY-MM-DD), time: string (HH:mm), status: 'Scheduled'|'Completed'|'Canceled' }
- AvailableSlot: { barberId: number, date: string, hours: string[] }
- Service: { id: number, name: string, price: number, durationMinutes: number }

## Internacionalização / Tradução
Atualmente fiz traduções diretas no código (strings em PT-BR) em várias telas. Para escalar traduções no futuro recomendo integrar uma biblioteca de i18n, como `react-i18next` ou `react-intl`, extraindo todas as strings para arquivos de recursos.

## Linter / Typecheck
- Rode `npm run lint` para verificar problemas de estilo.
- Rode `npm run typecheck` para garantir tipos TypeScript corretos.



