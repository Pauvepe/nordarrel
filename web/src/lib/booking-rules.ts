// =====================================================================
// REGLAS DE HORARIO DE RESERVA
// ---------------------------------------------------------------------
// Define que dias y horas se pueden reservar para cada tipo:
//   - diagnostico: solo martes y jueves, en unas horas concretas.
//   - cita: de lunes a viernes, con mas horas.
// isValidSlot() comprueba que la fecha sea con 2 dias de margen, en un
// dia valido y a una hora valida. Lo usa la API /api/appointments para
// no fiarse solo del navegador (se valida tambien en el servidor).
// =====================================================================
export type BookingMode = "diagnostico" | "cita";

export const bookingHours: Record<BookingMode, string[]> = {
  diagnostico: ["10:00", "10:45", "11:30", "12:15", "16:00", "16:45", "17:30", "18:15"],
  cita: ["09:30", "10:15", "11:00", "11:45", "12:30", "13:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45"],
};

export function isAvailableWeekday(mode: BookingMode, isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  const day = date.getDay();
  if (mode === "diagnostico") return day === 2 || day === 4;
  return day >= 1 && day <= 5;
}

export function isValidSlot(mode: BookingMode, isoDate: string, hour: string) {
  const today = new Date();
  const minimum = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  const date = new Date(`${isoDate}T12:00:00`);

  return date >= minimum && isAvailableWeekday(mode, isoDate) && bookingHours[mode].includes(hour);
}
