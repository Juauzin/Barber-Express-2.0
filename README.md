
Barber-Express-2.0

Documentação do projeto Barber-Express (frontend) — versão local

## Visão geral
Barber-Express é uma aplicação frontend em React + TypeScript criada com Vite, pensada para gestão e uso de agendamentos entre clientes e barbeiros. Inclui telas para login/registro, navegação do cliente, telas de barbeiro (visualizar/gerenciar agenda), fluxo de agendamento passo-a-passo e componentes auxiliares.

O repositório contém apenas o front-end (UI). O estado e dados fictícios são mantidos via um contexto local (`src/context/AppContext.tsx`) para facilitar demonstração e desenvolvimento sem backend real.

## Tecnologias principais
- React 18 + Functional Components
- TypeScript
- Vite (build/dev server)
- Tailwind CSS (estilos utilitários)
- Lucide (ícones)
- ESLint + TypeScript para linting e typecheck

## Scripts úteis (package.json)
- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm run build` — empacota para produção
- `npm run preview` — executa um servidor de preview do build
- `npm run lint` — executa o ESLint sobre o código
- `npm run typecheck` — checa os tipos TypeScript

## Como rodar localmente
1. Instale dependências:

```powershell
npm install
```

2. Rode em modo desenvolvimento:

```powershell
npm run dev
```

3. Acesse a aplicação no endereço mostrado pelo Vite (por padrão: http://localhost:5173).

> Observação: o projeto usa um contexto interno (sem backend). Existem contas demo listadas na tela de login para testes.

## Estrutura de pastas (resumida)
- `src/`
	- `main.tsx` — ponto de entrada da aplicação
	- `App.tsx` — wrapper principal (posta o `AppContext`)
	- `context/AppContext.tsx` — armazenamento global de estado (usuários, agendamentos, slots)
	- `components/` — componentes e telas
		- `auth/` — `Login.tsx`, `SignUp.tsx`
		- `barber/` — telas para barbeiro (`BarberSchedule.tsx`, `ManageSchedule.tsx`)
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



