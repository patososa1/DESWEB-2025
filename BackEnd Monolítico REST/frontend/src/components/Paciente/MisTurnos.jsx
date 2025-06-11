import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const MisTurnos = () => {
  const { user } = useUser();
  const [turnos, setTurnos] = useState([]);

  const fetchTurnos = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/turnos/paciente/${user.id}`);
      const data = await res.json();
      setTurnos(data);
    } catch (err) {
      console.error("Error al obtener turnos del paciente:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTurnos();
    }
  }, [user]);

  const cancelarTurno = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés cancelar este turno?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/turnos/${id}`, {
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
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Mis Turnos</h2>
        {turnos.length === 0 ? (
          <p className="text-center">No tenés turnos agendados.</p>
        ) : (
          <ul className="space-y-4">
            {turnos.map((turno) => (
              <li
                key={turno.id}
                className="border border-gray-300 rounded p-4 shadow-sm"
              >
                <p><strong>Profesional:</strong> {turno.profesional?.nombre}</p>
                <p><strong>Fecha:</strong> {new Date(turno.fecha).toLocaleString()}</p>
                <p><strong>Estado:</strong> {turno.estado}</p>
                {turno.estado === "PENDIENTE" && (
                  <button
                    onClick={() => cancelarTurno(turno.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Cancelar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MisTurnos;
