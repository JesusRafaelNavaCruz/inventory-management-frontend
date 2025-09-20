import React from "react";
import Card from "../components/Card";
import { DollarSign, MapPinHouse, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Usuarios",
      value: "1,234",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Ubicaciones",
      value: "567",
      icon: MapPinHouse,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Ventas Mensuales",
      value: "$45,678",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Crecimiento",
      value: "+12.5%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

            {/* Gráficos y tablas recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Actividad Reciente" className="lg:col-span-2">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Gráfico de actividad aquí</p>
          </div>
        </Card>

        <Card title="Últimos Usuarios">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Usuario {item}</p>
                    <p className="text-xs text-gray-500">user{item}@email.com</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Activo
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
