interface Props {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ open, message, onConfirm, onCancel }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center space-y-4 font-serif">
        <p className="text-lg text-gray-700">{message}</p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onConfirm}
            className="btn-cremita btn-cremita-primario px-4 py-2"
          >
            Aceptar
          </button>
          <button
            onClick={onCancel}
            className="btn-cremita btn-cremita-secundario px-4 py-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
