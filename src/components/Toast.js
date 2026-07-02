import '../styles/components/toast.css';

/**
 * UI Компонент: Toast (Всплывающие уведомления)
 * Предоставляет глобальный сервис для вывода быстрых системных сообщений.
 */
export const Toast = {
  /**
   * Получить или создать глобальный контейнер уведомлений в DOM
   * @returns {HTMLElement}
   */
  getContainer() {
    let container = document.querySelector('.toast-container');
    
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    return container;
  },

  /**
   * Вывести всплывающее уведомление
   * @param {string} message - текст сообщения
   * @param {string} [title='SYSTEM //'] - заголовок сообщения
   * @param {string} [type='blue'] - тип оформления ('blue' или 'pink')
   */
  show(message, title = 'SYSTEM //', type = 'blue') {
    const container = this.getContainer();
    
    // Создаем элемент уведомления
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    toast.innerHTML = `
      <div class="toast__header">${title}</div>
      <div class="toast__message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Запускаем анимацию появления (в следующем тике отрисовки)
    setTimeout(() => {
      toast.classList.add('toast--show');
    }, 50);
    
    // Запускаем таймер на скрытие и удаление
    setTimeout(() => {
      // Плавное скрытие
      toast.classList.remove('toast--show');
      
      // Полное удаление из DOM после окончания CSS transition
      setTimeout(() => {
        toast.remove();
        
        // Если уведомлений больше нет — удаляем и сам контейнер
        const remainingToasts = container.querySelectorAll('.toast');
        if (remainingToasts.length === 0) {
          container.remove();
        }
      }, 300);
    }, 3000);
  }
};
