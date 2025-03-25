
import './Logout.css'; // Ajusta la ruta

export function Logout() {
  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("idDocente");
    localStorage.removeItem("docenteNombre");
    localStorage.removeItem("docenteApellidoPaterno");
    localStorage.removeItem("idRol");
    window.location.href = "/login";
  };

  return (
    <div className="logout-container">
      <button 
        onClick={handleLogout} 
        className="logout-button"
        aria-label="Cerrar sesión"
      ></button>
    </div>
  );
}