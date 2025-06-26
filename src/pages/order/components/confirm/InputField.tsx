interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const InputField = ({ label, value, placeholder, onChange }: InputFieldProps) => {
  const inputId = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/:$/, "");

  return (
    <>
      <label htmlFor={inputId} className="block mt-4 mb-2">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input-cremita"
        required
      />
    </>
  );
};

export default InputField;
