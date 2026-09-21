import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';
import '../styles/components/neon-chat.css';

export const NeonChat = {
  isOpen: false,
  messages: [
    { sender: 'system', text: 'Neural link established. N.E.O.N. Cortex AI online // Ready to optimize your tactical loadout.' }
  ],

  render() {
    return `
      <!-- Launcher Button -->
      <button class="neon-chat-trigger" id="neon-chat-trigger" aria-label="Open neural support link">
        <svg class="neon-chat-trigger__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <!-- Chat Window -->
      <div class="neon-chat-window neon-chat-window--hidden" id="neon-chat-window">
        <!-- Header -->
        <div class="neon-chat-header">
          <div class="neon-chat-title-group">
            <span class="neon-chat-title">N.E.O.N. CORTEX //</span>
            <span class="neon-chat-status">ONLINE // SEC_LINK_SECURE</span>
          </div>
          <button class="neon-chat-close" id="neon-chat-close-btn">X // DISCONNECT</button>
        </div>

        <!-- Message logs -->
        <div class="neon-chat-messages" id="neon-chat-messages-container">
          ${this.renderMessages()}
        </div>

        <!-- Input row -->
        <div class="neon-chat-input-row">
          <input 
            type="text" 
            class="neon-chat-input" 
            id="neon-chat-input-field" 
            placeholder="Ask N.E.O.N. Cortex..." 
            autocomplete="off" 
            aria-label="Ask N.E.O.N. Cortex" 
          />
          <button class="neon-chat-send" id="neon-chat-send-btn" aria-label="Send message">SEND</button>
        </div>
      </div>
    `;
  },

  renderMessages() {
    return this.messages.map(msg => {
      let text = msg.text;
      // Подсветим промокоды, если они есть в тексте
      text = text.replace(/(NEOHACK20|TACTICAL15)/g, '<span class="neon-chat-msg__code">$1</span>');
      return `
        <div class="neon-chat-msg neon-chat-msg--${msg.sender}">
          ${text}
        </div>
      `;
    }).join('');
  },

  toggle() {
    this.isOpen = !this.isOpen;
    const windowEl = document.getElementById('neon-chat-window');
    const triggerEl = document.getElementById('neon-chat-trigger');
    
    if (!windowEl || !triggerEl) return;

    if (this.isOpen) {
      windowEl.classList.remove('neon-chat-window--hidden');
      triggerEl.classList.add('neon-chat-trigger--active');
      AudioService.playOpen();
      // Scroll to bottom
      const msgsContainer = document.getElementById('neon-chat-messages-container');
      if (msgsContainer) msgsContainer.scrollTop = msgsContainer.scrollHeight;
      
      const inputEl = document.getElementById('neon-chat-input-field');
      if (inputEl) inputEl.focus();
    } else {
      windowEl.classList.add('neon-chat-window--hidden');
      triggerEl.classList.remove('neon-chat-trigger--active');
      AudioService.playClick();
    }
  },

  sendMessage() {
    const inputEl = document.getElementById('neon-chat-input-field');
    if (!inputEl) return;

    const val = inputEl.value.trim();
    if (!val) return;

    inputEl.value = '';
    AudioService.playClick();

    // 1. Добавляем сообщение пользователя
    this.messages.push({ sender: 'user', text: val });
    this.updateMessagesUI();

    // 2. Показываем лоадер "печатает..."
    const msgsContainer = document.getElementById('neon-chat-messages-container');
    if (!msgsContainer) return;

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'neon-chat-msg neon-chat-msg--system neon-chat-msg--typing';
    typingIndicator.id = 'neon-chat-typing-indicator';
    typingIndicator.innerHTML = 'Analyzing query...';
    msgsContainer.appendChild(typingIndicator);
    msgsContainer.scrollTop = msgsContainer.scrollHeight;

    // 3. Вычисляем и выводим ответ с задержкой
    setTimeout(() => {
      // Удаляем индикатор
      const indicator = document.getElementById('neon-chat-typing-indicator');
      if (indicator) indicator.remove();

      const reply = this.getBotReply(val);
      this.messages.push({ sender: 'system', text: reply });
      this.updateMessagesUI();
      AudioService.playSuccess();
    }, 1000);
  },

  updateMessagesUI() {
    const msgsContainer = document.getElementById('neon-chat-messages-container');
    if (msgsContainer) {
      msgsContainer.innerHTML = this.renderMessages();
      msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }
  },

  getBotReply(query) {
    const q = query.toLowerCase();

    if (q.includes('размер') || q.includes('рост') || q.includes('вес') || q.includes('size') || q.includes('fit') || q.includes('размерная сетка')) {
      return 'Для идеального подбора размера рекомендую использовать интерактивный сканер Cyber-Fit Assistant (кнопка "FIT ASSISTANT" внутри карточки товара или кнопка "NEURAL PROFILE" в меню). Он рассчитает ваш размер на основе вашего роста и веса.';
    }

    if (q.includes('скидк') || q.includes('промокод') || q.includes('купон') || q.includes('sale') || q.includes('discount') || q.includes('дешевле')) {
      return 'Внимание, Оператор. Доступ к скрытым секторам сети разрешен. Вы можете использовать промокод NEOHACK20 на этапе оформления заказа для получения скидки 20%. Также воспользуйтесь терминалом взлома в вашем NEURAL ID для разблокировки других кодов!';
    }

    if (q.includes('доставк') || q.includes('доставит') || q.includes('shipping') || q.includes('delivery') || q.includes('почта') || q.includes('минск')) {
      return 'Доставка модулей осуществляется зашифрованными транспортными дронами TECH-DISPATCH по Минску и другим секторам. Стандартное время транзита — от 1 до 2 планетарных циклов. Бесплатный запуск дронов при заказе от $200.';
    }

    if (q.includes('купит') || q.includes('заказ') || q.includes('checkout') || q.includes('buy') || q.includes('оформит')) {
      return 'Чтобы оформить заказ, добавьте необходимые модули в корзину и откройте её (иконка пакета вверху справа). Нажмите кнопку "CHECKOUT TERMINAL" для перехода к оформлению в стиле армейской тактической консоли.';
    }

    if (q.includes('конструктор') || q.includes('builder') || q.includes('mbs') || q.includes('customizer') || q.includes('собрать')) {
      return 'Используйте интерактивный конструктор MBS BUILDER (кнопка в шапке сайта). Он позволяет собрать полную тактическую выкладку (куртка + шлем + жилет + рюкзак + ботинки) и перенести всю сборку в корзину в одно нажатие.';
    }

    if (q.includes('кредит') || q.includes('credits') || q.includes('money') || q.includes('деньги') || q.includes('валюта')) {
      return 'За каждую покупку в магазине вам начисляется 10% кэшбэка в Cyber Credits (₵). Также вы можете получить кредиты, взламывая локальные узлы в личном кабинете через инъекции ядерных эксплойтов. Кредиты можно использовать для оплаты!';
    }

    if (q.includes('привет') || q.includes('здравствуй') || q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('салют')) {
      return 'Приветствую, Оператор. Нейросеть N.E.O.N. Cortex подключена к вашему терминалу. Ожидаю запросов по ассортименту, доставке, скидкам или конструктору модулей.';
    }

    if (q.includes('фракция') || q.includes('faction') || q.includes('netrunner') || q.includes('cyborg') || q.includes('recon') || q.includes('operative')) {
      return 'В вашем Neural ID вы можете выбрать одну из 4 фракций: NETRUNNER (ускоренный взлом промокодов), CYBORG (+20% синхронизация брони), RECON (+30% эффективность легких модулей) или OPERATIVE (+15% грузоподъемность).';
    }

    const fallbacks = [
      'Анализ запроса... База данных TECHWEAR подтверждает наличие совместимых модулей в каталоге. Спросите меня о скидках, размерах или доставке.',
      'Данные получены. Наш текущий ассортимент включает высокотехнологичные модули: от респираторов M-1 до экзоскелетных перчаток GL-5. Требуется ли помощь в конфигурации?',
      'Внимание: Зафиксирован повышенный уровень электромагнитного шума. Связь стабильна. Чем я могу помочь ваческому тактическому комплекту?',
      'Протокол связи Cortex v1.2 в режиме ожидания. Вы можете спросить о доставке, скидках, кредитах или о том, как использовать MBS Builder.'
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  },

  initListeners() {
    const triggerEl = document.getElementById('neon-chat-trigger');
    const closeEl = document.getElementById('neon-chat-close-btn');
    const inputEl = document.getElementById('neon-chat-input-field');
    const sendEl = document.getElementById('neon-chat-send-btn');

    if (triggerEl) {
      triggerEl.addEventListener('click', () => this.toggle());
    }

    if (closeEl) {
      closeEl.addEventListener('click', () => this.toggle());
    }

    if (sendEl) {
      sendEl.addEventListener('click', () => this.sendMessage());
    }

    if (inputEl) {
      inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }
  }
};
