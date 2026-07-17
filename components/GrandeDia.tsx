const INSTAGRAM_DO_SITIO = 'https://www.instagram.com/espacovalledo_mendanha/';

export function GrandeDia() {
  return (
    <section className="cartao cartao-primeiro text-center" aria-labelledby="grande-dia">
      <p className="rotulo" style={{ fontSize: 18 }}>
        O grande dia
      </p>

      <p
        id="grande-dia"
        style={{
          margin: '12px 0 2px',
          fontFamily: 'var(--fonte-titulo), serif',
          fontSize: 40,
          lineHeight: 1,
          color: '#6f5945',
        }}
      >
        08{' '}
        <span
          style={{
            fontFamily: 'var(--fonte-corpo), serif',
            fontStyle: 'italic',
            fontSize: 26,
            color: '#c6a06a',
          }}
        >
          de
        </span>{' '}
        ago
      </p>

      <p
        style={{
          margin: '0 0 18px',
          fontSize: 22,
          fontStyle: 'italic',
          color: '#a08f7a',
        }}
      >
        sábado · 12h00
      </p>

      <div className="divisor" style={{ margin: '0 0 16px' }} />

      <p className="rotulo" style={{ fontSize: 18, letterSpacing: '0.34em' }}>
        Onde
      </p>

      <p
        style={{
          margin: '8px 0 4px',
          fontSize: 25,
          fontWeight: 600,
          color: '#6f5945',
        }}
      >
        Sítio Valle do Mendanha
      </p>

      <p
        style={{
          margin: '0 0 16px',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#a08f7a',
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
