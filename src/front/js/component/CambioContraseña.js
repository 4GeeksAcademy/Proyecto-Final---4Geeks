import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CambioContraseña = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const  id  = localStorage.getItem("id")
    const [password, setPassword ] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Estado para almacenar el mensaje de error
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden"); // Establece el mensaje de error si las contraseñas no coinciden
        } else {
            actions.changePassword(password, id);
            setPassword("");
            setConfirmPassword("");
            setFormSubmitted(true); 
            setTimeout(() => {
                const userType = localStorage.getItem("userType");
                const userId = localStorage.getItem("id");
            
                if (userType && (userType === "doctor" || userType === "patient") && userId) {
                    navigate(`/${userType === "doctor" ? 'privatedoctor' : "PrivatePatient"}`);

                } else {
                    console.error("Tipo de usuario o ID de usuario no reconocido");
                }
            }, 3000);
            setError(""); // Limpia el mensaje de error si las contraseñas coinciden
        }
    };

return (
    <>
        <div className="container" style={{ marginTop: "30px" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword (e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
                <div className="d-flex justify-content-around">
                    <button type="submit" className="btn btn-primario">Actualizar</button>
                    <Link to={"/"}>
                        <button className="btn btn-secundario">Volver a Inicio</button>
                    </Link>
                </div>
                {formSubmitted && (
                        <div className="popup text-center">
                            <p>¡Actualización exitosa!</p>
                        </div>
                    )}
            </form>
        </div>
    </>
);
};