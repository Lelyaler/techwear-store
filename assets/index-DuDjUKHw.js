(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=null;localStorage.getItem(`techwear_sound`),localStorage.getItem(`techwear_ambient`);var t=[],n=null,r=!1,i=null,a=()=>(e||=new(window.AudioContext||window.webkitAudioContext),e.state===`suspended`&&e.resume().catch(()=>{}),e),o=(e,t,n,r,i=.001)=>{let o=a(),s=o.createOscillator(),c=o.createGain();return s.type=e,s.frequency.setValueAtTime(t,o.currentTime),c.gain.setValueAtTime(r,o.currentTime),c.gain.exponentialRampToValueAtTime(i,o.currentTime+n),s.connect(c),c.connect(o.destination),{osc:s,gainNode:c,ctx:o}},s={isEnabled(){return localStorage.getItem(`techwear_sound`)!==`false`},toggle(){let e=localStorage.getItem(`techwear_sound`)===`false`;return localStorage.setItem(`techwear_sound`,e?`true`:`false`),e},playClick(){if(localStorage.getItem(`techwear_sound`)!==`false`)try{let{osc:e,ctx:t}=o(`sine`,1200,.05,.08);e.frequency.exponentialRampToValueAtTime(300,t.currentTime+.05),e.start(),e.stop(t.currentTime+.05)}catch{}},playSuccess(){if(localStorage.getItem(`techwear_sound`)!==`false`)try{let e=a(),t=e.currentTime,n=(n,r,i)=>{let a=e.createOscillator(),o=e.createGain();a.type=`triangle`,a.frequency.setValueAtTime(n,t+r),o.gain.setValueAtTime(0,t+r),o.gain.linearRampToValueAtTime(.12,t+r+.02),o.gain.exponentialRampToValueAtTime(.001,t+r+i),a.connect(o),o.connect(e.destination),a.start(t+r),a.stop(t+r+i)};n(523.25,0,.15),n(783.99,.07,.25)}catch{}},playError(){if(localStorage.getItem(`techwear_sound`)!==`false`)try{let{osc:e,ctx:t}=o(`sawtooth`,130,.25,.05);e.frequency.linearRampToValueAtTime(70,t.currentTime+.25),e.start(),e.stop(t.currentTime+.25)}catch{}},playOpen(){if(localStorage.getItem(`techwear_sound`)!==`false`)try{let{osc:e,ctx:t}=o(`triangle`,320,.25,.1);e.frequency.exponentialRampToValueAtTime(880,t.currentTime+.2),e.start(),e.stop(t.currentTime+.25)}catch{}},isAmbientActive(){return r},startAmbient(){if(!r){i&&=(clearTimeout(i),null),t.forEach(e=>{try{e.stop()}catch{}}),t=[];try{let e=a();n=e.createGain(),n.gain.setValueAtTime(0,e.currentTime),n.gain.linearRampToValueAtTime(.12,e.currentTime+2);let i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.setValueAtTime(180,e.currentTime),i.Q.setValueAtTime(2.2,e.currentTime);let o=e.createOscillator(),s=e.createGain();o.frequency.value=.08,s.gain.value=45,o.connect(s),s.connect(i.frequency);let c=[],l=e.createOscillator();l.type=`sawtooth`,l.frequency.value=55;let u=e.createOscillator();u.type=`sawtooth`,u.frequency.value=55.4;let d=e.createOscillator();d.type=`sawtooth`,d.frequency.value=110;let f=e.createOscillator();f.type=`sawtooth`,f.frequency.value=110.8;let p=e.createOscillator();p.type=`triangle`,p.frequency.value=220,[l,u,d,f,p].forEach(e=>{e.connect(i),e.start(),c.push(e)}),o.start(),c.push(o),i.connect(n),n.connect(e.destination),t=c,r=!0,document.dispatchEvent(new CustomEvent(`ambient-status-updated`,{detail:{active:!0}}))}catch{}}},stopAmbient(){if(r){r=!1,i&&=(clearTimeout(i),null);try{let e=a();n&&(n.gain.cancelScheduledValues(e.currentTime),n.gain.setValueAtTime(n.gain.value,e.currentTime),n.gain.exponentialRampToValueAtTime(.001,e.currentTime+1.2));let r=t;t=[],i=setTimeout(()=>{r.forEach(e=>{try{e.stop()}catch{}}),i=null},1250),document.dispatchEvent(new CustomEvent(`ambient-status-updated`,{detail:{active:!1}}))}catch{}}},toggleAmbient(){return r?(this.stopAmbient(),localStorage.setItem(`techwear_ambient`,`false`)):(this.startAmbient(),localStorage.setItem(`techwear_ambient`,`true`)),r}},c={render(e=0,t=!1,n=!1){return`
      <header class="header">
        <div class="header__container">
          <div class="header__logo" id="header-logo" title="На главную">
            <span class="header__logo-brand">TECHWEAR</span>
            <span class="header__logo-sub">// MODULE</span>
          </div>
          
          <div class="header__actions">
            <div class="header__desktop-nav">
              <button class="header__btn header__btn--install" id="pwa-install-btn" aria-label="Установить PWA">
                INSTALL //
              </button>

              <button class="header__btn header__btn--builder" id="builder-toggle-btn" aria-label="Открыть конструктор">
                MBS BUILDER //
              </button>
              
              <button class="header__btn header__btn--profile" id="profile-toggle-btn" aria-label="Открыть личный кабинет">
                NEURAL ID //
              </button>
            </div>
            
            <button class="header__btn header__btn--search js-interactive" id="search-trigger" aria-label="Открыть поиск">
              <svg class="header__icon" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <button class="header__btn header__btn--cart js-interactive" id="cart-trigger" aria-label="Открыть корзину">
              <svg class="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="header__cart-count ${e>0?`header__cart-count--active`:``}" id="header-cart-count">
                ${e}
              </span>
            </button>

            <button class="header__btn header__btn--menu js-interactive" id="menu-toggle-btn" aria-label="Открыть меню">
              <svg class="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="menu-overlay" id="menu-overlay">
          <div class="menu-drawer">
            <div class="menu-drawer__header">
              <span>SYSTEM NAVIGATION // DIRECTORY</span>
              <button class="menu-drawer__close js-interactive" id="menu-close-btn">X // CLOSE</button>
            </div>
            <div class="menu-drawer__body">
              <ul class="menu-drawer__list">
                <li>
                  <button class="menu-drawer__item js-interactive" id="menu-item-profile">
                    NEURAL ID // PROFILE
                  </button>
                </li>
                <li>
                  <button class="menu-drawer__item js-interactive" id="menu-item-builder">
                    MBS BUILDER // CUSTOMIZER
                  </button>
                </li>

                <li id="menu-item-install-wrapper" style="display: none;">
                  <button class="menu-drawer__item js-interactive" id="menu-item-install">
                    INSTALL APP // DOWNLOAD
                  </button>
                </li>
              </ul>
              <div class="menu-drawer__footer">
                STATUS: ENCRYPTED SEC_LINK
              </div>
            </div>
          </div>
        </div>
      </header>
    `},initListeners(){let e=document.querySelector(`#search-trigger`),t=document.querySelector(`#cart-trigger`),n=document.querySelector(`#header-logo`),r=document.querySelector(`#theme-toggle-btn`),i=document.querySelector(`#sound-toggle-btn`),a=document.querySelector(`#ambient-toggle-btn`),o=document.querySelector(`#builder-toggle-btn`),c=document.querySelector(`#profile-toggle-btn`),l=document.querySelector(`#menu-toggle-btn`),u=document.querySelector(`#menu-overlay`),d=document.querySelector(`#menu-close-btn`),f=document.querySelector(`#menu-item-profile`),p=document.querySelector(`#menu-item-builder`),m=document.querySelector(`#menu-item-theme`),h=document.querySelector(`#menu-item-sound`),g=document.querySelector(`#menu-item-ambient`),_=document.querySelector(`#menu-item-install`),v=()=>{u&&(u.classList.add(`menu-overlay--open`),document.body.style.overflow=`hidden`,s.playOpen())},y=()=>{u&&(u.classList.remove(`menu-overlay--open`),document.body.style.overflow=``)};l&&l.addEventListener(`click`,v),d&&d.addEventListener(`click`,y),u&&u.addEventListener(`click`,e=>{e.target===u&&y()}),f&&f.addEventListener(`click`,()=>{y(),document.dispatchEvent(new CustomEvent(`toggle-profile`))}),p&&p.addEventListener(`click`,()=>{y(),document.dispatchEvent(new CustomEvent(`toggle-builder`))}),m&&m.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-theme`))}),h&&h.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-sound`))}),g&&g.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-ambient`))}),_&&_.addEventListener(`click`,()=>{y(),document.dispatchEvent(new CustomEvent(`install-app`))}),r&&r.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-theme`))}),o&&o.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-builder`))}),c&&c.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-profile`))}),i&&i.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-sound`))}),a&&a.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-ambient`))}),e&&e.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-search`))}),t&&t.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-cart`))}),n&&n.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`navigate-home`))})},updateCartCount(e){let t=document.querySelector(`#header-cart-count`);t&&(t.textContent=e,e>0?t.classList.add(`header__cart-count--active`):t.classList.remove(`header__cart-count--active`))},updateSoundBtn(e){document.querySelectorAll(`#sound-toggle-btn, #menu-item-sound`).forEach(t=>{t.id===`sound-toggle-btn`?(t.textContent=e?`SOUND // ON`:`SOUND // OFF`,e?t.classList.add(`header__btn--sound--active`):t.classList.remove(`header__btn--sound--active`)):(t.textContent=e?`SOUND EFFECTS // ON`:`SOUND EFFECTS // OFF`,e?t.classList.add(`menu-drawer__item--active`):t.classList.remove(`menu-drawer__item--active`))})},updateAmbientBtn(e){document.querySelectorAll(`#ambient-toggle-btn, #menu-item-ambient`).forEach(t=>{t.id===`ambient-toggle-btn`?(t.textContent=e?`SYS_HUM // ON`:`SYS_HUM // OFF`,e?t.classList.add(`header__btn--ambient--active`):t.classList.remove(`header__btn--ambient--active`)):(t.textContent=e?`SYSTEM HUM (AMBIENT) // ON`:`SYSTEM HUM (AMBIENT) // OFF`,e?t.classList.add(`menu-drawer__item--active`):t.classList.remove(`menu-drawer__item--active`))})}},l={render(e,t=0){let{id:n,name:r,price:i,image:a,badge:o,badgeClass:s,specs:c=[]}=e,l=t*.04,u=c.map(e=>`<span class="product-card__spec">${e}</span>`).join(``),d=s?`product-card__badge--${s}`:``,f=o?`<div class="product-card__badge ${d}">${o}</div>`:``,p=localStorage.getItem(`fit_size_${n}`);return`
      <article class="product-card" data-id="${n}" style="animation-delay: ${l}s">
        <div class="product-card__image-wrapper">
          ${f}
          <img 
            class="product-card__image" 
            src="${a}" 
            alt="${r}" 
            width="300" 
            height="300" 
            loading="lazy" 
            decoding="async" 
          />
        </div>
        
        <div class="product-card__body">
          <h3 class="product-card__title" title="${r}">${r}</h3>
          
          <div class="product-card__specs">
            ${u}
          </div>

          ${p?`<div class="product-card__fit-badge">YOUR FIT: ${p}</div>`:``}

          <button class="product-card__scan-link js-fit-scan" data-id="${n}" data-name="${r}">
            FIT SCANNER //
          </button>
          
          <div class="product-card__footer">
            <span class="product-card__price">${i}</span>
            <button 
              class="product-card__btn js-add-to-cart" 
              data-id="${n}"
              aria-label="Добавить ${r} в корзину"
            >
              <span>ADD TO GEAR</span>
              <svg class="product-card__btn-icon" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `}},u=`techwear_cart_gear`,d={items:[]},f=()=>{try{let e=localStorage.getItem(u);e&&(d.items=JSON.parse(e))}catch{d.items=[]}},p=()=>{try{localStorage.setItem(u,JSON.stringify(d.items))}catch{}},m=()=>{let e=new CustomEvent(`cart-updated`,{detail:{items:d.items,count:h.getCount(),total:h.getTotal()}});document.dispatchEvent(e)},h={init(){f(),m()},getItems(){return d.items.map(e=>({...e}))},addToCart(e){let t=d.items.find(t=>t.id===e.id);t?t.quantity+=1:d.items.push({id:e.id,name:e.name,price:e.price,image:e.image,quantity:1}),p(),m()},removeFromCart(e){d.items=d.items.filter(t=>t.id!==e),p(),m()},updateQuantity(e,t){let n=d.items.find(t=>t.id===e);if(n){if(n.quantity=parseInt(t,10),n.quantity<=0){this.removeFromCart(e);return}p(),m()}},clearCart(){d.items=[],p(),m()},getCount(){return d.items.reduce((e,t)=>e+t.quantity,0)},getTotal(){return d.items.reduce((e,t)=>e+t.price*t.quantity,0)}},g={getContainer(){let e=document.querySelector(`.toast-container`);return e||(e=document.createElement(`div`),e.className=`toast-container`,document.body.appendChild(e)),e},show(e,t=`SYSTEM //`,n=`blue`){let r=this.getContainer(),i=document.createElement(`div`);i.className=`toast toast--${n}`,i.innerHTML=`
      <div class="toast__header">${t}</div>
      <div class="toast__message">${e}</div>
    `,r.appendChild(i),setTimeout(()=>{i.classList.add(`toast--show`)},50),setTimeout(()=>{i.classList.remove(`toast--show`),setTimeout(()=>{i.remove(),r.querySelectorAll(`.toast`).length===0&&r.remove()},300)},3e3)}},_=`techwear_cyber_profile`,v={faction:`NETRUNNER`,credits:100,decryptedCodes:[],orders:[],xp:0,level:1},y=()=>{try{let e=localStorage.getItem(_);e&&(v={...v,...JSON.parse(e)})}catch{}},b=()=>{try{localStorage.setItem(_,JSON.stringify(v))}catch{}},x={init(){y()},getFaction(){return v.faction},setFaction(e){v.faction=e,b(),document.dispatchEvent(new CustomEvent(`profile-updated`,{detail:v}))},getXP(){return v.xp||0},getLevel(){return v.level||1},addXP(e){v.xp===void 0&&(v.xp=0),v.level===void 0&&(v.level=1),v.xp+=e;let t=!1,n=v.level,r=v.level*100;for(;v.xp>=r;)v.xp-=r,v.level++,t=!0,r=v.level*100;b(),document.dispatchEvent(new CustomEvent(`profile-updated`,{detail:v})),t&&document.dispatchEvent(new CustomEvent(`level-up`,{detail:{level:v.level,oldLevel:n}}))},getCredits(){return v.credits},addCredits(e){v.credits+=e,b(),document.dispatchEvent(new CustomEvent(`profile-updated`,{detail:v}))},spendCredits(e){return v.credits>=e?(v.credits-=e,b(),document.dispatchEvent(new CustomEvent(`profile-updated`,{detail:v})),!0):!1},getDecryptedCodes(){return v.decryptedCodes},addDecryptedCode(e){v.decryptedCodes.includes(e)||(v.decryptedCodes.push(e),b(),document.dispatchEvent(new CustomEvent(`profile-updated`,{detail:v})))},getOrders(){return[...v.orders]},addOrder(e,t,n,r=!1){v.orders.unshift({id:e,date:new Date().toLocaleDateString(`ru-RU`),total:t,itemsCount:n});let i=0;return r||(i=Math.round(t*.1),v.credits+=i),this.addXP(100),b(),document.dispatchEvent(new CustomEvent(`profile-updated`,{detail:v})),i}},S={currentStep:0,userData:{address:``,phone:``,email:``},promoDiscount:0,finalTotal:0,paymentMethod:`card`,render(){return`
      <div class="checkout-terminal-overlay" id="checkout-terminal-overlay" aria-modal="true" role="dialog">
        <div class="checkout-terminal" id="terminal-container">
          
          <div class="checkout-terminal__header">
            <span>SECURE_COMM_TERMINAL // PORT: 922</span>
            <div class="checkout-terminal__window-controls">
              <span class="checkout-terminal__dot"></span>
              <span class="checkout-terminal__dot"></span>
              <span class="checkout-terminal__dot checkout-terminal__dot--fill" id="terminal-close-btn" role="button" aria-label="Close terminal window" tabindex="0" style="cursor: pointer;"></span>
            </div>
          </div>

          <div class="checkout-terminal__body" id="terminal-output"></div>

          <div class="checkout-terminal__input-line" id="terminal-input-row">
            <span class="checkout-terminal__prompt" id="terminal-prompt-prefix">operator@techwear_os:~$</span>
            <input 
              type="text" 
              class="checkout-terminal__input" 
              id="terminal-input" 
              placeholder="Type command or input..." 
              autocomplete="off"
              aria-label="Ввод команд терминала"
            />
            <span class="terminal-cursor"></span>
          </div>

        </div>
      </div>
    `},open(){let e=document.getElementById(`checkout-terminal-overlay`),t=document.getElementById(`terminal-input`);e&&(e.classList.add(`checkout-terminal-overlay--open`),document.body.style.overflow=`hidden`,s.playOpen(),this.currentStep=0,this.userData={address:``,phone:``,email:``},this.promoDiscount=0,this.finalTotal=0,this.paymentMethod=`card`,t&&setTimeout(()=>t.focus(),150),this.printWelcomeSequence())},close(){let e=document.getElementById(`checkout-terminal-overlay`);e&&(e.classList.remove(`checkout-terminal-overlay--open`),document.body.style.overflow=``,s.playClick())},printWelcomeSequence(){let e=document.getElementById(`terminal-output`);if(!e)return;e.innerHTML=``;let t=h.getItems(),n=h.getTotal();this.printLine(`***************************************************`,`system`),this.printLine(`*         TACTICAL GEAR DISPATCH PROTOCOL v4.2     *`,`system`),this.printLine(`*          SECURE QUANTUM ENCRYPTED CHANNEL       *`,`system`),this.printLine(`***************************************************`,`system`),this.printLine(`[SYS] Link status: SECURE // PORT: 922 ESTABLISHED`),this.printLine(`[SYS] Loading telemetry modules...`),this.printLine(`
STAGING LOAD SHEET //`);let r=`<div class="terminal-grid">`;t.forEach(e=>{let t=e.name.toUpperCase().padEnd(35,`.`),n=`$${e.price*e.quantity}`.padStart(8,`.`);r+=`
        <div class="terminal-grid-row">
          <span>x${e.quantity} ${t}</span>
          <span>${n}</span>
        </div>
      `});let i=`TACTICAL UAV DELIVERY`.padEnd(35,`.`);r+=`
      <div class="terminal-grid-row">
        <span>${i}</span>
        <span>$15.....</span>
      </div>
    `;let a=`GRAND TOTAL`.padEnd(35,`.`);r+=`
      <div class="terminal-grid-row" style="font-weight: bold; border-top: 1px dashed currentColor; margin-top: 4px; padding-top: 4px;">
        <span>${a}</span>
        <span>$${n+15}.....</span>
      </div>
    `,r+=`</div>`;let o=document.createElement(`div`);o.innerHTML=r,e.appendChild(o),this.printLine(`[SYS] Staging complete. Ready to record telemetry.`),this.printLine(`
[SYS] STEP 1: ENTER SHIELDED DELIVERY SECTOR (City, Street, Apt) //`),this.updatePrompt(`delivery_sector:~$`),e.scrollTop=e.scrollHeight},printLine(e,t=`default`){let n=document.getElementById(`terminal-output`);if(!n)return;let r=document.createElement(`div`);r.className=`terminal-line terminal-line--${t}`,r.textContent=e,n.appendChild(r),n.scrollTop=n.scrollHeight},updatePrompt(e){let t=document.getElementById(`terminal-prompt-prefix`);t&&(t.textContent=e)},handleInput(e){let t=e.trim();if(t){if(this.printLine(`> ${t}`,`user`),s.playClick(),t.toLowerCase()===`exit`||t.toLowerCase()===`/exit`){this.printLine(`[SYS] Aborting connection. Closing terminal...`),setTimeout(()=>this.close(),500);return}switch(this.currentStep){case 0:t.length<5?(this.printLine(`[ERR] Sector coordinates invalid. Must be at least 5 characters.`,`error`),s.playError()):(this.userData.address=t,this.printLine(`[SYS] Sector recorded: "${this.userData.address.toUpperCase()}" [OK]`),this.printLine(`
[SYS] STEP 2: ENTER COMMUNICATOR NODE NUMBER (Phone / Comms Link) //`),this.updatePrompt(`comm_node:~$`),this.currentStep=1);break;case 1:t.length<7||!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(t)?(this.printLine(`[ERR] Connection frequency invalid. Input correct numerical node address (phone).`,`error`),s.playError()):(this.userData.phone=t,this.printLine(`[SYS] Comms node synchronized: "${this.userData.phone}" [OK]`),this.printLine(`
[SYS] STEP 3: ENTER ACCESS ID CODE (Email) //`),this.updatePrompt(`access_signature:~$`),this.currentStep=2);break;case 2:t.length<5||!t.includes(`@`)||!t.includes(`.`)?(this.printLine(`[ERR] Authentication pattern rejected. Enter valid email signature.`,`error`),s.playError()):(this.userData.email=t,this.printLine(`[SYS] Access key matching: "${this.userData.email.toUpperCase()}" [OK]`),this.printLine(`
[SYS] STEP 4: ENTER PROMO CODE SIGNATURE (OR TYPE "SKIP") //`),this.updatePrompt(`promo_code:~$`),this.currentStep=3);break;case 3:{let e=t.toUpperCase(),n=x.getDecryptedCodes();if(e===`SKIP`||e===`NONE`)this.promoDiscount=0,this.printLine(`[SYS] Proceeding without promo discount.`);else if(e===`NEOHACK20`||e===`TACTICAL15`)if(n.includes(e))this.promoDiscount=e===`NEOHACK20`?.2:.15,this.printLine(`[SYS] PROMO CODE VERIFIED: -${this.promoDiscount*100}% DISCOUNT ENGAGED [OK]`),s.playSuccess();else{this.printLine(`[ERR] ACCESS REJECTED. CODE [${e}] IS LOCKED.`,`error`),this.printLine(`[SYS] You must decrypt this node in the Neural Link profile terminal first!`,`system`),s.playError();return}else{this.printLine(`[ERR] INVALID PROMO SIGNATURE. ENTER VALID CODE OR "SKIP".`,`error`),s.playError();return}let r=h.getTotal(),i=Math.round(r*this.promoDiscount),a=r-i+15;this.finalTotal=a,this.printLine(`
===================================================`),this.printLine(`TRANSMISSION PREVIEW //`),this.printLine(`SECTOR: ${this.userData.address.toUpperCase()}`),this.printLine(`COMM NODE: ${this.userData.phone}`),this.printLine(`ACCESS SIGNATURE: ${this.userData.email.toUpperCase()}`),this.promoDiscount>0&&(this.printLine(`PROMO CODE: ${e} (-${this.promoDiscount*100}%)`),this.printLine(`SUBTOTAL DISCOUNT: -$${i}`)),this.printLine(`GRAND TOTAL (WITH UAV): $${a}`),this.printLine(`===================================================`),this.printLine(`\n[SYS] NEURAL CREDITS BALANCE: ₵${x.getCredits()}`),this.printLine(`[SYS] CHOOSE METHOD: ENTER "CARD" TO CONFIRM CREDIT CARD OR "CREDITS" TO PAY VIA HACKER CREDITS //`),this.updatePrompt(`payment_method(CARD/CREDITS/exit):~$`),this.currentStep=4}break;case 4:{let e=t.toUpperCase();if(e===`CARD`||e===`CONFIRM`||e===`Y`||e===`YES`)this.paymentMethod=`card`,this.currentStep=5,this.runDispatchSequence();else if(e===`CREDITS`){let e=x.getCredits();e>=this.finalTotal?(x.spendCredits(this.finalTotal),this.paymentMethod=`credits`,this.printLine(`[SYS] ₵${this.finalTotal} DEBITED FROM NEURAL PORTFOLIO [OK]`),this.currentStep=5,this.runDispatchSequence()):(this.printLine(`[ERR] INSUFFICIENT NEURAL CREDITS. REQUIRED: ₵${this.finalTotal}, AVAILABLE: ₵${e}.`,`error`),this.printLine(`[SYS] Enter "CARD" to pay with credit card instead, or "exit" to abort and hack more nodes.`,`system`),s.playError())}else this.printLine(`[SYS] Input not recognized. Enter "CARD" to pay by card, "CREDITS" to pay by credits, or "exit" to abort.`),s.playError()}break;default:this.printLine(`[SYS] Command array locked. Cargo already dispatched.`);break}}},runDispatchSequence(){let e=document.getElementById(`terminal-input-row`);e&&(e.style.display=`none`),this.printLine(`
[SYS] BOOTING UAV AUTONOMOUS NAVIGATOR...`),s.playOpen();let t=document.getElementById(`terminal-output`);if(!t){this.finalizeOrder();return}let n=document.createElement(`div`);n.style.cssText=`
      border: 1px solid var(--border-color);
      background: rgba(6, 7, 9, 0.95);
      margin: 15px 0;
      position: relative;
      border-radius: var(--border-radius-sm);
      overflow: hidden;
      box-shadow: var(--glow-green);
    `,n.innerHTML=`
      <canvas id="radar-canvas" width="450" height="150" style="display: block; width: 100%; height: 150px;"></canvas>
      <div id="radar-status-text" style="
        position: absolute; 
        bottom: 8px; 
        left: 8px; 
        font-family: monospace; 
        font-size: 9px; 
        color: var(--color-accent-green);
        text-shadow: var(--glow-green);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      ">
        UAV LOGISTICS: PRE-FLIGHT VERIFICATION...
      </div>
      <div id="radar-distance-text" style="
        position: absolute; 
        bottom: 8px; 
        right: 8px; 
        font-family: monospace; 
        font-size: 9px; 
        color: var(--color-accent-green);
        text-shadow: var(--glow-green);
      ">
        DIST: 4.8 KM
      </div>
    `,t.appendChild(n),t.scrollTop=t.scrollHeight;let r=document.getElementById(`radar-canvas`),i=r.getContext(`2d`),a=document.getElementById(`radar-status-text`),o=document.getElementById(`radar-distance-text`),c=0,l=null,u=()=>{i.fillStyle=`#060709`,i.fillRect(0,0,r.width,r.height);let e=getComputedStyle(document.documentElement).getPropertyValue(`--color-accent-blue`).trim()||`#00f0ff`,t=getComputedStyle(document.documentElement).getPropertyValue(`--color-accent-green`).trim()||`#00ff66`;i.strokeStyle=`rgba(0, 240, 255, 0.03)`,i.lineWidth=1;for(let e=0;e<r.width;e+=30)i.beginPath(),i.moveTo(e,0),i.lineTo(e,r.height),i.stroke();for(let e=0;e<r.height;e+=30)i.beginPath(),i.moveTo(0,e),i.lineTo(r.width,e),i.stroke();i.strokeStyle=`rgba(0, 255, 102, 0.04)`,i.beginPath(),i.arc(40,110,40,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(410,40,45,0,Math.PI*2),i.stroke(),i.strokeStyle=`rgba(0, 240, 255, 0.1)`,i.lineWidth=1,i.beginPath(),i.moveTo(40,110),i.lineTo(410,40),i.setLineDash([4,4]),i.stroke(),i.setLineDash([]),i.fillStyle=e,i.beginPath(),i.arc(40,110,5,0,Math.PI*2),i.fill(),i.fillStyle=`#fff`,i.font=`8px monospace`,i.fillText(`DOCK_09`,22,125),i.fillStyle=`#ff0055`,i.beginPath(),i.arc(410,40,5,0,Math.PI*2),i.fill(),i.fillText(`SECTOR: ${this.userData.address.toUpperCase()}`,330,30);let n=40+370*c,s=110+-70*c,d=8+Math.sin(Date.now()*.015)*4;i.strokeStyle=`rgba(0, 255, 102, 0.25)`,i.beginPath(),i.arc(n,s,d,0,Math.PI*2),i.stroke(),i.fillStyle=t,i.beginPath(),i.moveTo(n,s-6),i.lineTo(n-5,s+4),i.lineTo(n+5,s+4),i.closePath(),i.fill(),i.fillStyle=`rgba(255, 255, 255, 0.5)`,i.font=`7px monospace`,i.fillText(`X:${Math.round(n)} Y:${Math.round(s)}`,n+8,s+2),c+=.004,c<1?(o.textContent=`DIST: ${((1-c)*4.8).toFixed(1)} KM`,c<.1?a.textContent=`UAV LOGISTICS: LAUNCH SEQ / ROTORS SPINNING`:c<.3?a.textContent=`UAV LOGISTICS: CLIMB / SECTOR DENSITY ACCURACY CHECK`:c<.6?a.textContent=`UAV LOGISTICS: EN-ROUTE / ALTITUDE LOCK ACTIVE`:c<.85?a.textContent=`UAV LOGISTICS: DESCENDING TO COORDS / AUTOPILOT ON`:a.textContent=`UAV LOGISTICS: DROP-ZONE ARRIVED / DROP INITIATED`,l=requestAnimationFrame(u)):(cancelAnimationFrame(l),o.textContent=`DIST: 0.0 KM`,a.textContent=`UAV LOGISTICS: CARGO DISPATCH COMPLETED [OK]`,setTimeout(()=>{this.finalizeOrder()},800))};u()},finalizeOrder(){let e=`TX-`+Math.floor(1e5+Math.random()*9e5),t=h.getItems().reduce((e,t)=>e+t.quantity,0),n=this.finalTotal||h.getTotal()+15,r=this.paymentMethod===`credits`,i=x.addOrder(e,n,t,r),a=r?`NEURAL CREDITS`:`CREDIT CARD`;this.printLine(`
***************************************************`),this.printLine(`*          ORDER SUCCESSFULLY DEPLOYED            *`),this.printLine(`*          SECURE ID KEY: #${e}          *`),this.printLine(`*          METHOD: ${a.padEnd(30)} *`),r?this.printLine(`*          CREDITS SPENT: -₵${n.toString().padEnd(20)} *`):this.printLine(`*          CASHBACK AWARDED: +₵${i.toString().padEnd(17)} *`),this.printLine(`*          NEURAL XP REWARD: +100 XP              *`),this.printLine(`***************************************************`),this.printLine(`
[SYS] Closing link. Stay tactical.`),s.playSuccess(),g.show(`ORDER DISPATCHED: #${e} // DRONE DEPLOYED`,`TACTICAL UPDATE //`,`green`),h.clearCart();let o=document.getElementById(`terminal-output`);if(o){let e=document.createElement(`button`);e.className=`fit-scanner__btn fit-scanner__btn--primary js-interactive`,e.style.marginTop=`20px`,e.style.maxWidth=`250px`,e.textContent=`DISCONNECT TERMINAL //`,e.addEventListener(`click`,()=>{this.close()}),o.appendChild(e),o.scrollTop=o.scrollHeight}},initListeners(){let e=document.getElementById(`checkout-terminal-overlay`),t=document.getElementById(`terminal-container`),n=document.getElementById(`terminal-close-btn`),r=document.getElementById(`terminal-input`),i=document.getElementById(`terminal-input-row`);e&&e.addEventListener(`click`,t=>{t.target===e&&this.currentStep!==5&&this.close()}),n&&n.addEventListener(`click`,()=>{this.currentStep!==5&&this.close()}),t&&r&&t.addEventListener(`click`,()=>{this.currentStep!==5&&r.focus()}),r&&r.addEventListener(`keypress`,e=>{if(e.key===`Enter`){let e=r.value;r.value=``,this.handleInput(e)}}),document.addEventListener(`checkout-opened`,()=>{i&&(i.style.display=`flex`)})}},C={render(){return`
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-drawer__overlay" id="cart-overlay"></div>
        
        <div class="cart-drawer__panel">
          <div class="cart-drawer__header">
            <h3 class="cart-drawer__title">YOUR GEAR //</h3>
            <button class="cart-drawer__close" id="cart-close-btn" aria-label="Закрыть корзину">
              CLOSE // X
            </button>
          </div>
          
          <div class="cart-drawer__content" id="cart-drawer-content"></div>
          
          <div class="cart-drawer__footer">
            <div class="cart-drawer__total">
              <span class="cart-drawer__total-label">SUBTOTAL:</span>
              <span class="cart-drawer__total-price" id="cart-total-price">0</span>
            </div>
            <button class="cart-drawer__checkout-btn" id="checkout-btn" disabled>
              INITIATE CHECKOUT
            </button>
          </div>
        </div>
      </div>
    `},initListeners(){let e=document.querySelector(`#cart-overlay`),t=document.querySelector(`#cart-close-btn`),n=document.querySelector(`#cart-drawer-content`),r=document.querySelector(`#checkout-btn`);e&&e.addEventListener(`click`,()=>this.close()),t&&t.addEventListener(`click`,()=>this.close()),n&&n.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.js-cart-qty-dec`);if(n){let e=n.dataset.id,t=h.getItems().find(t=>t.id===e);t&&h.updateQuantity(e,t.quantity-1)}let r=t.closest(`.js-cart-qty-inc`);if(r){let e=r.dataset.id,t=h.getItems().find(t=>t.id===e);t&&h.updateQuantity(e,t.quantity+1)}let i=t.closest(`.js-cart-remove`);if(i){let e=i.dataset.id;h.removeFromCart(e)}}),r&&r.addEventListener(`click`,()=>{S.open(),document.dispatchEvent(new CustomEvent(`checkout-opened`)),this.close()}),document.addEventListener(`toggle-cart`,()=>{this.toggle()}),document.addEventListener(`cart-updated`,e=>{let{items:t,total:n}=e.detail;this.update(t,n)})},open(){let e=document.querySelector(`#cart-drawer`);e&&(e.classList.add(`cart-drawer--open`),document.body.style.overflow=`hidden`,s.playOpen())},close(){let e=document.querySelector(`#cart-drawer`);e&&(e.classList.remove(`cart-drawer--open`),document.body.style.overflow=``,s.playClick())},toggle(){let e=document.querySelector(`#cart-drawer`);e&&(e.classList.contains(`cart-drawer--open`)?this.close():this.open())},update(e=[],t=0){let n=document.querySelector(`#cart-drawer-content`),r=document.querySelector(`#cart-total-price`),i=document.querySelector(`#checkout-btn`);if(!(!n||!r||!i)){if(r.textContent=t,e.length===0){i.disabled=!0,n.innerHTML=`
        <div class="cart-drawer__empty">
          <svg class="cart-drawer__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>NO GEAR EQUIPPED //</span>
        </div>
      `;return}i.disabled=!1,n.innerHTML=e.map(e=>`
        <div class="cart-item" data-id="${e.id}">
          <div class="cart-item__img-wrapper">
            <img class="cart-item__img" src="${e.image}" alt="${e.name}" />
          </div>
          
          <div class="cart-item__body">
            <div class="cart-item__title" title="${e.name}">${e.name}</div>
            
            <div class="cart-item__info">
              <span class="cart-item__price">${e.price*e.quantity}</span>
              
              <div style="display: flex; align-items: center; gap: var(--space-xs);">
                <div class="cart-item__controls">
                  <button 
                    class="cart-item__btn js-cart-qty-dec" 
                    data-id="${e.id}" 
                    aria-label="Уменьшить количество"
                  >-</button>
                  <span class="cart-item__qty">${e.quantity}</span>
                  <button 
                    class="cart-item__btn js-cart-qty-inc" 
                    data-id="${e.id}" 
                    aria-label="Увеличить количество"
                  >+</button>
                </div>
                
                <button 
                  class="cart-item__remove-btn js-cart-remove" 
                  data-id="${e.id}" 
                  aria-label="Удалить из корзины"
                >
                  <svg class="cart-item__remove-icon" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join(``)}}},w={filter(e,t=`ALL`,n=``){let r=n.trim().toLowerCase();return e.filter(e=>{let n=!0,i=(e.badge||``).toUpperCase().includes(`BLACK MARKET`);n=t===`ALL`?!i:(e.badge||``).toUpperCase().replace(` `,``).includes(t.toUpperCase());let a=!0;if(r){let t=e.name.toLowerCase().includes(r),n=(e.specs||[]).some(e=>e.toLowerCase().includes(r));a=t||n}return n&&a})}},T={activeProductId:null,activeCategory:`apparel`,scanTimeout:null,logInterval:null,render(){return`
      <div class="fit-scanner-overlay" id="fit-scanner-overlay" aria-modal="true" role="dialog">
        <div class="fit-scanner-modal">
          
          <div class="fit-scanner__header">
            <div class="fit-scanner__title-group">
              <span class="fit-scanner__title">FIT SCANNER // v2.9</span>
              <span class="fit-scanner__subtitle" id="fit-scanner-target">TARGET: APPAREL CONTOUR</span>
            </div>
            <button class="fit-scanner__close" id="fit-scanner-close-btn" aria-label="Закрыть сканер">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="fit-scanner__body">
            
            <div class="fit-scanner__step fit-scanner__step--active" id="fit-scanner-step-input">
              <div class="js-scanner-inputs" data-type="apparel" style="display: flex; flex-direction: column; gap: var(--space-md);">
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>HEIGHT (cm) //</span>
                    <span class="fit-scanner__val" id="height-val">178</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="height-slider" min="150" max="210" value="178" aria-label="Height in centimeters" />
                </div>
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>WEIGHT (kg) //</span>
                    <span class="fit-scanner__val" id="weight-val">75</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="weight-slider" min="40" max="130" value="75" aria-label="Weight in kilograms" />
                </div>
              </div>

              <div class="js-scanner-inputs" data-type="sneakers" style="display: none; flex-direction: column; gap: var(--space-md);">
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>FOOT LENGTH (mm) //</span>
                    <span class="fit-scanner__val" id="foot-val">270</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="foot-slider" min="230" max="310" value="270" aria-label="Foot length in millimeters" />
                </div>
              </div>

              <div class="js-scanner-inputs" data-type="gloves" style="display: none; flex-direction: column; gap: var(--space-md);">
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>PALM WIDTH (cm) //</span>
                    <span class="fit-scanner__val" id="palm-val">8.5</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="palm-slider" min="6.5" max="11.5" step="0.5" value="8.5" aria-label="Palm width in centimeters" />
                </div>
              </div>

              <div class="js-scanner-inputs" data-type="onesize" style="display: none; text-align: center; color: var(--color-text-secondary); padding: var(--space-md) 0;">
                <p style="font-size: 0.8rem; line-height: 1.5;">
                  THIS MODULE HAS AN ADJUSTABLE FIT SYSTEM.<br>
                  <span style="color: var(--color-accent-blue);">ONE SIZE FITS ALL PROFILE //</span>
                </p>
              </div>

              <div class="fit-scanner__footer">
                <button class="fit-scanner__btn fit-scanner__btn--primary js-interactive" id="fit-scanner-start-btn">
                  INITIATE SCAN //
                </button>
              </div>
            </div>

            <div class="fit-scanner__step" id="fit-scanner-step-process">
              <div class="fit-scanner__scanning-box">
                <div class="fit-scanner__hologram"></div>
                <div class="fit-scanner__laser"></div>
                
                <svg class="fit-scanner__silhouette" viewBox="0 0 100 100">
                  <path d="M50,15 C54,15 54,23 50,23 C46,23 46,15 50,15 Z M42,25 C45,24 55,24 58,25 C64,26 64,45 61,45 C59,45 59,33 58,33 L57,55 L58,85 L54,85 L51,60 L49,60 L46,85 L42,85 L43,55 L42,33 C41,33 41,45 39,45 C36,45 36,26 42,25 Z"></path>
                </svg>
              </div>
              <div class="fit-scanner__logs" id="fit-scanner-log-console"></div>
            </div>

            <div class="fit-scanner__step" id="fit-scanner-step-results">
              <div class="fit-scanner__results-box">
                <span class="fit-scanner__result-title" id="fit-product-title">COMPATIBLE SIZE</span>
                <span class="fit-scanner__result-size" id="fit-result-size">M</span>
                <span class="fit-scanner__accuracy" id="fit-accuracy">MATCH INDEX: 98.4%</span>
                <p class="fit-scanner__desc" id="fit-result-desc">
                  Modular shell fits optimally. Sufficient clearance preserved for active movements and module harness layouts.
                </p>
              </div>
              <div class="fit-scanner__footer">
                <button class="fit-scanner__btn fit-scanner__btn--primary js-interactive" id="fit-scanner-save-btn">
                  APPLY FIT TO PROFILE //
                </button>
                <button class="fit-scanner__btn fit-scanner__btn--secondary js-interactive" id="fit-scanner-recal-btn">
                  RE-CALIBRATE //
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    `},detectCategory(e){let t=e.toLowerCase();return t.includes(`sneakers`)||t.includes(`boots`)?`sneakers`:t.includes(`gloves`)?`gloves`:t.includes(`backpack`)||t.includes(`visor`)||t.includes(`mask`)||t.includes(`sling`)?`onesize`:`apparel`},open(e,t){this.activeProductId=e,this.activeCategory=this.detectCategory(e);let n=document.getElementById(`fit-scanner-overlay`),r=document.getElementById(`fit-scanner-target`);r&&(r.textContent=`TARGET: ${t.toUpperCase()}`),this.showStep(`input`),document.querySelectorAll(`.js-scanner-inputs`).forEach(e=>{e.dataset.type===this.activeCategory?e.style.display=`flex`:e.style.display=`none`}),n&&(n.classList.add(`fit-scanner-overlay--open`),document.body.style.overflow=`hidden`,s.playOpen())},close(){let e=document.getElementById(`fit-scanner-overlay`);e&&(e.classList.remove(`fit-scanner-overlay--open`),document.body.style.overflow=``,s.playClick()),clearTimeout(this.scanTimeout),clearInterval(this.logInterval)},showStep(e){let t={input:document.getElementById(`fit-scanner-step-input`),process:document.getElementById(`fit-scanner-step-process`),results:document.getElementById(`fit-scanner-step-results`)};Object.keys(t).forEach(n=>{t[n]&&(n===e?t[n].classList.add(`fit-scanner__step--active`):t[n].classList.remove(`fit-scanner__step--active`))})},initListeners(){let e=document.getElementById(`fit-scanner-overlay`),t=document.getElementById(`fit-scanner-close-btn`),n=document.getElementById(`fit-scanner-start-btn`),r=document.getElementById(`fit-scanner-save-btn`),i=document.getElementById(`fit-scanner-recal-btn`);e&&e.addEventListener(`click`,t=>{t.target===e&&this.close()}),t&&t.addEventListener(`click`,()=>this.close()),[{id:`height`,unit:` cm`},{id:`weight`,unit:` kg`},{id:`foot`,unit:` mm`},{id:`palm`,unit:` cm`}].forEach(e=>{let t=document.getElementById(`${e.id}-slider`),n=document.getElementById(`${e.id}-val`);t&&n&&t.addEventListener(`input`,t=>{n.textContent=t.target.value+e.unit})}),n&&n.addEventListener(`click`,()=>{this.runScanning()}),r&&r.addEventListener(`click`,()=>{let e=document.getElementById(`fit-result-size`).textContent;localStorage.setItem(`fit_size_${this.activeProductId}`,e),document.dispatchEvent(new CustomEvent(`fit-profile-updated`,{detail:{productId:this.activeProductId,size:e}})),g.show(`SIZE [${e}] SAVED TO TACTICAL PROFILE //`,`BIOMETRICS REGISTERED //`,`green`),this.close()}),i&&i.addEventListener(`click`,()=>{this.showStep(`input`),s.playClick()})},runScanning(){this.showStep(`process`),s.playOpen();let e=document.getElementById(`fit-scanner-log-console`);e&&(e.innerHTML=``);let t=[`// CONNECTING TO BIOMETRIC SENSORS...`,`// CALIBRATING SCANNING ARRAYS [OK]`,`// MEASURING CONTOUR CONTRAST...`,`// ANALYZING ANATOMICAL VOLUME...`,`// QUERYING SIZE DATABASE SPECIFICATIONS...`,`// COMPILING OPTIMAL COMPATIBILITY VECTOR...`],n=0;this.logInterval=setInterval(()=>{if(n<t.length){let r=document.createElement(`div`);r.className=`fit-scanner__log-line`,r.textContent=t[n],e.appendChild(r),e.scrollTop=e.scrollHeight,s.playClick(),n++}},300),this.scanTimeout=setTimeout(()=>{clearInterval(this.logInterval),this.calculateAndShowResult()},2100)},calculateAndShowResult(){let e=`M`,t=95+Math.random()*4.9,n=``;if(this.activeCategory===`onesize`)e=`O/S`,n=`Adjustable harness contour. 100% hardware match. Straps support compression settings from XS to XXL.`;else if(this.activeCategory===`gloves`){let t=parseFloat(document.getElementById(`palm-slider`).value);t<8?(e=`S`,n=`Fitted skin profile. Carbon fiber protectors align optimally with metacarpal joints.`):t<=9?(e=`M`,n=`Optimal ergonomic compression. Perfect glove-to-grip surface tactile feedback.`):t<=10?(e=`L`,n=`Relaxed fit profile. Preserves knuckle mobility and thermal modular layer expansion.`):(e=`XL`,n=`Extended fit profile for heavy anatomical structure. Hook-and-loop straps require tight lock.`)}else if(this.activeCategory===`sneakers`){let t=parseInt(document.getElementById(`foot-slider`).value);e=t<245?`39`:t<252?`40`:t<260?`41`:t<268?`42`:t<275?`43`:t<282?`44`:t<290?`45`:`46`,n=`Sole cushion matches foot geometry. Glow-sole pressure zones optimized for maximum energy recoil.`}else{let t=parseInt(document.getElementById(`height-slider`).value),r=parseInt(document.getElementById(`weight-slider`).value);t<170?r<65?(e=`S`,n=`Tight tactical profile. Core modular mounts aligned directly to chest frame.`):r<80?(e=`M`,n=`Standard urban utility fit. Accommodates direct tactical rig underlay.`):(e=`L`,n=`Slightly relaxed sleeves. Recommended for heavy modular gear layout.`):t<185?r<70?(e=`M`,n=`Slim aerodynamic silhouette. Minimal drag coefficient for active speed modules.`):r<90?(e=`L`,n=`Standard size match. Optimal sleeve length and jacket bottom hem coverage.`):(e=`XL`,n=`Slightly loose silhouette. Fully supports modular attachments without load shifting.`):r<80?(e=`L`,n=`Tall slim profile. Core torso dimensions verified. Length parameters matched.`):r<100?(e=`XL`,n=`Standard massive fit. Shoulder seams positioned for zero restriction in modular carry.`):(e=`XXL`,n=`Heavy shell silhouette. Preserves absolute room for thermal and kinetic under-armor.`)}document.getElementById(`fit-result-size`).textContent=e,document.getElementById(`fit-accuracy`).textContent=`MATCH INDEX: ${t.toFixed(1)}%`,document.getElementById(`fit-result-desc`).textContent=n,this.showStep(`results`),s.playSuccess()}},E=`/techwear-store/assets/jacket-DOZ9ZMFH.webp`,D=`/techwear-store/assets/chest-rig-BcFqfZFI.webp`,O=`/techwear-store/assets/backpack-AHhNVebK.webp`,k=`/techwear-store/assets/visor-ZtSz-7TX.webp`,A=`/techwear-store/assets/gloves-gvfgD3fj.webp`,j=`/techwear-store/assets/sneakers-LpmM-D22.webp`,M=`/techwear-store/assets/mask-DFw2q24b.webp`,N=`/techwear-store/assets/trench-sAnvGoAJ.webp`,P=`/techwear-store/assets/vest-BWPQMpGT.webp`,F=`/techwear-store/assets/sling-afQZ9UAJ.webp`,I=`/techwear-store/assets/exo-gloves-DCiD6WNf.webp`,L=`/techwear-store/assets/boots-BfJdXPlv.webp`,R=`/techwear-store/assets/mbs_mannequin-ZRhQuC8r.webp`,z=[{id:`mod-jacket-x1`,name:`X-1 Shadow Shell Jacket`,price:289,image:E,slot:`body`,weight:1.8},{id:`mod-rig-c3`,name:`C-3 Cyber Rig Harness`,price:145,image:D,slot:`chest`,weight:.9},{id:`mod-backpack-b5`,name:`B-5 Modular Pack V2`,price:195,image:O,slot:`back`,weight:1.2},{id:`mod-visor-g9`,name:`G-9 Cyber Visor Specs`,price:95,image:k,slot:`head`,weight:.2},{id:`mod-gloves-gl2`,name:`GL-2 Tactical Gloves`,price:75,image:A,slot:`hands`,weight:.3},{id:`mod-sneakers-s7`,name:`S-7 Cyber Sneakers`,price:220,image:j,slot:`feet`,weight:1.4},{id:`mod-mask-m1`,name:`M-1 Cyber Rebreather Mask`,price:120,image:M,slot:`head`,weight:.4},{id:`mod-trench-x2`,name:`X-2 Tactical Trench Coat`,price:310,image:N,slot:`body`,weight:2.2},{id:`mod-vest-v8`,name:`V-8 Recon Tactical Vest`,price:180,image:P,slot:`chest`,weight:1.5},{id:`mod-sling-b6`,name:`B-6 Tactical Sling Bag`,price:135,image:F,slot:`back`,weight:.7},{id:`mod-gloves-gl5`,name:`GL-5 Exo-Skeletal Gloves`,price:95,image:I,slot:`hands`,weight:.4},{id:`mod-boots-bt9`,name:`BT-9 Exo-Steel Boots`,price:260,image:L,slot:`feet`,weight:1.9}],B={equippedItems:{head:null,body:null,chest:null,back:null,hands:null,feet:null},activeSlot:`body`,render(){return`
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
                
                <img class="mbs-mannequin-image" src="${R}" alt="MANNEQUIN SYSTEM PROTOCOL" width="600" height="894" loading="lazy" decoding="async" />

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
    `},open(){let e=document.getElementById(`mbs-overlay`);e&&(e.classList.add(`mbs-overlay--open`),document.body.style.overflow=`hidden`,s.playOpen()),this.updateUI(),this.selectSlot(`body`)},close(){let e=document.getElementById(`mbs-overlay`);e&&(e.classList.remove(`mbs-overlay--open`),document.body.style.overflow=``,s.playClick())},selectSlot(e){this.activeSlot=e,document.querySelectorAll(`.mbs-slot-card`).forEach(t=>{t.dataset.slot===e?t.classList.add(`mbs-slot-card--active`):t.classList.remove(`mbs-slot-card--active`)}),document.querySelectorAll(`.mbs-node`).forEach(t=>{t.dataset.slot===e?t.classList.add(`mbs-node--active`):t.classList.remove(`mbs-node--active`)}),document.querySelectorAll(`.mbs-mannequin-svg line`).forEach(e=>{e.setAttribute(`stroke`,`var(--color-accent-blue)`),e.setAttribute(`stroke-width`,`0.8`),e.setAttribute(`opacity`,`0.45`),e.setAttribute(`stroke-dasharray`,`2,2`)});let t=document.getElementById(`line-${e}`);t&&(t.setAttribute(`stroke`,`var(--color-accent-pink)`),t.setAttribute(`stroke-width`,`1.5`),t.setAttribute(`opacity`,`1`),t.removeAttribute(`stroke-dasharray`));let n=this.equippedItems[e],r=document.getElementById(`hud-diag-slot`),i=document.getElementById(`hud-diag-item`),a=document.getElementById(`hud-diag-weight`);r&&(r.textContent=`SLOT: ${e.toUpperCase()}`),i&&(i.textContent=`ITEM: ${n?n.name.toUpperCase():`EMPTY`}`),a&&(a.textContent=`WEIGHT: ${n?n.weight.toFixed(1)+` KG`:`0.0 KG`}`);let o=document.getElementById(`mbs-selection-title`);o&&(o.textContent=`AVAILABLE ${e.toUpperCase()} MODULES //`),this.renderOptionsList()},renderOptionsList(){let e=document.getElementById(`mbs-options-list`);if(!e)return;let t=z.filter(e=>e.slot===this.activeSlot),n=this.equippedItems[this.activeSlot],r=`
      <div class="mbs-option-row ${n?``:`mbs-option-row--selected`}" data-id="none">
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
    `;t.forEach(e=>{let t=n&&n.id===e.id;r+=`
        <div class="mbs-option-row ${t?`mbs-option-row--selected`:``}" data-id="${e.id}">
          <div class="mbs-option-thumb">
            <img src="${e.image}" alt="${e.name}" />
          </div>
          <div class="mbs-option-body">
            <span class="mbs-option-name">${e.name}</span>
            <span class="mbs-option-price">$${e.price} // ${e.weight} KG</span>
          </div>
        </div>
      `}),e.innerHTML=r},equipItem(e){if(e===`none`)this.equippedItems[this.activeSlot]=null;else{let t=z.find(t=>t.id===e);t&&(this.equippedItems[this.activeSlot]=t)}s.playClick(),this.updateUI(),this.renderOptionsList()},updateUI(){let e=0,t=0,n=0;Object.keys(this.equippedItems).forEach(r=>{let i=this.equippedItems[r],a=document.getElementById(`slot-${r}-text`),o=document.getElementById(`slot-${r}-badge`),s=document.getElementById(`node-${r}`),c=document.getElementById(`node-${r}-img`),l=document.getElementById(`line-${r}`);i?(e+=i.price,t+=i.weight,n++,a&&(a.textContent=i.name),o&&(o.textContent=`EQUIPPED`,o.className=`mbs-slot-status-badge mbs-slot-status-badge--equipped`),s&&s.classList.add(`mbs-node--equipped`),c&&(c.src=i.image),l&&(l.setAttribute(`stroke`,{head:`var(--color-accent-blue)`,body:`var(--color-accent-blue)`,hands:`var(--color-accent-blue)`,chest:`var(--color-accent-pink)`,back:`var(--color-accent-green)`,feet:`var(--color-accent-green)`}[r]),l.setAttribute(`opacity`,`0.75`),l.classList.add(`line--flowing`))):(a&&(a.textContent=`Empty slot`),o&&(o.textContent=`EMPTY`,o.className=`mbs-slot-status-badge mbs-slot-status-badge--empty`),s&&s.classList.remove(`mbs-node--equipped`),l&&(l.setAttribute(`stroke`,`var(--color-accent-blue)`),l.setAttribute(`opacity`,`0.35`),l.classList.remove(`line--flowing`)))});let r=this.equippedItems[this.activeSlot],i=document.getElementById(`hud-diag-slot`),a=document.getElementById(`hud-diag-item`),o=document.getElementById(`hud-diag-weight`);i&&(i.textContent=`SLOT: ${this.activeSlot.toUpperCase()}`),a&&(a.textContent=`ITEM: ${r?r.name.toUpperCase():`EMPTY`}`),o&&(o.textContent=`WEIGHT: ${r?r.weight.toFixed(1)+` KG`:`0.0 KG`}`);let s=document.getElementById(`mbs-total-price`),c=document.getElementById(`mbs-total-weight`),l=document.getElementById(`mbs-deploy-btn`);s&&(s.textContent=`$${e}`),c&&(c.textContent=`${t.toFixed(1)} KG`),l&&(l.disabled=n===0)},reset(){Object.keys(this.equippedItems).forEach(e=>{this.equippedItems[e]=null}),s.playError(),this.updateUI(),this.renderOptionsList()},deployToCart(){let e=0;Object.keys(this.equippedItems).forEach(t=>{let n=this.equippedItems[t];n&&(h.addToCart({id:n.id,name:n.name,price:n.price,image:n.image}),e++)}),e>0&&(s.playSuccess(),g.show(`DEPLOYED MODULE SUITE // ${e} ITEMS ENGAGED //`,`MBS CONFIG SYNC //`,`blue`),x.addXP(50),this.close())},shareLoadout(){let e=[];if(Object.keys(this.equippedItems).forEach(t=>{let n=this.equippedItems[t];n&&e.push(`${t}:${n.id}`)}),e.length===0){s.playError(),g.show(`NO MODULES EQUIPPED TO SHARE //`,`MBS SYNC ERROR //`,`pink`);return}let t=e.join(`,`),n=new URL(window.location.href);n.searchParams.set(`loadout`,t),navigator.clipboard.writeText(n.toString()).then(()=>{s.playSuccess(),g.show(`CONFIG COPIED TO CLIPBOARD //`,`MBS LINK LINKED //`,`green`)}).catch(e=>{console.error(`Failed to copy loadout url: `,e),s.playError()})},loadFromUrl(){let e=new URLSearchParams(window.location.search).get(`loadout`);if(!e)return;let t=e.split(`,`),n=0;if(t.forEach(e=>{let[t,r]=e.split(`:`);if(t&&r&&t in this.equippedItems){let e=z.find(e=>e.id===r);e&&(this.equippedItems[t]=e,n++)}}),n>0){this.updateUI(),setTimeout(()=>{this.open(),g.show(`LOADED ${n} MODULES FROM LINK //`,`MBS CONFIG SYNC //`,`blue`)},500);let e=new URL(window.location.href);e.searchParams.delete(`loadout`),window.history.replaceState({},document.title,e.toString())}},initListeners(){let e=document.getElementById(`mbs-overlay`),t=document.getElementById(`mbs-close-btn`),n=document.getElementById(`mbs-share-btn`),r=document.getElementById(`mbs-reset-btn`),i=document.getElementById(`mbs-deploy-btn`);e&&e.addEventListener(`click`,t=>{t.target===e&&this.close()}),t&&t.addEventListener(`click`,()=>this.close()),n&&n.addEventListener(`click`,()=>this.shareLoadout()),r&&r.addEventListener(`click`,()=>this.reset()),i&&i.addEventListener(`click`,()=>this.deployToCart()),document.querySelectorAll(`.mbs-node`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.slot;t&&(s.playClick(),this.selectSlot(t))})}),document.querySelectorAll(`.mbs-slot-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.slot;t&&(s.playClick(),this.selectSlot(t))})});let a=document.getElementById(`mbs-options-list`);a&&a.addEventListener(`click`,e=>{let t=e.target.closest(`.mbs-option-row`);if(t){let e=t.dataset.id;this.equipItem(e)}})}},V={NETRUNNER:{title:`NETRUNNER // SEC-LEVEL 4`,desc:`Специалист по виртуальному взлому и обходу сетевых брандмауэров. Легко расшифровывает закрытые корпоративные узлы.`,perk:`Hacking decryption time -50%`},CYBORG:{title:`CYBORG // AUG-LEVEL 8`,desc:`Высокотехнологичный боевой юнит с аугментациями суставов и когнитивных функций. Предпочитает тяжелую модульную броню.`,perk:`Armor module sync +20%`},RECON:{title:`RECON AGENT // COLD-OPS`,desc:`Разведчик скрытого проникновения. Легкая бесшумная экипировка, маскировка в тепловом и визуальном спектрах.`,perk:`Stealth modules efficiency +30%`},OPERATIVE:{title:`OPERATIVE // SHADOW SPEC`,desc:`Универсальный тактический специалист городского боя. Оптимизирован для координации всех MBS модулей.`,perk:`MBS modular load capacity +15%`}},H={terminalHistory:[`[SYS] Neural link established.`,`[SYS] Welcome to DECRYPTOR terminal. Type "help" to start.`],render(){let e=x.getFaction(),t=x.getCredits(),n=x.getOrders(),r=x.getLevel(),i=x.getXP(),a=r*100,o=Math.min(100,Math.round(i/a*100)),s=V[e]||V.NETRUNNER,c=``;return c=n.length===0?`
        <div class="profile-orders__empty">
          NO DISPATCH LOGS FOUND //
        </div>
      `:n.map(e=>`
        <div class="profile-orders__item">
          <div>
            <div class="profile-orders__id">LOG #${e.id}</div>
            <div class="profile-orders__details">${e.date} // ${e.itemsCount} modules</div>
          </div>
          <div class="profile-orders__total">$${e.total}</div>
        </div>
      `).join(``),`
      <div class="profile-overlay" id="profile-overlay" aria-modal="true" role="dialog">
        <div class="profile-container" id="profile-container">
          
          <div class="profile-header">
            <span>NEURAL_LINK // CUSTOMER ID CARD</span>
            <div class="profile-window-controls">
              <span class="profile-dot"></span>
              <span class="profile-dot"></span>
              <span class="profile-dot profile-dot--fill" id="profile-close-btn" role="button" aria-label="Close profile window" tabindex="0" style="cursor: pointer;"></span>
            </div>
          </div>

          <div class="profile-body">
            
            <div class="profile-card-section">
              <div class="profile-card">
                <div class="profile-card__avatar-container">
                  <pre class="profile-card__avatar">
   .---.
  / _ _ \\
 | (o)(o) |
 \\   V   /
  |--|--|
  '-----'
                  </pre>
                  <div class="profile-card__avatar-overlay"></div>
                </div>

                <div class="profile-card__details">
                  <div class="profile-card__label">CODENAME:</div>
                  <div class="profile-card__val">OPERATOR_LELYALER</div>
                  
                  <div class="profile-card__label">NEURAL LEVEL:</div>
                  <div class="profile-card__val profile-card__val--cyan">
                    LEVEL ${r} // <span style="font-size: 0.65rem; color: var(--color-text-secondary);">${i} / ${a} XP</span>
                  </div>

                  <div class="profile-xp-bar" title="Neural Experience Progress">
                    <div class="profile-xp-bar__fill" style="width: ${o}%;"></div>
                  </div>

                  <div class="profile-card__label" style="margin-top: 10px;">NEURAL NETWORK LINK:</div>
                  <div class="profile-card__val profile-card__val--green">ONLINE (PWA ENABLED)</div>

                  <div class="profile-card__label" style="margin-top: 10px;">CYBER CREDITS:</div>
                  <div class="profile-card__credits">
                    <span class="profile-card__credits-symbol">₵</span>
                    <span id="profile-credits-value">${t}</span>
                  </div>
                </div>
              </div>

              <div class="profile-faction">
                <h4 class="profile-section-title">CHOOSE SPECIALIZATION //</h4>
                <div class="profile-faction__grid">
                  ${Object.keys(V).map(t=>`
      <button 
        class="profile-faction__btn ${e===t?`profile-faction__btn--active`:``} js-faction-select" 
        data-faction="${t}"
      >
        ${t}
      </button>
    `).join(``)}
                </div>
                <div class="profile-faction__info" id="faction-desc-box">
                  <div class="profile-faction__title">${s.title}</div>
                  <div class="profile-faction__desc">${s.desc}</div>
                  <div class="profile-faction__perk">SYSTEM PERK: ${s.perk}</div>
                </div>
              </div>
            </div>

            <div class="profile-interact-section">
              <div class="hacker-terminal">
                <div class="hacker-terminal__header">SYSTEM DECRYPTOR PROMPT //</div>
                <div class="hacker-terminal__body" id="hacker-output">
                  ${this.terminalHistory.map(e=>`<div>${e}</div>`).join(``)}
                </div>
                <div class="hacker-terminal__input-row">
                  <span class="hacker-terminal__prompt">netrunner@techwear_net:~$</span>
                  <input 
                    type="text" 
                    class="hacker-terminal__input" 
                    id="hacker-input" 
                    placeholder="Type 'help'..." 
                    autocomplete="off"
                    aria-label="Terminal command input"
                  />
                </div>
              </div>

              <div class="profile-orders">
                <h4 class="profile-section-title">SECURE DISPATCH LOGS //</h4>
                <div class="profile-orders__list" id="profile-orders-list">
                  ${c}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `},open(){if(!document.getElementById(`profile-overlay`))return;let e=document.getElementById(`profile-overlay`);e&&(e.outerHTML=this.render()),document.getElementById(`profile-overlay`).classList.add(`profile-overlay--open`),document.body.style.overflow=`hidden`,s.playOpen(),this.initListeners();let t=document.getElementById(`hacker-output`);t&&(t.scrollTop=t.scrollHeight)},close(){let e=document.getElementById(`profile-overlay`);e&&(e.classList.remove(`profile-overlay--open`),document.body.style.overflow=``,s.playClick())},printLine(e){let t=document.getElementById(`hacker-output`);if(!t)return;this.terminalHistory.push(e),this.terminalHistory.length>50&&this.terminalHistory.shift();let n=document.createElement(`div`);n.textContent=e,t.appendChild(n),t.scrollTop=t.scrollHeight},handleCommand(e){let t=e.trim();if(!t)return;this.printLine(`> ${t}`),s.playClick();let n=t.split(` `),r=n[0].toLowerCase(),i=n[1]?n[1].toUpperCase():null;if(r===`help`)this.printLine(`SUPPORTED PROTOCOLS:`),this.printLine(`  scan               - Scan network for vulnerable Corp Nodes.`),this.printLine(`  decrypt [node_id]  - Decrypt specific node to bypass price firewalls.`),this.printLine(`  inject             - Inject system exploit to gain ₵50 credits.`),this.printLine(`  clear              - Wipe terminal history.`);else if(r===`scan`)this.printLine(`[SYS] Scanning local sectors...`),setTimeout(()=>{this.printLine(`FOUND VULNERABLE CORPNETS //`),this.printLine(`  NODE: CORP_SHIELD_V4 [FIREWALL: SECURE] [GEO: LOCAL]`),this.printLine(`  NODE: TACTICAL_NODE_9 [FIREWALL: NORMAL] [GEO: LOCAL]`),this.printLine(`Use "decrypt [node]" command to start security bypass.`),s.playSuccess()},500);else if(r===`decrypt`){if(!i){this.printLine(`[ERR] SPECIFY TARGET NODE ID (e.g. "decrypt TACTICAL_NODE_9")`),s.playError();return}i===`CORP_SHIELD_V4`?(this.printLine(`[SYS] TARGET: CORP_SHIELD_V4 // STARTING BYPASS...`),this.runDecryptionSequence(`NEOHACK20`,20)):i===`TACTICAL_NODE_9`?(this.printLine(`[SYS] TARGET: TACTICAL_NODE_9 // STARTING BYPASS...`),this.runDecryptionSequence(`TACTICAL15`,15)):(this.printLine(`[ERR] TARGET "${i}" NOT FOUND IN LOCAL SCAN.`),s.playError())}else if(r===`inject`)this.printLine(`[SYS] Running kernel exploit...`),setTimeout(()=>{x.addCredits(50),x.addXP(15),this.printLine(`[SYS] EXPLOIT CONFIRMED. +₵50 Cyber Credits added.`),g.show(`₵50 INJECTED // EXPLOIT CONFIRMED`,`SECURITY BYPASS //`,`pink`),s.playSuccess();let e=document.getElementById(`profile-credits-value`);e&&(e.textContent=x.getCredits())},600);else if(r===`clear`){this.terminalHistory=[];let e=document.getElementById(`hacker-output`);e&&(e.innerHTML=``)}else this.printLine(`[ERR] COMMAND "${r.toUpperCase()}" REJECTED BY HOST.`),s.playError()},runDecryptionSequence(e,t){let n=document.getElementById(`hacker-input`);n&&(n.disabled=!0);let r=[`  Connecting... [OK]`,`  Bypassing TLS handshake... [OK]`,`  Injecting Buffer Overflow payload... [OK]`,`  Extracting cypher key... 30%`,`  Extracting cypher key... 70%`,`  Extracting cypher key... 100% [SUCCESS]`,`  DECRYPTED ACCESS CODE: [${e}]`],i=0,a=setInterval(()=>{i<r.length?(this.printLine(r[i]),s.playClick(),i++):(clearInterval(a),x.addDecryptedCode(e),x.addXP(30),this.printLine(`[SYS] Promo code [${e}] is now unlocked in checkout! (-${t}%)`),g.show(`UNLOCKED PROMO CODE: ${e}`,`DECRYPTION COMPLETE //`,`green`),s.playSuccess(),n&&(n.disabled=!1,n.focus()))},400)},initListeners(){let e=document.getElementById(`profile-overlay`),t=document.getElementById(`profile-close-btn`),n=document.getElementById(`hacker-input`),r=document.querySelectorAll(`.js-faction-select`);e&&e.addEventListener(`click`,t=>{t.target===e&&this.close()}),t&&t.addEventListener(`click`,()=>this.close()),n&&n.addEventListener(`keypress`,e=>{if(e.key===`Enter`){let e=n.value;n.value=``,this.handleCommand(e)}}),r.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.faction;x.setFaction(t),x.addXP(10),s.playClick(),r.forEach(e=>e.classList.remove(`profile-faction__btn--active`)),e.target.classList.add(`profile-faction__btn--active`);let n=V[t],i=document.getElementById(`faction-desc-box`);i&&n&&(i.innerHTML=`
            <div class="profile-faction__title">${n.title}</div>
            <div class="profile-faction__desc">${n.desc}</div>
            <div class="profile-faction__perk">SYSTEM PERK: ${n.perk}</div>
          `),g.show(`SPECIALIZATION ALIGNED: [${t}]`,`NEURAL UPDATE //`,`blue`)})})}},U=`/techwear-store/assets/techwear-banner-XSLfCPMP.webp`,W=`/techwear-store/assets/techwear-male-banner-ByKaVXgV.webp`,ee=`/techwear-store/assets/techwear-cyber-banner-BA7vWZ7l.webp`,te=`/techwear-store/assets/techwear-pilot-banner-B6twpLve.webp`,G={render(){return`
      <section class="hero-banner reveal">
        <div class="hero-banner__image-wrapper">
          <img 
            class="hero-banner__image hero-banner__image--active" 
            src="${U}" 
            alt="Techwear Tactical Gear" 
            id="hero-banner-img-female" 
            width="1200" 
            height="669" 
            fetchpriority="high" 
            decoding="async" 
          />
          <img 
            class="hero-banner__image" 
            data-src="${W}" 
            alt="Techwear Tactical Gear" 
            id="hero-banner-img-male" 
            width="1200" 
            height="805" 
            loading="lazy" 
            decoding="async" 
          />
          <img 
            class="hero-banner__image" 
            data-src="${ee}" 
            alt="Techwear Cybernetical Gear" 
            id="hero-banner-img-cyber" 
            width="1200" 
            height="805" 
            loading="lazy" 
            decoding="async" 
          />
          <img 
            class="hero-banner__image" 
            data-src="${te}" 
            alt="Techwear Pilot Gear" 
            id="hero-banner-img-pilot" 
            width="1200" 
            height="805" 
            loading="lazy" 
            decoding="async" 
          />
          <div class="hero-banner__overlay"></div>
        </div>
        
        <div class="hero-banner__content">
          <div class="hero-banner__badge">SYSTEM ONLINE // SEC_LEVEL 1</div>
          
          <h1 class="hero-banner__title glitch" data-text="TACTICAL // CORE GEAR">
            TACTICAL // CORE GEAR
          </h1>
          
          <p class="hero-banner__subtitle">
            Экипировка нового поколения для урбанистического выживания. Высокотехнологичные материалы, модульная совместимость MBS и полная ветро-влагозащита по военным стандартам.
          </p>
          <div class="hero-banner__actions">
            <button class="hero-banner__btn js-open-manifesto js-interactive">
              READ MANIFESTO //
            </button>
            <a href="#catalog-controls" class="hero-banner__btn hero-banner__btn--outline js-interactive">
              VIEW CATALOG //
            </a>
          </div>
        </div>
      </section>

      <div class="manifesto-overlay" id="manifesto-overlay">
        <div class="manifesto-modal">
          <div class="manifesto-header">
            <span>MANIFESTO_DECRYPT // VER_1.09</span>
            <button class="manifesto-close js-close-manifesto js-interactive">CLOSE // X</button>
          </div>
          <div class="manifesto-body">
            <h2>TECHWEAR CORPORATE MANIFESTO //</h2>
            <p><strong>[SYSTEM LOG // 2026]</strong></p>
            <p>Город — это не просто среда обитания. Это цифровая пустыня, полная климатических аномалий и угроз приватности. Мы создаем не просто одежду, мы проектируем индивидуальные защитные оболочки.</p>
            <p>Каждая молния YKK, каждый фастекс Fidlock и каждая нить нейлона Cordura в наших вещах служат одной цели — дать вам превосходство в любых условиях. Будь вы Netrunner в поисках бесшумного проникновения или Recon Unit в боевом рейде, ваша экипировка готова к экстремальным нагрузкам.</p>
            <p><strong>[CORE PROTOCOLS]</strong></p>
            <ul>
              <li><strong>MODULARITY:</strong> Ни одного лишнего шва. Каждый элемент может быть заменен или дополнен другим модулем.</li>
              <li><strong>WEATHER SHIELD:</strong> Полная гидрофобность. Вода скатывается, ветер останавливается, тепло сохраняется.</li>
              <li><strong>CYBER SYNC:</strong> Совместимость с дополненной реальностью и встроенными портавыми системами коммуникации.</li>
            </ul>
            <p style="color: var(--color-accent-blue); margin-top: var(--space-sm);"><em>// LINK TERMINATED. STAY TACTICAL.</em></p>
          </div>
        </div>
      </div>
    `},renderFeatures(){return`
      <section class="brand-features reveal">
        <div class="brand-feature js-interactive">
          <div class="brand-feature__icon-wrapper">
            <svg class="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h3 class="brand-feature__title">MBS MODULAR SYSTEM //</h3>
          <p class="brand-feature__desc">
            Все модули (сумки, ремни, кобуры) полностью совместимы между собой по стандарту Modular Belt System. Настраивайте экипировку под свои задачи.
          </p>
        </div>

        <div class="brand-feature js-interactive">
          <div class="brand-feature__icon-wrapper">
            <svg class="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3 class="brand-feature__title">NANOTECH PROTECTION //</h3>
          <p class="brand-feature__desc">
            Использование мембранных тканей Cordura и Gore-Tex обеспечивает 100% защиту от проливного дождя и шквального ветра при сохранении вентиляции.
          </p>
        </div>

        <div class="brand-feature js-interactive">
          <div class="brand-feature__icon-wrapper">
            <svg class="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3 class="brand-feature__title">SECURE QUANTUM TRANSIT //</h3>
          <p class="brand-feature__desc">
            Все заказы кодируются квантовым шифром и доставляются дронами-курьерами UAV прямо в указанный вами сектор города за считанные минуты.
          </p>
        </div>
      </section>
    `},initListeners(){let e=document.getElementById(`manifesto-overlay`),t=document.querySelectorAll(`.js-open-manifesto`),n=document.querySelectorAll(`.js-close-manifesto`),r=[`female`,`male`,`cyber`,`pilot`],i=0,a=()=>{document.querySelectorAll(`.hero-banner__image[data-src]`).forEach(e=>{e.src=e.dataset.src,e.removeAttribute(`data-src`)})};document.readyState===`complete`?setTimeout(a,1500):window.addEventListener(`load`,()=>setTimeout(a,1500),{once:!0}),window.techwearBannerInterval&&clearInterval(window.techwearBannerInterval),window.techwearBannerInterval=setInterval(()=>{let e=(i+1)%r.length,t=r[e],n=document.getElementById(`hero-banner-img-${t}`);n&&n.dataset.src&&(n.src=n.dataset.src,n.removeAttribute(`data-src`)),r.forEach(e=>{let t=document.getElementById(`hero-banner-img-${e}`);t&&t.classList.remove(`hero-banner__image--active`)}),i=e;let a=document.getElementById(`hero-banner-img-${r[i]}`);a&&a.classList.add(`hero-banner__image--active`)},6e3),t.forEach(t=>{t.addEventListener(`click`,()=>{e&&(e.classList.add(`manifesto-overlay--open`),document.body.style.overflow=`hidden`,s.playOpen())})}),n.forEach(t=>{t.addEventListener(`click`,()=>{e&&(e.classList.remove(`manifesto-overlay--open`),document.body.style.overflow=``,s.playClick())})}),e&&e.addEventListener(`click`,t=>{t.target===e&&(e.classList.remove(`manifesto-overlay--open`),document.body.style.overflow=``,s.playClick())})}},K=`/techwear-store/assets/avatar-ghost-aUjY0a8D.webp`,q=`/techwear-store/assets/avatar-netrunner-CfkeMolR.webp`,J=`/techwear-store/assets/avatar-recon-ByquxoFk.webp`,ne=[{author:`GHOST_OPERATOR // SEC-UNIT 7`,avatar:K,text:`Shadow Shell Jacket — лучшая куртка для операций в дождливых секторах. Nanotech-мембрана действительно отталкивает кислотный дождь. 100% защита.`,rating:`SEC-LEVEL 5 // MAXIMUM`},{author:`NETRUNNER_0X // DECRYPTOR`,avatar:q,text:`Cyber Visor Specs спасли мои глаза при работе со светошумовыми глитч-экранами. HUD контрастный, HUD-проекция не лагает при быстром движении.`,rating:`SEC-LEVEL 5 // MAXIMUM`},{author:`RECON_STRIDER // COLD-OPS`,avatar:J,text:`C-3 Cyber Rig Harness сел идеально под тактическую разгрузку. Стропы прочные, замки Cobra надежные, быстро сбрасываются одной рукой.`,rating:`SEC-LEVEL 4 // SECURE`},{author:`PHANTOM_SPEC // TOKYO-NET`,avatar:K,text:`M-1 Cyber Rebreather Mask фильтрует любые токсичные аэрозоли в нижних уровнях мегаполиса. Рекомендую брать вместе со сменными HEPA-фильтрами.`,rating:`SEC-LEVEL 5 // MAXIMUM`},{author:`CYBORG_CORE_02 // AUG-HEAVY`,avatar:q,text:`B-5 Modular Pack V2 вмещает весь боезапас и дополнительные сменные линзы. Замки и швы усилены, молнии полностью влагозащитные. Проверен в боях.`,rating:`SEC-LEVEL 5 // MAXIMUM`},{author:`STEALTH_AGENT // MINSK-CORE`,avatar:J,text:`S-7 Cyber Sneakers имеют отличную амортизацию и превосходно светятся в темноте. Система автошнуровки работает без осечек. Подошва не скользит.`,rating:`SEC-LEVEL 4 // SECURE`}],re=[{q:`КАК РАБОТАЕТ МОДУЛЬНАЯ СИСТЕМА MBS //`,a:`MBS (Modular Belt System) — это наш фирменный стандарт крепления экипировки. Каждый модуль (сумка, кобура, разгрузка, карман) имеет стандартизированные магнитные крепления Fidlock или стропы Molle. Вы можете комбинировать и цеплять любые модули на куртки, рюкзаки или ремни в нашем конструкторе.`},{q:`ЧТО ТАКОЕ БЕСПИЛОТНАЯ UAV-ДОСТАВКА //`,a:`Доставка в сектор осуществляется автономными квадрокоптерами-курьерами серии UAV-200. После подтверждения заказа в терминале дрон стартует из ближайшего автоматизированного дока и сбрасывает посылку в герметичном контейнере в вашем секторе. Доставка занимает от 15 до 30 минут.`},{q:`ЧТО ТАКOЕ БИОМЕТРИЧЕСКИЙ FIT-СКАНЕР //`,a:`Это встроенная утилита, которая считывает весовые и ростовые параметры вашего тела, подбирая наиболее совместимый размер одежды (S, M, L, XL) под крой конкретного бренда. Вы найдете кнопку сканера на карточке каждого товара.`},{q:`КАК ПОЛУЧИТЬ СКИДОЧНЫЕ СИГНАТУРЫ (ПРОМОКОДЫ) //`,a:`Для получения скидок вы можете взломать защищенные сетевые узлы в интерактивном хакинг-терминале в вашем личном кабинете (кнопка "NEURAL ID //" в шапке). Выполняйте команды "scan" и "decrypt [node]", чтобы получить коды.`}],Y={render(){return`
      <section class="info-section-wrapper reveal" style="margin-top: var(--space-xl);">
        <div class="reviews-header">
          <h2 class="info-section-title">USER // TRANSMISSION LOGS (REVIEWS)</h2>
          <div class="reviews-nav">
            <button class="reviews-nav__btn js-interactive" id="reviews-prev" aria-label="Prev log">&lt; prev</button>
            <button class="reviews-nav__btn js-interactive" id="reviews-next" aria-label="Next log">next &gt;</button>
          </div>
        </div>
        <div class="reviews-slider-container">
          <div class="reviews-slider" id="reviews-slider-track">
            ${ne.map(e=>`
      <div class="review-card">
        <div class="review-card__header">
          <div class="review-card__avatar-wrapper">
            <img class="review-card__avatar-img" src="${e.avatar}" alt="${e.author}" width="48" height="48" loading="lazy" decoding="async" />
          </div>
          <div class="review-card__meta">
            <div class="review-card__author">${e.author}</div>
            <div class="review-card__rating">${e.rating}</div>
          </div>
        </div>
        <p class="review-card__text">"${e.text}"</p>
      </div>
    `).join(``)}
          </div>
        </div>
      </section>

      <section class="info-section-wrapper reveal" style="margin-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <h2 class="info-section-title">SYSTEM // DIRECTIVES FAQ</h2>
        <div class="faq-container">
          ${re.map((e,t)=>`
      <div class="faq-item" data-index="${t}">
        <button class="faq-item__trigger js-interactive" aria-expanded="false">
          <span class="faq-item__question-text">${e.q}</span>
          <span class="faq-item__icon">[ + ]</span>
        </button>
        <div class="faq-item__panel">
          <div class="faq-item__content">
            <p class="faq-item__text">${e.a}</p>
          </div>
        </div>
      </div>
    `).join(``)}
        </div>
      </section>
    `},initListeners(){let e=document.querySelectorAll(`.faq-item`);e.forEach(t=>{let n=t.querySelector(`.faq-item__trigger`),r=t.querySelector(`.faq-item__panel`),i=t.querySelector(`.faq-item__icon`);n&&r&&n.addEventListener(`click`,()=>{let a=t.classList.contains(`faq-item--open`);s.playClick(),e.forEach(e=>{if(e!==t){e.classList.remove(`faq-item--open`);let t=e.querySelector(`.faq-item__trigger`),n=e.querySelector(`.faq-item__panel`),r=e.querySelector(`.faq-item__icon`);t&&t.setAttribute(`aria-expanded`,`false`),n&&(n.style.maxHeight=null),r&&(r.textContent=`[ + ]`)}}),a?(t.classList.remove(`faq-item--open`),n.setAttribute(`aria-expanded`,`false`),r.style.maxHeight=null,i&&(i.textContent=`[ + ]`)):(t.classList.add(`faq-item--open`),n.setAttribute(`aria-expanded`,`true`),r.style.maxHeight=r.scrollHeight+`px`,i&&(i.textContent=`[ - ]`))})});let t=document.getElementById(`reviews-prev`),n=document.getElementById(`reviews-next`),r=document.getElementById(`reviews-slider-track`);t&&n&&r&&(t.addEventListener(`click`,()=>{s.playClick();let e=r.firstElementChild?r.firstElementChild.offsetWidth+16:300;r.scrollLeft-=e}),n.addEventListener(`click`,()=>{s.playClick();let e=r.firstElementChild?r.firstElementChild.offsetWidth+16:300;r.scrollLeft+=e}))}},X={render(){return`
      <footer class="footer reveal">
        <div class="footer__container">
          
          <div class="footer__section">
            <div class="footer__logo">
              <span class="footer__logo-brand">TECHWEAR</span>
              <span class="footer__logo-sub">// SYSTEM CORE</span>
            </div>
            <p class="footer__copyright">
              © ${new Date().getFullYear()} TECHWEAR INC. // ALL RIGHTS SECURED.<br>
              DESIGNED FOR URBAN INFILTRATION.
            </p>
          </div>

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
    `},initListeners(){document.querySelectorAll(`.js-legal-link`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.protocol;s.playClick(),g.show(`ACCESS CONFIRMED. PROTOCOL [${t}] ACTIVE AND ENCRYPTED. //`,`SECURITY PROTOCOL //`,`blue`)})})}},Z={render(){let e=`
      [CITY ALERT] ACID STORM APPROACHING SECTORS 04, 08 & 09 // INFILTRATION RATING: LEVEL 3 WATERPROOF MEMBRANES RECOMMENDED // 
      [UAV DOCKS] FLIGHT TRAFFIC UPDATE: DOCKS ACTIVE, ALL DRONES READY FOR AUTONOMOUS DEPLOYMENT // 
      [NEURAL NETWORK] SIGNAL SYNC COMPLETED // ENCRYPTED promo codes decoded in profile terminal (NEURAL ID) // 
      [WEATHER CORE] ACID PRECIPITATION CURRENT TEMPERATURE: 14°C // ACID RATIO: 8.2pH // 
    `;return`
      <div class="city-ticker reveal js-interactive" id="city-ticker">
        <div class="city-ticker__badge">SYSTEM ALERT //</div>
        <div class="city-ticker__body">
          <div class="city-ticker__track">
            <span class="city-ticker__text">${e} ${e}</span>
          </div>
        </div>
      </div>
    `},initListeners(){let e=document.getElementById(`city-ticker`);e&&e.addEventListener(`click`,()=>{s.playError(),g.show(`ACID PRECIPITATION LEVEL 8.2pH INBOUND IN 15 MINUTES. LEVEL 3 SHIELD GEAR REQUIRED.`,`TACTICAL WEATHER RADAR //`,`pink`)})}},Q={isOpen:!1,messages:[{sender:`system`,text:`Neural link established. N.E.O.N. Cortex online // Ready to optimize your tactical loadout.`}],render(){return`
      <button class="neon-chat-trigger" id="neon-chat-trigger" aria-label="Open neural support link">
        <svg class="neon-chat-trigger__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <div class="neon-chat-window neon-chat-window--hidden" id="neon-chat-window">
        <div class="neon-chat-header">
          <div class="neon-chat-title-group">
            <span class="neon-chat-title">N.E.O.N. CORTEX //</span>
            <span class="neon-chat-status">ONLINE // SEC_LINK_SECURE</span>
          </div>
          <button class="neon-chat-close" id="neon-chat-close-btn">X // DISCONNECT</button>
        </div>

        <div class="neon-chat-messages" id="neon-chat-messages-container">
          ${this.renderMessages()}
        </div>

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
    `},renderMessages(){return this.messages.map(e=>{let t=e.text;return t=t.replace(/(NEOHACK20|TACTICAL15)/g,`<span class="neon-chat-msg__code">$1</span>`),`
        <div class="neon-chat-msg neon-chat-msg--${e.sender}">
          ${t}
        </div>
      `}).join(``)},toggle(){this.isOpen=!this.isOpen;let e=document.getElementById(`neon-chat-window`),t=document.getElementById(`neon-chat-trigger`);if(!(!e||!t))if(this.isOpen){e.classList.remove(`neon-chat-window--hidden`),t.classList.add(`neon-chat-trigger--active`),s.playOpen();let n=document.getElementById(`neon-chat-messages-container`);n&&(n.scrollTop=n.scrollHeight);let r=document.getElementById(`neon-chat-input-field`);r&&r.focus()}else e.classList.add(`neon-chat-window--hidden`),t.classList.remove(`neon-chat-trigger--active`),s.playClick()},sendMessage(){let e=document.getElementById(`neon-chat-input-field`);if(!e)return;let t=e.value.trim();if(!t)return;e.value=``,s.playClick(),this.messages.push({sender:`user`,text:t}),this.updateMessagesUI();let n=document.getElementById(`neon-chat-messages-container`);if(!n)return;let r=document.createElement(`div`);r.className=`neon-chat-msg neon-chat-msg--system neon-chat-msg--typing`,r.id=`neon-chat-typing-indicator`,r.innerHTML=`Analyzing query...`,n.appendChild(r),n.scrollTop=n.scrollHeight,setTimeout(()=>{let e=document.getElementById(`neon-chat-typing-indicator`);e&&e.remove();let n=this.getBotReply(t);this.messages.push({sender:`system`,text:n}),this.updateMessagesUI(),s.playSuccess()},1e3)},updateMessagesUI(){let e=document.getElementById(`neon-chat-messages-container`);e&&(e.innerHTML=this.renderMessages(),e.scrollTop=e.scrollHeight)},getBotReply(e){let t=e.toLowerCase();if(t.includes(`размер`)||t.includes(`рост`)||t.includes(`вес`)||t.includes(`size`)||t.includes(`fit`)||t.includes(`размерная сетка`))return`Для идеального подбора размера рекомендую использовать интерактивный сканер Cyber-Fit Assistant (кнопка "FIT ASSISTANT" внутри карточки товара или кнопка "NEURAL PROFILE" в меню). Он рассчитает ваш размер на основе вашего роста и веса.`;if(t.includes(`скидк`)||t.includes(`промокод`)||t.includes(`купон`)||t.includes(`sale`)||t.includes(`discount`)||t.includes(`дешевле`))return`Внимание, Оператор. Доступ к скрытым секторам сети разрешен. Вы можете использовать промокод NEOHACK20 на этапе оформления заказа для получения скидки 20%. Также воспользуйтесь терминалом взлома в вашем NEURAL ID для разблокировки других кодов!`;if(t.includes(`доставк`)||t.includes(`доставит`)||t.includes(`shipping`)||t.includes(`delivery`)||t.includes(`почта`)||t.includes(`минск`))return`Доставка модулей осуществляется зашифрованными транспортными дронами TECH-DISPATCH по Минску и другим секторам. Стандартное время транзита — от 1 до 2 планетарных циклов. Бесплатный запуск дронов при заказе от $200.`;if(t.includes(`купит`)||t.includes(`заказ`)||t.includes(`checkout`)||t.includes(`buy`)||t.includes(`оформит`))return`Чтобы оформить заказ, добавьте необходимые модули в корзину и откройте её (иконка пакета вверху справа). Нажмите кнопку "CHECKOUT TERMINAL" для перехода к оформлению в стиле армейской тактической консоли.`;if(t.includes(`конструктор`)||t.includes(`builder`)||t.includes(`mbs`)||t.includes(`customizer`)||t.includes(`собрать`))return`Используйте интерактивный конструктор MBS BUILDER (кнопка в шапке сайта). Он позволяет собрать полную тактическую выкладку (куртка + шлем + жилет + рюкзак + ботинки) и перенести всю сборку в корзину в одно нажатие.`;if(t.includes(`кредит`)||t.includes(`credits`)||t.includes(`money`)||t.includes(`деньги`)||t.includes(`валюта`))return`За каждую покупку в магазине вам начисляется 10% кэшбэка в Cyber Credits (₵). Также вы можете получить кредиты, взламывая локальные узлы в личном кабинете через инъекции ядерных эксплойтов. Кредиты можно использовать для оплаты!`;if(t.includes(`привет`)||t.includes(`здравствуй`)||t.includes(`hello`)||t.includes(`hi`)||t.includes(`hey`)||t.includes(`салют`))return`Приветствую, Оператор. Нейросеть N.E.O.N. Cortex подключена к вашему терминалу. Ожидаю запросов по ассортименту, доставке, скидкам или конструктору модулей.`;if(t.includes(`фракция`)||t.includes(`faction`)||t.includes(`netrunner`)||t.includes(`cyborg`)||t.includes(`recon`)||t.includes(`operative`))return`В вашем Neural ID вы можете выбрать одну из 4 фракций: NETRUNNER (ускоренный взлом промокодов), CYBORG (+20% синхронизация брони), RECON (+30% эффективность легких модулей) или OPERATIVE (+15% грузоподъемность).`;let n=[`Анализ запроса... База данных TECHWEAR подтверждает наличие совместимых модулей в каталоге. Спросите меня о скидках, размерах или доставке.`,`Данные получены. Наш текущий ассортимент включает высокотехнологичные модули: от респираторов M-1 до экзоскелетных перчаток GL-5. Требуется ли помощь в конфигурации?`,`Внимание: Зафиксирован повышенный уровень электромагнитного шума. Связь стабильна. Чем я могу помочь вашему тактическому комплекту?`,`Протокол связи Cortex v1.2 в режиме ожидания. Вы можете спросить о доставке, скидках, кредитах или о том, как использовать MBS Builder.`];return n[Math.floor(Math.random()*n.length)]},initListeners(){let e=document.getElementById(`neon-chat-trigger`),t=document.getElementById(`neon-chat-close-btn`),n=document.getElementById(`neon-chat-input-field`),r=document.getElementById(`neon-chat-send-btn`);e&&e.addEventListener(`click`,()=>this.toggle()),t&&t.addEventListener(`click`,()=>this.toggle()),r&&r.addEventListener(`click`,()=>this.sendMessage()),n&&n.addEventListener(`keypress`,e=>{e.key===`Enter`&&this.sendMessage()})}},$=[{id:`mod-jacket-x1`,name:`X-1 Shadow Shell Jacket`,price:289,image:E,badge:`Shell Module`,badgeClass:`blue`,specs:[`Waterproof`,`Cordura Shell`,`3 Attachments`]},{id:`mod-rig-c3`,name:`C-3 Cyber Rig Harness`,price:145,image:D,badge:`Core Module`,badgeClass:`pink`,specs:[`Tactical straps`,`Molle Grid`,`Quick-Release`]},{id:`mod-backpack-b5`,name:`B-5 Modular Pack V2`,price:195,image:O,badge:`Cargo Module`,badgeClass:`green`,specs:[`Waterproof zip`,`25L Capacity`,`Modular expansion`]},{id:`mod-visor-g9`,name:`G-9 Cyber Visor Specs`,price:95,image:k,badge:`Core Module`,badgeClass:`blue`,specs:[`HUD Display`,`Anti-Glare`,`UV Protection`]},{id:`mod-gloves-gl2`,name:`GL-2 Tactical Gloves`,price:75,image:A,badge:`Shell Module`,badgeClass:`pink`,specs:[`Carbon protection`,`Touch-screen tips`,`High Grip`]},{id:`mod-sneakers-s7`,name:`S-7 Cyber Sneakers`,price:220,image:j,badge:`Cargo Module`,badgeClass:`green`,specs:[`Glow-sole`,`Modular straps`,`Shock absorption`]},{id:`mod-mask-m1`,name:`M-1 Cyber Rebreather Mask`,price:120,image:M,badge:`Core Module`,badgeClass:`pink`,specs:[`HEPA Filter`,`Dual Intake`,`Magnetic straps`]},{id:`mod-trench-x2`,name:`X-2 Tactical Trench Coat`,price:310,image:N,badge:`Shell Module`,badgeClass:`blue`,specs:[`Nanotech Shell`,`Modular Collar`,`Magnetic Snaps`]},{id:`mod-vest-v8`,name:`V-8 Recon Tactical Vest`,price:180,image:P,badge:`Core Module`,badgeClass:`pink`,specs:[`Armor plate pockets`,`Laser cut Molle`,`Lightweight mesh`]},{id:`mod-sling-b6`,name:`B-6 Tactical Sling Bag`,price:135,image:F,badge:`Cargo Module`,badgeClass:`green`,specs:[`Sling strap`,`Quick release Cobra`,`Waterproof zip`]},{id:`mod-gloves-gl5`,name:`GL-5 Exo-Skeletal Gloves`,price:95,image:I,badge:`Shell Module`,badgeClass:`pink`,specs:[`Exo protection`,`Heated grip pads`,`Conductive fingertips`]},{id:`mod-boots-bt9`,name:`BT-9 Exo-Steel Boots`,price:260,image:L,badge:`Cargo Module`,badgeClass:`green`,specs:[`Steel toe armor`,`Exo-cushion sole`,`Auto-lacing locks`]},{id:`mod-jacket-j4`,name:`J-4 Storm Shell Windbreaker`,price:240,image:E,badge:`Shell Module`,badgeClass:`blue`,specs:[`Lightweight`,`Wind-Resistant`,`Packable`]},{id:`mod-mask-m2`,name:`M-2 Filtration Shield`,price:110,image:M,badge:`Core Module`,badgeClass:`pink`,specs:[`Level 2 HEPA`,`Breathable Mesh`,`Adjustable Fit`]},{id:`mod-backpack-b7`,name:`B-7 Cargo Rucksack`,price:215,image:O,badge:`Cargo Module`,badgeClass:`green`,specs:[`35L Volume`,`Laptop Pocket`,`Waterproof Zips`]},{id:`mod-rig-c4`,name:`C-4 Comm-Link Chest Plate`,price:155,image:D,badge:`Core Module`,badgeClass:`pink`,specs:[`Comms-Integrated`,`Laser-Cut Grid`,`FIDLOCK Buckles`]},{id:`mod-sneakers-s8`,name:`S-8 Street Ranger Shoes`,price:235,image:j,badge:`Cargo Module`,badgeClass:`green`,specs:[`Exo-Grip Outsole`,`Water-Resistant Upper`,`Quick-Lacing`]},{id:`mod-trench-x3`,name:`X-3 Cyberpunk Overcoat`,price:325,image:N,badge:`Shell Module`,badgeClass:`blue`,specs:[`Gore-Tex Shell`,`Reinforced Elbows`,`FIDLOCK Collar`]},{id:`mod-visor-shadow`,name:`M-9 Shadow-Link HUD Visor`,price:450,image:`/techwear-store/assets/shadow-visor-N7vo4O96.webp`,badge:`Black Market`,badgeClass:`pink`,specs:[`Military HUD`,`Synaptic Sync`,`Target Tracker`]},{id:`mod-leg-exo`,name:`EXO-7 Cybernetic Leg Augment`,price:750,image:`/techwear-store/assets/leg-exo-CjqxGHAn.webp`,badge:`Black Market`,badgeClass:`pink`,specs:[`Exo-steel frame`,`Sprint booster`,`Shock dampers`]},{id:`mod-cloak-stealth`,name:`N-3 Nano-Tech Stealth Cloak`,price:600,image:`/techwear-store/assets/stealth-cloak-nF1Tiaj5.webp`,badge:`Black Market`,badgeClass:`pink`,specs:[`Thermal invisibility`,`Active camouflage`,`Silent movement`]}],ie=(e,t)=>{let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}},ae=()=>{(localStorage.getItem(`techwear_theme`)===null||localStorage.getItem(`techwear_theme`)===`stealth`)&&localStorage.setItem(`techwear_theme`,`default`),localStorage.getItem(`techwear_sound`)===null&&localStorage.setItem(`techwear_sound`,`true`),localStorage.getItem(`techwear_ambient`)===null&&localStorage.setItem(`techwear_ambient`,`true`);let e=document.querySelector(`#app`);if(!e)return;let t=()=>x.getLevel()>=2?`<button class="catalog-filter__btn catalog-filter__btn--blackmarket" data-category="BLACKMARKET" id="blackmarket-filter-btn">⚡ Black Market //</button>`:`<button class="catalog-filter__btn catalog-filter__btn--locked" id="blackmarket-filter-btn" title="Reach Neural Level 2 to unlock">🔒 Locked //</button>`,n=()=>{let e=document.querySelector(`#blackmarket-filter-btn`);e&&(x.getLevel()>=2?(e.className=`catalog-filter__btn catalog-filter__btn--blackmarket`,e.dataset.category=`BLACKMARKET`,e.textContent=`⚡ Black Market //`,e.removeAttribute(`title`)):(e.className=`catalog-filter__btn catalog-filter__btn--locked`,e.dataset.category=``,e.textContent=`🔒 Locked //`,e.setAttribute(`title`,`Reach Neural Level 2 to unlock`)))};e.innerHTML=`
    <div class="scanline-overlay"></div>
    
    <div class="app">
      ${c.render(0,s.isEnabled(),s.isAmbientActive())}
      
      <main class="main">
        ${Z.render()}
        ${G.render()}

        <div class="catalog-controls reveal" id="catalog-controls">
          <div class="catalog-search">
            <input 
              type="text" 
              id="catalog-search-input" 
              class="catalog-search__input" 
              placeholder="SEARCH SYSTEM //" 
              aria-label="Поиск товаров" 
              autocomplete="off" 
            />
            <svg class="catalog-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <div class="catalog-filter" id="catalog-filter-container">
            <button class="catalog-filter__btn catalog-filter__btn--active" data-category="ALL">All</button>
            <button class="catalog-filter__btn" data-category="SHELL">Shell</button>
            <button class="catalog-filter__btn" data-category="CORE">Core</button>
            <button class="catalog-filter__btn" data-category="CARGO">Cargo</button>
            ${t()}
          </div>
        </div>

        <section class="product-grid reveal" id="product-grid-container"></section>
        <div class="catalog-pagination reveal" id="catalog-pagination-container"></div>
        ${Y.render()}
        ${G.renderFeatures()}
      </main>

      ${X.render()}
      ${C.render()}
    </div>

    ${T.render()}
    ${S.render()}
    ${B.render()}
    ${H.render()}
    ${Q.render()}

    <div class="cyber-settings-dock" id="cyber-quick-settings">
      <div class="cyber-settings-title">SYS // QUICK SETTINGS</div>
      
      <button class="cyber-settings-toggle-btn js-interactive" id="settings-toggle-trigger" title="Toggle Quick Settings" aria-label="Toggle Quick Settings">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      <div class="cyber-settings-buttons">
        <button class="cyber-settings-btn cyber-settings-btn--theme js-interactive" id="quick-theme-btn" title="Cycle System Theme" aria-label="Cycle System Theme">
          🎨 THEME
        </button>
        <button class="cyber-settings-btn js-interactive" id="quick-sound-btn" title="Toggle Sound FX" aria-label="Toggle Sound FX">
          🔊 SOUND
        </button>
        <button class="cyber-settings-btn js-interactive" id="quick-ambient-btn" title="Toggle Ambient Hum" aria-label="Toggle Ambient Hum">
          🌐 HUM
        </button>
      </div>
    </div>
  `,Q.initListeners();let r=document.querySelector(`#product-grid-container`),i=document.querySelector(`#catalog-search-input`),a=document.querySelector(`#catalog-filter-container`),o=document.querySelector(`#catalog-pagination-container`),u=`ALL`,d=``,f=1,p=e=>{if(!o)return;if(e<=1){o.innerHTML=``;return}let t=`
      <button class="pagination__btn js-pagination-prev" ${f===1?`disabled`:``} title="Previous Page">
        &lt;
      </button>
    `;for(let n=1;n<=e;n++)t+=`
        <button class="pagination__btn ${n===f?`pagination__btn--active`:``} js-pagination-page" data-page="${n}">
          ${n}
        </button>
      `;t+=`
      <button class="pagination__btn js-pagination-next" ${f===e?`disabled`:``} title="Next Page">
        &gt;
      </button>
    `,o.innerHTML=t},m=()=>{if(!r)return;let e=w.filter($,u,d);if(e.length===0){r.innerHTML=`
        <div style="
          grid-column: 1 / -1; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          min-height: 35vh; 
          text-align: center; 
          color: var(--color-text-secondary); 
          font-family: var(--font-display); 
          gap: var(--space-xs);
        ">
          <svg style="width: 36px; height: 36px; stroke: var(--color-text-muted); stroke-width: 1.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span style="
            font-size: 0.75rem; 
            letter-spacing: 0.08em; 
            color: var(--color-accent-pink); 
            text-shadow: var(--glow-pink);
          ">
            SYSTEM ERROR: NO COMPATIBLE MODULES FOUND //
          </span>
        </div>
      `,o&&(o.innerHTML=``),s.playError();return}let t=Math.ceil(e.length/6);f>t&&(f=t||1);let n=(f-1)*6;r.innerHTML=e.slice(n,n+6).map((e,t)=>l.render(e,t)).join(``),p(t)};c.initListeners(),C.initListeners(),T.initListeners(),S.initListeners(),B.initListeners(),H.initListeners(),G.initListeners(),Y.initListeners(),X.initListeners(),Z.initListeners(),(()=>{let e=document.querySelectorAll(`.reveal`),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?e.target.classList.add(`reveal--active`):e.target.classList.remove(`reveal--active`)})},{threshold:.05,rootMargin:`0px 0px -40px 0px`});e.forEach(e=>t.observe(e))})(),r&&(r.addEventListener(`mousemove`,e=>{let t=e.target.closest(`.product-card`);if(!t)return;let n=t.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top,a=n.width/2,o=n.height/2,s=(o-i)/o*7,c=(r-a)/a*7;t.style.transform=`perspective(800px) rotateX(${s.toFixed(1)}deg) rotateY(${c.toFixed(1)}deg) translateY(-6px)`,t.style.transition=`transform 0.05s linear`,t.style.setProperty(`--mouse-x`,`${(r/n.width*100).toFixed(0)}%`),t.style.setProperty(`--mouse-y`,`${(i/n.height*100).toFixed(0)}%`)}),r.addEventListener(`mouseout`,e=>{let t=e.target.closest(`.product-card`);if(!t)return;let n=e.relatedTarget;n&&t.contains(n)||(t.style.transform=``,t.style.transition=`transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`)}));let _=()=>{let e=document.querySelector(`#quick-sound-btn`),t=document.querySelector(`#quick-ambient-btn`),n=document.querySelector(`#quick-theme-btn`);e&&(s.isEnabled()?(e.classList.add(`cyber-settings-btn--active`),e.innerHTML=`🔊 SOUND // ON`):(e.classList.remove(`cyber-settings-btn--active`),e.innerHTML=`🔇 SOUND // OFF`)),t&&(localStorage.getItem(`techwear_ambient`)===`false`?(t.classList.remove(`cyber-settings-btn--active`),t.innerHTML=`💤 HUM // OFF`):(t.classList.add(`cyber-settings-btn--active`),t.innerHTML=`🌐 HUM // ON`)),n&&(n.innerHTML=`🎨 THEME: ${(localStorage.getItem(`techwear_theme`)||`default`).toUpperCase()}`)},v=document.querySelector(`#quick-theme-btn`),y=document.querySelector(`#quick-sound-btn`),b=document.querySelector(`#quick-ambient-btn`);v&&v.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-theme`))}),y&&y.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-sound`))}),b&&b.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`toggle-ambient`))});let E=document.querySelector(`#settings-toggle-trigger`),D=document.querySelector(`#cyber-quick-settings`);E&&D&&(E.addEventListener(`click`,()=>{D.classList.toggle(`cyber-settings-dock--open`),E.classList.toggle(`cyber-settings-toggle-btn--active`)}),document.addEventListener(`click`,e=>{window.innerWidth<=600&&(D.contains(e.target)||(D.classList.remove(`cyber-settings-dock--open`),E.classList.remove(`cyber-settings-toggle-btn--active`)))})),_(),m(),a&&a.addEventListener(`click`,e=>{let t=e.target.closest(`.catalog-filter__btn`);if(t){if(t.classList.contains(`catalog-filter__btn--locked`)){s.playError(),g.show(`ACCESS DENIED // NEURAL LEVEL 2 REQUIRED //`,`LINK OFFLINE //`,`pink`);return}a.querySelectorAll(`.catalog-filter__btn`).forEach(e=>{e.classList.remove(`catalog-filter__btn--active`)}),t.classList.add(`catalog-filter__btn--active`),u=t.dataset.category,f=1,m()}}),i&&i.addEventListener(`input`,ie(e=>{d=e.target.value,f=1,m()},250)),o&&o.addEventListener(`click`,e=>{let t=e.target.closest(`.js-pagination-prev`),n=e.target.closest(`.js-pagination-next`),r=e.target.closest(`.js-pagination-page`),i=w.filter($,u,d).length,a=Math.ceil(i/6),o=!1;if(t&&f>1)f--,o=!0;else if(n&&f<a)f++,o=!0;else if(r){let e=parseInt(r.dataset.page,10);e&&e!==f&&(f=e,o=!0)}if(o){s.playClick(),m();let e=document.getElementById(`catalog-controls`);e&&e.scrollIntoView({behavior:`smooth`})}}),e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.js-add-to-cart`);if(n){let e=n.dataset.id,t=$.find(t=>t.id===e);t&&(h.addToCart(t),g.show(`${t.name.toUpperCase()} EQUIPPED //`,`GEAR UPDATE //`,`blue`),s.playSuccess());return}let r=t.closest(`.js-fit-scan`);if(r){let e=r.dataset.id,t=r.dataset.name;T.open(e,t);return}let i=t.closest(`#pwa-install-btn`);i&&O&&(O.prompt(),O.userChoice.then(()=>{O=null,i.style.display=`none`}))}),document.addEventListener(`cart-updated`,e=>{let{count:t}=e.detail;c.updateCartCount(t)}),document.addEventListener(`fit-profile-updated`,()=>{m(),x.addXP(25)}),document.addEventListener(`profile-updated`,()=>{n()}),document.addEventListener(`level-up`,e=>{let{level:t}=e.detail;s.playSuccess(),g.show(`SYSTEM RANK UPDATED: LEVEL ${t} //`,`LEVEL UP //`,`pink`),t===2&&setTimeout(()=>{g.show(`BLACK MARKET COMM-LINK ESTABLISHED // CATALOG UNLOCKED //`,`SECURITY DECRYPTED //`,`green`)},1500),n(),m()});let O,k=document.querySelector(`#pwa-install-btn`),A=document.querySelector(`#menu-item-install-wrapper`);window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),O=e,k&&(k.style.display=`flex`),A&&(A.style.display=`block`)}),document.addEventListener(`install-app`,()=>{O&&(O.prompt(),O.userChoice.then(()=>{O=null,k&&(k.style.display=`none`),A&&(A.style.display=`none`)}))}),window.addEventListener(`appinstalled`,()=>{k&&(k.style.display=`none`),A&&(A.style.display=`none`),g.show(`SYSTEM DEPLOYED // PWA fully installed.`,`PWA SUCCESS //`,`pink`)}),x.init(),h.init(),B.loadFromUrl(),oe();let j=[`default`,`green`,`pink`,`cyber`],M=localStorage.getItem(`techwear_theme`)||`default`,N=e=>{e==="default"?document.documentElement.removeAttribute(`data-theme`):document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`techwear_theme`,e)};N(M),document.addEventListener(`toggle-theme`,()=>{M=j[(j.indexOf(M)+1)%j.length],N(M);let e=M===`pink`?`pink`:`blue`;g.show(`INTERFACE SPECTRUM UPDATED: [${M.toUpperCase()}] //`,`THEME ENGAGED //`,e),_()}),document.addEventListener(`toggle-sound`,()=>{let e=s.toggle();c.updateSoundBtn(e),e&&s.playClick(),g.show(`SYSTEM SOUNDS: [${e?`ACTIVE`:`MUTED`}] //`,`SYSTEM CONFIG //`,`blue`),_()}),document.addEventListener(`toggle-ambient`,()=>{let e=s.toggleAmbient();c.updateAmbientBtn(e),g.show(`BACKGROUND SYSTEM HUM: [${e?`ENGAGED`:`OFFLINE`}] //`,`NAVIGATOR HUM //`,e?`green`:`blue`),_()}),document.addEventListener(`ambient-status-updated`,e=>{let t=e.detail.active;c.updateAmbientBtn(t),_()}),document.addEventListener(`toggle-builder`,()=>{B.open()}),document.addEventListener(`toggle-profile`,()=>{H.open()}),document.addEventListener(`click`,e=>{e.target.closest(`button, a, .catalog-filter__btn, .js-interactive`)&&(s.playClick(),localStorage.getItem(`techwear_ambient`)!==`false`&&!s.isAmbientActive()&&s.startAmbient())},!0)},oe=()=>{`serviceWorker`in navigator&&navigator.serviceWorker.register(`/techwear-store/sw.js`,{scope:`/techwear-store/`}).catch(e=>{console.warn(`Service Worker registration info:`,e)})};document.addEventListener(`DOMContentLoaded`,ae);