import '../styles/components/toast.css';

export const Toast = {
  getContainer() {
    let container = document.querySelector('.toast-container');
    
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    return container;
  },

  show(message, title = 'SYSTEM //', type = 'blue') {
    const container = this.getContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    toast.innerHTML = `
      <div class="toast__header">${title}</div>
      <div class="toast__message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast--show');
    }, 50);
    
    setTimeout(() => {
      toast.classList.remove('toast--show');
      
      setTimeout(() => {
        toast.remove();
        
        const remainingToasts = container.querySelectorAll('.toast');
        if (remainingToasts.length === 0) {
          container.remove();
        }
      }, 300);
    }, 3000);
  }
};
