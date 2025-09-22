import { Plus, Search } from "lucide-react";
import React from "react";
import Card from "../components/Card";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const columns = [
	{
		name: 'Title',
		selector: (row:any) => row.title,
	},
	{
		name: 'Year',
		selector: (row: any) => row.year,
	},
];

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]

export default function WarehousePage() {
  const navigate = useNavigate()
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-600">Gestión de articulos</p>
        </div>
        <button onClick={() => navigate("/warehouseform")} className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus />
          Nuevo Articulo
        </button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar articulo..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <select
            name=""
            id=""
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Seleccione categoria</option>
          </select>
        </div>
      </Card>

      {/* Datagrid */}
      <Card title="Lista de Articúlos">
        <DataTable columns={columns} data={data} pagination />
      </Card>
    </div>
  );
}
