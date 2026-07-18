const INSTAGRAM_DO_SITIO = 'https://www.instagram.com/espacovalledo_mendanha/';

export function GrandeDia() {
  return (
    <section data-revelar className="cartao text-center" aria-labelledby="grande-dia">
      <p className="rotulo rotulo-ornado" style={{ fontSize: 18 }}>
        <span>O grande dia</span>
      </p>

      <p
        id="grande-dia"
        style={{
          margin: '12px 0 2px',
          fontFamily: 'var(--fonte-titulo), serif',
          fontSize: 40,
          lineHeight: 1,
          color: 'var(--marrom)',
        }}
      >
        08{' '}
        <span
          style={{
            fontFamily: 'var(--fonte-corpo), serif',
            fontStyle: 'italic',
            fontSize: 26,
            color: 'var(--dourado)',
          }}
        >
          de
        </span>{' '}
        ago
      </p>

      <p
        style={{
          margin: '0 0 20px',
          fontSize: 22,
          fontStyle: 'italic',
          color: 'var(--apoio)',
        }}
      >
        sábado · 12h00
      </p>

      <p className="rotulo rotulo-ornado" style={{ fontSize: 18, letterSpacing: '0.34em' }}>
        <span style={{ textIndent: '0.34em' }}>Onde</span>
      </p>

      <p
        style={{
          margin: '8px 0 4px',
          fontSize: 25,
          fontWeight: 600,
          color: 'var(--marrom)',
        }}
      >
        Sítio Valle do Mendanha
      </p>

      <p
        style={{
          margin: '0 0 16px',
          fontSize: 20,
          fontStyle: 'italic',
          color: 'var(--apoio)',
        }}
      >
        Caminho da Serra nº 20A - Campo Grande
      </p>

      <a
        className="botao-contorno"
        href={INSTAGRAM_DO_SITIO}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver no mapa
      </a>
    </section>
  );
}
