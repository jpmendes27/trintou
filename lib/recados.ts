export type Recado = {
  id: string;
  mensagem: string;
  autor: string;
};

const API = process.env.NEXT_PUBLIC_RECADOS_API || '';

export const LIMITE_MENSAGEM = 280;
export const LIMITE_AUTOR = 40;

export function apiConfigurada(): boolean {
  return API.startsWith('https://');
}

/**
 * Busca só os recados já aprovados na planilha.
 */
export async function buscarRecados(): Promise<Recado[]> {
  if (!apiConfigurada()) return [];

  const resposta = await fetch(`${API}?t=${Date.now()}`, { cache: 'no-store' });
  if (!resposta.ok) throw new Error('falha na leitura');

  const dados = await resposta.json();
  if (!dados?.ok) throw new Error('falha na leitura');

  return dados.recados as Recado[];
}

/**
 * Envia um recado novo. Ele entra na planilha como não aprovado.
 *
 * O content-type é text/plain de propósito: assim o navegador trata
 * como requisição simples e não dispara o preflight OPTIONS, que o
 * Apps Script não responde.
 */
export async function enviarRecado(
  mensagem: string,
  autor: string
): Promise<void> {
  if (!apiConfigurada()) {
    throw new Error('Falta configurar NEXT_PUBLIC_RECADOS_API no .env.local');
  }

  const resposta = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ mensagem, autor }),
  });

  if (!resposta.ok) throw new Error('falha no envio');

  const dados = await resposta.json();
  if (!dados?.ok) throw new Error(dados?.erro || 'falha no envio');
}
