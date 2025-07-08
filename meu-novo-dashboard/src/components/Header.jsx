import { Plus, Search } from 'lucide-react';

export function Header({ searchTerm, onSearchChange, onAddClick }) {
  return (
    <header className="flex justify-between items-center text-white">
      {/* Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Buscar locais..."
          className="
            bg-white/10 
            border 
            border-white/20 
            rounded-lg 
            py-2 
            pl-10 
            pr-4 
            w-96
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-400
            placeholder:text-neutral-400
          "
        />
      </div>
      
      {/* Add Button */}
      <button 
        onClick={onAddClick}
        className="
        flex 
        items-center 
        gap-2
        py-2 
        px-4
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
        <Plus size={20} />
        <span>Adicionar Local</span>
      </button>
    </header>
  );
}
