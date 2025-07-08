import { Trash2, Pencil } from 'lucide-react';

export function LocationCard({ id, pais, bandeira, imagemURL, onDelete, onEdit }) {
  return (
    <div className="
      relative
      group
      bg-white/10
      backdrop-blur-lg
      rounded-2xl
      p-4
      border
      border-white/20
      shadow-lg
      flex
      flex-col
      gap-4
      transition-all
      duration-300
      hover:border-white/40
      hover:-translate-y-1
    ">
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={() => onEdit({ id, pais, bandeira, imagemURL })}
          className="
            p-1.5 
            bg-blue-600/70 
            hover:bg-blue-500 
            rounded-full 
            text-white 
            focus:opacity-100
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
          aria-label={`Editar ${pais}`}
        >
          <Pencil size={16} />
        </button>
        <button 
          onClick={() => onDelete(id)}
          className="
            p-1.5 
            bg-red-600/70 
            hover:bg-red-500 
            rounded-full 
            text-white 
            focus:opacity-100
            focus:outline-none
            focus:ring-2
            focus:ring-red-400
          "
          aria-label={`Deletar ${pais}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">{bandeira}</span>
        <h3 className="font-semibold text-lg">{pais}</h3>
      </div>

      <div className="flex-grow">
        <img 
          src={imagemURL} 
          alt={`Paisagem de ${pais}`} 
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <button className="
        w-full 
        py-2 
        bg-indigo-600 
        rounded-lg 
        font-semibold 
        hover:bg-indigo-500 
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-400
        focus:ring-opacity-75
      ">
        GERENCIAR
      </button>
    </div>
  );
}