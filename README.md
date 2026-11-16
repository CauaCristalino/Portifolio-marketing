# Portfólio — Ana Julia

Site de portfólio em página única para **videomaker, storymaker e fotografia**. Feito em HTML, CSS e JavaScript puros: não precisa instalar nada nem rodar build. Basta abrir o `index.html` no navegador ou publicar a pasta.

## Estrutura

```
index.html              página do portfólio
guia-de-estilo.html     cores, tipografia e componentes (documentação visual)
css/
  tokens.css            cores, fontes, espaçamentos e animações (identidade)
  base.css              reset, layout e utilitários
  components.css        componentes reutilizáveis (botão, cartão, modal, player…)
  sections.css          layout de cada seção
js/
  config.js             ← TODO O CONTEÚDO EDITÁVEL: contatos, vídeos e projetos
  main.js               interações (menu, filtros, modal, formulário, animações)
assets/
  img/                  imagens (as atuais são exemplos)
  curriculo-ana-julia.pdf
  favicon.svg
```

## O que trocar antes de enviar

Tudo o que está no site hoje é **conteúdo de exemplo**. Lista do que personalizar:

| O quê | Onde |
| --- | --- |
| WhatsApp, e-mail, Instagram, LinkedIn, Behance/Drive | `js/config.js` → `contato` |
| Projetos (textos, números, capas, vídeos, galerias) | `js/config.js` → `projetos` |
| Link do showreel (YouTube, Vimeo ou MP4) | `js/config.js` → `showreel.url` |
| Vídeo em loop do topo (opcional) | `js/config.js` → `hero.video` |
| Texto do "Sobre mim" e números de destaque | `index.html`, seção `id="sobre"` |
| Sua foto | substitua `assets/img/retrato.svg` (proporção 4:5) e ajuste o `src` no `index.html` |
| Imagem de fundo do topo | substitua `assets/img/hero.svg` (16:9, até ~300 KB) |
| Capa do showreel | substitua `assets/img/showreel-capa.svg` (16:9) |
| Logos das marcas e depoimentos | `index.html`, seção `id="clientes"` |
| Currículo | substitua `assets/curriculo-ana-julia.pdf` |
| Título "Fotógrafo" (se preferir "Fotógrafa") | `index.html`: `<title>`, hero e rodapé |

### Projetos

Cada projeto em `js/config.js` segue este formato:

```js
{
  id: "cafe-aurora",                 // identificador único, sem espaços
  cliente: "Café Aurora",
  titulo: "Lançamento da linha de inverno",
  categoria: "video",                // "video" | "stories" | "foto"
  formato: "Reels · 9:16",           // etiqueta no canto do cartão
  ano: "2025",
  capa: "assets/img/projetos/01-capa.jpg",   // 4:5, ex.: 1200 × 1500 px
  resumo: "Uma linha que aparece no cartão.",
  desafio: "O que a marca precisava.",
  resultado: "O que foi entregue e o que mudou.",
  metricas: [{ valor: "+180 mil", rotulo: "visualizações orgânicas" }],

  // Vídeo:
  midia: { tipo: "video", url: "https://youtu.be/…", capa: "…/01-video.jpg", proporcao: "9:16" },
  // ou galeria (stories e fotografia):
  // midia: { tipo: "galeria", imagens: ["…/foto-1.jpg", "…/foto-2.jpg"] },
}
```

Os filtros e os contadores se ajustam sozinhos à lista.

### Imagens e vídeos

- Exporte fotos em **JPG ou WebP**, com no máximo 1600 px no maior lado e cerca de 200 KB cada.
- Vídeos dos projetos e o showreel só carregam quando a pessoa aperta o play. Prefira hospedar no YouTube ou Vimeo e colar o link.
- O vídeo de fundo do topo deve ser curto (5 a 10 s), sem áudio e leve (até ~5 MB). Ele não toca para quem ativou "reduzir movimento" ou economia de dados.

### Formulário de contato

Por padrão, o botão **Enviar mensagem** abre o aplicativo de e-mail de quem está visitando, com a mensagem já preenchida. Para receber as mensagens direto na sua caixa de entrada, crie um formulário em um serviço como o Formspree e cole o endereço em `js/config.js` → `contato.formEndpoint`.

## Identidade visual

| Elemento | Definição |
| --- | --- |
| Fundo | `#0D0D0D` |
| Texto | `#F5F2EC` (branco quente) · apoio `#B3AFA7` |
| Destaque | `#FF4D2E` — o "REC" da câmera, usado em ações e detalhes |
| Títulos | Sora 700/800 |
| Texto | Inter 400–600 |
| Rótulos | JetBrains Mono, caixa alta (timecode, metadados) |
| Assinatura | cantos de visor de câmera, ponto de REC e timecode |

Todos os valores estão em `css/tokens.css`. Para ver cores, tipografia e componentes lado a lado, abra `guia-de-estilo.html`.

## Acessibilidade e desempenho

- Contraste AA em todos os textos; texto escuro sobre o laranja (6,3:1).
- Navegação completa por teclado, link "Pular para o conteúdo" e foco visível.
- Respeita a preferência "reduzir movimento" do sistema.
- Sem bibliotecas: cerca de 30 KB de CSS e JS, imagens com carregamento sob demanda.

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**, selecione o branch com o site e a pasta `/ (root)`.
3. Depois de publicar, troque no `index.html` o valor de `og:image` pelo endereço completo da imagem (`https://SEU-ENDERECO/assets/img/og.jpg`) para que a prévia apareça ao enviar o link no WhatsApp e no LinkedIn.
