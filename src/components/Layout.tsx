import { ReactNode } from 'react';
import { Home, Calendar, Bell, Settings, Heart } from 'lucide-react';
import { TabType } from '../App';
import { cn } from '../utils/cn';

interface LayoutProps {
  children: ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const getTabStyles = (tab: TabType) => {
    return cn(
      "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
      activeTab === tab 
        ? "text-blue-600" 
        : "text-gray-400 hover:text-gray-600"
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header (Top) */}
      <header className="bg-white px-6 sm:px-8 py-5 flex justify-between items-center sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Central Al Día</h1>
        </div>
        <button 
          onClick={() => onTabChange('admin')} 
          className="p-2 -mr-2 bg-gray-50 rounded-full hover:bg-gray-100 transition text-gray-500" 
          aria-label="Administración y gestión"
        >
          <Settings size={28} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-6 pb-32">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 h-20 max-w-2xl left-1/2 -translate-x-1/2 z-20 flex">
        <button onClick={() => onTabChange('home')} className={getTabStyles('home')}>
          <Home size={28} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className={cn("text-[11px] font-medium mt-1", activeTab === 'home' && "font-semibold")}>Inicio</span>
        </button>
        <button onClick={() => onTabChange('events')} className={getTabStyles('events')}>
          <Calendar size={28} strokeWidth={activeTab === 'events' ? 2.5 : 2} />
          <span className={cn("text-[11px] font-medium mt-1", activeTab === 'events' && "font-semibold")}>Eventos</span>
        </button>
        <button onClick={() => onTabChange('news')} className={getTabStyles('news')}>
          <Bell size={28} strokeWidth={activeTab === 'news' ? 2.5 : 2} />
          <span className={cn("text-[11px] font-medium mt-1", activeTab === 'news' && "font-semibold")}>Noticias</span>
        </button>
        <button onClick={() => onTabChange('prayers')} className={getTabStyles('prayers')}>
          <Heart size={28} strokeWidth={activeTab === 'prayers' ? 2.5 : 2} />
          <span className={cn("text-[11px] font-medium mt-1", activeTab === 'prayers' && "font-semibold")}>Oración</span>
        </button>
      </nav>
    </div>
  );
}
