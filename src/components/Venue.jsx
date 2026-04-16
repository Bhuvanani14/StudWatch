import { useState } from 'react';
import { Coffee, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import Modal from './Modal';
import './Card.css';

const MENU_ITEMS = [
  { id: 1, name: 'Samosa (2 pcs)', price: 60, emoji: '🥟' },
  { id: 2, name: 'Vada Pav', price: 50, emoji: '🍔' },
  { id: 3, name: 'Popcorn (Large)', price: 120, emoji: '🍿' },
  { id: 4, name: 'Cold Drink (Pepsi)', price: 80, emoji: '🥤' },
  { id: 5, name: 'Masala Fries', price: 100, emoji: '🍟' },
  { id: 6, name: 'Chai', price: 40, emoji: '☕' },
];

const MERCH_ITEMS = [
  { id: 7, name: 'India Jersey 2026', price: 1299, emoji: '👕' },
  { id: 8, name: 'Team Cap (Blue)', price: 499, emoji: '🧢' },
  { id: 9, name: 'Stadium Keychain', price: 199, emoji: '🔑' },
  { id: 10, name: 'Mini Bat (Signed)', price: 2499, emoji: '🏏' },
];

function OrderModal({ isOpen, onClose, title, items }) {
  const [cart, setCart] = useState({});
  const [ordered, setOrdered] = useState(false);

  const addItem = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) => setCart(c => {
    const next = { ...c };
    if (next[id] > 1) next[id] -= 1;
    else delete next[id];
    return next;
  });

  const total = items.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const itemCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => { setOrdered(false); setCart({}); onClose(); }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}
      footer={total > 0 && !ordered ? (
        <button className="btn-primary" style={{ width: '100%', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={handleOrder}>
          <span>Place Order ({itemCount} items)</span>
          <span style={{ fontWeight: 800 }}>₹{total}</span>
        </button>
      ) : ordered ? (
        <div style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 700, padding: '8px' }}>✅ Order Confirmed! Delivered in ~10 min.</div>
      ) : null}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '1.8rem', width: '44px', textAlign: 'center' }}>{item.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              <div style={{ color: 'var(--primary-accent)', fontWeight: 700 }}>₹{item.price}</div>
            </div>
            {cart[item.id] ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button style={{ background: 'rgba(255,0,85,0.2)', color: 'var(--danger)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => removeItem(item.id)}>
                  {cart[item.id] === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                </button>
                <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{cart[item.id]}</span>
                <button style={{ background: 'rgba(0,224,255,0.15)', color: 'var(--primary-accent)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => addItem(item.id)}>
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button style={{ background: 'rgba(0,224,255,0.12)', color: 'var(--primary-accent)', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(0,224,255,0.2)' }} onClick={() => addItem(item.id)}>
                Add
              </button>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default function VenueMap({ user }) {
  const [showFood, setShowFood] = useState(false);
  const [showMerch, setShowMerch] = useState(false);

  return (
    <div className="fade-in">
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <h2>Live Map</h2>
        <span style={{ background: 'rgba(0,224,255,0.1)', color: 'var(--primary-accent)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>● LIVE</span>
      </div>

      {/* Abstract MAP */}
      <div className="glass-panel" style={{ height: '220px', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at center, #0d1a2a 0%, #0a0f18 70%)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '190px', height: '110px', borderRadius: '100px', border: '3px solid rgba(0,224,255,0.15)', background: 'rgba(0,255,157,0.04)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '150px', borderRadius: '125px', border: '1px solid rgba(255,255,255,0.05)' }} />
        <div className="animate-pulse-glow" style={{ position: 'absolute', top: '35%', left: '18%', width: '14px', height: '14px', background: 'var(--danger)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20%', left: '13%', fontSize: '0.65rem', color: 'var(--danger)', fontWeight: 700 }}>⚠ Crowded</div>
        <div className="animate-pulse-glow" style={{ position: 'absolute', bottom: '28%', right: '22%', width: '14px', height: '14px', background: 'var(--success)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '12%', right: '17%', fontSize: '0.65rem', color: 'var(--success)', fontWeight: 700 }}>✔ Clear</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontWeight: 600, letterSpacing: '0.1em' }}>PITCH</div>
        <div style={{ position: 'absolute', top: '10px', right: '16px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>Wankhede Stadium</div>
      </div>

      <h3 style={{ margin: '24px 0 14px' }}>Services Near You</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Snack Bar */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,0,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Coffee size={22} color="var(--secondary-accent)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>Snack Bar 4</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>100m · ⏱ 12 min wait</div>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            onClick={() => setShowFood(true)}
          >
            Order
          </button>
        </div>

        {/* Merch */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(0,224,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShoppingBag size={22} color="var(--primary-accent)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>Official Merch Stand</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Section 112 · Skip the queue</div>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            onClick={() => setShowMerch(true)}
          >
            Browse
          </button>
        </div>

        {/* Restroom */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(0,255,157,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '1.3rem' }}>🚻</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>Restroom — Block B</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>60m away</div>
          </div>
          <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: '0.85rem' }}>Clear</span>
        </div>
      </div>

      <OrderModal isOpen={showFood} onClose={() => setShowFood(false)} title="🍟 Snack Bar 4 — Order Now" items={MENU_ITEMS} />
      <OrderModal isOpen={showMerch} onClose={() => setShowMerch(false)} title="🛍 Official Merch — Order to Seat" items={MERCH_ITEMS} />
    </div>
  );
}
