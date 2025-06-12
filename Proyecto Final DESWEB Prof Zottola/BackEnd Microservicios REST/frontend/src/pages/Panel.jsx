import { useUser } from "../context/UserContext";

const Panel = () => {
  const { user, logout } = useUser();

  return (
    <div>
      <h1>Hola {user?.nombre}</h1>
      <p>Rol: {user?.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Panel;
