// =====================================================================
// PAGINA: SOBRE NOSOTROS  (URL "/sobre-nosotros")
// ---------------------------------------------------------------------
// Pagina de confianza: la idea de la clinica, los valores y el equipo
// (el equipo se muestra con el mismo Carousel que la home). Termina con
// un banner de CTA. Los arrays "values" y "team" son los textos.
// =====================================================================
import Link from "next/link";
import Carousel from "@/components/shared/Carousel";

const values = [
  {
    title: "Mirar antes de recomendar",
    text: "La primera visita no empieza vendiendo un tratamiento. Empieza entendiendo sintomas, contexto y expectativas.",
  },
  {
    title: "Limites claros",
    text: "Si el caso no encaja o necesita otro tipo de valoracion, se dice. La confianza se construye tambien diciendo que no.",
  },
  {
    title: "Seguimiento real",
    text: "El paciente no queda solo despues de empezar. Las revisiones ordenan la evolucion y evitan decisiones impulsivas.",
  },
];

const team = [
  {
    name: "Nil Ferrer",
    role: "Diagnostico capilar",
    text: "Se centra en leer senales visibles, sintomas y antecedentes antes de plantear cualquier siguiente paso.",
    image: "/assets/generated/equipo-nil.png",
  },
  {
    name: "Clara Vidal",
    role: "Atencion y seguimiento",
    text: "Acompana el proceso de reserva, comunicacion y continuidad para que la experiencia sea discreta y ordenada.",
    image: "/assets/generated/equipo-clara.png",
  },
  {
    name: "Arnau Soler",
    role: "Tratamiento capilar",
    text: "Convierte el diagnostico en una pauta entendible, con tiempos, controles y expectativas realistas.",
    image: "/assets/generated/equipo-arnau.png",
  },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="inner-hero-mark" aria-hidden="true">
          <img src="/assets/brand/nordarrel-isotipo-negro.svg" alt="" />
        </div>
        <div className="container inner-hero-content">
          <nav className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Sobre nosotros</span>
          </nav>
          <p className="na-kicker">Clinica capilar masculina</p>
          <h1>Una forma mas seria de hablar de pelo, caida y seguimiento.</h1>
          <p>NordArrel nace para hombres que quieren entender que les pasa sin entrar en una experiencia fria, agresiva o llena de promesas faciles.</p>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-media">
            <img src="/assets/generated/equipo-nordarrel-triptico.png" alt="Equipo NordArrel" />
          </div>
          <div className="about-story-copy">
            <p className="na-kicker">Nuestra idea</p>
            <h2>Primero criterio. Despues tratamiento.</h2>
            <p>La preocupacion capilar suele llegar mezclada con dudas, comparaciones, anuncios y consejos contradictorios. NordArrel ordena ese ruido con una primera valoracion clara y un lenguaje facil de entender.</p>
            <p>No se plantea como tienda ni como catalogo de packs. Es una clinica de servicios: diagnostico, tratamiento cuando procede y seguimiento presencial para mantener el caso bajo control.</p>
            <Link href="/servicios" className="btn btn-on-orange btn-large">Ver servicios</Link>
          </div>
        </div>
      </section>

      <section className="services-route-section">
        <div className="container">
          <header className="cb-intro">
            <p className="na-kicker">Como trabajamos</p>
            <h2>Una experiencia discreta, local <span className="cb-grad">y medible.</span></h2>
            <p>Cada parte de la web empuja a lo mismo: que el paciente sepa por donde empezar sin sentirse forzado.</p>
          </header>
          <div className="porque-editorial">
            {values.map((value) => (
              <p key={value.title}>
                <strong>{value.title}.</strong> {value.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section team-section-inner">
        <div className="container">
          <div className="cb-divider">
            <span className="cb-line" /><span className="cb-orb cb-orb-xs" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-lg" />
            <span className="cb-label">Equipo</span>
            <span className="cb-orb cb-orb-lg" /><span className="cb-orb cb-orb-sm" /><span className="cb-orb cb-orb-xs" /><span className="cb-line" />
          </div>
          <header className="cb-intro">
            <p className="na-kicker">Caras visibles</p>
            <h2>Un equipo que explica antes de pedirte una decision.</h2>
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

      <div className="post-reviews-cta">
        <div className="cta-banner cta-banner-final">
          <div className="cta-banner-text">
            <h3>La primera decision no deberia tomarse solo.</h3>
            <p className="cta-banner-note">Empieza por diagnostico si eres nuevo paciente. Usa cita si ya has sido valorado.</p>
          </div>
          <div className="cta-banner-action">
            <Link href="/diagnostico" className="btn btn-on-orange btn-large">Diagnostico sin compromiso</Link>
            <Link href="/cita" className="btn btn-secondary btn-large">Agendar cita</Link>
          </div>
        </div>
      </div>
    </>
  );
}
