import { StrictMode } from 'react'; // Modo estrito ajuda a detectar potenciais problemas em dev
import { createRoot } from 'react-dom/client'; // API moderna para montar aplicação React 18
import App from './App.tsx'; // Componente raiz da aplicação
import './index.css'; // Estilos globais + Tailwind

// Localiza a div #root no HTML e renderiza a aplicação React dentro dela.
// O "!" (non-null assertion) informa ao TypeScript que o elemento existe.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* StrictMode envolve a aplicação para verificar efeitos colaterais e avisos em desenvolvimento */}
    <App />
  </StrictMode>
);
