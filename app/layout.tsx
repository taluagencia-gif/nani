import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'NANI · Alma, corazón & vida',description:'Pantallas de macramé y detalles con alma para tu hogar. Elegí tus favoritos y pedilos por WhatsApp.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es-AR"><body>{children}</body></html>}
