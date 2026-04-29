import { supabase } from './supabaseClient';

const DEFAULT_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'site-assets';

export async function uploadPublicImage(file, bucket = DEFAULT_BUCKET) {
  if (!file) return '';

  const extension = file.name?.split('.').pop() || 'png';
  const safeName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const path = `uploads/${safeName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
