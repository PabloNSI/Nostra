import React, { useState } from "react";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import { Button } from "../Button";

interface LoginScreenProps {
  onUnlock: (username: string) => void;
}

export function LoginScreen({ onUnlock }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username required";
    } else if (username.length < 3) {
      newErrors.username = "Minimum 3 characters";
    }
    
    if (!password) {
      newErrors.password = "Password required";
    } else if (password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        onUnlock(username);
      }, 800);
    }
  };

  const handleBiometric = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onUnlock(username);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-[440px]">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/25">
            <span className="text-5xl">🧠</span>
          </div>
          <h1 className="text-slate-200 mb-2">NOSTRA</h1>
          <p className="text-slate-400">
            Your external emotional memory
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-8">
          {/* Username Input */}
          <div className="input-group">
            <label 
              htmlFor="username"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Username
            </label>
            <div className="input-wrapper">
              <input
                id="username"
                type="text"
                placeholder="your@email.com or username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors({ ...errors, username: undefined });
                  }
                }}
                disabled={isLoading}
                aria-label="Username or Email"
                aria-describedby={errors.username ? "username-error" : undefined}
                aria-invalid={!!errors.username}
                className={`
                  w-full h-11 px-4 py-3
                  bg-slate-800 border rounded-lg
                  ${errors.username ? 'border-red-500' : 'border-slate-700'}
                  text-slate-200 text-base placeholder-slate-500
                  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-150
                `}
              />
            </div>
            {errors.username && (
              <span 
                id="username-error" 
                className="flex items-center gap-1 mt-1.5 text-xs text-red-500"
                role="alert"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.username}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label 
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Password
            </label>
            <div className="password-wrapper relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                disabled={isLoading}
                aria-label="Password"
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={!!errors.password}
                className={`
                  w-full h-11 px-4 py-3 pr-12
                  bg-slate-800 border rounded-lg
                  ${errors.password ? 'border-red-500' : 'border-slate-700'}
                  text-slate-200 text-base placeholder-slate-500
                  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-150
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                aria-controls="password"
                className="
                  toggle-password-btn
                  absolute right-3 top-1/2 -translate-y-1/2
                  p-2
                  text-slate-400 hover:text-slate-200
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-150
                "
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span 
                id="password-error" 
                className="flex items-center gap-1 mt-1.5 text-xs text-red-500"
                role="alert"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </span>
            )}
          </div>

          {/* Biometric Section */}
          <div className="biometric-section flex flex-col items-center gap-2 mt-8">
            <button
              type="button"
              onClick={handleBiometric}
              disabled={isLoading}
              aria-label="Unlock with biometrics"
              className="
                biometric-btn
                flex items-center gap-3
                px-6 py-4
                bg-transparent border-2 border-dashed border-indigo-500 rounded-lg
                text-indigo-400 text-sm font-medium
                hover:bg-indigo-500/5 hover:border-purple-500 hover:text-purple-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900
                disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-700
                transition-all duration-150
              "
            >
              {isLoading ? (
                <>
                  <span 
                    className="spinner inline-block w-5 h-5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"
                    aria-hidden="true"
                  ></span>
                  Scanning...
                </>
              ) : (
                <>
                  <Fingerprint className="w-6 h-6" />
                  Use biometrics
                </>
              )}
            </button>
            <p className="biometric-hint text-xs text-slate-500 text-center">
              Fingerprint or facial recognition
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full mt-8" 
            size="lg"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Unlocking..." : "Unlock"}
          </Button>

          {/* Access Options Link */}
          <div className="text-center">
            <button 
              type="button"
              className="text-sm text-slate-500 hover:text-indigo-400 transition-colors duration-150 focus:outline-none focus:underline"
            >
              Access options
            </button>
          </div>
        </form>

        {/* Helper Text */}
        <div className="mt-8 text-center px-8">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
            <span aria-hidden="true">🔒</span>
            <span>Your data is locally encrypted</span>
          </p>
        </div>
      </div>
    </div>
  );
}