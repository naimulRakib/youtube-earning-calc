'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
// It is best practice to move this to a separate utils/supabase.ts file, 
// but for this standalone page, we can define it here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setPublicUrl(null); // Reset previous results
      setStatusMessage('');
    }
  };

  // Handle the upload process
  const handleUpload = async () => {
    if (!file) {
      setStatusMessage('Please select a file first.');
      return;
    }

    try {
      setUploading(true);
      setStatusMessage('Uploading...');

      // 1. Generate a unique file name to prevent overwriting
      // Format: timestamp-randomString-originalName
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      const BUCKET_NAME = 'uploads'; // CHANGE THIS to your actual bucket name

      // 2. Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Get the Public URL
      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      setPublicUrl(data.publicUrl);
      setStatusMessage('Upload successful!');

    } catch (error: any) {
      console.error('Upload Error:', error);
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Upload to Supabase</h1>
          <p className="text-gray-500 text-sm mt-2">Select an image to get its public URL</p>
        </div>

        {/* File Input */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all
            ${uploading || !file 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
        >
          {uploading ? 'Uploading...' : 'Get Public URL'}
        </button>

        {/* Status Message */}
        {statusMessage && (
          <p className={`text-center text-sm font-medium ${statusMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
            {statusMessage}
          </p>
        )}

        {/* Result Display */}
        {publicUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-xs font-bold text-green-800 uppercase mb-2">Public URL Generated:</p>
            
            {/* Copyable Link Box */}
            <div className="flex items-center gap-2 bg-white border border-green-300 rounded p-2 mb-4">
              <code className="text-xs text-gray-600 truncate flex-1">{publicUrl}</code>
              <button 
                onClick={() => navigator.clipboard.writeText(publicUrl)}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
              >
                Copy
              </button>
            </div>

            {/* Image Preview */}
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={publicUrl} 
                alt="Uploaded preview" 
                className="w-full h-auto object-cover max-h-64" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}