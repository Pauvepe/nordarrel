// =====================================================================
// PAGINA: SERVICIOS  (URL "/servicios")
// ---------------------------------------------------------------------
// Explica los servicios de la clinica. Tiene: cabecera, un CARRUSEL de
// servicios (usa el mismo componente Carousel que la home), una "ruta"
// de como se decide y un banner final de CTA.
// El array "services" de abajo son los textos del carrusel.
// =====================================================================
import {
  Check,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Carousel from "@/components/shared/Carousel";

const services = [
  {
    title: "Diagnostico capilar",
    image: "/assets/generated/galeria-consulta.png",
    text: "La entrada principal para nuevos pacientes. Antes de hablar de tratamientos, NordArrel ordena sintomas, antecedentes, habitos, expectativas y senales visibles del cuero cabelludo.",
  },
  {
    title: "Tratamiento regenerativo",
    image: "/assets/generated/galeria-tratamiento.png",
    text: "Cuando el diagnostico encaja, se plantea un protocolo capilar con criterio: bioestimulacion, PRP, mesoterapia u otras pautas segun el caso y la evolucion esperada.",
  },
  {
    title: "Salud capilar y molestias",
    image: "/assets/generated/galeria-detalle.png",
    text: "No todo empieza con la caida. Grasa, caspa, picor, descamacion o sensibilidad tambien pueden condicionar la salud del pelo y la calidad del tratamiento.",
  },
  {
    title: "Seguimiento presencial",
    image: "/assets/generated/galeria-recepcion.png",
    text: "La parte importante no es solo empezar. Los controles permiten ver evolucion, ajustar el plan y mantener al paciente orientado sin perder informacion entre visitas.",
  },
];

const route = [
  { icon: ClipboardList, title: "Caso ordenado", text: "Primero se recoge informacion util: sintomas, tiempo de evolucion, tratamientos previos y objetivos." },
  { icon: ShieldCheck, title: "Criterio responsable", text: "Si hay senales que requieren valoracion medica especifica, se explica con claridad antes de vender nada." },
  { icon: Check, title: "Plan entendible", text: "El paciente sale sabiendo que opcion tiene, por que se propone y cuando toca volver." },
];

export default function ServiciosPage() {
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
            <span>Servicios</span>
          </nav>
          <p className="na-kicker">Servicios NordArrel</p>
          <h1>Tratamientos capilares con diagnostico antes que promesa.</h1>
          <p>NordArrel funciona como una clinica de servicios: primero se entiende el caso, despues se decide si conviene tratar, seguir, observar o derivar.</p>
          <div className="inner-hero-actions">
            <Link href="/diagnostico" className="header-cta hero-cta">Diagnostico sin compromiso</Link>
            <Link href="/cita" className="btn btn-secondary btn-large">Agendar cita</Link>
          </div>
        </div>
      </section>

      <section className="services-home-section">
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
      </section>

      <section className="services-route-section">
        <div className="container">
          <header className="cb-intro">
            <p className="na-kicker">Como se decide</p>
            <h2>Una ruta simple para no entrar <span className="cb-grad">a ciegas.</span></h2>
            <p>El objetivo de la web es convertir una preocupacion privada en una primera decision clara.</p>
          </header>
          <div className="service-card-grid">
            {route.map((item) => {
              const Icon = item.icon;
              return (
                <article className="service-mini-card" key={item.title}>
                  <div className="service-icon"><Icon /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="post-reviews-cta">
        <div className="cta-banner cta-banner-final">
          <div className="cta-banner-text">
            <h3>Si aun no sabes que necesitas, empieza por el diagnostico.</h3>
            <p className="cta-banner-note">La cita normal queda para pacientes ya valorados o seguimiento.</p>
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
