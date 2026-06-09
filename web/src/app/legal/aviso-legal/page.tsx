// PAGINA LEGAL: Aviso legal (URL "/legal/aviso-legal"). Solo texto legal.
import Link from "next/link";

export default function AvisoLegal() {
  return (
    <section className="legal-page-section">
      <div className="container legal-page">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <span>Aviso legal</span>
        </nav>

        <p className="na-kicker">Legal</p>
        <h1>Aviso legal</h1>
        <p className="legal-intro">Documento base preparado para NordArrel. Los datos fiscales definitivos deberan ajustarse antes de publicar la web.</p>

        <div className="legal-content">
          <section>
            <h2>1. Datos identificativos</h2>
            <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Informacion y Comercio Electronico, se informa de que este sitio web pertenece a NordArrel.</p>
            <ul>
              <li>Denominacion comercial: NordArrel</li>
              <li>Domicilio: Barcelona</li>
              <li>Email: info@nordarrel.com</li>
              <li>Telefono: +34 600 000 000</li>
              <li>Datos fiscales: pendientes de completar por el titular.</li>
            </ul>
          </section>

          <section>
            <h2>2. Objeto</h2>
            <p>El sitio web ofrece informacion sobre servicios de diagnostico capilar, tratamientos, seguimiento y contacto de la clinica. El uso de la web implica la aceptacion de este aviso legal.</p>
          </section>

          <section>
            <h2>3. Uso del sitio web</h2>
            <p>El usuario se compromete a utilizar la web de forma licita, responsable y respetuosa, sin danar sistemas, contenidos o derechos de terceros.</p>
          </section>

          <section>
            <h2>4. Propiedad intelectual</h2>
            <p>Los textos, imagenes, diseno, marca y elementos visuales de la web pertenecen a NordArrel o se usan con autorizacion. No se permite su copia o distribucion sin consentimiento.</p>
          </section>

          <section>
            <h2>5. Responsabilidad</h2>
            <p>La informacion de la web no sustituye una valoracion profesional individual. NordArrel puede modificar contenidos, servicios o condiciones cuando sea necesario.</p>
          </section>

          <section>
            <h2>6. Legislacion aplicable</h2>
            <p>Este aviso se rige por la legislacion espanola. Cualquier controversia se resolvera ante los juzgados y tribunales competentes conforme a la normativa aplicable.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
