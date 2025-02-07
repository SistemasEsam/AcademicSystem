import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./login.css";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Verificar si el token ya existe en el localStorage
    const token = localStorage.getItem("token");
    const idRol = localStorage.getItem("idRol");
    if (token) {
      if (idRol == 4) {
        // Redirigir al dashboard si el token existe
        window.location.href = "/dashboardDoc";
      } else if (idRol == 2 || idRol == 3) {
        window.location.href = "/";
      }
    }
  }, []); // Solo se ejecuta al montar el componente

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en localStorage
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const idRol = decodedToken.idRol;
        if (idRol == 4) {
          // Redirigir al dashboard si el token existe
          window.location.href = "/dashboardDoc";
        } else if (idRol == 2 || idRol == 3) {
          window.location.href = "/";
        }
      } else {
        setError(data.error || "Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error al hacer login:", err);
      setError("Hubo un error al procesar la solicitud.");
    }
  };
  const handleRegister = () => {
    window.location.href = "/login/registro/indexRegistro";
  };
  return (
    <div className="login-container">
      <div className="login-image"></div>
          <div className="login-box">
            <h1 className="login-title">Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </form>
            {error && <p className="login-error">{error}</p>}
            <p className="register-text">
              ¿No tienes una cuenta?{" "}
              <span className="register-link" onClick={handleRegister}>
                REGÍSTRATE
              </span>
            </p>
          </div>
        </div>
  );
};
