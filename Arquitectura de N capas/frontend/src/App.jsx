import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import './index.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PanelPaciente from "./components/Paciente/PanelPaciente";
import PanelProfesional from "./components/Profesional/PanelProfesional";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import AgendarTurno from "./components/Paciente/AgendarTurno";
import MisTurnos from "./components/Paciente/MisTurnos";
import AgendaProfesional from "./components/Profesional/AgendaProfesional";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

           {/* Panel Paciente */}
          <Route element={<PrivateRoute allowedRoles={["PACIENTE"]} />}>
            <Route path="/panel-paciente/*" element={<PanelPaciente />}>
              <Route path="agendar" element={<AgendarTurno />} />
              <Route path="turnos" element={<MisTurnos />} />
            </Route>
          </Route>

          {/* Panel Profesional */}
          <Route element={<PrivateRoute allowedRoles={["PROFESIONAL"]} />}>
            <Route path="/panel-profesional/*" element={<PanelProfesional />}>
              <Route path="agenda" element={<AgendaProfesional />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
