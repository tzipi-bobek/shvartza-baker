import { useState } from "react";

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const generalTimes = ["10:30", "12:30", "16:00"];
const timesByDay: Record<string, string[]> = {
  Lunes: generalTimes,
  Martes: generalTimes,
  Miércoles: generalTimes,
  Jueves: generalTimes,
  Viernes: ["10:30"],
  Sábado: ["21:00"],
  Domingo: generalTimes,
};

export const useDeliveryDate = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const updateAvailableTimes = (newDate: string) => {
    const [y, m, d] = newDate.split("-").map(Number);
    const dayName = dayNames[new Date(y, m - 1, d).getDay()];

    setDate(newDate);
    setTime("");
    setAvailableTimes(timesByDay[dayName] ?? []);
    return { valid: true };
  };

  const formatDelivery = (dateParam = date, timeParam = time) => {
    if (!dateParam || !timeParam) return "";
    const [y, m, d] = dateParam.split("-");
    const day = new Date(Number(y), Number(m) - 1, Number(d));
    const dayName = dayNames[day.getDay()];
    const dd = String(day.getDate()).padStart(2, "0");
    const mm = String(day.getMonth() + 1).padStart(2, "0");
    return `${dayName} ${dd}/${mm} ${timeParam}`;
  };

  return {
    date,
    time,
    availableTimes,
    setTime,
    updateAvailableTimes,
    formatDelivery,
  };
};
