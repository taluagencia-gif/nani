import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseUrl, supabaseKey } from './lib/supabase/config';
export async function proxy(request: NextRequest) {
 let response = NextResponse.next({request});
 const supabase = createServerClient(supabaseUrl,supabaseKey,{
  cookieOptions: {httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/'},
  cookies: {
   getAll: () => request.cookies.getAll(),
   setAll(values) {
    values.forEach(({name,value}) => request.cookies.set(name,value));
    response = NextResponse.next({request});
    values.forEach(({name,value,options}) => response.cookies.set(name,value,options));
   }
  }
 });
 await supabase.auth.getUser();
 response.headers.set('Cache-Control','private, no-store, max-age=0');
 response.headers.set('Pragma','no-cache');
 response.headers.set('Expires','0');
 return response;
}
export const config = {matcher:['/admin/:path*','/login','/api/:path*']};
