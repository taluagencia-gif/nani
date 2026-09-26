import {createClient,requireAdmin,failure} from '@/lib/server';
export async function POST(request:Request){
 try{await requireAdmin(request);}catch(e){return failure(e,403);}
 try{
  const data=await request.json() as {whatsapp?:unknown};
  if(typeof data.whatsapp!=='string'||!/^\d{10,15}$/.test(data.whatsapp))return Response.json({error:'Usá el número internacional, solo dígitos. Ejemplo: 5493813683079.'},{status:400});
  const client=await createClient();
  const {error}=await client.from('settings').upsert({key:'whatsapp',value:data.whatsapp});
  if(error)throw error;
  return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch(e){return failure(e);}
}
