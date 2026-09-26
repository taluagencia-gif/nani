import {createClient,requireOrigin,failure} from '@/lib/server';
export async function POST(request:Request){
 try{requireOrigin(request);}catch(e){return failure(e,403);}
 const client=await createClient();
 const {error}=await client.auth.signOut({scope:'local'});
 if(error)return failure(error);
 return Response.json({ok:true},{headers:{'Cache-Control':'private, no-store'}});
}
