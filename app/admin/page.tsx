import { redirect } from 'next/navigation';
import {isAdmin,allProducts,setting} from '@/lib/server';
import Admin from './panel';
export const dynamic='force-dynamic';
async function Protected(){
 if(!await isAdmin())redirect('/login');
 try{return <Admin products={await allProducts()} phone={await setting('whatsapp','5493813683079')}/>;}
 catch{return <main className="unavailable"><h1>No pudimos abrir el panel.</h1><p>Tus productos siguen guardados. Volvé a intentarlo.</p><a href="/admin" className="button dark">Reintentar</a></main>;}
}
export default function Page(){return <Protected/>;}
