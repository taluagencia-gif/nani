import { createClient } from './supabase/server';
import type { Product } from './catalog';
export { createClient };
export async function allProducts() {
 const client=await createClient();
 const {data,error}=await client.from('products').select('data,visible').order('position').order('id');
 if(error)throw error;
 return (data??[]).map(row=>({...row.data,visible:row.visible}) as Product);
}
export async function setting(key:string,fallback=''){
 const client=await createClient();
 const {data,error}=await client.from('settings').select('value').eq('key',key).maybeSingle();
 if(error)throw error;
 return data?.value??fallback;
}
export async function isAdmin(){
 const client=await createClient();
 const {data:{user},error}=await client.auth.getUser();
 if(error||!user)return false;
 const membership=await client.from('nani_admins').select('user_id').eq('user_id',user.id).maybeSingle();
 return !membership.error && !!membership.data;
}
export function requireOrigin(request:Request){
 const origin=request.headers.get('origin');
 // Next.js may use an internal hostname in request.url behind a reverse proxy.
 // Host is the browser-facing domain; Vercel supplies the external protocol.
 const url=new URL(request.url);
 const host=request.headers.get('host')||url.host;
 const protocol=request.headers.get('x-forwarded-proto')||url.protocol.slice(0,-1);
 if(!['http','https'].includes(protocol)||!origin||origin!==`${protocol}://${host}`)throw new Error('Origen no autorizado.');
}
export async function requireAdmin(request?:Request){
 if(request)requireOrigin(request);
 if(!await isAdmin())throw new Error('Acceso no autorizado.');
}
export function failure(e:unknown,status=503){
 console.error(e instanceof Error?e.message:'Request failed');
 return Response.json({error:status===403?'Acceso no autorizado. Ingresá nuevamente.':'No pudimos completar la operación. Intentá nuevamente.'},{status,headers:{'Cache-Control':'no-store'}});
}
