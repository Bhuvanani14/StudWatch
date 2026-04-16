import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
import './AIAssistant.css';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am SyncBot. How can I assist you in the stadium today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      let response = "I'm looking that up for you...";
      const query = input.toLowerCase();
      
      if (query.includes('food') || query.includes('eat')) {
        response = "There's a snack bar at Gate 4 with only a 5-minute wait! Would you like the menu?";
      } else if (query.includes('restroom') || query.includes('toilet')) {
        response = "The closest restroom is near Section 112, Block B. It's currently clear.";
      } else if (query.includes('score')) {
        response = "India is at 214/4 in 18.2 overs. A great performance so far!";
      } else if (query.includes('parking')) {
        response = "Your car is parked in VIP Lot South, Spot G-42. Traffic is moderate.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="ai-assistant-wrapper">
      {isOpen ? (
        <div className="ai-chat-window glass-panel fade-in">
          <div className="ai-chat-header flex-between">
            <div className="flex-center" style={{ gap: '10px' }}>
              <div className="ai-avatar">SB</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>SyncBot</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--success)' }}>Online</div>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message-bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask SyncBot..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={18} strokeWidth={3} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          className="ai-toggle-btn animate-pulse-glow" 
          onClick={() => setIsOpen(true)}
        >
          <Bot size={28} />
        </button>
      )}
    </div>
  );
}
