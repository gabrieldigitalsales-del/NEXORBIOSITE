import { supabase } from './supabaseClient';

export const DEFAULT_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'nexor-biosite-assets';

function safeExtension(file) {
  const byName = file.name?.split('.').pop()?.toLowerCase();
  if (byName && /^[a-z0-9]+$/.test(byName)) return byName;
  if (file.type === 'image/jpeg') return 'jpg';
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'png';
}

export async function uploadPublicImage(file, bucket = DEFAULT_BUCKET) {
  if (!file) return '';

  if (!file.type?.startsWith('image/')) {
    throw new Error('Envie apenas arquivos de imagem.');
  }

  const extension = safeExtension(file);
  const safeName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const path = `uploads/${safeName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type || `image/${extension}`,
    });

  if (error) {
    if (error.message?.includes('Bucket not found')) {
      throw new Error(`Bucket "${bucket}" nao existe. Rode o supabase/schema.sql inteiro no SQL Editor.`);
    }
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) throw new Error('Upload concluido, mas nao foi possivel gerar URL publica.');
  return data.publicUrl;
}
