export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  totalLessons: number;
  totalDuration: string;
  progress: number;
  modules: Module[];
  tags: string[];
}

export const courses: Course[] = [
  {
    id: "tiktok-growth",
    title: "TikTok Growth Mastery",
    description:
      "Aprenda as estratégias mais avançadas para crescer no TikTok. Do zero aos seus primeiros 100k seguidores com técnicas comprovadas.",
    thumbnail: "/images/courses/tiktok-growth.jpg",
    instructor: "Lucas Silva",
    instructorAvatar: "/images/users/1.jpg",
    category: "Marketing Digital",
    totalLessons: 12,
    totalDuration: "4h 30min",
    progress: 0,
    tags: ["TikTok", "Growth", "Marketing"],
    modules: [
      {
        id: "mod-1",
        title: "Fundamentos do TikTok",
        lessons: [
          {
            id: "les-1",
            title: "Como o Algoritmo do TikTok Funciona",
            duration: "15:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Entenda por completo como o algoritmo do TikTok decide quais vídeos mostrar e como usá-lo a seu favor.",
          },
          {
            id: "les-2",
            title: "Configurando seu Perfil para Converter",
            duration: "12:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Aprenda a criar um perfil que converte visitantes em seguidores fiéis.",
          },
          {
            id: "les-3",
            title: "Nichos Mais Lucrativos em 2025",
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Descubra quais nichos estão gerando mais resultados e como se posicionar.",
          },
        ],
      },
      {
        id: "mod-2",
        title: "Criação de Conteúdo Viral",
        lessons: [
          {
            id: "les-4",
            title: "Estrutura de Vídeo que Viraliza",
            duration: "22:10",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "A fórmula exata para criar vídeos que prendem a atenção e viralizam.",
          },
          {
            id: "les-5",
            title: "Hooks que Fazem o Viewer Parar de Scrollar",
            duration: "16:55",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Os melhores hooks testados que garantem retenção nos primeiros 3 segundos.",
          },
          {
            id: "les-6",
            title: "Edição Profissional pelo Celular",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Domine as ferramentas de edição para criar conteúdo profissional direto do celular.",
          },
        ],
      },
      {
        id: "mod-3",
        title: "Monetização Avançada",
        lessons: [
          {
            id: "les-7",
            title: "TikTok Creator Fund e Rewards",
            duration: "20:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como maximizar seus ganhos com o programa de recompensas do TikTok.",
          },
          {
            id: "les-8",
            title: "Lives e Presentes: Estratégia Completa",
            duration: "18:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Transforme suas lives em uma máquina de receita com presentes e engajamento.",
          },
          {
            id: "les-9",
            title: "Parcerias com Marcas",
            duration: "15:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como fechar parcerias lucrativas com marcas mesmo com poucos seguidores.",
          },
        ],
      },
      {
        id: "mod-4",
        title: "Escalando seus Resultados",
        lessons: [
          {
            id: "les-10",
            title: "TikTok Ads para Criadores",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Use anúncios pagos para escalar seu alcance e aumentar seguidores qualificados.",
          },
          {
            id: "les-11",
            title: "Automação e Ferramentas",
            duration: "14:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Ferramentas essenciais para automatizar sua rotina e produzir mais em menos tempo.",
          },
          {
            id: "les-12",
            title: "Plano de Ação 30 Dias",
            duration: "28:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Seu plano completo para os próximos 30 dias. Passo a passo para implementar tudo.",
          },
        ],
      },
    ],
  },
  {
    id: "content-creator",
    title: "Content Creator Pro",
    description:
      "Torne-se um criador de conteúdo profissional. Aprenda filmagem, edição, storytelling e muito mais.",
    thumbnail: "/images/courses/content-creator.jpg",
    instructor: "Ana Costa",
    instructorAvatar: "/images/users/2.jpg",
    category: "Criação de Conteúdo",
    totalLessons: 10,
    totalDuration: "3h 45min",
    progress: 45,
    tags: ["Conteúdo", "Edição", "Storytelling"],
    modules: [
      {
        id: "cc-mod-1",
        title: "Storytelling Visual",
        lessons: [
          {
            id: "cc-les-1",
            title: "A Arte de Contar Histórias em 60 Segundos",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Aprenda a estruturar narrativas envolventes para vídeos curtos.",
          },
          {
            id: "cc-les-2",
            title: "Enquadramento e Composição",
            duration: "18:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Técnicas de enquadramento que fazem seu vídeo parecer profissional.",
          },
          {
            id: "cc-les-3",
            title: "Iluminação com Equipamento Simples",
            duration: "15:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Crie iluminação profissional gastando pouco.",
          },
        ],
      },
      {
        id: "cc-mod-2",
        title: "Edição Avançada",
        lessons: [
          {
            id: "cc-les-4",
            title: "CapCut: Do Básico ao Avançado",
            duration: "30:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Domine o CapCut e crie edições que se destacam no feed.",
          },
          {
            id: "cc-les-5",
            title: "Transições Virais",
            duration: "22:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "As transições mais usadas pelos criadores top do TikTok.",
          },
          {
            id: "cc-les-6",
            title: "Efeitos Sonoros e Música",
            duration: "16:40",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como usar áudio para aumentar o impacto dos seus vídeos.",
          },
        ],
      },
      {
        id: "cc-mod-3",
        title: "Planejamento de Conteúdo",
        lessons: [
          {
            id: "cc-les-7",
            title: "Calendário Editorial para Criadores",
            duration: "14:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Organize seu conteúdo para nunca ficar sem ideias.",
          },
          {
            id: "cc-les-8",
            title: "Trends: Como Identificar e Surfar",
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Saiba identificar trends antes de todo mundo e usá-las a seu favor.",
          },
          {
            id: "cc-les-9",
            title: "Batch Creating: Produza 30 Vídeos em 1 Dia",
            duration: "21:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "O método para criar conteúdo em massa sem perder qualidade.",
          },
          {
            id: "cc-les-10",
            title: "Análise de Métricas e Otimização",
            duration: "17:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Entenda suas métricas e use dados para melhorar continuamente.",
          },
        ],
      },
    ],
  },
  {
    id: "monetizacao-digital",
    title: "Monetização Digital Completa",
    description:
      "Transforme sua audiência em receita. Afiliados, produtos digitais, mentorias e mais.",
    thumbnail: "/images/courses/monetizacao.jpg",
    instructor: "Pedro Mendes",
    instructorAvatar: "/images/users/3.jpg",
    category: "Negócios",
    totalLessons: 8,
    totalDuration: "3h 00min",
    progress: 0,
    tags: ["Monetização", "Afiliados", "Infoprodutos"],
    modules: [
      {
        id: "mn-mod-1",
        title: "Fundamentos da Monetização",
        lessons: [
          {
            id: "mn-les-1",
            title: "Os 7 Pilares da Monetização Online",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Conheça todas as formas de ganhar dinheiro na internet e escolha a melhor para você.",
          },
          {
            id: "mn-les-2",
            title: "Marketing de Afiliados na Prática",
            duration: "22:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Passo a passo para começar a vender como afiliado usando o TikTok.",
          },
        ],
      },
      {
        id: "mn-mod-2",
        title: "Criando seu Produto Digital",
        lessons: [
          {
            id: "mn-les-3",
            title: "Do Conhecimento ao Produto",
            duration: "28:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como transformar o que você sabe em um produto digital lucrativo.",
          },
          {
            id: "mn-les-4",
            title: "Plataformas de Venda: Hotmart, Kiwify e mais",
            duration: "18:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Compare as melhores plataformas e escolha a ideal para seu produto.",
          },
          {
            id: "mn-les-5",
            title: "Funil de Vendas pelo TikTok",
            duration: "24:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Construa um funil de vendas completo usando apenas o TikTok como fonte de tráfego.",
          },
        ],
      },
      {
        id: "mn-mod-3",
        title: "Escalando o Negócio",
        lessons: [
          {
            id: "mn-les-6",
            title: "Tráfego Pago para Infoprodutos",
            duration: "20:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Aprenda a usar TikTok Ads para escalar suas vendas de produtos digitais.",
          },
          {
            id: "mn-les-7",
            title: "Criando uma Comunidade que Paga",
            duration: "16:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Monte uma comunidade engajada que gera receita recorrente.",
          },
          {
            id: "mn-les-8",
            title: "Mentorias e High Ticket",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como criar e vender mentorias de alto valor usando sua autoridade.",
          },
        ],
      },
    ],
  },
  {
    id: "tiktok-shop",
    title: "TikTok Shop: Vendas Explosivas",
    description:
      "Domine o TikTok Shop e aprenda a vender produtos físicos e digitais diretamente na plataforma.",
    thumbnail: "/images/courses/tiktok-shop.jpg",
    instructor: "Mariana Oliveira",
    instructorAvatar: "/images/users/4.jpg",
    category: "E-commerce",
    totalLessons: 9,
    totalDuration: "3h 15min",
    progress: 20,
    tags: ["TikTok Shop", "E-commerce", "Vendas"],
    modules: [
      {
        id: "ts-mod-1",
        title: "Introdução ao TikTok Shop",
        lessons: [
          {
            id: "ts-les-1",
            title: "O que é o TikTok Shop e Por que Usar",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Entenda o potencial do TikTok Shop e como ele está revolucionando o e-commerce.",
          },
          {
            id: "ts-les-2",
            title: "Configurando sua Loja",
            duration: "20:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Passo a passo completo para criar e configurar sua loja no TikTok Shop.",
          },
          {
            id: "ts-les-3",
            title: "Escolhendo Produtos Vencedores",
            duration: "22:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Métodos para encontrar produtos com alto potencial de venda.",
          },
        ],
      },
      {
        id: "ts-mod-2",
        title: "Estratégias de Venda",
        lessons: [
          {
            id: "ts-les-4",
            title: "Lives de Venda que Convertem",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "A estrutura perfeita para lives de venda no TikTok Shop.",
          },
          {
            id: "ts-les-5",
            title: "Vídeos Showcase de Produto",
            duration: "18:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Crie vídeos irresistíveis que fazem o produto vender sozinho.",
          },
          {
            id: "ts-les-6",
            title: "Programa de Afiliados do TikTok Shop",
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Use afiliados para multiplicar suas vendas sem esforço extra.",
          },
        ],
      },
      {
        id: "ts-mod-3",
        title: "Operação e Escala",
        lessons: [
          {
            id: "ts-les-7",
            title: "Logística e Fulfillment",
            duration: "19:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Organize sua logística para entregar com qualidade e escalar.",
          },
          {
            id: "ts-les-8",
            title: "Atendimento ao Cliente no TikTok",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Boas práticas de atendimento para manter avaliações positivas.",
          },
          {
            id: "ts-les-9",
            title: "Escalando para 6 Dígitos",
            duration: "26:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Estratégias avançadas para levar sua loja ao próximo nível.",
          },
        ],
      },
    ],
  },
  {
    id: "personal-brand",
    title: "Marca Pessoal no TikTok",
    description:
      "Construa uma marca pessoal forte e se torne referência no seu nicho usando o TikTok.",
    thumbnail: "/images/courses/personal-brand.jpg",
    instructor: "Rafael Torres",
    instructorAvatar: "/images/users/5.jpg",
    category: "Branding",
    totalLessons: 7,
    totalDuration: "2h 30min",
    progress: 100,
    tags: ["Marca Pessoal", "Branding", "Autoridade"],
    modules: [
      {
        id: "pb-mod-1",
        title: "Construindo sua Identidade",
        lessons: [
          {
            id: "pb-les-1",
            title: "Definindo seu Posicionamento Único",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Encontre seu diferencial e se posicione de forma única no mercado.",
          },
          {
            id: "pb-les-2",
            title: "Identidade Visual para Redes Sociais",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Crie uma identidade visual consistente e memorável.",
          },
          {
            id: "pb-les-3",
            title: "Tom de Voz e Comunicação",
            duration: "15:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Defina como você se comunica para criar conexão genuína com sua audiência.",
          },
        ],
      },
      {
        id: "pb-mod-2",
        title: "Autoridade e Influência",
        lessons: [
          {
            id: "pb-les-4",
            title: "Conteúdo de Autoridade",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Tipos de conteúdo que te posicionam como expert no seu nicho.",
          },
          {
            id: "pb-les-5",
            title: "Networking Digital",
            duration: "16:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Construa relacionamentos estratégicos com outros criadores.",
          },
          {
            id: "pb-les-6",
            title: "PR e Mídia para Criadores",
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como conseguir cobertura de mídia e amplificar sua marca.",
          },
          {
            id: "pb-les-7",
            title: "Monetizando sua Autoridade",
            duration: "24:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Transforme sua autoridade em múltiplas fontes de renda.",
          },
        ],
      },
    ],
  },
  {
    id: "tiktok-ads",
    title: "TikTok Ads do Zero ao ROI",
    description:
      "Domine o TikTok Ads Manager e crie campanhas lucrativas para qualquer tipo de negócio.",
    thumbnail: "/images/courses/tiktok-ads.jpg",
    instructor: "Carla Ferreira",
    instructorAvatar: "/images/users/6.jpg",
    category: "Tráfego Pago",
    totalLessons: 11,
    totalDuration: "4h 00min",
    progress: 0,
    tags: ["TikTok Ads", "Tráfego Pago", "ROI"],
    modules: [
      {
        id: "ta-mod-1",
        title: "Fundamentos do TikTok Ads",
        lessons: [
          {
            id: "ta-les-1",
            title: "Introdução ao TikTok Ads Manager",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Conheça a plataforma de anúncios e suas funcionalidades.",
          },
          {
            id: "ta-les-2",
            title: "Pixel e Rastreamento",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Configure o pixel do TikTok e rastreie conversões corretamente.",
          },
          {
            id: "ta-les-3",
            title: "Estrutura de Campanhas",
            duration: "20:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Aprenda a estruturar campanhas de forma organizada e eficiente.",
          },
        ],
      },
      {
        id: "ta-mod-2",
        title: "Criando Anúncios que Convertem",
        lessons: [
          {
            id: "ta-les-4",
            title: "Criativos que Vendem",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Fórmulas de criativos testadas que geram vendas consistentes.",
          },
          {
            id: "ta-les-5",
            title: "Segmentação de Público",
            duration: "19:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Como encontrar e segmentar seu público ideal no TikTok Ads.",
          },
          {
            id: "ta-les-6",
            title: "Spark Ads: O Poder do Orgânico Pago",
            duration: "16:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Use Spark Ads para amplificar conteúdo orgânico com anúncios.",
          },
          {
            id: "ta-les-7",
            title: "Testes A/B Eficientes",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Metodologia de testes para otimizar campanhas rapidamente.",
          },
        ],
      },
      {
        id: "ta-mod-3",
        title: "Otimização e Escala",
        lessons: [
          {
            id: "ta-les-8",
            title: "Leitura de Métricas e KPIs",
            duration: "21:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Entenda cada métrica e saiba o que otimizar primeiro.",
          },
          {
            id: "ta-les-9",
            title: "Otimização de Campanhas",
            duration: "23:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Técnicas avançadas para reduzir CPA e aumentar ROAS.",
          },
          {
            id: "ta-les-10",
            title: "Escalando Campanhas Vencedoras",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Métodos seguros para escalar budget sem perder performance.",
          },
          {
            id: "ta-les-11",
            title: "Automatizações e Regras",
            duration: "17:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Configure regras automáticas para gerenciar campanhas 24/7.",
          },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getLessonById(
  courseId: string,
  lessonId: string
): { course: Course; module: Module; lesson: Lesson; lessonIndex: number } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  for (const mod of course.modules) {
    const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex !== -1) {
      return { course, module: mod, lesson: mod.lessons[lessonIndex], lessonIndex };
    }
  }
  return undefined;
}

export function getAllLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

export function getNextLesson(
  course: Course,
  currentLessonId: string
): Lesson | undefined {
  const all = getAllLessons(course);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx !== -1 && idx < all.length - 1) {
    return all[idx + 1];
  }
  return undefined;
}

export function getPrevLesson(
  course: Course,
  currentLessonId: string
): Lesson | undefined {
  const all = getAllLessons(course);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx > 0) {
    return all[idx - 1];
  }
  return undefined;
}
