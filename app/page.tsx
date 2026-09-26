import Storefront from './storefront';
import { allProducts,setting } from '@/lib/server';
export const dynamic='force-dynamic';
export default async function Page(){try{return <Storefront products={(await allProducts()).filter(p=>p.visible)} phone={await setting('whatsapp','5493813683079')}/>;}catch(e){console.error(e);return <main className="unavailable"><h1>Volvemos en un ratito.</h1><p>No pudimos cargar el catálogo. Podés volver a intentar.</p><a className="button" href="/">Recargar catálogo</a></main>;}}
