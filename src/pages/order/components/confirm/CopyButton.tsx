import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={() => handleCopy(value)}
      className="inline-flex items-center gap-2 px-4 py-2 border border-[#d6d0c4] text-sm font-serif rounded hover:bg-[#f2f0eb] transition-colors"
    >
      <>
        {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
        {copied ? "Copiado" : label}
      </>
    </button>
  );
};

export default CopyButton;
