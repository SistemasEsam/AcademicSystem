export function Logout(){


const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idDocente");
    localStorage.removeItem("docenteNombre");
    localStorage.removeItem("docenteApellidoPaterno");
    localStorage.removeItem("idRol");
    window.location.href = "/login";
  };
 

  return (
    <div>
    
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}