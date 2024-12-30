import React, { useState } from "react";

const styles = {
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "900px", // Ajustando el ancho
    height: "800px",
    overflow: "hidden",
    position: "relative",
  },
  formContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem", // Espaciado uniforme entre inputs y botón
    width: "50%", // Ancho más amplio para el formulario
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "85%", // Asegura que los inputs ocupen todo el ancho del contenedor
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    marginTop: "1rem",
  },
};

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

        // Redirigir al dashboard
        window.location.href = "/dashboardDoc";
      } else {
        setError(data.error || "Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error al hacer login:", err);
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div style={styles.imageContainer}>
      <img src="/images/esam-cover.jpeg" alt="ESAM Cover" />
      <div style={styles.formContainer}>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </form>
        {error && <p style={styles.errorMessage}>{error}</p>} {/* Mostrar mensaje de error */}
      </div>
    </div>
  );
};
