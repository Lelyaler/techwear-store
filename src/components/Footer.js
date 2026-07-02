import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';
import '../styles/components/footer.css';

export const Footer = {
  render() {
    const year = new Date().getFullYear();
    return `
      <footer class="footer reveal">
        <div class="footer__container">
          
          <!-- Левая секция: Брендинг и Копирайт -->
          <div class="footer__section">
            <div class="footer__logo">
              <span class="footer__logo-brand">TECHWEAR</span>
              <span class="footer__logo-sub">// SYSTEM CORE</span>
            </div>
            <p class="footer__copyright">
              © ${year} TECHWEAR INC. // ALL RIGHTS SECURED.<br>
              DESIGNED FOR URBAN INFILTRATION.
            </p>
          </div>

          <!-- Средняя секция: Статус Телеметрии -->
          <div class="footer__section">
            <h4 class="footer__title">SYSTEM TELEMETRY //</h4>
            <div class="footer__telemetry">
              <div class="footer__telemetry-row">
                <span class="footer__telemetry-label">NETWORK PORT:</span>
                <span class="footer__telemetry-val">922 // SECURE</span>
              </div>
              <div class="footer__telemetry-row">
                <span class="footer__telemetry-label">LATENCY LINK:</span>
                <span class="footer__telemetry-val footer__telemetry-val--green">12 MS</span>
              </div>
              <div class="footer__telemetry-row">
                <span class="footer__telemetry-label">SECURE SW CORE:</span>
                <span class="footer__telemetry-val footer__telemetry-val--green">ACTIVE (PWA)</span>
              </div>
            </div>
          </div>

          <!-- Правая секция: Юридические директивы -->
          <div class="footer__section">
            <h4 class="footer__title">LEGAL PROTOCOLS //</h4>
            <ul class="footer__links">
              <li>
                <button class="footer__link-btn js-legal-link" data-protocol="PRIVACY //">
                  PRIVACY PROTOCOL [E-24]
                </button>
              </li>
              <li>
                <button class="footer__link-btn js-legal-link" data-protocol="SHIPPING //">
                  UAV DISPATCH WARRANTY
                </button>
              </li>
              <li>
                <button class="footer__link-btn js-legal-link" data-protocol="REFUND //">
                  NEURAL REFUND CYCLES
                </button>
              </li>
            </ul>
          </div>

        </div>
      </footer>
    `;
  },

  initListeners() {
    const legalLinks = document.querySelectorAll('.js-legal-link');

    legalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const protocol = e.target.dataset.protocol;
        AudioService.playClick();
        Toast.show(
          `ACCESS CONFIRMED. PROTOCOL [${protocol}] ACTIVE AND ENCRYPTED. //`,
          'SECURITY PROTOCOL //',
          'blue'
        );
      });
    });
  }
};
