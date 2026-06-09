// PAGINA LEGAL: Politica de cookies (URL "/legal/politica-cookies"). Solo texto.
import Link from "next/link";

export default function PoliticaCookies() {
  return (
    <section className="legal-page-section">
      <div className="container legal-page">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <span>Cookies</span>
        </nav>

        <p className="na-kicker">Legal</p>
        <h1>Politica de cookies</h1>
        <p className="legal-intro">La web queda preparada con banner de cookies. Si mas adelante se anaden analytics, pixel o herramientas externas, esta pagina debera actualizarse.</p>

        <div className="legal-content">
          <section>
            <h2>1. Que son las cookies</h2>
            <p>Las cookies son pequenos archivos que se almacenan en el navegador del usuario para permitir el funcionamiento de la web, recordar preferencias o medir el uso del sitio.</p>
          </section>

          <section>
            <h2>2. Cookies usadas actualmente</h2>
            <p>Actualmente la web utiliza una cookie o almacenamiento local tecnico para recordar la decision del usuario sobre el banner de cookies.</p>
          </section>

          <section>
            <h2>3. Cookies tecnicas</h2>
            <p>Son necesarias para que la web funcione correctamente o para recordar preferencias basicas. No requieren consentimiento cuando son imprescindibles.</p>
          </section>

          <section>
            <h2>4. Cookies analiticas o publicitarias</h2>
            <p>Si se activan herramientas como analitica, pixel publicitario o seguimiento externo, se informara previamente y se pedira consentimiento cuando sea necesario.</p>
          </section>

          <section>
            <h2>5. Gestion de cookies</h2>
            <p>El usuario puede borrar o bloquear cookies desde la configuracion de su navegador. Al hacerlo, algunas funciones de la web podrian verse afectadas.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
