import { CSSTransition } from 'react-transition-group';
import { X, AlertTriangle } from 'lucide-react';

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="modal-backdrop"
      unmountOnExit
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={onClose}
      >
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="modal-content"
          unmountOnExit
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg w-full max-w-md text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:bg-white/10 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-neutral-300 mt-2">{message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors">
                Cancelar
              </button>
              <button type="button" onClick={onConfirm} className="py-2 px-4 bg-red-600 rounded-lg font-semibold hover:bg-red-500 transition-colors">
                Deletar
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}