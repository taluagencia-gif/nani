import {createClient,requireOrigin,failure} from '@/lib/server';
export async function POST(request:Request){
 try{requireOrigin(request);}catch(e){return failure(e,403);}
 try{
  const {email,password}=await request.json() as {email?:unknown;password?:unknown};
  if(typeof email!=='string'||typeof password!=='string'||email.length>254||password.length>256)return Response.json({error:'Revisá el correo y la contraseña.'},{status:400});
  const client=await createClient();
  const {data,error}=await client.auth.signInWithPassword({email:email.trim(),password});
  if(error||!data.user)return Response.json({error:'Correo o contraseña incorrectos.'},{status:401,headers:{'Cache-Control':'no-store'}});
  const membership=await client.from('nani_admins').select('user_id').eq('user_id',data.user.id).maybeSingle();
  if(membership.error||!membership.data){await client.auth.signOut();return failure('not admin',403);}
  return Response.json({ok:true},{headers:{'Cache-Control':'private, no-store'}});
 }catch(e){return failure(e);}
}
