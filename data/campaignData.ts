export type KitLevel = {
  id: 'torcedor' | 'premium';
  title: string;
  rule: string;
  benefit: string;
  items: string[];
  availability: string;
  tag: string;
  accent: string;
  image: string;
  imageAlt: string;
};

export type ChampionCountry = {
  id: string;
  name: string;
  flagImage: string;
  stars: number;
  championYears: number[];
  finals: Array<{
    year: number;
    match: string;
    location: string;
    detail: string;
  }>;
};

export type RestaurantUnit = {
  id: string;
  name: string;
  address: string;
  routeUrl: string;
};

export type RuleItem = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const campaignData = {
  restaurantName: 'Verace Cantina, Empório e Pizzaria',
  headline: 'A Copa do Mundo com Sabor da It\u00e1lia na Verace.',
  subheadline:
    'Colecione a gl\u00f3ria dos 5 maiores campe\u00f5es mundiais. Kits exclusivos com descontos especiais para quem vive a paix\u00e3o pelo futebol e pela gastronomia.',
  kitsSectionId: 'kits',
  promoEndDate: '2026-07-19T23:59:59-03:00',
  scarcity: {
    totalKits: 100,
    torcedor: 50,
    premium: 50,
    soldKits: 68,
    message:
      'S\u00e3o apenas 100 kits no total (50 Torcedor / 50 Premium). V\u00e1lido enquanto durarem os estoques.',
  },
  whatsappUrl: 'https://wa.me/5511999999999?text=Quero%20reservar%20na%20Verace',
  imageShowcase: [
    {
      src: '/images/campaign/kit-cerveja.png?v=3',
      alt: 'Kit Torcedor Verace com duas cervejas, taça e abridor',
    },
    {
      src: '/images/campaign/kit-vinho.png?v=3',
      alt: 'Kit Premium Verace com vinho, taças e saca-rolhas',
    },
    {
      src: '/images/campaign/tacas-cerveja-copa.png',
      alt: 'Taças colecionáveis Verace edição países campeões',
    },
    {
      src: '/images/campaign/tacas-vinho-copa.png',
      alt: 'Taças de vinho Verace edição Copa do Mundo',
    },
  ],
  units: [
    {
      id: 'cantina',
      name: 'Verace Cantina',
      address: 'Jundia\u00ed - SP',
      routeUrl: 'https://maps.google.com/?q=Verace+Cantina+Jundiai+SP',
    },
    {
      id: 'emporio',
      name: 'Verace Emp\u00f3rio',
      address: 'Jundia\u00ed - SP',
      routeUrl: 'https://maps.google.com/?q=Verace+Emporio+Jundiai+SP',
    },
    {
      id: 'pizzaria',
      name: 'Verace Pizzaria',
      address: 'Jundia\u00ed - SP',
      routeUrl: 'https://maps.google.com/?q=Verace+Pizzaria+Jundiai+SP',
    },
  ],
};

export const campaignRules: RuleItem[] = [
  {
    id: 'consumo-minimo',
    title: '1. Faixa de consumo',
    description:
      'Para ativar o Kit Torcedor, o consumo m\u00ednimo \u00e9 de R$ 300,00. Para ativar o Kit Premium, o consumo m\u00ednimo \u00e9 de R$ 500,00.',
  },
  {
    id: 'escolha-pais',
    title: '2. Escolha do pa\u00eds',
    description:
      'O cliente escolhe o pa\u00eds campe\u00e3o desejado (Brasil, Alemanha, It\u00e1lia, Argentina ou Fran\u00e7a), sujeito \u00e0 disponibilidade de estoque.',
  },
  {
    id: 'estoque-limitado',
    title: '3. Estoque limitado',
    description:
      'A promo\u00e7\u00e3o contempla 100 kits no total: 50 unidades do Kit Torcedor e 50 unidades do Kit Premium.',
  },
  {
    id: 'validade',
    title: '4. Validade da promo\u00e7\u00e3o',
    description:
      'A promo\u00e7\u00e3o \u00e9 v\u00e1lida at\u00e9 o dia da final da Copa do Mundo (19/07/2026) ou at\u00e9 o encerramento antecipado por esgotamento de kits.',
  },
];

export const campaignFaq: FaqItem[] = [
  {
    id: 'acumula',
    question: 'Posso acumular mais de um kit na mesma mesa?',
    answer:
      'Sim, desde que o valor total de consumo atinja os patamares necess\u00e1rios para cada kit e exista disponibilidade no momento do fechamento.',
  },
  {
    id: 'misturar-kits',
    question: 'Posso pegar Kit Torcedor e Kit Premium no mesmo atendimento?',
    answer:
      'Pode. Se o consumo atender aos dois n\u00edveis, voc\u00ea pode combinar os kits respeitando o limite de estoque de cada categoria.',
  },
  {
    id: 'reserva-kit',
    question: 'Consigo reservar um kit para retirar depois?',
    answer:
      'N\u00e3o. A libera\u00e7\u00e3o do kit acontece no ato do atendimento para garantir isonomia da promo\u00e7\u00e3o e controle de disponibilidade.',
  },
  {
    id: 'qual-unidade',
    question: 'A promo\u00e7\u00e3o vale em todas as unidades?',
    answer:
      'Sim, nas tr\u00eas unidades participantes da Verace Cantina Italiana, conforme disponibilidade local de cada pa\u00eds e categoria de kit.',
  },
];

export const kitLevels: KitLevel[] = [
  {
    id: 'torcedor',
    title: 'N\u00edvel 1: Kit Torcedor (Cerveja)',
    rule: 'Consuma acima de R$ 300,00.',
    benefit: 'Ganhe 50% de desconto no Kit Torcedor.',
    items: [
      'Caixa personalizada',
      '2 cervejas (do pa\u00eds ou representativa)',
      '1 ta\u00e7a exclusiva',
      '1 abridor',
    ],
    availability: 'Apenas 50 unidades',
    tag: 'Para colecionar',
    accent: '#7C1D2C',
    image: '/images/campaign/kit-cerveja.png?v=3',
    imageAlt: 'Foto do Kit Torcedor da Verace',
  },
  {
    id: 'premium',
    title: 'N\u00edvel 2: Kit Premium (Vinho)',
    rule: 'Consuma acima de R$ 500,00.',
    benefit: 'Leve o Kit Premium de R$ 200,00 por apenas R$ 100,00.',
    items: ['1 vinho selecionado', '2 ta\u00e7as do pa\u00eds escolhido'],
    availability: 'Apenas 50 unidades (Edi\u00e7\u00e3o Limitada)',
    tag: 'Edi\u00e7\u00e3o exclusiva',
    accent: '#A3853F',
    image: '/images/campaign/kit-vinho.png?v=3',
    imageAlt: 'Foto do Kit Premium da Verace',
  },
];

export const championCountries: ChampionCountry[] = [
  {
    id: 'brasil',
    name: 'Brasil',
    flagImage: 'https://flagcdn.com/w320/br.png',
    stars: 5,
    championYears: [1958, 1962, 1970, 1994, 2002],
    finals: [
      {
        year: 1958,
        match: 'Brasil 5 x 2 Su\u00e9cia',
        location: 'Estocolmo, Su\u00e9cia',
        detail: 'Primeiro t\u00edtulo mundial do Brasil, com atua\u00e7\u00e3o hist\u00f3rica de Pel\u00e9.',
      },
      {
        year: 1962,
        match: 'Brasil 3 x 1 Tchecoslov\u00e1quia',
        location: 'Santiago, Chile',
        detail: 'Bicampeonato brasileiro em campanha de muita consist\u00eancia coletiva.',
      },
      {
        year: 1970,
        match: 'Brasil 4 x 1 It\u00e1lia',
        location: 'Cidade do M\u00e9xico, M\u00e9xico',
        detail: 'Time de 1970 \u00e9 lembrado como um dos maiores da hist\u00f3ria das Copas.',
      },
      {
        year: 1994,
        match: 'Brasil 0 x 0 It\u00e1lia (3-2 p\u00eanaltis)',
        location: 'Pasadena, EUA',
        detail: 'Tetra conquistado nos p\u00eanaltis em uma final tensa e equilibrada.',
      },
      {
        year: 2002,
        match: 'Brasil 2 x 0 Alemanha',
        location: 'Yokohama, Jap\u00e3o',
        detail: 'Penta com dois gols de Ronaldo na final.',
      },
    ],
  },
  {
    id: 'alemanha',
    name: 'Alemanha',
    flagImage: 'https://flagcdn.com/w320/de.png',
    stars: 4,
    championYears: [1954, 1974, 1990, 2014],
    finals: [
      {
        year: 1954,
        match: 'Alemanha Ocidental 3 x 2 Hungria',
        location: 'Berna, Su\u00ed\u00e7a',
        detail: 'A final ficou conhecida como o \"Milagre de Berna\".',
      },
      {
        year: 1974,
        match: 'Alemanha Ocidental 2 x 1 Holanda',
        location: 'Munique, Alemanha',
        detail: 'Virada em casa contra a sele\u00e7\u00e3o de futebol total da Holanda.',
      },
      {
        year: 1990,
        match: 'Alemanha Ocidental 1 x 0 Argentina',
        location: 'Roma, It\u00e1lia',
        detail: 'Terceiro t\u00edtulo com gol decisivo no fim da partida.',
      },
      {
        year: 2014,
        match: 'Alemanha 1 x 0 Argentina (prorroga\u00e7\u00e3o)',
        location: 'Rio de Janeiro, Brasil',
        detail: 'T\u00edtulo definido com gol de G\u00f6tze na prorroga\u00e7\u00e3o.',
      },
    ],
  },
  {
    id: 'italia',
    name: 'It\u00e1lia',
    flagImage: 'https://flagcdn.com/w320/it.png',
    stars: 4,
    championYears: [1934, 1938, 1982, 2006],
    finals: [
      {
        year: 1934,
        match: 'It\u00e1lia 2 x 1 Tchecoslov\u00e1quia (prorroga\u00e7\u00e3o)',
        location: 'Roma, It\u00e1lia',
        detail: 'Primeiro t\u00edtulo italiano, conquistado em casa.',
      },
      {
        year: 1938,
        match: 'It\u00e1lia 4 x 2 Hungria',
        location: 'Paris, Fran\u00e7a',
        detail: 'Bicampeonato consecutivo em campanha dominante.',
      },
      {
        year: 1982,
        match: 'It\u00e1lia 3 x 1 Alemanha Ocidental',
        location: 'Madri, Espanha',
        detail: 'Time liderado por Paolo Rossi em uma Copa memor\u00e1vel.',
      },
      {
        year: 2006,
        match: 'It\u00e1lia 1 x 1 Fran\u00e7a (5-3 p\u00eanaltis)',
        location: 'Berlim, Alemanha',
        detail: 'Tetra italiano decidido nos p\u00eanaltis.',
      },
    ],
  },
  {
    id: 'argentina',
    name: 'Argentina',
    flagImage: 'https://flagcdn.com/w320/ar.png',
    stars: 3,
    championYears: [1978, 1986, 2022],
    finals: [
      {
        year: 1978,
        match: 'Argentina 3 x 1 Holanda (prorroga\u00e7\u00e3o)',
        location: 'Buenos Aires, Argentina',
        detail: 'Primeiro t\u00edtulo argentino, com final vencida na prorroga\u00e7\u00e3o.',
      },
      {
        year: 1986,
        match: 'Argentina 3 x 2 Alemanha Ocidental',
        location: 'Cidade do M\u00e9xico, M\u00e9xico',
        detail: 'Bicampeonato na Copa marcada por atua\u00e7\u00f5es hist\u00f3ricas de Maradona.',
      },
      {
        year: 2022,
        match: 'Argentina 3 x 3 Fran\u00e7a (4-2 p\u00eanaltis)',
        location: 'Lusail, Catar',
        detail: 'Final eletrizante decidida nos p\u00eanaltis, com terceiro t\u00edtulo argentino.',
      },
    ],
  },
  {
    id: 'franca',
    name: 'Fran\u00e7a',
    flagImage: 'https://flagcdn.com/w320/fr.png',
    stars: 2,
    championYears: [1998, 2018],
    finals: [
      {
        year: 1998,
        match: 'Fran\u00e7a 3 x 0 Brasil',
        location: 'Saint-Denis, Fran\u00e7a',
        detail: 'Primeiro t\u00edtulo franc\u00eas, conquistado em casa.',
      },
      {
        year: 2018,
        match: 'Fran\u00e7a 4 x 2 Cro\u00e1cia',
        location: 'Moscou, R\u00fassia',
        detail: 'Segundo t\u00edtulo com uma sele\u00e7\u00e3o jovem e muito intensa.',
      },
    ],
  },
];
