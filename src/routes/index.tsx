import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import LocationsPage from "../pages/LocationsPage";
import Layout from "../components/Layout";
import WarehousePage from "../pages/WarehousePage";
import LicensePage from "../pages/LicensePage";
import MovementsPage from "../pages/MovementsPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/locations",
            element: <LocationsPage />,
          },
          {
            path: "/warehouse",
            element: <WarehousePage />,
          },
          {
            path: "/licenses",
            element: <LicensePage />,
          },
          {
            path: "/movements",
            element: <MovementsPage />,
          },
          {
            index: true, // Redirige a dashboard cuando se accede a la raíz
            element: <Navigate to="/dashboard" replace />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
