import { Header } from './Header';
import { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { arrayMove } from '@dnd-kit/sortable';
import { LocationGrid } from './LocationGrid';
import { Sidebar } from './SideBar';
import { MapView } from './MapView';
import { SettingsView } from './SettingsView';
import { LocationFormModal } from './LocationFormModal';
import { ConfirmationModal } from './ConfirmationModel';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('Dashboard');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [locationToEdit, setLocationToEdit] = useState(null);

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const savedLocations = localStorage.getItem('travel-dashboard-locations');
        if (savedLocations && JSON.parse(savedLocations).length > 0) {
          setLocations(JSON.parse(savedLocations));
        } else {
          // If no saved data, fetch from the "API"
          const response = await fetch('/mockLocations.json');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setLocations(data);
        }
      } catch (error) {
        console.error("Failed to fetch initial locations:", error);
        // Fallback to an empty array in case of fetch or parse errors
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save locations to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) { // Avoid saving the initial empty state during load
      localStorage.setItem('travel-dashboard-locations', JSON.stringify(locations));
    }
  }, [locations, isLoading]);
  const handleSaveLocation = (locationData) => {
    const isEditing = !!locationData.id;

    if (isEditing) {
      setLocations(prevLocations => 
        prevLocations.map(loc => 
          loc.id === locationData.id ? { ...loc, ...locationData } : loc
        )
      );
    } else {
      // Adicionando um novo local
      const newLocation = { ...locationData, id: Date.now(), bandeira: '🏳️' };
      setLocations(prevLocations => [newLocation, ...prevLocations]);
    }
    setLocationToEdit(null);
  };

  const handleDeleteLocation = (locationId) => {
    setLocationToDelete(locationId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteLocation = () => {
    if (locationToDelete) {
      setLocations(prevLocations => prevLocations.filter(location => location.id !== locationToDelete));
    }
    setIsConfirmModalOpen(false);
    setLocationToDelete(null);
  };

  const handleEditLocation = (location) => {
    setLocationToEdit(location);
    setIsFormModalOpen(true);
  };

  const handleReorderLocations = (oldIndex, newIndex) => {
    setLocations((prevLocations) => {
      return arrayMove(prevLocations, oldIndex, newIndex);
    });
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'Dashboard':
      case 'Locais':
        return <LocationGrid searchTerm={searchTerm} locations={locations} isLoading={isLoading} onDeleteLocation={handleDeleteLocation} onEditLocation={handleEditLocation} onReorder={handleReorderLocations} />;
      case 'Mapa':
        return <MapView />;
      case 'Configurações':
        return <SettingsView />;
      default:
        return <LocationGrid searchTerm={searchTerm} />;
    }
  };

  return (
    <div className="flex min-h-screen text-white font-sans">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <Header 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            onAddClick={() => { setLocationToEdit(null); setIsFormModalOpen(true); }} 
          />
          <div className="mt-8">
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={activeView}
                addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                classNames="fade"
              >
                {renderActiveView()}
              </CSSTransition>
            </SwitchTransition>
          </div>
        </main>
      </div>
      <LocationFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        onSave={handleSaveLocation}
        editingLocation={locationToEdit}
      />
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteLocation}
        title="Confirmar Exclusão"
        message="Você tem certeza que deseja deletar este local? Esta ação não pode ser desfeita."
      />
    </div>
  )
}
