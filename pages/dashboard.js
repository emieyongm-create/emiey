// pages/dashboard.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {  { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/_login');
        return;
      }

      const {  userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!userData) {
        await supabase
          .from('users')
          .insert({ id: session.user.id, email: session.user.email });
      } else {
        setUser(userData);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h1>👋 Welcome, {user?.display_name || 'Admin'}!</h1>
        <p>This is your Emiey dashboard.</p>
      </div>

      <div className="nav-links">
        <a href="/profile" className="nav-link">🛠️ Edit Profile</a>
        <a href="/engage" className="nav-link">🤝 Engage</a>
        <a href="/approvals" className="nav-link">✅ Approvals</a>
        <button
          onClick={() => supabase.auth.signOut().then(() => router.push('/_login'))}
          style={{ background: '#e53e3e' }}
        >
          🔐 Log Out
        </button>
      </div>
    </div>
  );
}
