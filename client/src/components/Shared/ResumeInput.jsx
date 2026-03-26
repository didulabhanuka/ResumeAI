import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ResumeInput({ onTextChange, onFileChange }) {
  const [mode, setMode] = useState('paste'); // 'paste' | 'upload'
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div>
      {/* Toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-3 w-fit">
        <button
          onClick={() => setMode('paste')}
          className={`px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === 'paste'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-500 hover:text-gray-700'
          }`}
        >
          Paste text
        </button>
        <button
          onClick={() => setMode('upload')}
          className={`px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-500 hover:text-gray-700'
          }`}
        >
          Upload PDF
        </button>
      </div>

      {/* Paste mode */}
      {mode === 'paste' && (
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your resume text here..."
          rows={8}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      )}

      {/* Upload mode */}
      {mode === 'upload' && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg px-6 py-10 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          {fileName ? (
            <div className="text-sm">
              <p className="font-medium text-green-600">✓ {fileName}</p>
              <p className="text-gray-400 mt-1">Click or drag to replace</p>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-700 mb-1">
                {isDragActive ? 'Drop your PDF here' : 'Drag & drop your resume PDF'}
              </p>
              <p>or click to browse</p>
              <p className="text-xs text-gray-400 mt-2">PDF only · Max 5MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}