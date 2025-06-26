interface SelectFieldProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SelectField = ({
  id,
  label,
  options,
  selectedValue,
  onChange,
}: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <select
        id={id}
        className="input-cremita"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
