const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Hero() {
  return (
    <header data-revelar style={{ padding: '18px 8px 4px', textAlign: 'center' }}>
      <p
        style={{
          margin: '0 0 10px',
          fontSize: 14,
          letterSpacing: '0.42em',
          textIndent: '0.42em',
          textTransform: 'uppercase',
          color: 'var(--hero-rotulo)',
          fontWeight: 600,
        }}
      >
        Você está convidado(a) para o
      </p>

      <img
        src={`${base}/convite.png`}
        alt="Convite do Trintou da Jenni: um bolo ilustrado em traço dourado com laço no topo."
        width={1000}
        height={1410}
        fetchPriority="high"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: 16,
          boxShadow: '0 14px 34px -18px rgba(111,89,69,0.5)',
        }}
      />
    </header>
  );
}
