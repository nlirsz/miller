import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableLocationCard } from './SortableLocationCard.jsx';
import { LocationCardSkeleton } from './LocationCardSkeleton.jsx';

export function LocationGrid({ searchTerm, locations, isLoading, onDeleteLocation, onEditLocation, onReorder }) {
  const filteredLocations = locations.filter(location => 
    location.pais.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sensors = useSensors(useSensor(PointerSensor));

  if (isLoading) {
        return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <LocationCardSkeleton key={index} />
        ))}
      </div>
    );
  }


function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = locations.findIndex((loc) => loc.id === active.id);
      const newIndex = locations.findIndex((loc) => loc.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  }

  return (
<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={locations.map(loc => loc.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <SortableLocationCard 
                key={location.id}
                id={location.id}
                pais={location.pais}
                bandeira={location.bandeira}
                imagemURL={location.imagemURL}
                onDelete={onDeleteLocation}
                onEdit={onEditLocation}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-neutral-400 text-lg mt-8">
              Nenhum local encontrado para "{searchTerm}".
            </p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
