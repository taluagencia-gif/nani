import {createClient,requireAdmin,failure} from '@/lib/server';
export async function POST(request:Request){
 try{await requireAdmin(request);}catch(e){return failure(e,403);}
 try{
  const {password,currentPassword}=await request.json() as {password?:unknown;currentPassword?:unknown};
  if(typeof password!=='string'||password.length<12||password.length>128||typeof currentPassword!=='string'||currentPassword.length>256)return Response.json({error:'Usá una contraseña nueva de 12 a 128 caracteres.'},{status:400});
  const client=await createClient();
  const {error}=await client.auth.updateUser({password,current_password:currentPassword});
  if(error)return Response.json({error:'No se pudo cambiar. Revisá tu contraseña actual y elegí una diferente.'},{status:400});
  return Response.json({ok:true},{headers:{'Cache-Control':'private, no-store'}});
 }catch(e){return failure(e);}
}
