import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { useToast } from '../context/ToastContext';
import { AudioService } from '../services/audio';

interface CheckoutTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'address' | 'contact' | 'payment' | 'radar' | 'success';

export const CheckoutTerminalModal: React.FC<CheckoutTerminalModalProps> = ({ isOpen, onClose }) => {
  const { items, total, clearCart } = useCart();
  const { profile, addCredits, deductCredits } = useProfile();
  const { showToast } = useToast();

  const [step, setStep] = useState<CheckoutStep>('address');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'credits'>('card');
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [orderId, setOrderId] = useState<string>('');
  const [radarStatus, setRadarStatus] = useState<string>('INITIALIZING LOGISTICS UAV...');
  const [radarDistance, setRadarDistance] = useState<string>('DIST: 14.2 KM');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      AudioService.playOpen();
      setStep('address');
      setAddress('');
      setContact('');
      setPaymentMethod('card');
      setInputVal('');
      setOrderId('TX-' + Math.floor(100000 + Math.random() * 900000));

      const initLogs = [
        '***************************************************',
        '*       TACTICAL GEAR DISPATCH PROTOCOL v4.2      *',
        '*       AUTONOMOUS LOGISTICS & DELIVERY CHANNEL   *',
        '***************************************************',
        '[SYS] Link status: SECURE // PORT: 922 ESTABLISHED',
        `[SYS] Товаров в заказе: ${items.length} шт. // Сумма: $${total}`,
        '\n[SYS] ШАГ 1: ВВЕДИТЕ АДРЕС ДОСТАВКИ (Город, улица, дом, кв) //'
      ];
      setLogs(initLogs);

      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 200);
    }
  }, [isOpen, items.length, total]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs, step]);

  useEffect(() => {
    if (step !== 'radar' || !isOpen) return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 300);
    const height = (canvas.height = 180);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = 75;

    let angle = 0;
    const startTime = Date.now();
    const duration = 6500;

    const renderRadar = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.fillStyle = 'rgba(5, 7, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
      ctx.lineWidth = 1;
      [25, 50, 75].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.stroke();

      angle += 0.05;
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
      ctx.stroke();

      // UAV Drone blip moving toward center dropzone
      const droneDist = maxRadius * (1 - progress);
      const droneAngle = Math.PI * 0.25;
      const droneX = centerX + Math.cos(droneAngle) * droneDist;
      const droneY = centerY + Math.sin(droneAngle) * droneDist;

      ctx.fillStyle = '#00ff66';
      ctx.beginPath();
      ctx.arc(droneX, droneY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Telemetry update
      const kmRemaining = (14.2 * (1 - progress)).toFixed(1);
      setRadarDistance(`DIST: ${kmRemaining} KM`);

      if (progress < 0.4) {
        setRadarStatus('UAV LOGISTICS: CLIMBING TO CORRIDOR ALTITUDE');
      } else if (progress < 0.85) {
        setRadarStatus('UAV LOGISTICS: DESCENDING TO SECTOR COORDS');
      } else {
        setRadarStatus('UAV LOGISTICS: DROP-ZONE IN SIGHT / AIR-DROP RELEASE');
      }

      if (progress < 1) {
        animId = requestAnimationFrame(renderRadar);
      } else {
        // Complete checkout!
        setStep('success');
        AudioService.playSuccess();

        if (paymentMethod === 'credits') {
          deductCredits(total);
        } else {
          const cashback = Math.round(total * 0.1);
          addCredits(cashback);
        }

        clearCart();
        showToast('ORDER DISPATCHED //', `Encrypted UAV drop #${orderId} launched`, 'green');
      }
    };

    renderRadar();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [step, isOpen, total, paymentMethod, orderId, clearCart, addCredits, deductCredits, showToast]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputVal.trim();
    if (!val) return;

    AudioService.playClick();
    setInputVal('');

    if (val.toLowerCase() === 'exit') {
      onClose();
      return;
    }

    if (step === 'address') {
      if (val.length < 5) {
        setLogs((prev) => [...prev, `> ${val}`, '[ERR] Sector coordinates invalid. Must be at least 5 chars.']);
        AudioService.playAlert();
        return;
      }
      setAddress(val);
      setStep('contact');
      setLogs((prev) => [
        ...prev,
        `> ${val}`,
        `[OK] Delivery Sector confirmed: [${val}]`,
        '\n[SYS] STEP 2: ENTER CONTACT COMMS / PHONE OR CALLSIGN //'
      ]);
    } else if (step === 'contact') {
      if (val.length < 4) {
        setLogs((prev) => [...prev, `> ${val}`, '[ERR] Comms handle invalid.']);
        AudioService.playAlert();
        return;
      }
      setContact(val);
      setStep('payment');
      setLogs((prev) => [
        ...prev,
        `> ${val}`,
        `[OK] Comms handle verified: [${val}]`,
        '\n[SYS] STEP 3: SELECT SETTLEMENT METHOD //',
        '1: CREDIT CARD / SECURE GATEWAY',
        `2: NEURAL CREDITS (Available: ₵${profile.credits})`,
        'Type "1" or "2":'
      ]);
    } else if (step === 'payment') {
      if (val === '2') {
        if (profile.credits < total) {
          setLogs((prev) => [
            ...prev,
            `> ${val}`,
            `[ERR] Insufficient Credits. Needed: ₵${total}, You have: ₵${profile.credits}. Fallback to [1]: Credit Card.`
          ]);
          setPaymentMethod('card');
        } else {
          setPaymentMethod('credits');
          setLogs((prev) => [...prev, `> ${val}`, '[OK] Payment: Neural Credits balance authorized.']);
        }
      } else {
        setPaymentMethod('card');
        setLogs((prev) => [...prev, `> ${val}`, '[OK] Payment: Encrypted Credit Card channel authorized.']);
      }

      setStep('radar');
      setLogs((prev) => [
        ...prev,
        '\n[SYS] AUTHORIZING DISPATCH ORDER...',
        `[SYS] UAV DRONE ASSIGNED. TRACKING ID: #${orderId}`
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="checkout-terminal-overlay checkout-terminal-overlay--open"
      onClick={step === 'radar' ? undefined : onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="checkout-terminal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-terminal__header">
          <div className="checkout-terminal__window-controls">
            <div className="checkout-terminal__dot checkout-terminal__dot--fill" />
            <div className="checkout-terminal__dot" />
            <div className="checkout-terminal__dot" />
          </div>
          <span>TACTICAL_TERMINAL://DISPATCH_NODE.SH</span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'currentColor',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              cursor: 'pointer'
            }}
          >
            [X]
          </button>
        </div>

        <div className="checkout-terminal__body" ref={bodyRef}>
          {logs.map((line, i) => (
            <div key={i} style={{ whiteSpace: 'pre-wrap' }}>
              {line}
            </div>
          ))}

          {step === 'radar' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '12px 0',
                padding: '10px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid currentColor'
              }}
            >
              <canvas ref={canvasRef} style={{ width: '300px', height: '180px' }} />
              <div style={{ marginTop: '8px', fontSize: '0.7rem', fontWeight: 700 }}>
                {radarStatus}
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                {radarDistance} // VECTOR: 342.5° NNE
              </div>
            </div>
          )}

          {step === 'success' && (
            <div style={{ marginTop: '14px', borderTop: '1px dashed currentColor', paddingTop: '10px' }}>
              <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>
                * DISPATCH ORDER CONFIRMED: #{orderId} *
              </div>
              <div>SECTOR COORDS: {address}</div>
              <div>RECIPIENT COMMS: {contact}</div>
              <div>SETTLEMENT: {paymentMethod === 'credits' ? 'NEURAL CREDITS' : 'CARD TRANSACTION'}</div>
              <div>TOTAL CHARGED: ${total}</div>
              <div style={{ marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'currentColor',
                    color: '#000000',
                    border: 'none',
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}
                >
                  DISCONNECT TERMINAL //
                </button>
              </div>
            </div>
          )}
        </div>

        {step !== 'radar' && step !== 'success' && (
          <form
            onSubmit={handleInputSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '8px 16px',
              background: 'rgba(0, 0, 0, 0.9)',
              borderTop: '1px solid currentColor',
              gap: '6px'
            }}
          >
            {step === 'payment' && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('1');
                    AudioService.playClick();
                  }}
                  style={{
                    padding: '3px 8px',
                    fontSize: '0.65rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid currentColor',
                    color: 'currentColor',
                    cursor: 'pointer'
                  }}
                >
                  [1] Оплата картой
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('2');
                    AudioService.playClick();
                  }}
                  style={{
                    padding: '3px 8px',
                    fontSize: '0.65rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid currentColor',
                    color: 'currentColor',
                    cursor: 'pointer'
                  }}
                >
                  [2] Бонусными баллами (₵{profile.credits})
                </button>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {step === 'address'
                  ? 'sector:~$ '
                  : step === 'contact'
                  ? 'comms:~$ '
                  : 'payment:~$ '}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type coordinate or command..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'currentColor',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'transparent',
                  border: '1px solid currentColor',
                  color: 'currentColor',
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
              >
                EXECUTE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
