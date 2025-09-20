import {
  ArrowRightLeft,
  ChevronDown,
  Gauge,
  KeyRound,
  MapPin,
  Warehouse,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Icons } from "./Icons";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({isOpen, onClose}: SidebarProps) {

  const menuItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Gauge,
      path: "/dashboard",
    },
    {
      id: "warehouse",
      label: "Inventario",
      icon: Warehouse,
      path: "/warehouse",
    },
    {
      id: "license",
      label: "Licencias",
      icon: KeyRound,
      path: "/licenses",
    },
    {
      id: "location",
      label: "Ubicaciones",
      icon: MapPin,
      path: "/locations",
    },
    {
      id: "movements",
      label: "Asignaciones",
      icon: ArrowRightLeft,
      path: "/movements",
    },
  ];

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    })
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg-hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <Icons.InventaProIcon width={150} height={50} fill="#ffffff" />
          </div>
          <button onClick={onClose} className="lg:hidden p-2 rounded-md hover:bg-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <div
                  onClick={() => item.children ? toggleItem(item.id) : navigate(`${item.path}`)}
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                    hover:bg-gray-800 hover:text-white
                    ${!item.children ? 'hover:bg-gray-800' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  {item.children && (
                    <ChevronDown
                      className={`
                        h-4 w-4 transition-transform duration-200 flex-shrink-0
                        ${expandedItems.has(item.id) ? 'rotate-180' : ''}
                      `}
                    />
                  )}
                </div>

                {item.children && expandedItems.has(item.id) && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-3">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={child.path}
                          className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                        >
                          <child.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">{child.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-800">
          <div className="text-center text-xs text-gray-400">
            v1.0.0 © 2024 Admin InventaPro
          </div>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
