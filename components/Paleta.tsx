const TONS = [
  { nome: 'Café', hex: '#4a3524' },
  { nome: 'Avelã', hex: '#8a6f4e' },
  { nome: 'Camelo', hex: '#c6a06a' },
  { nome: 'Areia', hex: '#d8c3a0' },
  { nome: 'Marfim', hex: '#efe2ca' },
];

export function Paleta() {
  return (
    <section data-revelar className="cartao text-center" aria-labelledby="traje">
      <p className="rotulo rotulo-ornado">
        <span>Paleta de cores &amp; traje</span>
      </p>

      <h2 id="traje" className="titulo">
        Venha de marrom
      </h2>

      <p className="apoio" style={{ margin: '12px 0 18px' }}>
        No começo da festa vamos tirar as fotos, cantar parabéns e fazer uma
        homenagem especial. Pra deixar tudo lindo e combinando, escolha alguma
        peça em <b className="destaque">tom de marrom</b> 🤎
      </p>

      <ul
        role="list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 14,
          margin: '0 0 12px',
          padding: 0,
          listStyle: 'none',
        }}
      >
        {TONS.map((tom, i) => (
          <li key={tom.hex}>
            <span
              className="swatch"
              style={{ background: tom.hex, '--i': i } as React.CSSProperties}
            />
            <span className="sr-only">{tom.nome}</span>
          </li>
        ))}
      </ul>

      <p className="rotulo" style={{ letterSpacing: '0.24em', textIndent: '0.24em' }}>
        Do café ao creme · escolha o seu tom
      </p>
    </section>
  );
}
