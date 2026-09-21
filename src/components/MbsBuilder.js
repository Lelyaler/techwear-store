import { CartState } from '../modules/cart.js';
import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';
import { ProfileState } from '../modules/profile.js';

import jacketImg from '../assets/jacket.webp';
import chestRigImg from '../assets/chest-rig.webp';
import backpackImg from '../assets/backpack.webp';
import visorImg from '../assets/visor.webp';
import glovesImg from '../assets/gloves.webp';
import sneakersImg from '../assets/sneakers.webp';
import maskImg from '../assets/mask.webp';
import trenchImg from '../assets/trench.webp';
import vestImg from '../assets/vest.webp';
import slingImg from '../assets/sling.webp';
import exoGlovesImg from '../assets/exo-gloves.webp';
import bootsImg from '../assets/boots.webp';
import mannequinImg from '../assets/mbs_mannequin.webp';

const BUILDER_PRODUCTS = [
  { id: 'mod-jacket-x1', name: 'X-1 Shadow Shell Jacket', price: 289, image: jacketImg, slot: 'body', weight: 1.8 },
  { id: 'mod-rig-c3', name: 'C-3 Cyber Rig Harness', price: 145, image: chestRigImg, slot: 'chest', weight: 0.9 },
  { id: 'mod-backpack-b5', name: 'B-5 Modular Pack V2', price: 195, image: backpackImg, slot: 'back', weight: 1.2 },
  { id: 'mod-visor-g9', name: 'G-9 Cyber Visor Specs', price: 95, image: visorImg, slot: 'head', weight: 0.2 },
  { id: 'mod-gloves-gl2', name: 'GL-2 Tactical Gloves', price: 75, image: glovesImg, slot: 'hands', weight: 0.3 },
  { id: 'mod-sneakers-s7', name: 'S-7 Cyber Sneakers', price: 220, image: sneakersImg, slot: 'feet', weight: 1.4 },
  { id: 'mod-mask-m1', name: 'M-1 Cyber Rebreather Mask', price: 120, image: maskImg, slot: 'head', weight: 0.4 },
  { id: 'mod-trench-x2', name: 'X-2 Tactical Trench Coat', price: 310, image: trenchImg, slot: 'body', weight: 2.2 },
  { id: 'mod-vest-v8', name: 'V-8 Recon Tactical Vest', price: 180, image: vestImg, slot: 'chest', weight: 1.5 },
  { id: 'mod-sling-b6', name: 'B-6 Tactical Sling Bag', price: 135, image: slingImg, slot: 'back', weight: 0.7 },
  { id: 'mod-gloves-gl5', name: 'GL-5 Exo-Skeletal Gloves', price: 95, image: exoGlovesImg, slot: 'hands', weight: 0.4 },
  { id: 'mod-boots-bt9', name: 'BT-9 Exo-Steel Boots', price: 260, image: bootsImg, slot: 'feet', weight: 1.9 }
];

export const MbsBuilder = {
  equippedItems: {
    head: null,
    body: null,
    chest: null,
    back: null,
    hands: null,
    feet: null
  },
  activeSlot: 'body',

  render() {
    return `
      <div class="mbs-overlay" id="mbs-overlay" aria-modal="true" role="dialog">
        <div class="mbs-modal">
          
          <div class="mbs-header">
            <div class="mbs-title-group">
              <span class="mbs-title">MBS CUSTOMIZER // v1.4</span>
              <span class="mbs-subtitle">MODULAR BELT SYSTEM COMPATIBILITY PROTOCOL</span>
            </div>
            <button class="mbs-close" id="mbs-close-btn" aria-label="Закрыть конструктор">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="mbs-workspace">
            
            <div class="mbs-blueprint">
              <div class="mbs-grid"></div>
              
              <div class="mbs-mannequin-container">
                <div class="mbs-scanner-line"></div>

                <div class="mbs-hud-diagnostics">
                  <div class="mbs-hud-diagnostics__header">SYSTEM INTEGRITY SCAN //</div>
                  <div class="mbs-hud-diagnostics__row" id="hud-diag-slot">SLOT: NONE</div>
                  <div class="mbs-hud-diagnostics__row" id="hud-diag-item">ITEM: UNKNOWN</div>
                  <div class="mbs-hud-diagnostics__row" id="hud-diag-weight">WEIGHT: -- KG</div>
                </div>
                
                <img class="mbs-mannequin-image" src="${mannequinImg}" alt="MANNEQUIN SYSTEM PROTOCOL" width="600" height="894" loading="lazy" decoding="async" />

                <svg class="mbs-mannequin-svg" viewBox="0 0 100 150">
                  <g stroke="var(--color-accent-blue)" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.45">
                    <line x1="12" y1="22" x2="50" y2="24" id="line-head"></line>
                    <line x1="88" y1="37" x2="68" y2="45" id="line-back"></line>
                    <line x1="12" y1="57" x2="49" y2="48" id="line-chest"></line>
                    <line x1="88" y1="75" x2="68" y2="68" id="line-hands"></line>
                    <line x1="12" y1="93" x2="48" y2="75" id="line-body"></line>
                    <line x1="88" y1="129" x2="50" y2="132" id="line-feet"></line>
                  </g>
                </svg>

                <div class="mbs-node" id="node-head" data-slot="head">
                  <div class="mbs-node__circle">
                    <span class="mbs-node__placeholder">HD</span>
                    <img id="node-head-img" src="" class="mbs-node__img" alt="Head" />
                  </div>
                  <span class="mbs-node__label">HEAD</span>
                </div>
                
                <div class="mbs-node" id="node-body" data-slot="body">
                  <div class="mbs-node__circle">
                    <span class="mbs-node__placeholder">BD</span>
                    <img id="node-body-img" src="" class="mbs-node__img" alt="Body" />
                  </div>
                  <span class="mbs-node__label">SHELL</span>
                </div>

                <div class="mbs-node" id="node-chest" data-slot="chest">
                  <div class="mbs-node__circle">
                    <span class="mbs-node__placeholder">CH</span>
                    <img id="node-chest-img" src="" class="mbs-node__img" alt="Chest" />
                  </div>
                  <span class="mbs-node__label">VEST</span>
                </div>

                <div class="mbs-node" id="node-back" data-slot="back">
                  <div class="mbs-node__circle">
                    <span class="mbs-node__placeholder">BK</span>
                    <img id="node-back-img" src="" class="mbs-node__img" alt="Back" />
                  </div>
                  <span class="mbs-node__label">PACK</span>
                </div>

                <div class="mbs-node" id="node-hands" data-slot="hands">
                  <div class="mbs-node__circle">
                    <span class="mbs-node__placeholder">HN</span>
                    <img id="node-hands-img" src="" class="mbs-node__img" alt="Hands" />
                  </div>
                  <span class="mbs-node__label">HANDS</span>
                </div>

                <div class="mbs-node" id="node-feet" data-slot="feet">
                  <div class="mbs-node__circle">
                    <span class="mbs-node__placeholder">FT</span>
                    <img id="node-feet-img" src="" class="mbs-node__img" alt="Feet" />
                  </div>
                  <span class="mbs-node__label">FEET</span>
                </div>

              </div>
            </div>

            <div class="mbs-controls">
              
              <div class="mbs-slots-list">
                <div class="mbs-slot-card" data-slot="head">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Head Module //</span>
                    <span class="mbs-slot-equipped" id="slot-head-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-head-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card mbs-slot-card--active" data-slot="body">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Shell Module //</span>
                    <span class="mbs-slot-equipped" id="slot-body-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-body-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="chest">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Harness Module //</span>
                    <span class="mbs-slot-equipped" id="slot-chest-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-chest-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="back">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Cargo Module //</span>
                    <span class="mbs-slot-equipped" id="slot-back-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-back-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="hands">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Tactical Gloves //</span>
                    <span class="mbs-slot-equipped" id="slot-hands-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-hands-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="feet">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Footwear Module //</span>
                    <span class="mbs-slot-equipped" id="slot-feet-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-feet-badge">EMPTY</span>
                </div>
              </div>

              <div class="mbs-selection-panel">
                <span class="mbs-selection-title" id="mbs-selection-title">AVAILABLE SHELL MODS //</span>
                <div class="mbs-options-list" id="mbs-options-list"></div>
              </div>

            </div>

          </div>

          <div class="mbs-footer">
            <div class="mbs-summary">
              <div class="mbs-summary-item">
                <span class="mbs-summary-label">SYSTEM VALUE //</span>
                <span class="mbs-summary-value mbs-summary-value--accent" id="mbs-total-price">$0</span>
              </div>
              <div class="mbs-summary-item">
                <span class="mbs-summary-label">SYSTEM LOAD //</span>
                <span class="mbs-summary-value" id="mbs-total-weight">0.0 KG</span>
              </div>
            </div>
            
            <div class="mbs-actions">
              <button class="mbs-btn mbs-btn--secondary js-interactive" id="mbs-share-btn" title="Share current loadout link">
                SHARE CONFIG //
              </button>
              <button class="mbs-btn mbs-btn--secondary js-interactive" id="mbs-reset-btn">
                PURGE SYSTEM //
              </button>
              <button class="mbs-btn mbs-btn--primary js-interactive" id="mbs-deploy-btn" disabled>
                DEPLOY SYSTEM [ADD ALL] //
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  open() {
    const overlay = document.getElementById('mbs-overlay');
    if (overlay) {
      overlay.classList.add('mbs-overlay--open');
      document.body.style.overflow = 'hidden';
      AudioService.playOpen();
    }
    
    this.updateUI();
    this.selectSlot('body');
  },

  close() {
    const overlay = document.getElementById('mbs-overlay');
    if (overlay) {
      overlay.classList.remove('mbs-overlay--open');
      document.body.style.overflow = '';
      AudioService.playClick();
    }
  },

  selectSlot(slotName) {
    this.activeSlot = slotName;
    
    document.querySelectorAll('.mbs-slot-card').forEach(card => {
      if (card.dataset.slot === slotName) {
        card.classList.add('mbs-slot-card--active');
      } else {
        card.classList.remove('mbs-slot-card--active');
      }
    });

    document.querySelectorAll('.mbs-node').forEach(node => {
      if (node.dataset.slot === slotName) {
        node.classList.add('mbs-node--active');
      } else {
        node.classList.remove('mbs-node--active');
      }
    });

    document.querySelectorAll('.mbs-mannequin-svg line').forEach(line => {
      line.setAttribute('stroke', 'var(--color-accent-blue)');
      line.setAttribute('stroke-width', '0.8');
      line.setAttribute('opacity', '0.45');
      line.setAttribute('stroke-dasharray', '2,2');
    });
    const activeLine = document.getElementById(`line-${slotName}`);
    if (activeLine) {
      activeLine.setAttribute('stroke', 'var(--color-accent-pink)');
      activeLine.setAttribute('stroke-width', '1.5');
      activeLine.setAttribute('opacity', '1');
      activeLine.removeAttribute('stroke-dasharray');
    }

    const item = this.equippedItems[slotName];
    const diagSlot = document.getElementById('hud-diag-slot');
    const diagItem = document.getElementById('hud-diag-item');
    const diagWeight = document.getElementById('hud-diag-weight');
    
    if (diagSlot) diagSlot.textContent = `SLOT: ${slotName.toUpperCase()}`;
    if (diagItem) diagItem.textContent = `ITEM: ${item ? item.name.toUpperCase() : 'EMPTY'}`;
    if (diagWeight) diagWeight.textContent = `WEIGHT: ${item ? item.weight.toFixed(1) + ' KG' : '0.0 KG'}`;

    const titleEl = document.getElementById('mbs-selection-title');
    if (titleEl) {
      titleEl.textContent = `AVAILABLE ${slotName.toUpperCase()} MODULES //`;
    }

    this.renderOptionsList();
  },

  renderOptionsList() {
    const optionsContainer = document.getElementById('mbs-options-list');
    if (!optionsContainer) return;

    const slotProducts = BUILDER_PRODUCTS.filter(p => p.slot === this.activeSlot);
    const currentlyEquipped = this.equippedItems[this.activeSlot];

    let html = `
      <div class="mbs-option-row ${!currentlyEquipped ? 'mbs-option-row--selected' : ''}" data-id="none">
        <div class="mbs-option-thumb" style="display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.4);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div class="mbs-option-body">
          <span class="mbs-option-name" style="color: var(--color-text-muted);">[ NO MODULE EQUIPPED ]</span>
          <span class="mbs-option-price">0.0 KG</span>
        </div>
      </div>
    `;

    slotProducts.forEach(prod => {
      const isSelected = currentlyEquipped && currentlyEquipped.id === prod.id;
      html += `
        <div class="mbs-option-row ${isSelected ? 'mbs-option-row--selected' : ''}" data-id="${prod.id}">
          <div class="mbs-option-thumb">
            <img src="${prod.image}" alt="${prod.name}" />
          </div>
          <div class="mbs-option-body">
            <span class="mbs-option-name">${prod.name}</span>
            <span class="mbs-option-price">$${prod.price} // ${prod.weight} KG</span>
          </div>
        </div>
      `;
    });

    optionsContainer.innerHTML = html;
  },

  equipItem(productId) {
    if (productId === 'none') {
      this.equippedItems[this.activeSlot] = null;
    } else {
      const product = BUILDER_PRODUCTS.find(p => p.id === productId);
      if (product) {
        this.equippedItems[this.activeSlot] = product;
      }
    }
    
    AudioService.playClick();
    this.updateUI();
    this.renderOptionsList();
  },

  updateUI() {
    let totalPrice = 0;
    let totalWeight = 0;
    let equippedCount = 0;

    Object.keys(this.equippedItems).forEach(slot => {
      const item = this.equippedItems[slot];
      const textEl = document.getElementById(`slot-${slot}-text`);
      const badgeEl = document.getElementById(`slot-${slot}-badge`);
      const nodeEl = document.getElementById(`node-${slot}`);
      const imgEl = document.getElementById(`node-${slot}-img`);
      const lineEl = document.getElementById(`line-${slot}`);

      if (item) {
        totalPrice += item.price;
        totalWeight += item.weight;
        equippedCount++;

        if (textEl) textEl.textContent = item.name;
        if (badgeEl) {
          badgeEl.textContent = 'EQUIPPED';
          badgeEl.className = 'mbs-slot-status-badge mbs-slot-status-badge--equipped';
        }

        if (nodeEl) nodeEl.classList.add('mbs-node--equipped');
        if (imgEl) imgEl.src = item.image;
        
        if (lineEl) {
          const colorMap = {
            head: 'var(--color-accent-blue)',
            body: 'var(--color-accent-blue)',
            hands: 'var(--color-accent-blue)',
            chest: 'var(--color-accent-pink)',
            back: 'var(--color-accent-green)',
            feet: 'var(--color-accent-green)'
          };
          lineEl.setAttribute('stroke', colorMap[slot]);
          lineEl.setAttribute('opacity', '0.75');
          lineEl.classList.add('line--flowing');
        }
      } else {
        if (textEl) textEl.textContent = 'Empty slot';
        if (badgeEl) {
          badgeEl.textContent = 'EMPTY';
          badgeEl.className = 'mbs-slot-status-badge mbs-slot-status-badge--empty';
        }

        if (nodeEl) nodeEl.classList.remove('mbs-node--equipped');
        if (lineEl) {
          lineEl.setAttribute('stroke', 'var(--color-accent-blue)');
          lineEl.setAttribute('opacity', '0.35');
          lineEl.classList.remove('line--flowing');
        }
      }
    });

    const activeItem = this.equippedItems[this.activeSlot];
    const diagSlot = document.getElementById('hud-diag-slot');
    const diagItem = document.getElementById('hud-diag-item');
    const diagWeight = document.getElementById('hud-diag-weight');
    
    if (diagSlot) diagSlot.textContent = `SLOT: ${this.activeSlot.toUpperCase()}`;
    if (diagItem) diagItem.textContent = `ITEM: ${activeItem ? activeItem.name.toUpperCase() : 'EMPTY'}`;
    if (diagWeight) diagWeight.textContent = `WEIGHT: ${activeItem ? activeItem.weight.toFixed(1) + ' KG' : '0.0 KG'}`;

    const priceEl = document.getElementById('mbs-total-price');
    const weightEl = document.getElementById('mbs-total-weight');
    const deployBtn = document.getElementById('mbs-deploy-btn');

    if (priceEl) priceEl.textContent = `$${totalPrice}`;
    if (weightEl) weightEl.textContent = `${totalWeight.toFixed(1)} KG`;
    
    if (deployBtn) {
      deployBtn.disabled = equippedCount === 0;
    }
  },

  reset() {
    Object.keys(this.equippedItems).forEach(slot => {
      this.equippedItems[slot] = null;
    });
    AudioService.playError();
    this.updateUI();
    this.renderOptionsList();
  },

  deployToCart() {
    let addCount = 0;
    Object.keys(this.equippedItems).forEach(slot => {
      const item = this.equippedItems[slot];
      if (item) {
        CartState.addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image
        });
        addCount++;
      }
    });

    if (addCount > 0) {
      AudioService.playSuccess();
      Toast.show(
        `DEPLOYED MODULE SUITE // ${addCount} ITEMS ENGAGED //`,
        'MBS CONFIG SYNC //',
        'blue'
      );
      ProfileState.addXP(50);
      this.close();
    }
  },

  shareLoadout() {
    const parts = [];
    Object.keys(this.equippedItems).forEach(slot => {
      const item = this.equippedItems[slot];
      if (item) {
        parts.push(`${slot}:${item.id}`);
      }
    });

    if (parts.length === 0) {
      AudioService.playError();
      Toast.show('NO MODULES EQUIPPED TO SHARE //', 'MBS SYNC ERROR //', 'pink');
      return;
    }

    const loadoutString = parts.join(',');
    const url = new URL(window.location.href);
    url.searchParams.set('loadout', loadoutString);

    navigator.clipboard.writeText(url.toString())
      .then(() => {
        AudioService.playSuccess();
        Toast.show('CONFIG COPIED TO CLIPBOARD //', 'MBS LINK LINKED //', 'green');
      })
      .catch(err => {
        console.error('Failed to copy loadout url: ', err);
        AudioService.playError();
      });
  },

  loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const loadout = params.get('loadout');
    if (!loadout) return;

    const parts = loadout.split(',');
    let loadedCount = 0;
    parts.forEach(part => {
      const [slot, id] = part.split(':');
      if (slot && id && slot in this.equippedItems) {
        const item = BUILDER_PRODUCTS.find(p => p.id === id);
        if (item) {
          this.equippedItems[slot] = item;
          loadedCount++;
        }
      }
    });

    if (loadedCount > 0) {
      this.updateUI();
      setTimeout(() => {
        this.open();
        Toast.show(`LOADED ${loadedCount} MODULES FROM LINK //`, 'MBS CONFIG SYNC //', 'blue');
      }, 500);

      const url = new URL(window.location.href);
      url.searchParams.delete('loadout');
      window.history.replaceState({}, document.title, url.toString());
    }
  },

  initListeners() {
    const overlay = document.getElementById('mbs-overlay');
    const closeBtn = document.getElementById('mbs-close-btn');
    const shareBtn = document.getElementById('mbs-share-btn');
    const resetBtn = document.getElementById('mbs-reset-btn');
    const deployBtn = document.getElementById('mbs-deploy-btn');

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.shareLoadout());
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset());
    }

    if (deployBtn) {
      deployBtn.addEventListener('click', () => this.deployToCart());
    }

    document.querySelectorAll('.mbs-node').forEach(node => {
      node.addEventListener('click', () => {
        const slot = node.dataset.slot;
        if (slot) {
          AudioService.playClick();
          this.selectSlot(slot);
        }
      });
    });

    document.querySelectorAll('.mbs-slot-card').forEach(card => {
      card.addEventListener('click', () => {
        const slot = card.dataset.slot;
        if (slot) {
          AudioService.playClick();
          this.selectSlot(slot);
        }
      });
    });

    const optionsContainer = document.getElementById('mbs-options-list');
    if (optionsContainer) {
      optionsContainer.addEventListener('click', (e) => {
        const optionRow = e.target.closest('.mbs-option-row');
        if (optionRow) {
          const id = optionRow.dataset.id;
          this.equipItem(id);
        }
      });
    }
  }
};
