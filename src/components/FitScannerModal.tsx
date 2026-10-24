import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { useToast } from '../context/ToastContext';
import { AudioService } from '../services/audio';

interface FitScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FitScannerModal: React.FC<FitScannerModalProps> = ({ isOpen, onClose }) => {
  const { profile, saveFitProfile } = useProfile();
  const { showToast } = useToast();

  const [height, setHeight] = useState<number>(profile.fitProfile?.heightCm || 178);
  const [weight, setWeight] = useState<number>(profile.fitProfile?.weightKg || 74);
  const [foot, setFoot] = useState<number>(profile.fitProfile?.footLengthCm || 27);
  const [palm, setPalm] = useState<number>(profile.fitProfile?.palmWidthCm || 8.5);

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<{
    size: string;
    shoeSize: number;
    gloveSize: string;
    bmi: string;
  } | null>(() => {
    if (profile.fitProfile) {
      return {
        size: profile.fitProfile.recommendedSize,
        shoeSize: 42,
        gloveSize: 'M',
        bmi: '23.4'
      };
    }
    return null;
  });

  const handleRunScan = () => {
    AudioService.playClick();
    setIsScanning(true);

    setTimeout(() => {
      let size = 'M';
      if (height < 172 && weight < 68) size = 'S';
      else if (height <= 180 && weight <= 80) size = 'M';
      else if (height <= 188 && weight <= 92) size = 'L';
      else size = 'XL';

      const shoeSize = Math.round(foot * 1.5 + 1.5);
      const gloveSize = palm < 8.2 ? 'S' : palm <= 9.2 ? 'M' : 'L';
      const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

      const res = { size, shoeSize, gloveSize, bmi };
      setScanResult(res);
      setIsScanning(false);

      saveFitProfile({
        heightCm: height,
        weightKg: weight,
        footLengthCm: foot,
        palmWidthCm: palm,
        recommendedSize: size,
        calculatedAt: new Date().toISOString()
      });

      AudioService.playSuccess();
      showToast('FIT TELEMETRY SYNCD //', `Recommended size: [${size}] calibrated to profile`, 'green');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fit-scanner-overlay fit-scanner-overlay--open" onClick={onClose} role="dialog" aria-modal="true">
      <div className="fit-scanner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fit-scanner__header">
          <div className="fit-scanner__title-group">
            <span className="fit-scanner__title">CYBER-FIT ASSISTANT //</span>
            <span className="fit-scanner__subtitle">BIOMETRIC SIZING CALIBRATION PROTOCOL</span>
          </div>
          <button className="fit-scanner__close" onClick={onClose} aria-label="Close fit assistant">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
              <span>HEIGHT: {height} CM</span>
              <span style={{ color: 'var(--color-accent-blue)' }}>150 - 210 CM</span>
            </div>
            <input
              type="range"
              min="150"
              max="210"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-accent-blue)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
              <span>WEIGHT: {weight} KG</span>
              <span style={{ color: 'var(--color-accent-blue)' }}>45 - 130 KG</span>
            </div>
            <input
              type="range"
              min="45"
              max="130"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-accent-blue)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                FOOT LENGTH: {foot} CM
              </label>
              <input
                type="number"
                min="22"
                max="33"
                step="0.5"
                value={foot}
                onChange={(e) => setFoot(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'rgba(6, 7, 9, 0.7)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--color-text-primary)',
                  padding: '6px',
                  borderRadius: '2px',
                  fontFamily: 'monospace'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                PALM WIDTH: {palm} CM
              </label>
              <input
                type="number"
                min="6"
                max="12"
                step="0.5"
                value={palm}
                onChange={(e) => setPalm(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'rgba(6, 7, 9, 0.7)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--color-text-primary)',
                  padding: '6px',
                  borderRadius: '2px',
                  fontFamily: 'monospace'
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunScan}
            disabled={isScanning}
            style={{
              marginTop: '6px',
              padding: '12px',
              background: 'var(--color-accent-blue)',
              color: 'var(--color-bg-main)',
              border: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              cursor: isScanning ? 'wait' : 'pointer'
            }}
          >
            {isScanning ? 'CALIBRATING SENSORS...' : 'ANALYZE BIOMETRIC FIT //'}
          </button>
        </div>

        {scanResult && (
          <div
            style={{
              background: 'rgba(6, 7, 9, 0.85)',
              border: '1px solid var(--color-accent-green)',
              padding: '12px',
              borderRadius: '2px'
            }}
          >
            <div style={{ fontSize: '0.65rem', color: 'var(--color-accent-green)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              CALIBRATED BIOMETRIC SPECIFICATION //
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
              <div style={{ padding: '6px', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>APPAREL</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-accent-blue)' }}>{scanResult.size}</div>
              </div>
              <div style={{ padding: '6px', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>FOOTWEAR</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-accent-pink)' }}>{scanResult.shoeSize}</div>
              </div>
              <div style={{ padding: '6px', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>GLOVES</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-text-primary)' }}>{scanResult.gloveSize}</div>
              </div>
            </div>

            <div style={{ marginTop: '8px', fontSize: '0.65rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Telemetry saved to profile. Selected sizes will default to [{scanResult.size}] across catalog.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
