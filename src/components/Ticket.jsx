import { useState } from 'react';
import { QrCode, ScanEye } from 'lucide-react';
import Modal from './Modal';
import './Card.css';

export default function Ticket({ user }) {
  const [showAR, setShowAR] = useState(false);

  return (
    <div className="fade-in">
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <h2>Your Ticket</h2>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #SW-3912</div>
      </div>

      {/* Ticket Card */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(0,224,255,0.12), rgba(255,0,85,0.1))' }}>
          <div className="flex-between" style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>HOLDER</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary-accent)', fontWeight: 700, letterSpacing: '0.05em' }}>PREMIUM FAN</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            {user?.name || 'Guest Fan'}
          </div>
          <div className="flex-between">
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MATCH</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>IND vs AUS</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DATE</div>
              <div style={{ fontWeight: 700 }}>16 Apr 2026</div>
            </div>
          </div>
        </div>

        {/* Seat Details */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[['GATE', '4B'], ['SECTION', '112'], ['ROW', 'K'], ['SEAT', '45']].map(([label, val]) => (
              <div key={label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px 8px' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: label === 'SEAT' ? 'var(--primary-accent)' : 'white' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* QR Code */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '16px', marginBottom: '16px' }}>
            <QrCode size={110} strokeWidth={1.2} color="var(--primary-accent)" />
          </div>

          {/* AR Button */}
          <button
            className="btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px' }}
            onClick={() => setShowAR(true)}
          >
            <ScanEye size={20} />
            Launch AR Seat Navigator
          </button>
        </div>
      </div>

      {/* AR Modal */}
      <Modal isOpen={showAR} onClose={() => setShowAR(false)} title="AR Seat Navigator — Section 112, K45">
        <div style={{ position: 'relative' }}>
          <img
            src="/ar_seat_demo.png"
            alt="AR Seat Navigator"
            style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
          />
          {/* AR Overlay UI */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '85%', background: 'rgba(10,15,24,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,224,255,0.3)', borderRadius: '16px', padding: '14px 20px', textAlign: 'center' }}>
            <div style={{ color: 'var(--primary-accent)', fontWeight: 700, fontSize: '1.1rem' }}>↱ Turn Right at Stand B</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>45 meters · ~1 min walk to Section 112</div>
          </div>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,224,255,0.07)', borderRadius: '12px', border: '1px solid rgba(0,224,255,0.15)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated arrival</span>
            <span style={{ color: 'var(--primary-accent)', fontWeight: 700 }}>~1 min</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,255,157,0.07)', borderRadius: '12px', border: '1px solid rgba(0,255,157,0.15)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Crowd level on route</span>
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>Low ✔</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
