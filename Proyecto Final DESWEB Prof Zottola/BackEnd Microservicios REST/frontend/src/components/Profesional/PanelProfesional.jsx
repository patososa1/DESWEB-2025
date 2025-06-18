import { Link, Outlet, useLocation } from "react-router-dom";

export default function PanelProfesional() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Panel del Profesional
        </h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/panel-profesional/agenda"
            className={`px-6 py-2 rounded-md text-sm transition ${
              isActive("/panel-profesional/agenda")
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Agenda
          </Link>
        </nav>
      </aside>

      {/* Contenido centrado horizontalmente */}
      <main className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
