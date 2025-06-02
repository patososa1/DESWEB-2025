import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const AgendarTurno = () => {
  const { user } = useUser();
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalId, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios?rol=PROFESIONAL");
        const data = await res.json();
        setProfesionales(data);
      } catch (err) {
        console.error("Error al cargar profesionales:", err);
        setError("No se pudieron cargar los profesionales.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfesionales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profesionalId || !fecha) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pacienteId: user.id,
          profesionalId: Number(profesionalId),
          fecha: new Date(fecha),
        }),
      });

      if (!res.ok) throw new Error("Error al crear turno");

      alert("Turno creado correctamente");
      setFecha("");
      setProfesionalId("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el turno.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <p>Cargando profesionales...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[360px] bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Agendar un turno</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block text-gray-700 font-medium">Profesional:</label>
          <select
            value={profesionalId}
            onChange={(e) => setProfesionalId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Seleccione un profesional</option>
            {profesionales.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nombre}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 font-medium">Fecha y Hora:</label>
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition shadow"
          >
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgendarTurno;
