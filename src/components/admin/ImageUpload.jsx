import React, { useRef, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { uploadPublicImage } from '@/api/storageService';
import { toast } from 'sonner';

export default function ImageUpload({ value, onChange, label = 'Imagem' }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await uploadPublicImage(file);
      onChange(publicUrl);
      toast.success('Imagem enviada com sucesso.');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Não foi possível enviar a imagem.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="text-xs font-medium text-foreground mb-1.5 block">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border flex-shrink-0">
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange('')} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 text-white hover:bg-black/80">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center flex-shrink-0 text-muted-foreground">
            <Image className="w-6 h-6" />
          </div>
        )}
        <div>
          <button type="button" onClick={() => inputRef.current.click()} disabled={uploading} className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium text-foreground transition-colors disabled:opacity-50">
            <Upload className="w-4 h-4" />
            {uploading ? 'Enviando...' : 'Upload'}
          </button>
          {value && <p className="text-xs text-muted-foreground mt-1 max-w-[180px] truncate">{value}</p>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
