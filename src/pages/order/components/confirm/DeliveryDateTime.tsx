import { useState } from "react";
import { useDeliveryDate } from "@pages/order/hooks";

interface DeliveryDateTimeProps {
  onChange: (formattedDate: string) => void;
}

const DeliveryDateTime = ({ onChange }: DeliveryDateTimeProps) => {
  const {
    date,
    time,
    availableTimes,
    setTime,
    updateAvailableTimes,
    formatDelivery,
  } = useDeliveryDate();

  const [error, setError] = useState("");

  const today = new Date();
  const max = new Date();
  max.setDate(max.getDate() + 14);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const minDate = fmt(today);
  const maxDate = fmt(max);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const selectedDate = new Date(newDate);

    if (selectedDate > max) {
      setError("La fecha seleccionada supera el límite de dos semanas.");
      onChange("");
      return;
    } else if (selectedDate < today) {
      setError("La fecha seleccionada no puede ser anterior a hoy.");
      onChange("");
      return;
    }

    setError("");
    updateAvailableTimes(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    onChange(newTime ? formatDelivery(date, newTime) : "");
  };

  return (
    <div>
      <label htmlFor="delivery-date" className="block mt-4 mb-2">Día de entrega:</label>
      <input
        id="delivery-date"
        type="date"
        value={date}
        onChange={handleDateChange}
        required
        min={minDate}
        max={maxDate}
        className="input-cremita"
      />

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      <label htmlFor="delivery-time" className="block mt-4 mb-2">Horario:</label>
      <select
        id="delivery-time"
        value={time}
        onChange={handleTimeChange}
        disabled={!availableTimes.length}
        required
        className="input-cremita"
      >
        <option value="">Seleccionar horario</option>
        {availableTimes.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      {date && time && (
        <p className="text-sm mt-2 mb-4 font-semibold">
          Entrega: {formatDelivery()}
        </p>
      )}
    </div>
  );
};

export default DeliveryDateTime;
