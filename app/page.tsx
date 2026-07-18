import { Hero } from '@/components/Hero';
import { Segredo } from '@/components/Segredo';
import { GrandeDia } from '@/components/GrandeDia';
import { Paleta } from '@/components/Paleta';
import { Piscina } from '@/components/Piscina';
import { Mural } from '@/components/Mural';
import { Rodape } from '@/components/Rodape';
import { Animacoes } from '@/components/Animacoes';

export default function Pagina() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#efe7d6',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <main className="pagina">
        {/* moldura ornamental dourada */}
        <div className="moldura" aria-hidden="true" />

        <div style={{ position: 'relative' }}>
          <Hero />
          <Segredo />
          <GrandeDia />
          <Paleta />
          <Piscina />
          <Mural />
          <Rodape />
        </div>
      </main>
      <Animacoes />
    </div>
  );
}
