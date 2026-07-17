export function Piscina() {
  return (
    <section className="cartao text-center" aria-labelledby="piscina">
      <p className="rotulo">Depois das fotos</p>

      <h2 id="piscina" className="titulo">
        A piscina estará liberada
      </h2>

      <p className="apoio" style={{ margin: '12px 0 16px' }}>
        Passada essa primeira parte da festa, a piscina fica liberada pra quem
        quiser aproveitar. Traga uma roupa de banho pra dar aquele mergulho! 💦
      </p>

      <div
        style={{
          background: '#fffdf8',
          border: '1px dashed #cba876',
          borderRadius: 14,
          padding: '14px 16px',
        }}
      >
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: '#6f5945' }}>
          Como é um ambiente <b className="destaque">de família</b>, contamos com
          o bom senso de todos na escolha do traje de banho. 🤍
        </p>
      </div>
    </section>
  );
}
