/* ==========================================================================
   CONTEÚDO EDITÁVEL DO PORTFÓLIO
   Troque os valores abaixo pelos seus dados reais. Não é preciso mexer em
   mais nenhum arquivo para atualizar contatos, vídeos e projetos.
   ========================================================================== */

window.PORTFOLIO = {
  /* ---- Contatos --------------------------------------------------------- */
  contato: {
    whatsapp: "5511999999999",              // só números: 55 + DDD + número
    whatsappExibicao: "(11) 99999-9999",    // como aparece na tela
    whatsappMensagem: "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.",
    email: "anajulia@exemplo.com",
    instagram: "seu_perfil",                // sem o @
    linkedin: "https://www.linkedin.com/in/seu-perfil",
    behance: "https://www.behance.net/seu-perfil", // ou o link de uma pasta do Drive
    curriculo: "assets/curriculo-ana-julia.pdf",

    // Opcional: endereço de um serviço de formulário (ex.: https://formspree.io/f/xxxx).
    // Vazio = o botão "Enviar" abre o aplicativo de e-mail com a mensagem pronta.
    formEndpoint: "",
  },

  /* ---- Vídeos ------------------------------------------------------------ */
  hero: {
    // Vídeo curto em loop no topo (MP4 leve, sem áudio, até ~5 MB).
    // Ex.: "assets/video/hero.mp4". Vazio = usa a imagem assets/img/hero.svg.
    video: "",
  },

  showreel: {
    // Link do YouTube, do Vimeo ou caminho de um MP4.
    url: "",
  },

  /* ---- Projetos -----------------------------------------------------------
     categoria: "video" | "stories" | "foto"
     midia.tipo: "video"   → url (YouTube, Vimeo ou MP4), capa e proporcao ("16:9" ou "9:16")
                 "galeria" → lista de imagens
     Os projetos abaixo são exemplos: substitua textos, números e arquivos.
     ------------------------------------------------------------------------ */
  projetos: [
    {
      id: "cafe-aurora",
      cliente: "Café Aurora",
      titulo: "Lançamento da linha de inverno",
      categoria: "video",
      formato: "Reels · 9:16",
      ano: "2025",
      capa: "assets/img/projetos/01-capa.svg",
      resumo: "Série de Reels para apresentar três novos sabores sem cara de anúncio.",
      desafio: "Apresentar a nova linha em vídeos de até 30 segundos, com linguagem leve e cara de conteúdo, não de propaganda.",
      resultado: "Três Reels com estética de bastidor e ritmo de trend. O principal se tornou o vídeo mais visto do perfil na temporada.",
      metricas: [
        { valor: "+180 mil", rotulo: "visualizações orgânicas" },
        { valor: "+32%", rotulo: "visitas ao perfil" },
        { valor: "3", rotulo: "Reels entregues" },
      ],
      midia: { tipo: "video", url: "", capa: "assets/img/projetos/01-video.svg", proporcao: "9:16" },
    },
    {
      id: "clinica-vertice",
      cliente: "Clínica Vértice",
      titulo: "Institucional: o lado humano da clínica",
      categoria: "video",
      formato: "Institucional · 16:9",
      ano: "2025",
      capa: "assets/img/projetos/02-capa.svg",
      resumo: "Vídeo institucional com depoimentos reais da equipe e de pacientes.",
      desafio: "Mostrar o lado humano de uma clínica que comunicava apenas estrutura e tecnologia.",
      resultado: "Filme de 90 segundos com depoimentos reais, usado no site, nas recepções e em campanhas de captação.",
      metricas: [
        { valor: "1min30", rotulo: "duração final" },
        { valor: "5", rotulo: "cortes para redes" },
        { valor: "2", rotulo: "diárias de captação" },
      ],
      midia: { tipo: "video", url: "", capa: "assets/img/projetos/02-video.svg", proporcao: "16:9" },
    },
    {
      id: "feira-pulsar",
      cliente: "Feira Pulsar",
      titulo: "Aftermovie da edição 2025",
      categoria: "video",
      formato: "Evento · 16:9",
      ano: "2025",
      capa: "assets/img/projetos/03-capa.svg",
      resumo: "Cobertura completa do evento e aftermovie entregue em 48 horas.",
      desafio: "Registrar dois dias de evento e entregar um resumo enquanto o assunto ainda estava quente.",
      resultado: "Aftermovie publicado 48 horas depois do encerramento e usado na pré-venda da edição seguinte.",
      metricas: [
        { valor: "48h", rotulo: "prazo de entrega" },
        { valor: "+95 mil", rotulo: "visualizações" },
        { valor: "12", rotulo: "cortes para patrocinadores" },
      ],
      midia: { tipo: "video", url: "", capa: "assets/img/projetos/03-video.svg", proporcao: "16:9" },
    },
    {
      id: "bela-massa",
      cliente: "Bela Massa",
      titulo: "Inauguração em tempo real",
      categoria: "stories",
      formato: "Stories · Cobertura",
      ano: "2025",
      capa: "assets/img/projetos/04-capa.svg",
      resumo: "Cobertura em stories da abertura da nova unidade, do bastidor à fila na porta.",
      desafio: "Fazer a inauguração chegar a quem não estava lá e levar movimento para a primeira semana.",
      resultado: "Sequência de 24 stories com enquetes e link de reserva, publicada ao longo do dia.",
      metricas: [
        { valor: "24", rotulo: "stories no dia" },
        { valor: "+41%", rotulo: "alcance do perfil" },
        { valor: "310", rotulo: "cliques no link de reserva" },
      ],
      midia: {
        tipo: "galeria",
        imagens: [
          "assets/img/projetos/04-story-1.svg",
          "assets/img/projetos/04-story-2.svg",
          "assets/img/projetos/04-story-3.svg",
          "assets/img/projetos/04-story-4.svg",
        ],
      },
    },
    {
      id: "studio-lume",
      cliente: "Studio Lume",
      titulo: "Série semanal de bastidores",
      categoria: "stories",
      formato: "Stories · Série",
      ano: "2024",
      capa: "assets/img/projetos/05-capa.svg",
      resumo: "Quadro fixo de bastidores que virou o conteúdo mais esperado da semana.",
      desafio: "Manter o perfil ativo entre um lançamento e outro, sem depender de mídia paga.",
      resultado: "Quadro semanal com identidade própria, roteiro enxuto e captação em um único turno por mês.",
      metricas: [
        { valor: "16", rotulo: "episódios publicados" },
        { valor: "78%", rotulo: "taxa de conclusão" },
        { valor: "1", rotulo: "turno de captação por mês" },
      ],
      midia: {
        tipo: "galeria",
        imagens: [
          "assets/img/projetos/05-story-1.svg",
          "assets/img/projetos/05-story-2.svg",
          "assets/img/projetos/05-story-3.svg",
          "assets/img/projetos/05-story-4.svg",
        ],
      },
    },
    {
      id: "nuvem-moda",
      cliente: "Nuvem Moda",
      titulo: "Coleção cápsula em sequência interativa",
      categoria: "stories",
      formato: "Stories · Lançamento",
      ano: "2024",
      capa: "assets/img/projetos/06-capa.svg",
      resumo: "Lançamento de coleção com teasers, enquetes e contagem regressiva.",
      desafio: "Gerar expectativa para uma coleção pequena, com estoque limitado e sem verba de anúncio.",
      resultado: "Uma semana de teasers, enquetes e contagem regressiva. As peças principais esgotaram nos primeiros dias.",
      metricas: [
        { valor: "7", rotulo: "dias de campanha" },
        { valor: "+2,3 mil", rotulo: "respostas em enquetes" },
        { valor: "3", rotulo: "dias para esgotar as peças-chave" },
      ],
      midia: {
        tipo: "galeria",
        imagens: [
          "assets/img/projetos/06-story-1.svg",
          "assets/img/projetos/06-story-2.svg",
          "assets/img/projetos/06-story-3.svg",
          "assets/img/projetos/06-story-4.svg",
        ],
      },
    },
    {
      id: "oliva-cosmeticos",
      cliente: "Oliva Cosméticos",
      titulo: "Still de produto para e-commerce",
      categoria: "foto",
      formato: "Produto · Still",
      ano: "2025",
      capa: "assets/img/projetos/07-capa.svg",
      resumo: "Fotos de produto com direção de arte para site, anúncios e embalagens.",
      desafio: "Padronizar a imagem de 18 produtos que tinham fotos de fontes e estilos diferentes.",
      resultado: "Banco com 60 imagens em um só padrão de luz e cor, pronto para site, marketplace e anúncios.",
      metricas: [
        { valor: "18", rotulo: "produtos fotografados" },
        { valor: "60", rotulo: "imagens finais" },
        { valor: "1", rotulo: "diária de estúdio" },
      ],
      midia: {
        tipo: "galeria",
        imagens: [
          "assets/img/projetos/07-foto-1.svg",
          "assets/img/projetos/07-foto-2.svg",
          "assets/img/projetos/07-foto-3.svg",
          "assets/img/projetos/07-foto-4.svg",
        ],
      },
    },
    {
      id: "casa-trama",
      cliente: "Casa Trama",
      titulo: "Editorial lifestyle de outono",
      categoria: "foto",
      formato: "Lifestyle · Editorial",
      ano: "2024",
      capa: "assets/img/projetos/08-capa.svg",
      resumo: "Ensaio lifestyle em locação para a campanha de outono.",
      desafio: "Mostrar as peças em uso, em situações reais, fugindo do catálogo tradicional.",
      resultado: "Ensaio em locação com luz natural, entregue em versões para feed, site e mídia impressa.",
      metricas: [
        { valor: "42", rotulo: "fotos tratadas" },
        { valor: "3", rotulo: "formatos de entrega" },
        { valor: "1", rotulo: "locação" },
      ],
      midia: {
        tipo: "galeria",
        imagens: [
          "assets/img/projetos/08-foto-1.svg",
          "assets/img/projetos/08-foto-2.svg",
          "assets/img/projetos/08-foto-3.svg",
          "assets/img/projetos/08-foto-4.svg",
        ],
      },
    },
    {
      id: "grupo-norte",
      cliente: "Grupo Norte",
      titulo: "Retratos corporativos da equipe",
      categoria: "foto",
      formato: "Retratos · Corporativo",
      ano: "2024",
      capa: "assets/img/projetos/09-capa.svg",
      resumo: "Retratos da liderança e da equipe para site, LinkedIn e imprensa.",
      desafio: "Atualizar a imagem institucional com retratos naturais, feitos sem parar a rotina do escritório.",
      resultado: "Estúdio montado na própria empresa e 35 pessoas fotografadas em uma manhã.",
      metricas: [
        { valor: "35", rotulo: "retratos" },
        { valor: "1", rotulo: "manhã de sessão" },
        { valor: "5", rotulo: "dias para a entrega" },
      ],
      midia: {
        tipo: "galeria",
        imagens: [
          "assets/img/projetos/09-foto-1.svg",
          "assets/img/projetos/09-foto-2.svg",
          "assets/img/projetos/09-foto-3.svg",
          "assets/img/projetos/09-foto-4.svg",
        ],
      },
    },
  ],
};
