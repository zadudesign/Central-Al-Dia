import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { EventsView } from './views/EventsView';
import { NewsView } from './views/NewsView';
import { AdminView } from './views/AdminView';
import { PrayerView } from './views/PrayerView';
import { LoginView } from './views/LoginView';
import { getSupabase } from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export type TabType = 'home' | 'events' | 'news' | 'admin' | 'prayers';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && <HomeView onNavigate={setActiveTab} />}
      {activeTab === 'events' && <EventsView />}
      {activeTab === 'news' && <NewsView />}
      {activeTab === 'prayers' && <PrayerView />}
      {activeTab === 'admin' && (
        session ? <AdminView /> : <LoginView onSuccess={() => {}} />
      )}
    </Layout>
  );
}
