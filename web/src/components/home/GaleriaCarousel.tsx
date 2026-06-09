// =====================================================================
// COMPONENTE: GaleriaCarousel (galeria del espacio en la home)
// ---------------------------------------------------------------------
// Muestra las fotos de la clinica usando el Carousel comun. El array
// "slides" de abajo son las fotos y sus textos. Se usa en la home.
// =====================================================================
import Carousel from "@/components/shared/Carousel";

const slides = [
  { src: "/assets/generated/galeria-recepcion.png", alt: "Recepcion NordArrel", label: "Recepcion", sub: "El primer paso", text: "Entrada sobria, local y preparada para que la visita empiece sin sensacion clinica fria." },
  { src: "/assets/generated/galeria-consulta.png", alt: "Sala de diagnostico NordArrel", label: "Diagnostico", sub: "Analisis con lupa", text: "El espacio ordena sintomas, habitos y objetivos antes de proponer ningun tratamiento." },
  { src: "/assets/generated/galeria-detalle.png", alt: "Detalle clinica NordArrel", label: "Consulta", sub: "Criterio claro", text: "La decision llega despues de valorar el caso, explicar opciones y resolver dudas sin presion." },
  { src: "/assets/generated/galeria-pasillo.png", alt: "Pasillo clinica", label: "El espacio", sub: "Desconexion total", text: "Un recorrido visual calido para que la decision se sienta mas humana y menos automatica." },
  { src: "/assets/generated/galeria-lavabo.png", alt: "Lavabos premium", label: "Cuidado", sub: "Detalles que importan", text: "Materiales, luz y textura ayudan a sostener una experiencia premium sin exagerarla." },
  { src: "/assets/generated/galeria-tratamiento.png", alt: "Sala de tratamiento", label: "Tratamiento", sub: "Tecnologia eficaz", text: "La parte tecnica queda integrada en una narrativa clara: revisar, explicar y acompanar." },
];

export default function GaleriaCarousel() {
  return (
    <Carousel>
      {slides.map((img) => (
        <article className="gc-carousel__slide" key={img.label}>
          <div className="gc-carousel__media">
            <img src={img.src} alt={img.alt} className="gc-carousel__img" />
          </div>
          <div className="gc-carousel__copy">
            <span>{img.sub}</span>
            <h3>{img.label}</h3>
            <p>{img.text}</p>
          </div>
        </article>
      ))}
    </Carousel>
  );
}
