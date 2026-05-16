import { useState } from 'react';
import { getSupabase } from '../lib/supabaseClient';
import { Lock } from 'lucide-react';

interface LoginViewProps {
  onSuccess: () => void;
}

export function LoginView({ onSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-xl font-medium text-center text-gray-900 mb-6">Acceso Administrador</h2>
        
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl disabled:bg-gray-400"
          >
            {loading ? 'Iniciando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
