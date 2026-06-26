import './styles/variables.css';
import './styles/base.css';

// Точка входа в систему Techwear & Modular Gear
const initializeApp = () => {
  const appElement = document.querySelector('#app');
  
  if (!appElement) return;

  appElement.innerHTML = `
    <!-- Эффект CRT-сканирования для создания атмосферы -->
    <div class="scanline-overlay"></div>
    
    <div class="app">
      <!-- Временная шапка, далее заменим на полноценный компонент Header -->
      <header style="
        height: var(--header-height); 
        border-bottom: var(--border-width) solid var(--border-color); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        position: fixed; 
        width: 100%; 
        top: 0; 
        background: rgba(6, 7, 9, 0.85); 
        backdrop-filter: blur(12px); 
        -webkit-backdrop-filter: blur(12px);
        z-index: var(--z-header);
      ">
        <h1 style="
          font-size: 1.1rem; 
          color: var(--color-accent-blue); 
          text-shadow: var(--glow-blue); 
          letter-spacing: 0.15em;
        ">
          TECHWEAR // MODULE
        </h1>
      </header>
      
      <!-- Основной контент -->
      <main class="main">
        <section style="
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          min-height: 60vh; 
          text-align: center;
          padding: var(--space-xl) var(--space-sm);
        ">
          <h2 style="
            font-size: clamp(2rem, 5vw, 3.5rem); 
            margin-bottom: var(--space-sm); 
            background: linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-pink)); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
          ">
            MODULAR GEAR
          </h2>
          <p style="
            color: var(--color-text-secondary); 
            max-width: 540px; 
            font-size: clamp(0.85rem, 2vw, 1rem);
            line-height: 1.6;
            margin-bottom: var(--space-md);
          ">
            Прототип интернет-магазина высокотехнологичной экипировки и аксессуаров.
            Дизайн-система успешно настроена. Все зависимости установлены.
          </p>
          <div style="
            font-family: var(--font-display); 
            font-size: 0.75rem; 
            color: var(--color-accent-pink); 
            border: 1px solid var(--color-accent-pink); 
            padding: var(--space-xs) var(--space-sm); 
            letter-spacing: 0.2em;
            box-shadow: var(--glow-pink);
            text-transform: uppercase;
          ">
            Status: System Ready
          </div>
        </section>
      </main>
    </div>
  `;

  console.log('👾 [Techwear OS] System initialized successfully.');
};

document.addEventListener('DOMContentLoaded', initializeApp);
