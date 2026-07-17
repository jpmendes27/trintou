/**
 * API do mural do Trintou da Jenniffer.
 *
 * A planilha é o banco. Este script é a API. Não existe servidor.
 *
 * Colunas esperadas na aba "recados" (linha 1 é o cabeçalho):
 *   A: id  |  B: criado_em  |  C: mensagem  |  D: autor  |  E: aprovado
 *
 * A coluna E é uma caixa de seleção. Marcou, o recado aparece no site.
 */

var ABA = 'recados';
var LIMITE_MENSAGEM = 280;
var LIMITE_AUTOR = 40;

/** GET: devolve só os recados aprovados, do mais novo pro mais antigo. */
function doGet() {
  try {
    var aba = SpreadsheetApp.getActive().getSheetByName(ABA);
    var ultimaLinha = aba.getLastRow();

    if (ultimaLinha < 2) return json({ ok: true, recados: [] });

    var linhas = aba.getRange(2, 1, ultimaLinha - 1, 5).getValues();
    var recados = [];

    for (var i = 0; i < linhas.length; i++) {
      var aprovado = linhas[i][4];
      if (aprovado !== true) continue;

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

    if (mensagem.length < 2 || autor.length < 2) {
      return json({ ok: false, erro: 'Preencha a frase e o seu nome.' });
    }

    lock.waitLock(10000);

    var aba = SpreadsheetApp.getActive().getSheetByName(ABA);
    aba.appendRow([Utilities.getUuid(), new Date(), mensagem, autor, false]);

    // Garante que a célula de aprovação continue sendo uma caixa de seleção.
    aba
      .getRange(aba.getLastRow(), 5)
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
