import { MOCK_NEWS } from '../mockData';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { BellRing, Info } from 'lucide-react';
import { cn } from '../utils/cn';

export function NewsView() {
  const formatNewsDate = (isoString: string) => {
    return format(parseISO(isoString), "d 'de' MMMM", { locale: es });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Noticias</h2>
        <p className="text-gray-500">Las últimas novedades de nuestra comunidad.</p>
      </div>

      <div className="space-y-4">
        {MOCK_NEWS.map((news) => (
          <div 
            key={news.id} 
            className={cn(
              "rounded-[24px] shadow-sm border overflow-hidden flex flex-col",
              news.isNotification 
                ? "bg-blue-50 border-blue-100" 
                : "bg-white border-gray-100"
            )}
          >
            {news.imageUrl && (
              <img src={news.imageUrl} alt={news.title} className="w-full h-48 sm:h-56 object-cover" />
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {news.isNotification ? (
                  <div className="p-2 bg-blue-500 text-white rounded-xl shadow-sm">
                    <BellRing size={20} />
                  </div>
                ) : (
                  <div className="p-2 bg-gray-100 text-gray-500 rounded-xl">
                    <Info size={20} />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{news.title}</h3>
                  <span className="text-xs font-medium text-gray-500">{formatNewsDate(news.date)}</span>
                </div>
              </div>
              
              <p className={cn("text-sm leading-relaxed", news.isNotification ? "text-blue-900" : "text-gray-600")}>{news.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
