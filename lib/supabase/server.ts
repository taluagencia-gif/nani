import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseUrl, supabaseKey } from './config';
export async function createClient() {
 const jar = await cookies();
 return createServerClient(supabaseUrl, supabaseKey, {
  cookieOptions: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' },
  cookies: {
   getAll: () => jar.getAll(),
   setAll(values) { try { values.forEach(({name,value,options}) => jar.set(name,value,options)); } catch { /* Proxy persists refreshed cookies for Server Components. */ } }
  }
 });
}
