
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Inicio } from "./Pages/Inicio";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./ProtectedRoute";
import { DataProvider } from "./context/dataContext";
import { PromotorProvider } from "./context/promotorContext";
import { CoordinadorProvider } from "./context/coordinadorContext";
import { SeccionProvider } from "./context/seccionContext";
import { Sidebar } from "./components/Common/Sidebar";
import { Promovido } from "./Pages/Recolector/Promovido";
import { Promotores } from "./Pages/Recolector/Promotores";
import { Coordinadores } from "./Pages/Recolector/Coordinadores";
import { Secciones } from "./Pages/Recolector/Secciones";
import { Charts } from "./Pages/Estadisticas/GeneralCharts";
import { SeccionCharts } from "./Pages/Estadisticas/SeccionCharts";
import { Users } from "./Pages/Recolector/Users";

export const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <PromotorProvider>
          <SeccionProvider>
            <CoordinadorProvider>
              <BrowserRouter>
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/Login" element={<Login />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/Promotores" element={<Promotores />} />
                    <Route path="/Coordinadores" element={<Coordinadores />} />
                    <Route path="/Secciones" element={<Secciones />} />
                    <Route path="/Promovido" element={<Promovido />} />
                    <Route path="/Charts" element={<Charts />} />
                    <Route path="/SeccionCharts" element={<SeccionCharts />} />
                    <Route path="/Users" element={<Users />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CoordinadorProvider>
          </SeccionProvider>
        </PromotorProvider>
      </DataProvider>
    </AuthProvider >
  )
}
