"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

const cases = [
  {
    title: "Caso controlado",
    time: "6 semanas para revisar evolucion, densidad visual y respuesta.",
    before: "/assets/generated/antes-despues-01-before.png",
    after: "/assets/generated/antes-despues-01-after.png",
  },
  {
    title: "Menos improvisacion",
    time: "8 semanas para ajustar habitos, tratamiento y seguimiento.",
    before: "/assets/generated/antes-despues-02-before.png",
    after: "/assets/generated/antes-despues-02-after.png",
  },
];

export default function AntesDespues() {
  return (
    <section className="before-section" id="antes-despues">
      <div className="container">
        <div className="before-head">
          <p className="na-kicker">Antes y despues</p>
          <h2>Primero claridad. Despues seguimiento visible.</h2>
          <p>El objetivo del diagnostico sin compromiso no es prometer milagros: es entender el caso, valorar opciones y decidir el siguiente paso con criterio.</p>
        </div>

        <div className="before-grid">
          {cases.map((item) => (
            <BeforeAfterCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({ title, time, before, after }: { title: string; time: string; before: string; after: string }) {
  const [value, setValue] = useState(52);

  return (
    <article className="before-card">
      <div className="before-slider" style={{ "--before-pos": `${value}%` } as CSSProperties}>
        <img src={before} alt={`${title} antes`} className="before-img before-img-before" />
        <div className="before-after-layer">
          <img src={after} alt={`${title} despues`} className="before-img before-img-after" />
        </div>

        <span className="before-chip before-chip-left">Ahora</span>
        <span className="before-chip before-chip-right">Antes</span>
        <span className="before-handle" aria-hidden="true" />

        <input
          className="before-range"
          type="range"
          min="8"
          max="92"
          value={value}
          aria-label={`Comparar ${title}`}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
      <div className="before-copy">
        <h3>{title}</h3>
        <p>{time}</p>
      </div>
    </article>
  );
}
