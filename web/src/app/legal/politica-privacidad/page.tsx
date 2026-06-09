import Link from "next/link";

export default function PoliticaPrivacidad() {
  return (
    <section className="legal-page-section">
      <div className="container legal-page">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <span>Privacidad</span>
        </nav>

        <p className="na-kicker">Legal</p>
        <h1>Politica de privacidad</h1>
        <p className="legal-intro">Texto base para dejar la estructura preparada. Antes de publicar deben revisarse responsable, NIF, direccion y herramientas reales usadas.</p>

        <div className="legal-content">
          <section>
            <h2>1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos personales recogidos a traves de esta web es NordArrel, con domicilio en Barcelona y email de contacto info@nordarrel.com. Los datos fiscales definitivos quedan pendientes de completar.</p>
          </section>

          <section>
            <h2>2. Datos que pueden recogerse</h2>
            <p>La web puede recoger datos identificativos y de contacto como nombre, telefono, email y mensaje. En formularios futuros de diagnostico o cita tambien podran recogerse datos relacionados con la solicitud del servicio.</p>
          </section>

          <section>
            <h2>3. Finalidades</h2>
            <ul>
              <li>Gestionar consultas recibidas desde la pagina de contacto.</li>
              <li>Gestionar solicitudes de diagnostico capilar o cita cuando se activen esos formularios.</li>
              <li>Responder dudas y comunicaciones relacionadas con los servicios de NordArrel.</li>
              <li>Cumplir obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section>
            <h2>4. Legitimacion</h2>
            <p>La base legal del tratamiento es el consentimiento del usuario, la aplicacion de medidas precontractuales solicitadas por el propio usuario y el cumplimiento de obligaciones legales.</p>
          </section>

          <section>
            <h2>5. Conservacion</h2>
            <p>Los datos se conservaran durante el tiempo necesario para atender la solicitud y, posteriormente, durante los plazos exigidos por la normativa aplicable.</p>
          </section>

          <section>
            <h2>6. Derechos</h2>
            <p>El usuario puede ejercer sus derechos de acceso, rectificacion, supresion, oposicion, limitacion y portabilidad escribiendo a info@nordarrel.com.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
