export function Rodape() {
  return (
    <footer data-revelar style={{ textAlign: 'center', marginTop: 26, padding: '0 12px' }}>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--fonte-titulo), serif',
          fontSize: 22,
          color: 'var(--marrom)',
        }}
      >
        Trintou{' '}
        <span
          style={{
            fontFamily: 'var(--fonte-corpo), serif',
            fontStyle: 'italic',
            color: 'var(--dourado)',
          }}
        >
          da Jenniffer
        </span>
      </p>
      <p
        style={{
          margin: '6px 0 0',
          fontSize: 14,
          fontStyle: 'italic',
          color: 'var(--rotulo)',
        }}
      >
        —&nbsp;celebrando aquela que há 30 anos faz nossa vida mais feliz ·
        08.08&nbsp;—
      </p>
    </footer>
  );
}
