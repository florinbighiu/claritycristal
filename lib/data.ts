export type PlanKey = "esencial" | "plus" | "elite";

export interface Plan {
  key: PlanKey;
  name: string;
  sessions: number;
  discount: number;
  popular: boolean;
  features: string[];
  rainGuarantee: string;
  badge?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  slug: string;
  highlight?: boolean;
  items: string[];
}

export const WA_LINK = "https://wa.me/34604234496";
export const WA_MSG = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto gratuito para limpieza de cristales/paneles solares."
);

export const PLANS: Plan[] = [
  {
    key: "esencial",
    name: "Claridad Esencial",
    sessions: 3,
    discount: 10,
    popular: false,
    rainGuarantee: "3 días",
    features: [
      "Agua 100% pura desmineralizada",
      "Limpieza interior & exterior",
      "Servicio cada 4 meses",
      "Garantía de lluvia 3 días",
      "Desplazamiento incluido",
    ],
  },
  {
    key: "plus",
    name: "Claridad Plus",
    sessions: 6,
    discount: 15,
    popular: true,
    rainGuarantee: "5 días",
    badge: "Más Popular",
    features: [
      "Agua 100% pura desmineralizada",
      "Flexibilidad total de horario",
      "Interior & exterior",
      "Recordatorios programados",
      "Prioridad en agenda",
      "Garantía de lluvia 5 días",
      "+5% desc. en servicios extra",
      "Cancela cuando quieras",
      "Garantía de precio fijo",
    ],
  },
  {
    key: "elite",
    name: "Claridad Elite",
    sessions: 10,
    discount: 20,
    popular: false,
    rainGuarantee: "7 días",
    features: [
      "Agua 100% pura desmineralizada",
      "Flexibilidad total de horario",
      "Atención prioritaria VIP",
      "Recordatorios personalizados",
      "Garantía de lluvia 7 días",
      "Sesiones urgencia sin coste",
      "+10% desc. en servicios extra",
      "Ideal para locales comerciales",
      "Cancela cuando quieras",
      "Garantía de precio fijo",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    q: "¿Cada cuánto debería realizarse la limpieza de cristales?",
    a: "En Lanzarote, por la calima y el salitre, recomendamos cada 2-3 meses para viviendas y mensualmente para comercios. Con nuestros planes recurrentes obtienes hasta un 20% de descuento.",
  },
  {
    q: "¿La lluvia ya limpia los paneles solares?",
    a: "No. La lluvia NO elimina el polvo ni el salitre; al contrario, deja manchas que empeoran el rendimiento. Solo agua desmineralizada con tratamiento profesional garantiza limpieza total sin residuos ni corrosión.",
  },
  {
    q: "¿El agua del grifo deja marcas en los cristales?",
    a: "Sí. El agua del grifo tiene entre 100-500 ppm de minerales (cal, sales) que dejan marcas al secarse. Nuestra agua ultrapura (0 ppm) se evapora sin dejar rastros, reduciendo el tiempo de limpieza un 30% y aumentando el brillo un 50% más.",
  },
  {
    q: "¿Se pueden dañar los cristales durante la limpieza?",
    a: "No. Utilizamos exclusivamente agua pura desmineralizada y cepillos profesionales de cerdas suaves, diseñados específicamente para la limpieza de superficies delicadas. Nunca usamos productos químicos abrasivos.",
  },
  {
    q: "¿Necesito estar en casa durante el servicio?",
    a: "No es necesario. Solo necesitamos acceso al exterior. Te avisamos cuando llegamos y cuando terminamos. Ideal para propietarios de alojamientos vacacionales o personas con horarios ocupados.",
  },
  {
    q: "¿Cuánto rinde pérdida un panel solar sucio?",
    a: "En Lanzarote, la calima, polvo y salitre pueden hacer que los paneles pierdan hasta el 25-40% de su rendimiento. Una limpieza profesional mensual puede recuperar hasta 25-30% del rendimiento perdido, equivalente a cientos de euros al año en ahorro energético.",
  },
  {
    q: "¿Se adaptan a mi horario de trabajo o negocio?",
    a: "Sí. Trabajamos entre semana, fines de semana o fuera del horario laboral. Nuestro objetivo es realizar la limpieza sin interferir en su rutina diaria ni en la atención a clientes.",
  },
  {
    q: "¿Cuánto cuesta la limpieza de cristales o paneles solares?",
    a: "Residencial: desde 4€ por ventana. Comercial: desde 3€/m². Paneles solares: desde 5€ por panel. El desplazamiento es siempre gratuito. Solicita tu presupuesto sin compromiso.",
  },
];

export const VALUES = [
  {
    icon: "🎯",
    title: "Fiabilidad",
    desc: "Cumplimos lo que prometemos. Puntuales, transparentes y confiables en cada visita.",
  },
  {
    icon: "✨",
    title: "Calidad",
    desc: "Limpiar ventanas es un arte. Lo hacemos perfecto, no rápido. Sin atajos.",
  },
  {
    icon: "🤝",
    title: "Respeto",
    desc: "Tratamos su espacio como si fuera el nuestro. Con cuidado y responsabilidad.",
  },
  {
    icon: "🌿",
    title: "Sostenibilidad",
    desc: "Sin químicos agresivos. Agua pura y rutas optimizadas para cuidar el entorno.",
  },
  {
    icon: "⚡",
    title: "Eficiencia",
    desc: "El agua desmineralizada actúa más rápido y deja resultados más duraderos.",
  },
  {
    icon: "🛡️",
    title: "Garantía Total",
    desc: "Si no queda perfecto, volvemos sin coste. Sin excusas, sin letra pequeña.",
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Cotización Gratuita",
    desc: "Contáctenos y evaluamos el número, tipo y tamaño de sus ventanas para ofrecerle un precio justo y transparente.",
  },
  {
    num: "02",
    title: "Programación Flexible",
    desc: "Usted elige cuándo, nosotros nos encargamos. Entre semana, fines de semana o fuera de horario laboral.",
  },
  {
    num: "03",
    title: "Limpieza Profesional",
    desc: "Llegamos con todo el equipo. Agua desmineralizada, pértigas telescópicas y técnicas seguras para un acabado perfecto.",
  },
  {
    num: "04",
    title: "Revisión y Satisfacción",
    desc: "Antes de irnos, revisamos el resultado con usted. Si algo no está perfecto, lo solucionamos al instante.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "residencial",
    icon: "🏠",
    title: "Residencial",
    subtitle: "Para hogares y viviendas",
    desc: "Limpieza profesional de todas las ventanas de tu hogar con agua ultrapura. Sin rayas, sin manchas, sin necesidad de secar manualmente.",
    price: "Desde 4€ / ventana",
    slug: "residencial",
    items: [
      "Ventanas de todos los tamaños",
      "Puertas correderas y balconeras",
      "Interior y exterior",
      "Contraventanas y persianas",
    ],
  },
  {
    id: "empresas",
    icon: "🏢",
    title: "Empresas & Alojamientos",
    subtitle: "Hoteles, oficinas, comercios",
    desc: "Servicio adaptado a negocios sin interrumpir tu actividad. Escaparates impecables, fachadas cristalinas y clientes impresionados.",
    price: "Desde 3€ / m²",
    slug: "empresas",
    items: [
      "Escaparates y locales",
      "Fachadas y cristaleras",
      "Horario flexible sin interferencias",
      "Factura y seguro incluidos",
    ],
  },
  {
    id: "paneles",
    icon: "☀️",
    title: "Paneles Solares",
    subtitle: "Optimiza tu energía solar",
    desc: "Los paneles sucios pierden hasta un 40% de rendimiento. Con nuestra limpieza especializada recuperas ese rendimiento y ahorras cientos de euros al año.",
    price: "Desde 5€ / panel",
    slug: "paneles",
    highlight: true,
    items: [
      "Hasta +30% de rendimiento",
      "Sin daños ni rayaduras",
      "Agua pura sin cal",
      "Apto para todos los fabricantes",
    ],
  },
];
