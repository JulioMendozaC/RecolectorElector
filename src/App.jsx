
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Inicio } from "./Pages/Inicio";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./ProtectedRoute";
import { DataProvider } from "./context/dataContext";
import { Sidebar } from "./components/Common/Sidebar";
import { Promovido } from "./Pages/Recolector/Promovido";
import { Promotores } from "./Pages/Recolector/Promotores";
import { Colaboradores } from "./Pages/Recolector/Colaboradores";
import { Secciones } from "./Pages/Recolector/Secciones";

export const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/Inicio" element={<Inicio />} />
              <Route path="/Promotores" element={<Promotores />} />
              <Route path="/Colaboradores" element={<Colaboradores />} />
              <Route path="/Secciones" element={<Secciones />} />
              <Route path="/Promovido" element={<Promovido />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  )
}
