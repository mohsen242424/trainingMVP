import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, accept = '.pdf,.doc,.docx', maxSize = 5, label, currentFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(currentFile || null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    setError(null);
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Max size is ${maxSize}MB.`);
      return false;
    }
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    const acceptedTypes = accept.split(',');
    if (!acceptedTypes.includes(ext)) {
      setError(`Invalid file type. Accepted: ${accept}`);
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        if (onFileSelect) onFileSelect(file);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        if (onFileSelect) onFileSelect(file);
      }
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>}
      
      {!selectedFile ? (
        <div 
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragActive ? 'border-accent-gold bg-accent-gold/5' : 'border-border bg-gray-50 hover:bg-gray-100'}
            ${error ? 'border-error bg-error-bg' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
          />
          <UploadCloud className="mx-auto h-12 w-12 text-text-muted mb-4" />
          <p className="text-sm font-medium text-text-primary mb-1">
            انقر للرفع أو قم بسحب الملف هنا
          </p>
          <p className="text-xs text-text-secondary">
            {accept.split(',').join(', ')} (الحد الأقصى {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-blue-50 p-2 rounded text-blue-500">
              <File size={24} />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-text-primary truncate">{selectedFile.name || (typeof selectedFile === 'string' ? selectedFile : 'File')}</p>
              {selectedFile.size && (
                <p className="text-xs text-text-secondary">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              )}
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleRemove}
            className="p-2 text-text-muted hover:text-error hover:bg-error-bg rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
