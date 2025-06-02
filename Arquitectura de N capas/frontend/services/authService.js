const API_URL = "http://localhost:3000"; // Cambia si usás otro puerto

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
  return data;
};

export const register = async (nombre, email, password, rol) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password, rol }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al registrar");
  return data;
};
