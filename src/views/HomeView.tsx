import { TabType } from '../App';
import { MOCK_EVENTS, MOCK_NEWS } from '../mockData';
import { Calendar, ChevronRight, BellRing } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface HomeViewProps {
  onNavigate: (tab: TabType) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  // Tomamos el primer evento y noticia destacada
  const nextEvent = MOCK_EVENTS[0];
  const latestNews = MOCK_NEWS.find(n => n.isNotification) || MOCK_NEWS[0];

  const formatEventDate = (isoString: string) => {
    const date = parseISO(isoString);
    const day = format(date, 'EEEE d', { locale: es });
    const time = format(date, 'h:mm a');
    return `${day.charAt(0).toUpperCase() + day.slice(1)} - ${time}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <section className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">¡Hola!</h2>
        <p className="text-gray-500 mb-0">Esta es tu aplicación para mantenerte al día con todo lo que sucede en la iglesia. Toca los botones de abajo para navegar.</p>
      </section>

      {latestNews && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <BellRing className="text-blue-500" size={20} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Aviso Importante</h3>
          </div>
          <button 
            onClick={() => onNavigate('news')}
            className="w-full text-left bg-white rounded-[24px] shadow-sm border border-gray-100 active:bg-gray-50 transition overflow-hidden flex flex-col"
          >
            {'imageUrl' in latestNews && latestNews.imageUrl && typeof latestNews.imageUrl === 'string' && (
              <img src={latestNews.imageUrl} alt={latestNews.title} className="w-full h-32 sm:h-48 object-cover" />
            )}
            <div className="p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">{latestNews.title}</h4>
              <p className="text-gray-500 line-clamp-2">{latestNews.content}</p>
              <div className="mt-4 flex items-center justify-end text-blue-600 font-medium text-sm">
                Ver aviso <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </button>
        </section>
      )}

      {nextEvent && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-500" size={20} />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Próximo Evento</h3>
            </div>
            <button className="text-sm font-medium text-blue-600" onClick={() => onNavigate('events')}>Ver todo</button>
          </div>
          
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            {'imageUrl' in nextEvent && nextEvent.imageUrl && typeof nextEvent.imageUrl === 'string' && (
              <img src={nextEvent.imageUrl} alt={nextEvent.title} className="w-full h-40 sm:h-56 object-cover" />
            )}
            <div className="p-6">
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block font-medium text-sm mb-4">
                {formatEventDate(nextEvent.date)}
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-2">{nextEvent.title}</h4>
              <p className="text-gray-500 mb-6">{nextEvent.location}</p>
              
              <button 
                onClick={() => onNavigate('events')}
                className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3.5 rounded-2xl transition"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

