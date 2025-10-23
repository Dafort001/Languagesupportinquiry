import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Upload, Home, ChevronRight, Layers } from 'lucide-react';
import { HapticButton } from '../HapticButton';
import { StatusBar } from '../StatusBar';
import { useHaptic } from '../../hooks/useHaptic';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '../ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { Screen } from '../../App';

interface GalleryScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Photo {
  id: number;
  color: string;
  selected: boolean;
  roomType?: string;
  status: 'ok' | 'warning';
  isHDR?: boolean;        // HDR Bracketing Indicator
  bracketCount?: number;  // Number of exposures (3, 5, etc.)
}

const ROOM_TYPES = [
  'Unzugeordnet',
  'Wohnzimmer',
  'Küche',
  'Schlafzimmer',
  'Bad',
  'WC',
  'Flur',
  'Balkon',
  'Terrasse',
  'Garten',
  'Keller',
  'Dachboden',
  'Garage',
  'Arbeitszimmer',
  'Esszimmer',
  'Kinderzimmer',
  'Ankleidezimmer',
  'Waschküche',
  'Abstellraum',
  'Eingang',
  'Treppenhaus',
  'Außenansicht',
];

export function GalleryScreen({ onNavigate }: GalleryScreenProps) {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, color: '#E8F4F8', selected: false, status: 'ok', isHDR: true, bracketCount: 3 },
    { id: 2, color: '#FFE8E8', selected: false, status: 'warning' },
    { id: 3, color: '#E8FFE8', selected: false, status: 'ok', isHDR: true, bracketCount: 5 },
    { id: 4, color: '#FFF4E8', selected: false, status: 'ok' },
    { id: 5, color: '#F8E8FF', selected: false, status: 'ok', isHDR: true, bracketCount: 3 },
    { id: 6, color: '#E8F8FF', selected: false, status: 'warning' },
    { id: 7, color: '#FFE8F4', selected: false, status: 'ok' },
    { id: 8, color: '#F4FFE8', selected: false, status: 'ok', isHDR: true, bracketCount: 3 },
    { id: 9, color: '#E8E8FF', selected: false, status: 'ok' },
  ]);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { trigger } = useHaptic();

  const selectedCount = photos.filter(p => p.selected).length;

  const toggleSelection = (id: number) => {
    trigger('light');
    setPhotos(photos.map(p => 
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
  };

  const toggleSelectionMode = () => {
    trigger('medium');
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      // Deselect all when exiting selection mode
      setPhotos(photos.map(p => ({ ...p, selected: false })));
    }
  };

  const handlePhotoClick = (photo: Photo) => {
    if (selectionMode) {
      toggleSelection(photo.id);
    } else {
      trigger('light');
      setSelectedPhoto(photo);
    }
  };

  const updateRoomType = (roomType: string) => {
    if (selectedPhoto) {
      setPhotos(photos.map(p => 
        p.id === selectedPhoto.id ? { ...p, roomType } : p
      ));
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Status Bar */}
      <StatusBar />

      {/* Header - Apple Style */}
      <div className="bg-white border-b border-gray-200/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900" style={{ fontSize: '28px', fontWeight: '700' }}>
              Galerie
            </h1>
            {selectionMode && selectedCount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-blue-600"
                style={{ fontSize: '14px', fontWeight: '400', marginTop: '2px' }}
              >
                {selectedCount} {selectedCount === 1 ? 'Foto' : 'Fotos'} ausgewählt
              </motion.p>
            )}
          </div>
          
          <HapticButton
            variant="ghost"
            onClick={toggleSelectionMode}
            hapticStyle="medium"
            className="text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1.5"
            style={{ fontSize: '16px' }}
          >
            {selectionMode ? 'Fertig' : 'Auswählen'}
          </HapticButton>
        </div>
      </div>

      {/* Photo Grid - Apple Photos Style */}
      <div className="flex-1 overflow-auto pb-20">
        <div className="grid grid-cols-3 gap-0.5 p-0.5 bg-white">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              {/* Photo Thumbnail */}
              <div 
                className="w-full h-full flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: photo.color }}
              >
                {/* Image Placeholder */}
                <div className="text-5xl opacity-30">🏠</div>
                
                {/* Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </div>

              {/* Selection Indicator */}
              {selectionMode && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  {photo.selected ? (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-white rounded-full bg-black/20 backdrop-blur-sm" />
                  )}
                </motion.div>
              )}

              {/* Room Type Badge (wenn zugeordnet) */}
              {!selectionMode && photo.roomType && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs truncate" style={{ fontSize: '11px' }}>
                    {photo.roomType}
                  </p>
                </div>
              )}

              {/* Status Indicator (small dot) */}
              {!selectionMode && photo.status === 'warning' && (
                <div className="absolute top-2 left-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-md" />
                </div>
              )}

              {/* HDR Bracketing Badge - Apple Photos Style */}
              {!selectionMode && photo.isHDR && (
                <div className="absolute top-2 left-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded px-1.5 py-0.5 shadow-md flex items-center gap-0.5">
                    <Layers className="w-3 h-3 text-gray-700" strokeWidth={2} />
                    <span className="text-gray-700" style={{ fontSize: '10px', fontWeight: '600' }}>
                      {photo.bracketCount}×
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Button - Apple Style */}
      <AnimatePresence>
        {!selectionMode && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-24 right-6 z-20"
          >
            <HapticButton
              onClick={() => {
                trigger('medium');
                onNavigate('upload');
              }}
              hapticStyle="medium"
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center"
            >
              <Upload className="w-6 h-6" strokeWidth={2} />
            </HapticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection Mode Toolbar */}
      <AnimatePresence>
        {selectionMode && selectedCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-16 left-0 right-0 z-20 px-4"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-4">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <HapticButton
                      variant="default"
                      hapticStyle="medium"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
                    >
                      <Home className="w-5 h-5 mr-2" strokeWidth={1.5} />
                      Raumtyp zuweisen
                    </HapticButton>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[400px]">
                    <SheetHeader>
                      <SheetTitle>Raumtyp auswählen</SheetTitle>
                      <SheetDescription>
                        Wählen Sie den Raumtyp für die ausgewählten Fotos aus.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {ROOM_TYPES.map((room) => (
                        <button
                          key={room}
                          onClick={() => {
                            // Assign to all selected photos
                            setPhotos(photos.map(p => 
                              p.selected ? { ...p, roomType: room, selected: false } : p
                            ));
                            setSelectionMode(false);
                            trigger('success');
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                        >
                          <span style={{ fontSize: '16px' }}>{room}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        </button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
                
                <HapticButton
                  variant="default"
                  hapticStyle="medium"
                  onClick={() => {
                    trigger('medium');
                    onNavigate('upload');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3"
                >
                  <Upload className="w-5 h-5" strokeWidth={1.5} />
                </HapticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Type Assignment Sheet (Single Photo) */}
      <Sheet open={selectedPhoto !== null} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <SheetContent side="bottom" className="h-[400px]">
          <SheetHeader>
            <SheetTitle>Raumtyp zuweisen</SheetTitle>
            <SheetDescription>
              Wählen Sie den Raumtyp für das ausgewählte Foto aus.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {ROOM_TYPES.map((room) => (
              <button
                key={room}
                onClick={() => {
                  updateRoomType(room);
                  trigger('success');
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span style={{ fontSize: '16px' }}>{room}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}