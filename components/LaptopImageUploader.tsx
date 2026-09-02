import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Laptop, CheckCircle2, Link, Loader2, AlertCircle, Play, Video } from 'lucide-react';
import { compressImageFile, sanitizeImageUrl, ARCHITECTURAL_FALLBACK_IMAGES } from '../utils/imageCompressor';
import { isYouTubeUrl, getYouTubeThumbnail, extractYouTubeId } from '../utils/mediaUtils';

interface LaptopImageUploaderProps {
  currentValue?: string;
  currentUrl?: string; // alias support
  onImageSelected: (dataUrlOrUrl: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
  isLogo?: boolean;
}

export const LaptopImageUploader: React.FC<LaptopImageUploaderProps> = ({
  currentValue,
  currentUrl,
  onImageSelected,
  label = 'Sawirka (Photo / Video Link)',
  helperText = 'Ka soo geli laptop-kaaga (JPG, PNG, WebP) ama geli Link sawir / YouTube Video ah',
  aspectRatio = 'wide',
  isLogo = false
}) => {
  const activeValue = currentValue || currentUrl || '';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
    // Reset value so user can pick same file again if desired
    if (e.target) {
      e.target.value = '';
    }
  };

  const processFile = async (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|svg|heic|heif)$/i)) {
      setErrorMsg('Fadlan dooro fayl sawir ah (JPG, PNG, WebP, SVG).');
      return;
    }

    setIsProcessing(true);
    try {
      // Automatically compress and resize to optimal web resolution
      const compressedDataUrl = await compressImageFile(file, {
        maxWidth: isLogo ? 600 : 1280,
        maxHeight: isLogo ? 600 : 800,
        quality: 0.72,
        isLogo: isLogo || file.type.includes('png') || file.type.includes('svg')
      });
      onImageSelected(compressedDataUrl);
      setShowUrlInput(false);
    } catch (err) {
      console.error('Image compression error, attempting fallback reading:', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
          setShowUrlInput(false);
        }
      };
      reader.onerror = () => {
        setErrorMsg('Faylka waa la akhrin waayay. Fadlan isku day sawir kale.');
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUrlSubmit = () => {
    setErrorMsg(null);
    const raw = urlInput.trim();
    if (!raw) return;

    if (isYouTubeUrl(raw)) {
      // It's a YouTube link! Save it directly; sanitizeImageUrl will resolve the thumbnail, and video players will embed it!
      onImageSelected(raw);
      setUrlInput('');
      setShowUrlInput(false);
    } else {
      const sanitized = sanitizeImageUrl(raw);
      onImageSelected(sanitized);
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const isYouTube = isYouTubeUrl(activeValue);
  const displayThumbnail = isYouTube ? (getYouTubeThumbnail(activeValue) || sanitizeImageUrl(activeValue)) : sanitizeImageUrl(activeValue);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold text-gray-700">
          {label}
        </label>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif,.svg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Active Preview If Image/Video Exists */}
      {displayThumbnail ? (
        <div className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-sm">
          <div className={`w-full overflow-hidden relative ${
            aspectRatio === 'video' ? 'aspect-video' : aspectRatio === 'square' ? 'aspect-square' : 'aspect-[16/9]'
          }`}>
            <img
              src={displayThumbnail}
              alt="Preview"
              onError={(e) => {
                // If preview fails, show fallback so UI stays pristine
                (e.target as HTMLImageElement).src = ARCHITECTURAL_FALLBACK_IMAGES.event;
              }}
              className="w-full h-full object-cover"
            />

            {/* YouTube Play Overlay Icon if it is a video */}
            {isYouTube && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            )}
          </div>

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <Laptop className="w-3.5 h-3.5" /> Beddel (Laptop)
            </button>
            
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <Link className="w-3.5 h-3.5" /> Link / YouTube
            </button>

            <button
              type="button"
              onClick={() => {
                onImageSelected('');
                setErrorMsg(null);
              }}
              className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs shadow-md cursor-pointer transition-colors"
              title="Tirtir Sawirka / Muuqaalka"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            {isYouTube ? (
              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <Video className="w-3 h-3" /> YouTube Video & Thumbnail Diyaar ah
              </span>
            ) : (
              <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Sawir Diyaar ah
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`p-6 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-gray-300 hover:border-blue-400 bg-gray-50/60 hover:bg-white'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            ) : (
              <Laptop className="w-6 h-6" />
            )}
          </div>

          <p className="text-xs font-bold text-gray-900 mb-1">
            {isProcessing ? 'Faylka waa la habeeyaa...' : 'Guji si aad sawir uga soo doorato Laptop-kaaga ama u geliso YouTube link'}
          </p>
          <p className="text-[11px] text-gray-500 mb-3">
            JPG, PNG, WebP ama YouTube Link (Auto-extracts High-Res Thumbnail)
          </p>

          <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{isProcessing ? 'Faylka waa la wadaa...' : 'Ka Soo Dooro Laptop-ka'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3.5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              <Link className="w-3.5 h-3.5" /> Link / YouTube
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* URL / YouTube Link Input */}
      {showUrlInput && (
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
              <Link className="w-3.5 h-3.5" /> Geli Link Sawir ama YouTube Video:
            </span>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleUrlSubmit();
                }
              }}
              placeholder="e.g. https://www.youtube.com/watch?v=... ama https://images.unsplash.com/..."
              className="flex-1 px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Dabaq
            </button>
          </div>
          <p className="text-[10px] text-blue-700">
            💡 Haddii aad YouTube link geliso, system-ku si toos ah ayuu sawirka (cover thumbnail) uga soo gooynayaa, muuqaalkana waxaa laga daawan karaa website-ka!
          </p>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-gray-400">{helperText}</p>
      )}
    </div>
  );
};
