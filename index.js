// index.js — single-file Next.js app (works in root)
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wnmwhjebtcznvxkkmokt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubXdoamVidGN6bnZ4a2ttb2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjI5NzUsImV4cCI6MjA3ODE5ODk3NX0.pPqcDTZYqiJJjZ3fJLYu37d75sAMXVvzKLEJ5mQDnUQ'
);

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'dashboard'

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setView('dashboard');
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      setUser({ email });
      setView('dashboard');
    }
  };

  if (view === 'login') {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>🔐 Login</h1>
        <form onSubmit={handleLogin}>
          <input name="email" placeholder="Email" required style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }} />
          <input name="password" type="password" placeholder="Password" required style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }} />
          <button type="submit" style={{ padding: '10px 20px', background: '#29ABE2', color: 'white', border: 'none', borderRadius: '4px' }}>Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>✅ Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      <button 
        onClick={() => { supabase.auth.signOut(); setUser(null); setView('login'); }}
        style={{ padding: '10px 20px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', marginTop: '1rem' }}
      >
        Log Out
      </button>
    </div>
  );
}
