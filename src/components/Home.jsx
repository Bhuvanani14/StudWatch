import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Activity, Flame } from 'lucide-react';
import './Card.css';

export default function Home({ user }) {
  const [score, setScore] = useState(214);
  const [wickets, setWickets] = useState(4);
  const [balls, setBalls] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls(prev => {
        if (prev >= 5) {
          setScore(s => s + Math.floor(Math.random() * 7));
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in">
      <div className="section-title">
        <h3>Live Event</h3>
        <span className="live-badge animate-pulse-glow">LIVE</span>
      </div>
      
      {/* Live Match Card */}
      <div className="glass-panel main-event-card">
         <div className="match-header flex-between">
           <div className="team">
             <div className="team-logo ind-blue">IND</div>
           </div>
           <div className="score-container text-center">
             <div className="score text-gradient">{score} / {wickets}</div>
             <div className="overs text-muted">18.{balls} Overs</div>
           </div>
           <div className="team">
             <div className="team-logo aus-yellow">AUS</div>
           </div>
         </div>
      </div>

      <h3 style={{ margin: '24px 0 16px' }}>Venue Pulse</h3>
      <div className="grid-2-col">
        {/* Pulse Cards */}
        <div className="glass-panel pulse-card">
          <Activity size={24} className="text-warning mb-2" />
          <div className="pulse-val">Moderate</div>
          <div className="pulse-label">Overall Crowd</div>
        </div>
        <div className="glass-panel pulse-card">
          <Flame size={24} className="text-success mb-2" />
          <div className="pulse-val">High</div>
          <div className="pulse-label">Energy Level</div>
        </div>
      </div>

      <h3 style={{ margin: '24px 0 16px' }}>Quick Actions</h3>
      <div className="action-list">
        <div className="glass-panel action-item flex-between">
          <div className="flex-center" style={{ gap: '12px' }}>
             <Clock size={20} className="text-primary" />
             <span>Order Food to Seat</span>
          </div>
          <div className="badge success">Fast</div>
        </div>
        <div className="glass-panel action-item flex-between">
          <div className="flex-center" style={{ gap: '12px' }}>
             <MapPin size={20} className="text-secondary" />
             <span>Restroom near Block B</span>
          </div>
          <div className="badge warning">5m wait</div>
        </div>
      </div>
    </div>
  );
}
