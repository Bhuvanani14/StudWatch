import { useState } from 'react';
import { Car, Compass, Clock, CheckCircle } from 'lucide-react';
import Modal from './Modal';
import './Card.css';

export default function Parking({ user }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '20px' }}>Parking & Entry</h2>

      {/* Booking Card */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div className="flex-between" style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Car color="var(--secondary-accent)" size={22} />
            <div>
              <div style={{ fontWeight: 700 }}>VIP Lot South</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pre-booked · Confirmed</div>
            </div>
          </div>
          <span style={{ background: 'rgba(0,255,157,0.1)', color: 'var(--success)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>✔ Active</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Your Spot</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-accent)' }}>G-42</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Walk to Gate</div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>8 min</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Gate</div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>4B</div>
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px' }}
          onClick={() => setShowMap(true)}
        >
          <Compass size={20} />
          Get Walking Directions
        </button>
      </div>

      {/* Traffic */}
      <h3 style={{ marginBottom: '14px' }}>Live Traffic</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={18} color="var(--warning)" />
            <span>Main Highway Exit</span>
          </div>
          <span style={{ color: 'var(--warning)', fontWeight: 700, fontSize: '0.85rem' }}>12 min delay</span>
        </div>
        <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={18} color="var(--success)" />
            <span>South Gate Road</span>
          </div>
          <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: '0.85rem' }}>Clear ✔</span>
        </div>
        <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={18} color="var(--danger)" />
            <span>Ring Road Flyover</span>
          </div>
          <span style={{ color: 'var(--danger)', fontWeight: 700, fontSize: '0.85rem' }}>Heavy — 25 min</span>
        </div>
      </div>

      {/* Directions Modal */}
      <Modal isOpen={showMap} onClose={() => setShowMap(false)} title="Live Walking Directions to Gate 4B">
        <img
          src="/parking_directions_demo.png"
          alt="Walking Directions Map"
          style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { step: '1', instruction: 'Walk straight ahead from Spot G-42', time: '2 min' },
            { step: '2', instruction: 'Turn left at South Gate Signage', time: '3 min' },
            { step: '3', instruction: 'Follow crowd control lane to Gate 4B', time: '3 min' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-accent)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '0.85rem' }}>{item.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.instruction}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
