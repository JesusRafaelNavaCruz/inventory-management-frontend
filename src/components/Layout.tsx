import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Toolbar />
        <main className='flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6'>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>      
    </div>
  ) 
}
