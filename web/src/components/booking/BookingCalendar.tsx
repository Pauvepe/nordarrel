"use client";

// =====================================================================
// COMPONENTE: BookingCalendar (el calendario visual de reservas)
// ---------------------------------------------------------------------
// DONDE SE USA: en las paginas /diagnostico y /cita.
// QUE RECIBE (props): mode = "diagnostico" o "cita" (cada uno tiene sus
// dias/horas, ver booking-rules.ts); onChange = avisa a la pagina del
// hueco elegido { fecha, hora }.
// QUE HACE: pinta el mes, llama a la API /api/availability para saber que
// horas estan ocupadas y dejar elegir solo huecos libres.
// =====================================================================
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { bookingHours } from "@/lib/booking-rules";

type BookingMode = "diagnostico" | "cita";

type BookingCalendarProps = {
  mode: BookingMode;
  onChange?: (slot: { fecha: string; hora: string } | null) => void;
};

const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const WEEKDAY_NAMES = [
  "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingCalendar({ mode, onChange }: BookingCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const minimumDate = useMemo(() => addDays(today, 2), [today]);
  
  // Estado de navegación
  const [month, setMonth] = useState(() => startOfDay(new Date(today.getFullYear(), today.getMonth(), 1)));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [occupiedSlots, setOccupiedSlots] = useState<Array<{ fecha: string; hora: string | null; tipo: string | null }>>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const hours = bookingHours[mode];
  const rule = mode === "diagnostico" ? "Martes y jueves. 10:00-13:00 y 16:00-19:00." : "Lunes a viernes. 9:30-13:30 y 16:00-20:00.";

  // Años disponibles en el selector rápido (2 años antes y 5 después)
  const availableYears = useMemo(() => {
    const currentYear = today.getFullYear();
    const years = [];
    for (let y = currentYear - 2; y <= currentYear + 5; y++) {
      years.push(y);
    }
    return years;
  }, [today]);

  // Si cambiamos de mes desde los selectores rápidos
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonthIdx = parseInt(e.target.value);
    setMonth(new Date(month.getFullYear(), newMonthIdx, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setMonth(new Date(newYear, month.getMonth(), 1));
  };

  // Navegar con las flechas
  const moveMonth = (amount: number) => {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  // Ir a "Hoy"
  const goToToday = () => {
    setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    const dayAvailable = isAvailableDay(today);
    if (dayAvailable) {
      setSelectedDay(today);
    } else {
      setSelectedDay(null);
    }
    setSelectedHour(null);
  };

  // Reglas de negocio de disponibilidad de días
  function isAvailableDay(date: Date) {
    if (date < minimumDate) return false;
    const day = date.getDay();
    if (mode === "diagnostico") return day === 2 || day === 4;
    return day >= 1 && day <= 5;
  }

  // Selección de día
  function selectDay(date: Date) {
    if (!isAvailableDay(date)) return;
    setSelectedDay(date);
    setSelectedHour(null);
  }

  function selectHour(hour: string) {
    setSelectedHour(hour);
    if (selectedDay) onChange?.({ fecha: formatDate(selectedDay), hora: hour });
  }

  function isOccupied(date: Date, hour: string) {
    const fecha = formatDate(date);
    return occupiedSlots.some((slot) => {
      const sameDate = slot.fecha === fecha;
      const sameHour = slot.hora === null || slot.hora === hour;
      const sameCalendar = !slot.tipo || slot.tipo === mode;
      return sameDate && sameHour && sameCalendar;
    });
  }

  // Resetear la selección si el mes cambia y el día seleccionado ya no es visible
  useEffect(() => {
    if (selectedDay) {
      // Si el día seleccionado no corresponde al mes navegado, lo deseleccionamos
      if (selectedDay.getMonth() !== month.getMonth() || selectedDay.getFullYear() !== month.getFullYear()) {
        setSelectedDay(null);
        setSelectedHour(null);
      }
    }
  }, [month]);

  useEffect(() => {
    const from = formatDate(new Date(month.getFullYear(), month.getMonth(), 1));
    const to = formatDate(new Date(month.getFullYear(), month.getMonth() + 1, 0));
    setLoadingAvailability(true);
    fetch(`/api/availability?from=${from}&to=${to}`)
      .then((r) => r.json())
      .then((data) => setOccupiedSlots(Array.isArray(data.occupied) ? data.occupied : []))
      .catch(() => setOccupiedSlots([]))
      .finally(() => setLoadingAvailability(false));
  }, [month]);

  useEffect(() => {
    if (!selectedDay || !selectedHour) onChange?.(null);
  }, [selectedDay, selectedHour, onChange]);

  // Generar la cuadrícula perfecta de 42 celdas (6 semanas de 7 días)
  const gridCells = useMemo(() => {
    const cells: Array<{ date: Date; isOtherMonth: boolean }> = [];
    
    // Primer día del mes
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    let startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Dom, 1 = Lun, ...
    
    // Ajustar para que Lunes sea 0 y Domingo sea 6
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    // Días totales del mes actual
    const totalDaysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    // Días totales del mes anterior
    const totalDaysInPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0).getDate();

    // Rellenar días del mes anterior
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDayNum = totalDaysInPrevMonth - i;
      const prevMonth = month.getMonth() === 0 ? 11 : month.getMonth() - 1;
      const prevYear = month.getMonth() === 0 ? month.getFullYear() - 1 : month.getFullYear();
      cells.push({
        date: new Date(prevYear, prevMonth, prevDayNum),
        isOtherMonth: true
      });
    }

    // Rellenar días del mes actual
    for (let d = 1; d <= totalDaysInMonth; d++) {
      cells.push({
        date: new Date(month.getFullYear(), month.getMonth(), d),
        isOtherMonth: false
      });
    }

    // Rellenar días del mes siguiente
    const remainingCells = 42 - cells.length;
    for (let n = 1; n <= remainingCells; n++) {
      const nextMonth = month.getMonth() === 11 ? 0 : month.getMonth() + 1;
      const nextYear = month.getMonth() === 11 ? month.getFullYear() + 1 : month.getFullYear();
      cells.push({
        date: new Date(nextYear, nextMonth, n),
        isOtherMonth: true
      });
    }

    return cells;
  }, [month]);

  // Texto del mes actual con mayúscula
  const capitalizedMonth = useMemo(() => {
    const m = MONTH_NAMES[month.getMonth()];
    const y = month.getFullYear();
    return m.charAt(0).toUpperCase() + m.slice(1) + " " + y;
  }, [month]);

  // Texto elegante del día seleccionado
  const selectedDayLabel = useMemo(() => {
    if (!selectedDay) return "";
    const dayName = WEEKDAY_NAMES[selectedDay.getDay()];
    const dayNum = selectedDay.getDate();
    const monthName = MONTH_NAMES[selectedDay.getMonth()];
    const year = selectedDay.getFullYear();
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${dayNum} de ${monthName} de ${year}`;
  }, [selectedDay]);

  return (
    <div className="booking-calendar-wrapper">
      {/* Inyección de estilos CSS premium locales encapsulados */}
      <style dangerouslySetInnerHTML={{ __html: `
        .booking-calendar-wrapper {
          --white: #ffffff;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-300: #d1d5db;
          --gray-400: #9ca3af;
          --gray-500: #6b7280;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --gray-800: #1f2937;
          --gray-900: #111827;

          --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.03);
          --shadow-medium: 0 10px 30px rgba(0, 0, 0, 0.05);
          --shadow-deep: 0 20px 50px rgba(0, 0, 0, 0.08);
          --shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.02);

          --radius-pill: 9999px;
          --radius-square: 16px;
          --radius-panel: 28px;
          --radius-input: 12px;

          --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
          color: var(--gray-900);
        }

        .calendar-card {
          background: var(--white);
          border-radius: var(--radius-panel);
          box-shadow: var(--shadow-deep);
          border: 1px solid var(--gray-100);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
        }

        .calendar-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .date-info-custom {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .current-month-year-custom {
          font-size: 1.8rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--gray-900);
          text-transform: capitalize;
          margin: 0;
          line-height: 1.2;
        }

        .current-day-label-custom {
          font-size: 0.85rem;
          color: var(--gray-500);
          font-weight: 400;
        }

        .navigation-controls-custom {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quick-selectors-custom {
          display: flex;
          gap: 8px;
        }

        .select-pill-custom {
          appearance: none;
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          padding: 8px 28px 8px 16px;
          border-radius: var(--radius-pill);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--gray-700);
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: var(--transition);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234b5563' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 12px;
          line-height: 1.2;
        }

        .select-pill-custom:hover {
          background-color: var(--gray-100);
          border-color: var(--gray-300);
          color: var(--gray-900);
        }

        .select-pill-custom:focus {
          outline: none;
          border-color: var(--gray-400);
        }

        .btn-pill-custom {
          background: var(--white);
          border: 1px solid var(--gray-200);
          padding: 8px 18px;
          border-radius: var(--radius-pill);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--gray-700);
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          user-select: none;
          line-height: 1.2;
        }

        .btn-pill-custom:hover:not(:disabled) {
          background: var(--gray-100);
          border-color: var(--gray-300);
          color: var(--gray-900);
          transform: translateY(-1px);
        }

        .btn-pill-custom:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .btn-icon-pill-custom {
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: var(--radius-pill);
          flex-shrink: 0;
        }

        .btn-icon-pill-custom svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .weekdays-grid-custom {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          padding: 0 4px;
        }

        .weekday-label-custom {
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--gray-400);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 6px 0;
        }

        .days-grid-custom {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
        }

        .day-cell-custom {
          aspect-ratio: 1.05;
          background: var(--white);
          border: 1px solid var(--gray-100);
          border-radius: var(--radius-square);
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          cursor: pointer;
          position: relative;
          transition: var(--transition);
          box-shadow: var(--shadow-soft);
        }

        .day-cell-custom:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: var(--shadow-medium);
          border-color: var(--gray-300);
          z-index: 5;
        }

        .day-cell-custom:disabled {
          cursor: not-allowed;
        }

        .day-number-custom {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--gray-800);
          line-height: 1;
        }

        /* Sábados y domingos en gris */
        .day-cell-custom.weekend-day-custom {
          background-color: var(--gray-100) !important;
          border-color: var(--gray-200) !important;
        }

        .day-cell-custom.weekend-day-custom .day-number-custom {
          color: var(--gray-600) !important;
        }

        .day-cell-custom.weekend-day-custom:hover:not(:disabled) {
          background-color: var(--gray-200) !important;
        }

        /* Otros meses (atenuados) */
        .day-cell-custom.other-month-custom {
          opacity: 0.3;
        }

        /* Día de hoy */
        .day-cell-custom.today-day-custom {
          border: 2px solid var(--gray-800) !important;
        }

        .day-cell-custom.today-day-custom::before {
          content: '';
          position: absolute;
          top: 10px;
          right: 10px;
          width: 5px;
          height: 5px;
          background-color: var(--gray-800);
          border-radius: var(--radius-pill);
        }

        /* Día seleccionado */
        .day-cell-custom.selected-day-custom {
          border-color: var(--gray-800) !important;
          box-shadow: 0 0 0 2px var(--gray-300) !important;
        }

        /* Días no disponibles (deshabilitados pero no fines de semana) */
        .day-cell-custom:disabled:not(.weekend-day-custom) {
          opacity: 0.25;
        }

        /* SECCIÓN DE HORAS DE ABAJO */
        .hours-section-custom {
          background: var(--white);
          border-radius: var(--radius-panel);
          box-shadow: var(--shadow-deep);
          border: 1px solid var(--gray-100);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: slideUpCustom 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUpCustom {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hours-header-custom {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hours-title-custom {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--gray-900);
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.2;
        }

        .hours-subtitle-custom {
          font-size: 0.85rem;
          color: var(--gray-500);
          font-weight: 400;
          margin: 0;
        }

        .hours-grid-custom {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        @media (max-width: 640px) {
          .hours-grid-custom {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .hours-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .hour-pill-custom {
          background: var(--white);
          border: 1px solid var(--gray-200);
          padding: 12px 20px;
          border-radius: var(--radius-pill);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--gray-700);
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          line-height: 1.2;
        }

        .hour-pill-custom:hover:not(:disabled) {
          background: var(--gray-100);
          border-color: var(--gray-300);
          color: var(--gray-900);
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .hour-pill-custom:disabled {
          background: var(--gray-50);
          border-color: var(--gray-100);
          color: var(--gray-400);
          cursor: not-allowed;
          box-shadow: none;
        }

        .hour-pill-custom.selected-hour-custom {
          background: var(--gray-800) !important;
          border-color: var(--gray-800) !important;
          color: var(--white) !important;
          box-shadow: var(--shadow-medium);
        }

        .hour-status-label-custom {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.7;
        }

        .hour-pill-custom.selected-hour-custom .hour-status-label-custom {
          opacity: 0.9;
        }

        .selection-info-custom {
          font-size: 0.9rem;
          color: var(--gray-600);
          font-weight: 500;
          text-align: center;
          padding: 12px;
          border-radius: var(--radius-pill);
          background: var(--gray-50);
          border: 1px solid var(--gray-100);
          margin-top: 8px;
        }
      ` }} />

      {/* TARJETA DEL CALENDARIO */}
      <div className="calendar-card">
        <header className="calendar-header-custom">
          <div className="date-info-custom">
            <h3 className="current-month-year-custom">{capitalizedMonth}</h3>
            <span className="current-day-label-custom">
              {mode === "diagnostico" ? "Diagnóstico capilar sin compromiso" : "Cita de seguimiento / tratamiento"}
            </span>
          </div>

          <div className="navigation-controls-custom">
            {/* Selectores Rápidos */}
            <div className="quick-selectors-custom">
              <select 
                className="select-pill-custom" 
                value={month.getMonth()} 
                onChange={handleMonthChange}
              >
                {MONTH_NAMES.map((name, index) => (
                  <option key={name} value={index}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </option>
                ))}
              </select>

              <select 
                className="select-pill-custom" 
                value={month.getFullYear()} 
                onChange={handleYearChange}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Botones de Navegación */}
            <button 
              type="button" 
              className="btn-pill-custom btn-icon-pill-custom" 
              onClick={() => moveMonth(-1)} 
              title="Mes Anterior"
            >
              <ChevronLeft />
            </button>
            <button 
              type="button" 
              className="btn-pill-custom" 
              onClick={goToToday}
            >
              Hoy
            </button>
            <button 
              type="button" 
              className="btn-pill-custom btn-icon-pill-custom" 
              onClick={() => moveMonth(1)} 
              title="Mes Siguiente"
            >
              <ChevronRight />
            </button>
          </div>
        </header>

        {/* GRIDS DE DÍAS */}
        <div className="weekdays-grid-custom">
          <div className="weekday-label-custom">Lun</div>
          <div className="weekday-label-custom">Mar</div>
          <div className="weekday-label-custom">Mié</div>
          <div className="weekday-label-custom">Jue</div>
          <div className="weekday-label-custom">Vie</div>
          <div className="weekday-label-custom">Sáb</div>
          <div className="weekday-label-custom">Dom</div>
        </div>

        <div className="days-grid-custom">
          {gridCells.map(({ date, isOtherMonth }, index) => {
            const available = isAvailableDay(date);
            const isToday = sameDay(date, today);
            const isSelected = selectedDay && sameDay(date, selectedDay);
            const dayOfWeek = date.getDay();
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

            let cellClass = "day-cell-custom";
            if (isOtherMonth) cellClass += " other-month-custom";
            if (isWeekend) cellClass += " weekend-day-custom";
            if (isToday) cellClass += " today-day-custom";
            if (isSelected) cellClass += " selected-day-custom";

            return (
              <button
                type="button"
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${index}`}
                className={cellClass}
                disabled={!available}
                onClick={() => selectDay(date)}
              >
                <span className="day-number-custom">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN DE ELECCIÓN DE HORAS (SE MUESTRA DEBAJO AL SELECCIONAR UN DÍA) */}
      {selectedDay && (
        <div className="hours-section-custom">
          <header className="hours-header-custom">
            <h4 className="hours-title-custom">Horas disponibles</h4>
            <p className="hours-subtitle-custom">
              Para el <strong>{selectedDayLabel}</strong> ({rule})
              {loadingAvailability ? " Revisando disponibilidad..." : ""}
            </p>
          </header>

          <div className="hours-grid-custom">
            {hours.map((hour) => {
              const occupied = isOccupied(selectedDay, hour);
              const isHourSelected = selectedHour === hour;

              return (
                <button
                  type="button"
                  key={hour}
                  className={`hour-pill-custom${isHourSelected ? " selected-hour-custom" : ""}`}
                  disabled={occupied}
                  onClick={() => selectHour(hour)}
                >
                  <span>{hour}</span>
                  <span className="hour-status-label-custom">
                    {occupied ? "Ocupado" : "Libre"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* INPUTS OCULTOS NATIVOS DE LA CLÍNICA PARA FORMULARIO */}
      <input type="hidden" name="date" value={selectedDay ? formatDate(selectedDay) : ""} />
      <input type="hidden" name="hour" value={selectedHour ?? ""} />

      {/* TEXTO DE SELECCIÓN ELEGANTE */}
      <p className="selection-info-custom">
        {selectedDay && selectedHour
          ? `Seleccionado: ${selectedDay.toLocaleDateString("es-ES", { day: "numeric", month: "long" })} a las ${selectedHour}.`
          : "Selecciona primero un día disponible y después una hora libre."}
      </p>
    </div>
  );
}
