// =====================================================================
// PAGINA: HOME  (la portada, URL "/")
// ---------------------------------------------------------------------
// Es la pantalla principal. De arriba a abajo tiene: hero (cabecera con
// titulo animado), galeria del espacio, antes/despues, servicios (carrusel),
// metodo paso a paso, banner de diagnostico, comparativa, resenas, equipo y FAQ.
// Casi todo son textos (los arrays de arriba: steps, faqs, reviews, team,
// services) que luego se pintan abajo dentro de cada <section>.
// El diseno (colores, tarjetas, botones) sale de globals.css.
// =====================================================================
import {
  CalendarCheck,
  Check,
  CheckCircle,
  ClipboardList,
  Eye,
  HeartPulse,
  MessageCircleMore,
  Stethoscope,
  Search,
  ShieldCheck,
  Star,
  Target,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import HomeEffects from "@/components/home/HomeEffects";
import GaleriaCarousel from "@/components/home/GaleriaCarousel";
import AntesDespues from "@/components/home/AntesDespues";
import Carousel from "@/components/shared/Carousel";

const steps = [
  { n: "01", icon: Search, title: "Detectas el problema", text: "Caida, grasa, caspa, picor o perdida de densidad se leen como punto de partida, no como excusa para vender rapido." },
  { n: "02", icon: ClipboardList, title: "Rellenas el formulario", text: "El caso queda ordenado antes de la cita: sintomas, habitos, tratamientos previos, objetivos y nivel de urgencia." },
  { n: "03", icon: CalendarCheck, title: "Reservas hora", text: "El calendario convierte la preocupacion en una cita concreta, breve y preparada, sin registro inicial ni pasos de mas." },
  { n: "04", icon: Eye, title: "Revision visual", text: "Se revisa cuero cabelludo, densidad y senales visibles con un enfoque claro: entender antes de recomendar." },
  { n: "05", icon: ShieldCheck, title: "Criterio profesional", text: "NordArrel comunica limites: si hay dolor, inflamacion o caida repentina, lo responsable es derivar a consulta medica." },
  { n: "06", icon: Stethoscope, title: "Plan clinico", text: "Si el caso encaja, se explica el tratamiento recomendado, expectativas realistas, tiempos y siguientes pasos." },
  { n: "07", icon: MessageCircleMore, title: "Seguimiento", text: "La relacion no termina en la primera visita: las citas de control mantienen el caso ordenado y medible." },
  { n: "08", icon: Target, title: "Decision clara", text: "El paciente entiende que hacer, por que hacerlo y cuando volver, sin promesas faciles ni presion comercial." },
  { n: "09", icon: HeartPulse, title: "Sistema NordArrel", text: "Clinica, diagnostico, calendario y seguimiento trabajan como una misma experiencia de salud capilar masculina." },
];

const faqs = [
  ["Que incluye el diagnostico?", "Un formulario previo, una primera valoracion en clinica, revision visual del caso y una orientacion clara sobre el siguiente paso."],
  ["Y si ya soy paciente?", "No hace falta repetir el diagnostico inicial. Usa Agendar cita para seguimiento, revision o continuidad del tratamiento."],
  ["WhatsApp sirve para citas?", "WhatsApp queda para dudas rapidas. Las reservas importantes se ordenan desde la web para no perder datos ni horarios."],
  ["Me van a vender algo?", "No se empuja una decision fria. Primero se entiende el caso y despues se propone el tratamiento si tiene sentido."],
  ["Para quien esta pensado?", "Para hombres adultos que quieren resolver una preocupacion capilar con discrecion, criterio clinico y una marca local cercana."],
];

const reviews = [
  {
    name: "Marc R.",
    meta: "Hace 2 semanas",
    text: "Me explicaron el caso sin prisas y sali entendiendo que opciones tenia. No senti una venta forzada.",
  },
  {
    name: "Jordi M.",
    meta: "Hace 1 mes",
    text: "La cita fue directa, discreta y muy clara. El formulario previo ayudo a no perder tiempo contando todo desde cero.",
  },
  {
    name: "Alex P.",
    meta: "Hace 1 mes",
    text: "Por fin alguien puso orden a lo que me pasaba. Diagnostico claro, trato discreto y seguimiento despues de la visita.",
  },
];

const team = [
  {
    name: "Nil Ferrer",
    role: "Diagnostico capilar",
    text: "Revisa senales visibles, sintomas y limites del caso antes de proponer tratamiento.",
    image: "/assets/generated/equipo-nil.png",
  },
  {
    name: "Clara Vidal",
    role: "Atencion y seguimiento",
    text: "Ordena el formulario, la cita y la comunicacion para que el proceso sea discreto.",
    image: "/assets/generated/equipo-clara.png",
  },
  {
    name: "Arnau Soler",
    role: "Tratamiento capilar",
    text: "Traduce el diagnostico en una pauta clinica clara, con tiempos y expectativas realistas.",
    image: "/assets/generated/equipo-arnau.png",
  },
];

const services = [
  {
    image: "",
    title: "Diagnostico capilar",
    text: "Primera valoracion para entender caida, densidad, grasa, caspa, picor o antecedentes antes de recomendar nada.",
  },
  {
    image: "",
    title: "Tratamiento regenerativo",
    text: "Protocolos de bioestimulacion, PRP o mesoterapia cuando el caso encaja y hay expectativas realistas.",
  },
  {
    image: "",
    title: "Salud del cuero cabelludo",
    text: "Revision de senales visibles, habitos y molestias para ordenar el origen del problema capilar.",
  },
  {
    image: "",
    title: "Seguimiento presencial",
    text: "Controles periodicos para medir evolucion, ajustar el plan y mantener el caso ordenado en el tiempo.",
  },
];

export default function Home() {
  return (
    <>
      <HomeEffects />

      <section className="hero">
        <div className="hero-glass-wrapper" aria-hidden="true">
          <img src="/assets/brand/nordarrel-isotipo-negro.svg" alt="" />
        </div>
        <div className="hero-motion" aria-hidden="true">
          <span className="hero-blob hero-blob-1" />
          <span className="hero-blob hero-blob-2" />
          <span className="hero-blob hero-blob-3" />
        </div>

        <div className="hero-inner">
          <p className="hero-eyebrow">Salut capilar masculina - Barcelona</p>
          <h1 className="hero-rotator" aria-label="Diagnostico capilar premium, criterio clinico, tratamiento, seguimiento.">
            <span className="hero-rotator-static">diagnostico capilar</span>
            <span className="hero-rotator-words" aria-hidden="true">
              <ul className="hero-rotator-list">
                <li>premium.</li>
                <li>con criterio.</li>
                <li>sin ruido.</li>
                <li>en clinica.</li>
                <li>en catalan.</li>
                <li>premium.</li>
              </ul>
            </span>
          </h1>
          <p className="hero-free">Clinica de salud capilar masculina que transforma una preocupacion privada en una primera valoracion clara, presencial y sin presion comercial.</p>
          <div className="hero-btns">
            <Link href="/diagnostico" className="header-cta hero-cta">Diagnostico sin compromiso <Arrow /></Link>
            <Link href="/cita" className="btn btn-secondary btn-large">Agendar cita</Link>
          </div>
          <p className="hero-small-text"><strong>Nuevos pacientes: diagnostico. Pacientes valorados: cita.</strong></p>
        </div>
      </section>

      <section className="galeria-section">
        <div className="container">
          <div className="cb-divider">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" />
            <span className="cb-label">El espacio</span>
            <span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>
          <header className="cb-intro galeria-intro">
            <p className="na-kicker">Sistema visual NordArrel</p>
            <h2>Un codigo serio, <span className="cb-grad">local y tactil.</span></h2>
            <p>Papel roto, tinta calida, terracota, oxido y gris suave: una estetica editorial que se aleja del azul clinico y del reclamo agresivo.</p>
          </header>
        </div>
        <GaleriaCarousel />
      </section>

      <AntesDespues />

      <section className="services-home-section" id="servicios">
        <div className="container">
          <div className="cb-divider">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" />
            <span className="cb-label">Servicios</span>
            <span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>

          <header className="cb-intro">
            <p className="na-kicker">Lo que trabajamos en clinica</p>
            <h2>Servicios capilares explicados <span className="cb-grad">sin prometer milagros.</span></h2>
            <p>La home solo resume lo importante. La pagina de servicios desarrolla cada ruta con mas contexto, imagenes y criterios para saber por donde empezar.</p>
          </header>
        </div>

        <Carousel ariaLabel="Servicios NordArrel">
          {services.map((service) => (
            <article className="service-mini-card service-mini-card--media" key={service.title}>
              <div
                className="service-mini-media"
                style={service.image ? { backgroundImage: `url('${service.image}')` } : undefined}
              />
              <div className="service-mini-copy">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </Carousel>

        <div className="container">
          <div className="services-home-action">
            <Link href="/servicios" className="btn btn-on-orange btn-large">Ver servicios <Arrow /></Link>
          </div>
        </div>
      </section>

      <section id="lo-que-construyo" className="cb-section">
        <div className="container">
          <div className="cb-divider">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" />
            <span className="cb-label">Metodo NordArrel</span>
            <span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>

          <header className="cb-intro">
            <h2>Del problema privado <span className="cb-rot-words" aria-hidden="true"><ul className="cb-rot-list"><li>a una cita.</li><li>a una revision.</li><li>a tratamiento.</li><li>a seguimiento.</li><li>a una cita.</li></ul></span></h2>
            <p>La home separa dos rutas sin liarla: diagnostico sin compromiso para quien viene por primera vez y cita normal para pacientes ya valorados.</p>
          </header>

          <div className="snake-container">
            <div className="snake-svg-layer" aria-hidden="true">
              <svg className="snake-svg" viewBox="0 0 1200 1000" preserveAspectRatio="none">
                <path d="M -50 150 L 1100 150 C 1280 150, 1280 500, 1100 500 L 100 500 C -80 500, -80 850, 100 850 L 1100 850" className="snake-path" />
                <path d="M -50 150 L 1100 150 C 1280 150, 1280 500, 1100 500 L 100 500 C -80 500, -80 850, 100 850 L 1100 850" className="snake-path snake-path-active" />
              </svg>
            </div>

            <div className="snake-grid">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div className="snake-item" key={step.n}>
                    <div className="snake-num">{step.n}</div>
                    <div className="snake-card">
                      <div className="snake-card-icon"><Icon /></div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cb-divider cb-divider-cta">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>
        </div>

        <div className="cta-banner" id="diagnostico">
          <div className="cta-banner-text">
            <h3>Diagnostico sin compromiso para nuevos pacientes.</h3>
            <ul className="of-deliv">
              <li><span className="deliv-chk"><Check /></span>Formulario previo con sintomas, habitos y objetivos</li>
              <li><span className="deliv-chk"><Check /></span>Primera valoracion en clinica con cita preparada</li>
              <li><span className="deliv-chk"><Check /></span>Revision visual y explicacion clara del caso</li>
              <li><span className="deliv-chk"><Check /></span>Propuesta de tratamiento solo si tiene sentido</li>
            </ul>
            <p className="cta-banner-note">Primera visita para personas que todavia no han sido valoradas por NordArrel.</p>
          </div>
          <div className="cta-banner-action">
            <Link href="/diagnostico" className="btn btn-on-orange btn-large">Diagnostico sin compromiso <Arrow /></Link>
            <Link href="/cita" className="btn btn-secondary btn-large">Agendar cita</Link>
          </div>
        </div>
      </section>

      <section id="oferta" className="of-section">
        <div className="container">
          <div className="cb-divider cb-divider-after-cta">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" />
            <span className="cb-label">Tu situacion - La propuesta</span>
            <span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>

          <header className="cb-intro">
            <h2>Tu ya conoces los sintomas.<br /><span className="cb-grad">NordArrel ordena la decision.</span></h2>
            <p>La propuesta no compite por precio. Construye confianza con metodo, lenguaje claro, estetica seria y una primera visita facil de entender.</p>
          </header>

          <div className="comp-table">
            <div className="comp-header">
              <div className="comp-header-left">Ir a ciegas</div>
              <div className="comp-header-right">Con NordArrel</div>
            </div>
            <div className="comp-body">
              {[
                ["Busqueda dispersa, consejos sueltos y miedo a equivocarse.", "Un recorrido propio: diagnostico, calendario, tratamiento y seguimiento."],
                ["Meses probando soluciones sin saber que pasa.", "Valoracion clara con sintomas, antecedentes y expectativas explicadas."],
                ["Anuncios simples para un problema sensible.", "Jerarquia editorial, lenguaje sobrio y promesa responsable."],
                ["Pedir cita sin saber si es para ti.", "Diagnostico primero; cita de seguimiento solo si ya eres paciente."],
              ].map(([bad, good]) => (
                <div className="comp-row" key={bad}>
                  <div className="comp-cell comp-cell-left"><XCircle className="icon-x" /><div><b>{bad}</b></div></div>
                  <div className="comp-cell comp-cell-right"><CheckCircle className="icon-check" /><div><b>{good}</b></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-section" id="resenas">
        <div className="container">
          <div className="reviews-head">
            <p className="na-kicker">Resenas</p>
            <h2>La prueba social va despues del metodo.</h2>
            <p>Cuando la propuesta ya esta clara, las opiniones funcionan como confirmacion: trato, claridad y confianza local.</p>
          </div>

          <div className="reviews-summary">
            <div>
              <span className="reviews-score">4.9</span>
              <div className="reviews-stars" aria-label="Valoracion 4.9 de 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <p>Estilo Google Reviews</p>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-top">
                  <div className="review-avatar">{review.name.slice(0, 1)}</div>
                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.meta}</p>
                  </div>
                </div>
                <div className="review-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} />
                  ))}
                </div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="post-reviews-cta">
        <div className="cta-banner cta-banner-final">
          <div className="cta-banner-text">
            <h3>Primero diagnostico. Despues tratamiento. Luego seguimiento.</h3>
            <p className="cta-banner-note">La ruta principal de NordArrel es clara: valoracion inicial para nuevos pacientes y cita normal para pacientes ya valorados.</p>
          </div>
          <div className="cta-banner-action" id="cita">
            <Link href="/diagnostico" className="btn btn-on-orange btn-large">Diagnostico sin compromiso <Arrow /></Link>
            <Link href="/cita" className="btn btn-secondary btn-large">Agendar cita</Link>
          </div>
        </div>
      </div>

      <section className="team-section" id="equipo">
        <div className="container">
          <div className="cb-divider">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" />
            <span className="cb-label">Equipo</span>
            <span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>
          <header className="cb-intro">
            <p className="na-kicker">Personas antes que promesas</p>
            <h2>Un equipo visible hace la decision <span className="cb-grad">menos fria.</span></h2>
            <p>Antes del FAQ conviene ensenar caras: baja la sensacion de marca anonima y prepara mejor la reserva.</p>
          </header>
        </div>

        <Carousel className="gc-carousel--team" ariaLabel="Equipo NordArrel">
          {team.map((person) => (
            <article className="team-card" key={person.name}>
              <div
                className="team-photo"
                style={{
                  backgroundImage: `url('${person.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              />
              <div className="team-copy">
                <span>{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.text}</p>
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      <section className="bg-alt faq-section-final" id="faq">
        <div className="container">
          <div className="section-header">
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <details className="faq-item" key={q} open={i === 0}>
                <summary className="faq-question"><span>{q}</span><i className="faq-icon">+</i></summary>
                <div className="faq-answer">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Arrow() {
  return (
    <svg className="cta-arrow" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true">
      <path d="M843.968 896a51.072 51.072 0 0 1-51.968-52.032V232H180.032A51.072 51.072 0 0 1 128 180.032c0-29.44 22.528-52.032 52.032-52.032h663.936c29.44 0 52.032 22.528 52.032 52.032v663.936c0 29.44-22.528 52.032-52.032 52.032z" />
      <path d="M180.032 896a49.92 49.92 0 0 1-36.48-15.616c-20.736-20.8-20.736-53.76 0-72.832L807.616 143.616c20.864-20.8 53.76-20.8 72.832 0 20.8 20.8 20.8 53.76 0 72.768L216.384 880.384a47.232 47.232 0 0 1-36.352 15.616z" />
    </svg>
  );
}
