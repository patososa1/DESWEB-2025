import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const MisTurnos = () => {
  const { user } = useUser();
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTurnosYProfesionales = async () => {
    try {
      setLoading(true);
      // Paso 1: Traer los turnos
      const resTurnos = await fetch(`http://localhost:3000/api/turnos/paciente/${user.id}`);
      if (!resTurnos.ok) throw new Error("Error al obtener turnos");
      const dataTurnos = await resTurnos.json();

      // Paso 2: Obtener IDs únicos de profesionales
      const profesionalesIds = [...new Set(dataTurnos.map(t => t.profesionalId))];

      // Paso 3: Traer datos de profesionales en paralelo
      const profesionalesData = await Promise.all(
        profesionalesIds.map(id =>
          fetch(`http://localhost:3000/api/usuarios/${id}`).then(res => {
            if (!res.ok) throw new Error("Error al obtener profesional con id " + id);
            return res.json();
          })
        )
      );

      // Crear un mapa para búsqueda rápida
      const profesionalesMap = new Map(profesionalesData.map(p => [p.id, p]));

      // Paso 4: Asociar datos de profesional a cada turno
      const turnosConProfesional = dataTurnos.map(turno => ({
        ...turno,
        profesional: profesionalesMap.get(turno.profesionalId) || null,
      }));

      setTurnos(turnosConProfesional);
    } catch (error) {
      console.error("Error cargando turnos y profesionales:", error);
      setTurnos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTurnosYProfesionales();
    }
  }, [user]);

  const cancelarTurno = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés cancelar este turno?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/turnos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "CANCELADO" }),
      });

      if (!res.ok) throw new Error("Error al cancelar turno");

      await fetchTurnosYProfesionales();
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      alert("No se pudo cancelar el turno.");
    }
  };

  if (loading) return <p className="text-center">Cargando turnos...</p>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Mis Turnos</h2>
        {turnos.length === 0 ? (
          <p className="text-center">No tenés turnos agendados.</p>
        ) : (
          <ul className="space-y-4">
            {turnos.map((turno) => (
              <li key={turno.id} className="border border-gray-300 rounded p-4 shadow-sm">
                <p><strong>Profesional:</strong> {turno.profesional ? turno.profesional.nombre : "Desconocido"}</p>
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
