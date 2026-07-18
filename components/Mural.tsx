'use client';

import { useEffect, useState } from 'react';
import {
  buscarRecados,
  enviarRecado,
  LIMITE_AUTOR,
  LIMITE_MENSAGEM,
  type Recado,
} from '@/lib/recados';

export function Mural() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLeitura, setErroLeitura] = useState(false);

  const [mensagem, setMensagem] = useState('');
  const [autor, setAutor] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');

  useEffect(() => {
    let ativo = true;

    buscarRecados()
      .then((lista) => {
        if (ativo) setRecados(lista);
      })
      .catch(() => {
        if (ativo) setErroLeitura(true);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  const podeEnviar = mensagem.trim().length >= 2 && !enviando;

  async function aoEnviar() {
    if (!podeEnviar) return;
    setEnviando(true);
    setErroEnvio('');

    try {
      await enviarRecado(mensagem.trim(), autor.trim() || 'Anônimo');
      setEnviado(true);
      setMensagem('');
      setAutor('');
    } catch (e) {
      setErroEnvio(
        e instanceof Error && e.message.includes('NEXT_PUBLIC')
          ? e.message
          : 'O recado não foi. Confira sua internet e tente de novo.'
      );
    } finally {
      setEnviando(false);
    }
  }

  const contador = carregando
    ? 'Buscando os recados'
    : recados.length === 0
      ? 'Seja o primeiro a deixar um carinho'
      : `Já deixaram ${recados.length} ${
          recados.length === 1 ? 'recado' : 'recados'
        }`;

  return (
    <section data-revelar className="cartao" aria-labelledby="mural">
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <p className="rotulo rotulo-ornado">
          <span>Recadinho de aniversário</span>
        </p>
        <h2 id="mural" className="titulo" style={{ lineHeight: 1.05 }}>
          Deixe um carinho
        </h2>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: 17,
            fontStyle: 'italic',
            color: 'var(--apoio)',
          }}
        >
          vou juntar tudo num mural pra ela ler no dia
        </p>
      </div>

      {enviado ? (
        <div className="caixa" style={{ marginBottom: 22, padding: '20px 16px' }}>
          <p
            style={{
              margin: 0,
              textAlign: 'center',
              fontSize: 18,
              lineHeight: 1.5,
              color: 'var(--marrom)',
            }}
          >
            Recado enviado! Já já ele aparece aqui. 🤍
          </p>
          <button
            type="button"
            className="botao-solido"
            style={{ marginTop: 16 }}
            onClick={() => setEnviado(false)}
          >
            Deixar outro recado
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginBottom: 22,
          }}
        >
          <div>
            <label htmlFor="mensagem" className="sr-only">
              Sua frase para a Jenniffer
            </label>
            <textarea
              id="mensagem"
              className="campo"
              rows={3}
              maxLength={LIMITE_MENSAGEM}
              placeholder="escreva sua frase pra Jenniffer ..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="autor" className="sr-only">
              Assinado por
            </label>
            <input
              id="autor"
              className="campo"
              maxLength={LIMITE_AUTOR}
              autoComplete="name"
              placeholder="assinado por"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>

          {erroEnvio && (
            <p
              role="alert"
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.4,
                color: 'var(--marrom)',
              }}
            >
              {erroEnvio}
            </p>
          )}

          <button
            type="button"
            className="botao-solido"
            disabled={!podeEnviar}
            onClick={aoEnviar}
          >
            {enviando ? 'Enviando...' : 'Enviar recado'}
          </button>
        </div>
      )}

      <p className="contador">{contador}</p>

      {erroLeitura && (
        <p
          style={{
            margin: '0 0 14px',
            textAlign: 'center',
            fontSize: 16,
            fontStyle: 'italic',
            color: 'var(--apoio)',
          }}
        >
          Os recados não carregaram agora. Atualize a página em instantes.
        </p>
      )}

      {recados.length > 0 && (
        <ul
          role="list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {recados.map((recado) => (
            <li
              key={recado.id}
              className="caixa recado-novo"
              style={{ textAlign: 'center' }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  color: 'var(--marrom)',
                }}
              >
                &ldquo;{recado.mensagem}&rdquo;
              </p>
              <p className="assinatura">— {recado.autor}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
