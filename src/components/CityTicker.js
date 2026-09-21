import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';
import '../styles/components/city-ticker.css';

export const CityTicker = {
  render() {
    const alertMessage = `
      [CITY ALERT] ACID STORM APPROACHING SECTORS 04, 08 & 09 // INFILTRATION RATING: LEVEL 3 WATERPROOF MEMBRANES RECOMMENDED // 
      [UAV DOCKS] FLIGHT TRAFFIC UPDATE: DOCKS ACTIVE, ALL DRONES READY FOR AUTONOMOUS DEPLOYMENT // 
      [NEURAL NETWORK] SIGNAL SYNC COMPLETED // ENCRYPTED promo codes decoded in profile terminal (NEURAL ID) // 
      [WEATHER CORE] ACID PRECIPITATION CURRENT TEMPERATURE: 14°C // ACID RATIO: 8.2pH // 
    `;

    return `
      <div class="city-ticker reveal js-interactive" id="city-ticker">
        <div class="city-ticker__badge">SYSTEM ALERT //</div>
        <div class="city-ticker__body">
          <div class="city-ticker__track">
            <span class="city-ticker__text">${alertMessage} ${alertMessage}</span>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    const ticker = document.getElementById('city-ticker');
    if (!ticker) return;

    ticker.addEventListener('click', () => {
      AudioService.playError();
      Toast.show(
        'ACID PRECIPITATION LEVEL 8.2pH INBOUND IN 15 MINUTES. LEVEL 3 SHIELD GEAR REQUIRED.',
        'TACTICAL WEATHER RADAR //',
        'pink'
      );
    });
  }
};
