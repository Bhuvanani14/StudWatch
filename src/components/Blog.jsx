import { useState } from 'react';
import { Heart, MessageSquare, Share2, Camera, Send } from 'lucide-react';

export default function Blog({ user }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Rahul J.',
      initials: 'RJ',
      time: '2 mins ago',
      content: 'What a hit by Kohli! The energy in the stadium is unreal today. 🔥🇮🇳 #INDvsAUS #StadiumSync',
      likes: '2.4k',
      comments: 142
    },
    {
      id: 2,
      user: 'Sara R.',
      initials: 'SR',
      time: '14 mins ago',
      content: 'Just grabbed the limited edition jersey! The merch mobile ordering saved me 30 mins standing in line. Highly recommend!',
      likes: '1.1k',
      comments: 24,
      color: '#FFD700'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    
    const post = {
      id: Date.now(),
      user: user?.name || 'You',
      initials: initials,
      time: 'Just now',
      content: newPost,
      likes: '0',
      comments: 0
    };
    
    console.log('Adding new post:', post);
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="fade-in">
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <h2>The Bleachers</h2>
        <div className="glass-pill flex-center" style={{ width: '40px', height: '40px', color: 'var(--primary-accent)' }}>
          <Camera size={20} />
        </div>
      </div>

      {/* Post Creator */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px' }}>
        <form onSubmit={handlePost} className="flex-between" style={{ gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Share your experience..." 
            style={{ 
              flex: 1, 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '12px', 
              padding: '12px 16px',
              color: 'white',
              outline: 'none'
            }}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button type="submit" className="glass-pill flex-center" style={{ width: '45px', height: '45px', background: 'var(--primary-accent)', color: 'black' }}>
            <Send size={20} />
          </button>
        </form>
      </div>

      <div className="action-list">
        {posts.map(post => (
          <div key={post.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="flex-center" style={{ padding: '16px', justifyContent: 'flex-start', gap: '12px' }}>
               <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem', background: post.color }}>{post.initials}</div>
               <div>
                 <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{post.user}</div>
                 <div className="text-muted" style={{ fontSize: '0.7rem' }}>{post.time} • Fan Zone</div>
               </div>
            </div>
            <div style={{ padding: '0 16px 12px' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: post.id === 1 ? '12px' : '0' }}>{post.content}</p>
              {post.id === 1 && (
                <div style={{ height: '150px', background: 'linear-gradient(45deg, rgba(0,224,255,0.2), rgba(255,0,85,0.2))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span className="text-muted">[ Media Preview ]</span>
                </div>
              )}
            </div>
            <div className="flex-between" style={{ padding: '12px 24px', borderTop: '1px solid var(--glass-border)' }}>
               <div className="flex-center" style={{ gap: '6px', color: 'var(--text-muted)' }}>
                 <Heart size={18} className="text-danger" fill={post.likes !== '0' ? "var(--danger)" : "none"} /> <span>{post.likes}</span>
               </div>
               <div className="flex-center" style={{ gap: '6px', color: 'var(--text-muted)' }}>
                 <MessageSquare size={18} /> <span>{post.comments}</span>
               </div>
               <div className="flex-center" style={{ gap: '6px', color: 'var(--text-muted)' }}>
                 <Share2 size={18} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
