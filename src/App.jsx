
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Inicio } from "./Pages/Inicio";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./ProtectedRoute";
import { DataProvider } from "./context/dataContext";


export const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/Inicio" element={<Inicio />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  )
}
