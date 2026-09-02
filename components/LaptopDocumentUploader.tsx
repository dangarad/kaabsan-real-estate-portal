import React, { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle2, Link, FileCheck, FileCode, Paperclip } from 'lucide-react';

interface LaptopDocumentUploaderProps {
  currentFileUrl?: string;
  currentFileSize?: string;
  currentFileName?: string;
  onDocumentSelected: (data: { fileUrl: string; fileSize: string; fileName?: string }) => void;
  label?: string;
  helperText?: string;
}

export const LaptopDocumentUploader: React.FC<LaptopDocumentUploaderProps> = ({
  currentFileUrl,
  currentFileSize,
  currentFileName,
  onDocumentSelected,
  label = 'Brochure / Document File',
  helperText = 'Upload PDF, DOCX, Brochure from your device (Laptop/Mobile) or enter a download URL'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState(currentFileName || '');

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const processFile = (file: File) => {
    setIsUploading(true);
    const sizeStr = `${formatBytes(file.size)} (${file.name.split('.').pop()?.toUpperCase() || 'PDF'})`;
    setUploadedName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onDocumentSelected({
          fileUrl: event.target.result as string,
          fileSize: sizeStr,
          fileName: file.name
        });
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
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
    if (urlInput.trim()) {
      onDocumentSelected({
        fileUrl: urlInput.trim(),
        fileSize: 'Online PDF (Direct Link)',
        fileName: urlInput.split('/').pop() || 'Kaabsan Brochure'
      });
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

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
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Active File State */}
      {currentFileUrl && currentFileUrl !== '#' ? (
        <div className="bg-purple-50/80 border-2 border-purple-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 truncate">
                  {uploadedName || 'Brochure / PDF File Attached'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                {currentFileSize || 'PDF Document'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white hover:bg-gray-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={() => onDocumentSelected({ fileUrl: '#', fileSize: '0 MB' })}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Upload Button Dropzone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-purple-400 bg-gray-50/60'
          }`}
        >
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs">
              <Upload className="w-6 h-6 animate-pulse" />
            </div>

            <div>
              <p className="text-xs font-bold text-gray-800">
                Upload Brochure / Document from Device
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {helperText}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <Paperclip className="w-4 h-4" />
                <span>{isUploading ? 'Uploading...' : 'Choose PDF / Brochure File'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-3.5 py-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Link className="w-3.5 h-3.5 text-gray-500" />
                <span>Link URL</span>
              </button>
            </div>

            {/* Optional URL Input Mode */}
            {showUrlInput && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/brochure.pdf"
                  className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Attach
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
