'use client';
import { useRouter } from 'next/navigation';
import { PawPrint, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(6,78,59,0.90), rgba(6,78,59,0.82)), url(/vetcare.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-none">VetCare</h1>
            <p className="text-emerald-300 text-sm mt-0.5">Base de Datos Distribuida</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Iniciar sesión</h2>
          <p className="text-sm text-gray-400 mb-6">Ingresa tus credenciales para acceder al sistema</p>

          <div className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="usuario@vetcare.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={() => router.push('/')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm mt-1"
            >
              Ingresar
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-emerald-400/70 text-xs mt-6">
          VetCare © 2026 — Bases de Datos Distribuidas
        </p>
      </div>
    </div>
  );
}
