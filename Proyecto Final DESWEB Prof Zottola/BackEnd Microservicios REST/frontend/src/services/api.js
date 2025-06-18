const API_URL = "http://localhost:3001"; // Ajustá si tu backend cambia

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);
  if (res.status === 401) {
    // Podés redirigir o borrar token si el backend responde 401
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error de servidor");
  return data;
};
