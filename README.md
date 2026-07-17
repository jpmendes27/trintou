# Trintou da Jenniffer

Site do aniversário de 30 anos da Jenniffer. Página única, mobile-first, feita pra ser aberta no celular por link de WhatsApp.

## Como funciona

Não existe servidor. São três peças:

| Peça | O que é |
|---|---|
| O site | Next.js 14 com `output: 'export'`. Vira HTML estático e mora em `jpmendes.com/trintou`, igual ao `/fincheck-pro`. |
| O banco | Uma planilha do Google Sheets. Cinco colunas. |
| A API | Um Google Apps Script colado nessa planilha. Grátis, sem deploy, sem chave. |

**A moderação é a própria planilha.** Recado enviado entra como não aprovado. Você abre o app do Sheets no celular, marca a caixinha, ele aparece no site. Sem tela de admin e sem senha porque a senha é a sua conta Google.

---

## Passo a passo (uma vez só, uns 10 minutos)

### 1. Criar a planilha

Vá em [sheets.new](https://sheets.new). Renomeie a aba de baixo para **`recados`** (minúsculo, sem acento).

Na linha 1, preencha exatamente estas cinco colunas:

| A | B | C | D | E |
|---|---|---|---|---|
| id | criado_em | mensagem | autor | aprovado |

Selecione a coluna E inteira e vá em **Inserir → Caixa de seleção**.

### 2. Colar o script

Na planilha, vá em **Extensões → Apps Script**. Apague o que estiver lá e cole todo o conteúdo de `google-apps-script/Codigo.gs`. Salve.

### 3. Publicar a API

No Apps Script, clique em **Implantar → Nova implantação**:

- Tipo: **App da Web**
- Executar como: **Eu**
- Quem tem acesso: **Qualquer pessoa**

Ele vai pedir autorização. Vai aparecer um aviso de "app não verificado", é o seu próprio script. Clique em **Avançado → Acessar (não seguro)** e autorize.

> "Qualquer pessoa" libera só o que o script faz: ler os aprovados e gravar novos como não aprovados. Ninguém consegue ver a planilha nem aprovar nada.

### 4. Pegar a URL

Copie a URL do app da web (termina em `/exec`). Crie o arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_RECADOS_API=https://script.google.com/macros/s/SEU_ID/exec
```

### 5. Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

---

## O convite

Já está em `public/convite.png`, redimensionado pra 1000px de largura. O `public/og.png` é a prévia que aparece no WhatsApp quando alguém manda o link, gerado a partir do mesmo convite.

## Publicar

O repo é `jpmendes27/trintou` e o deploy é automático. Todo push na `main` dispara o workflow em `.github/workflows/deploy.yml`, que builda e publica. O site sai em `jpmendes.com/trintou`.

Pra ligar, uma vez só: **Settings → Pages → Source: GitHub Actions**.

Não configure domínio customizado no repo `trintou`. Ele herda o `jpmendes.com` do site principal sozinho. Setar ali quebra o caminho.

O nome do repo tem que continuar sendo `trintou`, porque é ele que vira o `basePath` no `package.json`. Se renomear o repo, mude o `/trintou` no script `build` junto.

Se quiser buildar local mesmo assim: `npm run build` gera a pasta `out/`.

## Aprovar recados

Abra a planilha (o app do Sheets no celular resolve) e marque a caixinha na coluna **aprovado**. Pronto. Quem atualizar a página vê o recado.

Se algum recado não for legal, é só deixar desmarcado ou apagar a linha.

## Estrutura

```
app/
  layout.tsx      fontes, metadata, og
  page.tsx        moldura + as 6 seções na ordem
  globals.css     todo o visual (moldura, cartões, campos, botões)
components/
  Hero.tsx        1. convite
  GrandeDia.tsx   2. data, local, mapa
  Paleta.tsx      3. venha de marrom
  Piscina.tsx     4. depois das fotos
  Mural.tsx       5. recadinhos (client component)
  Rodape.tsx      6. rodapé
lib/
  recados.ts      leitura e envio
google-apps-script/
  Codigo.gs       cole isso no Apps Script
public/
  convite.png     imagem do convite
  og.png          prévia do WhatsApp
```

## Fidelidade ao mockup

O layout foi conferido contra o `Aniversario Jenni.dc.html` renderizando os dois no mesmo navegador a 390px e comparando elemento por elemento. Todas as alturas batem. Duas diferenças são propositais:

- O botão **Ver no mapa** tem 47px de altura em vez de 39px, pra fechar o alvo mínimo de toque de 44px.
- O reset do Tailwind força `line-height: 1.5` no `html`. O `globals.css` devolve pro `normal`, que é o que o mockup usa. Se você mexer nesse trecho, a página inteira estica.

## Sobre contraste

Os textos que carregam informação usam `#6f5945` e passam com folga (6:1). Os elementos decorativos ficaram como no mockup e são baixos em contraste: rótulos `#b39a72` (2.5:1), apoio itálico `#a08f7a` (2.9:1) e o texto branco no botão dourado (2.4:1). São curtos e o design é teu, então mantive. Se quiser subir sem mudar a cara, dá pra escurecer o `#a08f7a` pra `#8a7561` e o `#b39a72` pra `#9c8158`.
