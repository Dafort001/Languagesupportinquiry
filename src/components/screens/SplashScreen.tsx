import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { HapticButton } from '../HapticButton';
import { StatusBar } from '../StatusBar';
import { useHaptic } from '../../hooks/useHaptic';
import type { Screen } from '../../App';

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { trigger } = useHaptic();

  const handleLogin = async () => {
    trigger('medium');
    setIsLoading(true);
    
    // Mock Login (2 Sekunden Verzögerung)
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('camera'); // Nach Login → Kamera
    }, 2000);
  };

  const handleQuickStart = () => {
    trigger('medium');
    onNavigate('camera');
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#EFF6FF] to-white flex flex-col">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Logo Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-2xl mb-6"
            style={{ background: 'linear-gradient(135deg, #4A5849 0%, #3A4839 100%)' }}
          >
            <Camera className="w-10 h-10 text-white" strokeWidth={1.5} />
          </motion.div>

          {/* Brand Name */}
          <h1 className="text-gray-900 mb-2" style={{ fontSize: '36px' }}>
            PIX.IMMO
          </h1>
          <p className="text-gray-600" style={{ fontSize: '18px' }}>
            Capture
          </p>
          <p className="text-gray-500 mt-2" style={{ fontSize: '14px' }}>
            Professionelle Immobilienfotografie
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-sm space-y-4"
        >
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-gray-700" style={{ fontSize: '14px' }}>
              E-Mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="max.mustermann@pix-immo.de"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A5849] focus:border-transparent transition-all"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-gray-700" style={{ fontSize: '14px' }}>
              Passwort
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A5849] focus:border-transparent transition-all"
                style={{ fontSize: '16px' }}
              />
              <button
                onClick={() => {
                  trigger('light');
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              onClick={() => trigger('light')}
              className="text-[#4A5849] hover:underline"
              style={{ fontSize: '14px' }}
            >
              Passwort vergessen?
            </button>
          </div>

          {/* Login Button */}
          <HapticButton
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
            hapticStyle="medium"
            className="w-full bg-[#4A5849] hover:bg-[#3A4839] text-white py-3 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: '16px' }}
          >
            {isLoading ? 'Anmelden...' : 'Anmelden'}
          </HapticButton>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500" style={{ fontSize: '14px' }}>
                oder
              </span>
            </div>
          </div>

          {/* Quick Start */}
          <HapticButton
            onClick={handleQuickStart}
            variant="outline"
            hapticStyle="light"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl"
            style={{ fontSize: '16px' }}
          >
            Demo starten (ohne Login)
          </HapticButton>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6" style={{ fontSize: '14px' }}>
            Noch kein Account?{' '}
            <button
              onClick={() => trigger('light')}
              className="text-[#4A5849] hover:underline"
            >
              Jetzt registrieren
            </button>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="pb-8 text-center px-8">
        <p className="text-gray-500" style={{ fontSize: '12px' }}>
          Nur für iPhone Pro Modelle (13/14/15 Pro/Max)
        </p>
      </div>
    </div>
  );
}