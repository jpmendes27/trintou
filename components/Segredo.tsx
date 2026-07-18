/**
 * O cartão do segredo.
 *
 * É o único escuro da página, de propósito. Vem logo depois do convite
 * e antes de qualquer informação da festa, porque o risco real é a
 * pessoa se empolgar e mandar no grupo da família antes de terminar de
 * ler. O aviso tem que chegar antes da empolgação.
 */
export function Segredo() {
  return (
    <section
      data-revelar
      className="cartao cartao-primeiro cartao-escuro text-center"
      aria-labelledby="segredo"
    >
      <p className="rotulo rotulo-ornado rotulo-claro">
        <span>Segredo</span>
      </p>

      <h2 id="segredo" className="titulo titulo-claro">
        Ela não sabe de nada
      </h2>

      <p className="apoio apoio-claro" style={{ margin: '12px 0 16px' }}>
        É surpresa de verdade. A Jenniffer não faz ideia, e a gente quer que
        continue assim até ela pisar no sítio.
      </p>

      <div className="caixa-escura">
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>
          Nada de comentar no grupo da família, nada de story, nada de dar
          aquela risadinha quando ela falar do aniversário. Se ela perguntar,
          você não sabe de nada. 🤍
        </p>
      </div>
    </section>
  );
}
