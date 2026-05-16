import { useState } from 'react';
import { MOCK_PRAYERS } from '../mockData';
import { Heart, Plus, Send } from 'lucide-react';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../utils/cn';

export function PrayerView() {
  const [prayingFor, setPrayingFor] = useState<Set<string>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrayer, setNewPrayer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const togglePraying = (id: string) => {
    setPrayingFor(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSimulateAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPrayer.trim()) {
      alert('Petición guardada. ¡Gracias por compartir con la comunidad!');
      setNewPrayer('');
      setShowAddForm(false);
    }
  };

  const formatPrayerTime = (isoString: string) => {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: es });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-medium text-gray-900">Muro de Oración</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <Plus size={24} />
          </button>
        </div>
        <p className="text-gray-500">Comparte tus peticiones y únete en oración por las necesidades de otros.</p>
      </div>

      {showAddForm && (
        <form onSubmit={handleSimulateAdd} className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 animate-in fade-in zoom-in-95 duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Petición</h3>
          
          <div className="space-y-4">
            <textarea 
              value={newPrayer}
              onChange={(e) => setNewPrayer(e.target.value)}
              placeholder="Escribe aquí tu petición de oración..." 
              required
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-[16px] px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            ></textarea>
            
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
              />
              Publicar de forma anónima
            </label>
            
            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-[16px] hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-gray-900 text-white font-medium py-3 rounded-[16px] hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Publicar
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {MOCK_PRAYERS.map((prayer) => {
          const isPraying = prayingFor.has(prayer.id);
          const count = prayer.prayingCount + (isPraying ? 1 : 0);

          return (
            <div key={prayer.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium text-gray-900">{prayer.author}</span>
                <span className="text-xs font-medium text-gray-400">{formatPrayerTime(prayer.date)}</span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">"{prayer.content}"</p>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-sm font-medium text-gray-500">
                  {count} {count === 1 ? 'persona está' : 'personas están'} orando
                </span>
                <button
                  onClick={() => togglePraying(prayer.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all active:scale-95",
                    isPraying 
                      ? "bg-red-50 text-red-600 border border-red-100" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"
                  )}
                >
                  <Heart size={16} className={cn(isPraying ? "fill-red-600" : "")} />
                  {isPraying ? "Orando" : "Unirme en oración"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
