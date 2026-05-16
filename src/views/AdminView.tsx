import { useState } from 'react';
import { Users, PlusCircle } from 'lucide-react';

export function AdminView() {
  const [successMsg, setSuccessMsg] = useState('');

  const handleSimulateAdd = () => {
    setSuccessMsg('Se ha guardado el evento correctamente.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 font-sans">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Administración</h2>
        <p className="text-gray-500">Gestión de eventos y asistencia a la iglesia.</p>
      </div>

      <section className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-blue-500" size={24} />
          <h3 className="text-lg font-medium text-gray-900">Reporte de Asistencia</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">Revisa cuántas personas han presionado "Voy a asistir" para este fin de semana.</p>
        
        <div className="bg-gray-50 rounded-[16px] p-4 flex justify-between items-center border border-gray-100">
          <span className="font-medium text-gray-700">Culto de Adoración</span>
          <div className="bg-white text-gray-900 font-medium px-4 py-2 rounded-full border border-gray-200 text-sm shadow-sm">
            42 inscritos
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="text-blue-500" size={24} />
          <h3 className="text-lg font-medium text-gray-900">Crear Nuevo Evento</h3>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSimulateAdd(); }}>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Nombre del evento</label>
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-gray-200 rounded-[16px] px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" 
              placeholder="Ej. Estudio Bíblico" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Fecha y hora</label>
            <input 
              type="datetime-local" 
              className="w-full bg-gray-50 border border-gray-200 rounded-[16px] px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" 
            />
          </div>
          
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-4 rounded-[16px] font-medium text-sm text-center border border-green-100">
              {successMsg}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gray-900 text-white font-medium py-3.5 rounded-[16px] mt-6 hover:bg-black transition-colors"
          >
            Guardar Evento
          </button>
        </form>
      </section>

      <div className="bg-blue-50 text-blue-700 rounded-[16px] p-4 text-center mt-6 text-sm max-w-sm mx-auto border border-blue-100">
        <strong>Para Desarrolladores:</strong> La base de datos sugerida para implementar real-time y persistencia es Supabase (PostgreSQL).
      </div>
    </div>
  );
}
