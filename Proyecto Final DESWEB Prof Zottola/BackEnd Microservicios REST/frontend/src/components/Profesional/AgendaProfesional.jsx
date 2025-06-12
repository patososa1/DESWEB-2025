import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const AgendaProfesional = () => {
  const { user } = useUser();
  const [turnos, setTurnos] = useState([]);

  const fetchTurnos = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/turnos/profesional/${user.id}`);
      if (!res.ok) throw new Error("Error al obtener turnos");
      const data = await res.json();
      setTurnos(data);
    } catch (err) {
      console.error("Error al obtener turnos:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTurnos();
    }
  }, [user]);

  const confirmarTurno = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/turnos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "CONFIRMADO" }),
      });

      if (!res.ok) throw new Error("Error al confirmar turno");

      await fetchTurnos();
    } catch (error) {
      console.error("Error al confirmar turno:", error);
      alert("No se pudo confirmar el turno.");
    }
  };

  const cancelarTurno = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/turnos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "CANCELADO" }),
      });

      if (!res.ok) throw new Error("Error al cancelar turno");

      await fetchTurnos();
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      alert("No se pudo cancelar el turno.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Agenda</h2>

      {turnos.length === 0 ? (
        <p className="text-center text-gray-500">No tenés turnos agendados.</p>
      ) : (
        <ul className="space-y-6">
          {turnos.map((turno) => (
            <li
              key={turno.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div className="mb-4 md:mb-0">
                <p>
                  <span className="font-semibold text-gray-700">Paciente:</span> {turno.paciente?.nombre}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Fecha:</span>{" "}
                  {new Date(turno.fecha).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Estado:</span>{" "}
                  <span
                    className={`font-medium ${
                      turno.estado === "CONFIRMADO"
                        ? "text-green-600"
                        : turno.estado === "CANCELADO"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {turno.estado}
                  </span>
                </p>
              </div>

              {turno.estado === "PENDIENTE" && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => confirmarTurno(turno.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => cancelarTurno(turno.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgendaProfesional;
