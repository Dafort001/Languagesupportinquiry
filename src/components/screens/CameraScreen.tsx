import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Grid3x3, Timer, Image, X, Camera as CameraIcon, BarChart3, Layers } from 'lucide-react';
import { HapticButton } from '../HapticButton';
import { Badge } from '../ui/badge';
import { StatusBar } from '../StatusBar';
import { Histogram } from '../Histogram';
import { useHaptic } from '../../hooks/useHaptic';
import type { Screen } from '../../App';

interface CameraScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function CameraScreen({ onNavigate }: CameraScreenProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [showHorizon, setShowHorizon] = useState(true);
  const [showHistogram, setShowHistogram] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [format, setFormat] = useState<'DNG' | 'HEIC'>('DNG');
  const [timer, setTimer] = useState<0 | 3 | 10>(0);
  const [hdrMode, setHdrMode] = useState<3 | 5>(3); // HDR Bracketing: 3 or 5 exposures
  const [hdrEnabled, setHdrEnabled] = useState(true); // HDR on/off
  const [horizonTilt, setHorizonTilt] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>('');
  const [cameraLoading, setCameraLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { trigger } = useHaptic();

  const zoomLevels = [0.5, 1, 1.5, 2];

  // Kamera-Stream initialisieren
  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      setCameraLoading(true);
      try {
        // Prüfe ob MediaDevices API verfügbar ist
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera API not supported');
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          setCameraError('');
        }
      } catch (err: any) {
        console.log('Kamera-Initialisierung:', err.name, err.message);
        
        // Setze benutzerfreundliche Fehlermeldung
        if (err.name === 'NotAllowedError') {
          setCameraError('demo'); // Demo-Modus statt Fehler
        } else if (err.name === 'NotFoundError') {
          setCameraError('demo');
        } else if (err.message === 'Camera API not supported') {
          setCameraError('demo');
        } else {
          setCameraError('demo');
        }
      } finally {
        setCameraLoading(false);
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simuliere Horizont-Neigung (in echter App: DeviceOrientation API)
  useEffect(() => {
    const interval = setInterval(() => {
      setHorizonTilt(Math.sin(Date.now() / 1000) * 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleCapture = () => {
    trigger('heavy');
    // Capture Animation
    const flash = document.getElementById('capture-flash');
    if (flash) {
      flash.classList.remove('hidden');
      setTimeout(() => flash.classList.add('hidden'), 150);
    }
  };

  const cycleTimer = () => {
    trigger('light');
    const timers: Array<0 | 3 | 10> = [0, 3, 10];
    const currentIndex = timers.indexOf(timer);
    setTimer(timers[(currentIndex + 1) % timers.length]);
  };

  const handleZoomChange = (level: number) => {
    trigger('light');
    setZoom(level);
  };

  const toggleGrid = () => {
    trigger('light');
    setShowGrid(!showGrid);
  };

  const toggleFormat = () => {
    trigger('medium');
    setFormat(format === 'DNG' ? 'HEIC' : 'DNG');
  };

  const toggleHistogram = () => {
    trigger('light');
    setShowHistogram(!showHistogram);
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Status Bar */}
      <StatusBar variant="light" />

      {/* Camera Viewfinder - Portrait */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {/* Live-Kamera-Vorschau oder Fallback */}
        {stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `scale(${zoom})` }}
          />
        ) : cameraLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-600 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <CameraIcon className="w-16 h-16 mb-4 mx-auto text-blue-500" strokeWidth={1} />
              </motion.div>
              <p className="text-sm text-white" style={{ fontSize: '14px' }}>
                Kamera wird geladen...
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900">
            <div className="text-center px-6 max-w-sm">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                <CameraIcon className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
              </div>
              <p className="text-white mb-2" style={{ fontSize: '16px' }}>
                Demo-Modus
              </p>
              <p className="text-gray-400 mb-4" style={{ fontSize: '14px' }}>
                Live-Kamera nur auf echten Geräten mit HTTPS verfügbar
              </p>
              <p className="text-xs text-gray-500" style={{ fontSize: '12px' }}>
                Alle Funktionen sind testbar. Die Kamera wird automatisch aktiviert, wenn die App auf einem iPhone über HTTPS läuft.
              </p>
            </div>
          </div>
        )}

        {/* Grid Overlay */}
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="h-full w-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/20" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Horizont-Linie mit Animation */}
        {showHorizon && (
          <motion.div
            animate={{ rotate: horizonTilt }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none"
          >
            <div className="relative w-full h-px bg-blue-500">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-blue-500 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Top Controls mit Safe Area */}
        <div className="absolute top-14 left-0 right-0 px-4 flex items-start justify-between z-10">
          <div className="flex gap-2">
            <HapticButton
              size="icon"
              variant="ghost"
              onClick={toggleGrid}
              hapticStyle="light"
              className={`bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 ${
                showGrid ? 'text-blue-400' : 'text-white'
              }`}
            >
              <Grid3x3 className="w-5 h-5" strokeWidth={1.5} />
            </HapticButton>
            <HapticButton
              size="icon"
              variant="ghost"
              onClick={cycleTimer}
              hapticStyle="light"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white relative"
            >
              <Timer className="w-5 h-5" strokeWidth={1.5} />
              {timer > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: '10px' }}>
                  {timer}
                </span>
              )}
            </HapticButton>
          </div>

          <HapticButton
            size="icon"
            variant="ghost"
            onClick={() => onNavigate('gallery')}
            hapticStyle="medium"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </HapticButton>
        </div>

        {/* Format Badge (rechts) mit Glassmorphism */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <motion.div whileTap={{ scale: 0.9 }}>
            <Badge
              variant="secondary"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={toggleFormat}
              style={{ fontSize: '12px', padding: '4px 10px' }}
            >
              {format}
            </Badge>
          </motion.div>
          
          {/* HDR Bracketing Badge */}
          {hdrEnabled && (
            <motion.div 
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge
                variant="secondary"
                className="bg-blue-500/80 backdrop-blur-md text-white border border-blue-400/30 cursor-pointer hover:bg-blue-500/90 transition-colors flex items-center gap-1"
                onClick={() => {
                  trigger('light');
                  setHdrMode(hdrMode === 3 ? 5 : 3);
                }}
                style={{ fontSize: '11px', padding: '3px 8px' }}
              >
                <Layers className="w-3 h-3" strokeWidth={2} />
                <span>{hdrMode}×</span>
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Zoom Overlay mit Glassmorphism */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-lg">
            {zoomLevels.map((level) => (
              <motion.button
                key={level}
                onClick={() => handleZoomChange(level)}
                whileTap={{ scale: 0.9 }}
                className={`min-w-10 px-3 py-1.5 rounded-full transition-all ${
                  zoom === level
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
                style={{ fontSize: '14px' }}
              >
                {level}×
              </motion.button>
            ))}
          </div>
        </div>

        {/* Histogram Overlay mit Glassmorphism */}
        {showHistogram && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-20 left-4 z-10"
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-lg border border-white/20 p-2 shadow-lg">
              <Histogram
                videoElement={videoRef.current}
                width={200}
                height={60}
                className="rounded"
              />
              <div className="flex justify-between mt-1 px-1">
                <span className="text-white/60 text-xs" style={{ fontSize: '10px' }}>
                  Shadows
                </span>
                <span className="text-white/60 text-xs" style={{ fontSize: '10px' }}>
                  Midtones
                </span>
                <span className="text-white/60 text-xs" style={{ fontSize: '10px' }}>
                  Highlights
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-black py-6 px-6 pb-20">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Galerie Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              trigger('medium');
              onNavigate('gallery');
            }}
            className="w-12 h-12 rounded-lg border-2 border-white/50 flex items-center justify-center bg-gray-700 hover:border-white transition-colors"
          >
            <Image className="w-6 h-6 text-white" strokeWidth={1.5} />
          </motion.button>

          {/* Auslöser */}
          <motion.button
            onClick={handleCapture}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform"
          >
            <div className="w-16 h-16 bg-white rounded-full" />
          </motion.button>

          {/* Histogram Button */}
          <HapticButton
            size="icon"
            variant="ghost"
            onClick={toggleHistogram}
            hapticStyle="light"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white"
          >
            <BarChart3 className="w-5 h-5" strokeWidth={1.5} />
          </HapticButton>
        </div>
      </div>
    </div>
  );
}