import { Apple, ChevronLeft, ChevronRight, Gauge, X } from "lucide-react";
import React, { useState } from "react";

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

function Sidebar(sidebarProps: SidebarProps) {
  const [isOpen, setIsOpen] = useState();

  const menuItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Gauge,
      path: '/dashboard'
    }
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg-hidden" />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <div
                className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                    hover:bg-gray-800 
                    }
                  `}
              >
                <div className="flex items-center space-x-3">
                  <Apple className="h-5 w-5" />
                  <span className="text-sm font-medium">Lorem, ipsum.</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform`}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
