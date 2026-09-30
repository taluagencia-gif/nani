import { supabaseUrl } from '@/lib/supabase/config';

// Preserve existing catalog URLs after moving photo storage to Supabase.
export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!/^[a-f0-9-]+\.(jpg|png|webp)$/.test(key)) {
    return new Response('No encontrada', { status: 404 });
  }
  return Response.redirect(`${supabaseUrl}/storage/v1/object/public/nani-products/${key}`, 307);
}
