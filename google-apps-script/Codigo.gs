/**
 * API do mural do Trintou da Jenniffer.
 *
 * A planilha é o banco. Este script é a API. Não existe servidor.
 *
 * Colunas esperadas na aba "recados" (linha 1 é o cabeçalho):
 *   A: id  |  B: criado_em  |  C: mensagem  |  D: autor  |  E: aprovado
 *
 * A coluna E é uma caixa de seleção. Marcou, o recado aparece no site.
 * Você não precisa criar as caixinhas na mão: o script põe uma em cada
 * recado novo. Aliás, é melhor não criar, porque caixinha vazia conta
 * como conteúdo pro Sheets e bagunça a conta de onde termina a lista.
 * Por isso aqui a gente mede a lista pela coluna da mensagem, e não
 * pelo fim da planilha.
 */

var ABA = 'recados';
var COL_MENSAGEM = 3;
var LIMITE_MENSAGEM = 280;
var LIMITE_AUTOR = 40;

/** GET: devolve só os recados aprovados, do mais novo pro mais antigo. */
function doGet() {
  try {
    var aba = SpreadsheetApp.getActive().getSheetByName(ABA);
    if (!aba) return json({ ok: false, erro: 'aba "recados" não encontrada' });

    var ultima = ultimaLinhaDeRecado(aba);
    if (ultima < 2) return json({ ok: true, recados: [] });

    var linhas = aba.getRange(2, 1, ultima - 1, 5).getValues();
    var recados = [];

    for (var i = 0; i < linhas.length; i++) {
      if (linhas[i][4] !== true) continue;
      if (String(linhas[i][2]).trim() === '') continue;

      recados.push({
        id: String(linhas[i][0]),
        mensagem: String(linhas[i][2]),
        autor: String(linhas[i][3]),
      });
    }

    return json({ ok: true, recados: recados.reverse() });
  } catch (erro) {
    return json({ ok: false, erro: 'leitura' });
  }
}

/** POST: grava um recado novo, sempre como não aprovado. */
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    var corpo = JSON.parse(e.postData.contents);

    var mensagem = limpar(corpo.mensagem, LIMITE_MENSAGEM);
    var autor = limpar(corpo.autor, LIMITE_AUTOR);

    if (mensagem.length < 2) {
      return json({ ok: false, erro: 'Escreva sua frase antes de enviar.' });
    }
    if (autor.length < 2) autor = 'Anônimo';

    lock.waitLock(10000);

    var aba = SpreadsheetApp.getActive().getSheetByName(ABA);
    if (!aba) return json({ ok: false, erro: 'aba "recados" não encontrada' });

    var linha = ultimaLinhaDeRecado(aba) + 1;
    if (linha < 2) linha = 2;

    aba
      .getRange(linha, 1, 1, 5)
      .setValues([[Utilities.getUuid(), new Date(), mensagem, autor, false]]);

    // A caixinha de aprovação nasce junto com o recado.
    aba
      .getRange(linha, 5)
      .setDataValidation(
        SpreadsheetApp.newDataValidation().requireCheckbox().build()
      );

    return json({ ok: true });
  } catch (erro) {
    return json({ ok: false, erro: 'envio' });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignorado) {}
  }
}

/**
 * Onde a lista de recados realmente termina, olhando a coluna da
 * mensagem. Ignora caixinhas vazias e qualquer sujeira nas outras
 * colunas. Devolve 1 quando só existe o cabeçalho.
 */
function ultimaLinhaDeRecado(aba) {
  var total = aba.getMaxRows();
  if (total < 2) return 1;

  var col = aba.getRange(2, COL_MENSAGEM, total - 1, 1).getValues();

  for (var i = col.length - 1; i >= 0; i--) {
    if (String(col[i][0]).trim() !== '') return i + 2;
  }

  return 1;
}

/** Corta espaços sobrando, tira tags e limita o tamanho. */
function limpar(valor, limite) {
  return String(valor == null ? '' : valor)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, limite);
}

function json(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON
  );
}
