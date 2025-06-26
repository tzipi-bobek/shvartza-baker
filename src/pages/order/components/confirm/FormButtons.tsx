import { CheckCircle, XCircle } from "lucide-react";

interface FormButtonsProps {
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  sending?: boolean;
  ready?: boolean;
}

const FormButtons = ({
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  sending = false,
  ready = true,
}: FormButtonsProps) => {
  return (
    <div className="flex gap-4 mt-4">
      <button
        type="submit"
        disabled={!ready || sending}
        className={`px-4 py-2 rounded-md flex items-center w-full justify-center
          ${ready
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {sending ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <CheckCircle className="mr-2" /> {confirmText}
          </>
        )}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
      >
        <XCircle className="mr-2" /> {cancelText}
      </button>
    </div>
  );
};

export default FormButtons;
