import React, { useState } from "react";
import { Eye, EyeOff, Lock, Fingerprint } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";

interface LoginScreenProps {
  onUnlock: () => void;
}

export function LoginScreen({ onUnlock }: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-slate-200 mb-2">NOSTRA</h1>
          <p className="text-slate-400">
            Tu memoria emocional externa
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-slate-400 hover:text-slate-300 transition-colors"
              aria-label={
                showPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Desbloquear
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">
                o
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onUnlock}
          >
            <Fingerprint className="w-5 h-5 mr-2" />
            Usar biometría
          </Button>
        </form>

        {/* Helper Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            🔒 Tus datos están cifrados localmente
          </p>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 mt-2 transition-colors">
            Opciones de acceso
          </button>
        </div>
      </div>
    </div>
  );
}