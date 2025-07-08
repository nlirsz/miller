import { LayoutDashboard, Map, MapPin, Settings, Plane } from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { icon: <MapPin size={20} />, label: 'Locais' },
  { icon: <Map size={20} />, label: 'Mapa' },
  { icon: <Settings size={20} />, label: 'Configurações' },
];

export function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="
      w-64 
      p-6 
      flex 
      flex-col 
      gap-8
      bg-white/10 
      backdrop-blur-lg 
      border-r
      border-white/20
    ">
      {/* Logo */}
      <div className="flex items-center gap-3 text-2xl font-bold text-white">
        <Plane size={32} />
        <span>TravelDash</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.label);
                }}
                href="#" 
                className={`
                  flex 
                  items-center 
                  gap-4 
                  p-3 
                  rounded-lg 
                  text-neutral-300 
                  hover:bg-white/20 
                  hover:text-white
                  transition-colors
                  ${activeView === item.label ? 'bg-white/20 text-white' : ''}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/20 pt-6">
        <div className="flex items-center gap-4">
          <img 
            src="https://i.pravatar.cc/40?u=nicole" 
            alt="Avatar do usuário"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-white">Nicole Miller</p>
            <p className="text-sm text-neutral-400">nicole.m@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}