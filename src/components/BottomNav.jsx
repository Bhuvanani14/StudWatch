import { Home, Ticket, MapPin, Navigation, MessagesSquare } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'ticket', icon: Ticket, label: 'Tickets' },
    { id: 'parking', icon: Navigation, label: 'Parking' },
    { id: 'venue', icon: MapPin, label: 'Venue' },
    { id: 'blog', icon: MessagesSquare, label: 'Bleachers' },
  ];

  return (
    <div className="bottom-nav glass-panel">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button 
            key={tab.id} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className={`icon-container ${isActive ? 'animate-pulse-glow' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
