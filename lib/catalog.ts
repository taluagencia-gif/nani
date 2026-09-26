export type Product = { id:string; name:string; code:string; diameter:string; description:string; price:number; pairPrice:number|null; images:string[]; visible:boolean };
export const initialProducts:Product[] = [
 {id:'aloja',name:'Aloja',code:'P-20-001',diameter:'20 cm',description:'Pantalla de macramé con detalles de madera y flecos. No incluye instalación eléctrica.',price:96800,pairPrice:84700,images:['/images/aloja-1.webp','/images/aloja-2.webp'],visible:true},
 {id:'kakuy',name:'Kakuy',code:'P-17-002',diameter:'17 cm',description:'Pantalla de macramé con trama abierta, cuentas de madera y flecos. No incluye instalación eléctrica.',price:104800,pairPrice:91700,images:['/images/kakuy-1.webp','/images/kakuy-2.webp'],visible:true},
 {id:'yunga',name:'Yunga',code:'P-15-003',diameter:'15 cm',description:'Pantalla de macramé de silueta alargada y flecos. No incluye instalación eléctrica.',price:60000,pairPrice:52500,images:['/images/yunga-1.webp','/images/yunga-2.webp'],visible:true},
];
export const money=(n:number)=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
export function lineTotal(p:Product,q:number){return Math.floor(q/2)*2*(p.pairPrice??p.price)+(q%2)*p.price;}
export function orderMessage(items:{product:Product;quantity:number}[]){return '¡Hola NANI! Me gustaría hacer este pedido:\n\n'+items.map(({product:p,quantity:q})=>`• ${q} × Pantalla ${p.name} (${p.code})\n  ${p.diameter} de diámetro · ${money(lineTotal(p,q))}${p.pairPrice&&q>=2?' (promo por pares aplicada)':''}`).join('\n\n')+'\n\nTotal de productos: '+money(items.reduce((t,i)=>t+lineTotal(i.product,i.quantity),0))+'\n\n¿Me confirman disponibilidad, pago y entrega? ¡Gracias!';}
