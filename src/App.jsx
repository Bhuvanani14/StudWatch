import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Ticket from './components/Ticket';
import Parking from './components/Parking';
import VenueMap from './components/Venue';
import Blog from './components/Blog';
import Auth from './components/Auth';
import AIAssistant from './components/AIAssistant';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');


  const handleLogin = (userData) => {
    console.log('Login attempt with:', userData);
    setUser(userData);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Home user={user} />;
      case 'ticket': return <Ticket user={user} />;
      case 'parking': return <Parking user={user} />;
      case 'venue': return <VenueMap user={user} />;
      case 'blog': return <Blog user={user} />;
      default: return <Home user={user} />;
    }
  };

  // Get Initials for Avatar
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'F';
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header flex-between glass-panel">
        <div className="user-profile flex-center">
          <div className="avatar">{getInitials(user.name)}</div>
          <div>
            <div className="greeting">Welcome back,</div>
            <div className="name text-gradient">{user.name.split(' ')[0]}</div>
          </div>
        </div>
        <div className="header-actions">
          <div className="notification-dot animate-pulse-glow"></div>
        </div>
      </header>

      <main className="content-area">
        {renderContent()}
      </main>

      <AIAssistant />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
