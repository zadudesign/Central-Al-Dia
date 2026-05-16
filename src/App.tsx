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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con la base de datos');
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-center">
        <div className="bg-red-50 text-red-800 p-6 rounded-[24px] max-w-md border border-red-100">
          <h2 className="text-lg font-bold mb-2">Error de Configuración</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">Por favor, verifica que las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY estén configuradas en Vercel y re-despliega la aplicación.</p>
        </div>
      </div>
    );
  }

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
