import { useState } from 'react';
import { MOCK_EVENTS } from '../mockData';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, MapPin, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

export function EventsView() {
  const [attendingEvents, setAttendingEvents] = useState<Set<string>>(new Set());

  const toggleAttendance = (eventId: string) => {
    setAttendingEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const formatEventDay = (isoString: string) => {
    const date = parseISO(isoString);
    const day = format(date, 'EEEE d', { locale: es });
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const formatEventTime = (isoString: string) => {
    return format(parseISO(isoString), 'h:mm a');
  };

  const formatEventMonth = (isoString: string) => {
    return format(parseISO(isoString), 'MMMM', { locale: es }).toUpperCase();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Calendario</h2>
        <p className="text-gray-500">Presiona el botón "Voy a asistir" para reservar tu lugar.</p>
      </div>

      <div className="space-y-6">
        {MOCK_EVENTS.map((event) => {
          const isAttending = attendingEvents.has(event.id);

          return (
            <div key={event.id} className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              {'imageUrl' in event && event.imageUrl && typeof event.imageUrl === 'string' && (
                <img src={event.imageUrl} alt={event.title} className="w-full h-48 sm:h-64 object-cover" />
              )}
              {/* Date Header */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <span className="text-lg font-medium text-gray-900">{formatEventDay(event.date)}</span>
                <span className="text-sm font-medium text-gray-500">{formatEventMonth(event.date)}</span>
              </div>
              
              {/* Event Info */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-4">{event.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 gap-3 text-sm">
                    <Clock className="text-gray-400" size={18} />
                    <span>{formatEventTime(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 gap-3 text-sm">
                    <MapPin className="text-gray-400 w-4 flex-shrink-0" size={18} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-500 mb-6 text-sm leading-relaxed">{event.description}</p>
                
                {/* Huge Button for attendance */}
                <button
                  onClick={() => toggleAttendance(event.id)}
                  className={cn(
                    "w-full font-medium py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]",
                    isAttending 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-gray-900 text-white hover:bg-black"
                  )}
                >
                  {isAttending ? (
                    <>
                      <CheckCircle2 size={20} />
                      Asistencia confirmada
                    </>
                  ) : (
                    'Voy a asistir'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
