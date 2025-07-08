import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { X } from 'lucide-react';

export function AddLocationModal({ isOpen, onClose, onAddLocation }) {
  const [pais, setPais] = useState('');
  const [imagemURL, setImagemURL] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!pais.trim()) newErrors.pais = "O nome do país é obrigatório.";
    if (!imagemURL.trim()) {
      newErrors.imagemURL = "A URL da imagem é obrigatória.";
    } else {
      try {
        new URL(imagemURL);
      } catch (_) {
        newErrors.imagemURL = "Por favor, insira uma URL válida.";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddLocation({
      pais,
      imagemURL,
    });
    
    // Limpa o formulário e fecha o modal
    handleClose();
  };

  const handleClose = () => {
    setPais('');
    setImagemURL('');
    setErrors({});
    onClose(); // Chama a função original passada por props
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="modal-backdrop"
      unmountOnExit
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={handleClose}
      >
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="modal-content"
          unmountOnExit
        >
          <div
            className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Adicionar Novo Local</h2>
              <button onClick={handleClose} className="p-2 rounded-full text-neutral-400 hover:bg-white/20 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="pais" className="block text-sm font-medium text-neutral-300 mb-1">País</label>
                <input
                  type="text"
                  id="pais"
                  autoComplete="off"
                  value={pais}
                  onChange={(e) => {
                    setPais(e.target.value);
                    if (errors.pais) setErrors(prev => ({ ...prev, pais: null }));
                  }}
                  placeholder="Ex: Brasil"
                  className={`
                    w-full bg-white/5 border rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400
                    ${errors.pais ? 'border-red-500' : 'border-white/20'}
                  `}
                />
                {errors.pais && <p className="text-red-400 text-sm mt-1">{errors.pais}</p>}
              </div>
              <div>
                <label htmlFor="imagemURL" className="block text-sm font-medium text-neutral-300 mb-1">URL da Imagem</label>
                <input
                  type="text"
                  id="imagemURL"
                  autoComplete="off"
                  value={imagemURL}
                  onChange={(e) => {
                    setImagemURL(e.target.value);
                    if (errors.imagemURL) setErrors(prev => ({ ...prev, imagemURL: null }));
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className={`
                    w-full bg-white/5 border rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400
                    ${errors.imagemURL ? 'border-red-500' : 'border-white/20'}
                  `}
                />
                {errors.imagemURL && <p className="text-red-400 text-sm mt-1">{errors.imagemURL}</p>}
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={handleClose} className="py-2 px-4 rounded-lg text-white hover:bg-white/10 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="py-2 px-4 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
                  Salvar Local
                </button>
              </div>
            </form>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}