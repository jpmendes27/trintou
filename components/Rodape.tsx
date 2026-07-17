export function Rodape() {
  return (
    <footer style={{ textAlign: 'center', marginTop: 26, padding: '0 12px' }}>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--fonte-titulo), serif',
          fontSize: 22,
          color: '#6f5945',
        }}
      >
        Trintou{' '}
        <span
          style={{
            fontFamily: 'var(--fonte-corpo), serif',
            fontStyle: 'italic',
            color: '#c6a06a',
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
          color: '#b39a72',
        }}
      >
        —&nbsp;celebrando aquela que há 30 anos faz nossa vida mais feliz ·
        08.08&nbsp;—
      </p>
    </footer>
  );
}
