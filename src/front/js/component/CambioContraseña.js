import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CambioContraseña = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const id = localStorage.getItem("id");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false); // Variable para rastrear si se ha enviado el formulario

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true); // Se marca como enviado el formulario
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setSuccess(false);
        } else {
            actions.changePassword(password, id)
                .then(() => {
                    setSuccess(true);
                    setPassword("");
                    setConfirmPassword("");
                    setTimeout(() => navigate(-1), 3000);
                })
                .catch((error) => {
                    setError("Error al cambiar la contraseña: " + error.message);
                    setSuccess(false);
                });
        }
    };

    const handleGoBack = () => {
        setError(""); // Limpiar el mensaje de error al volver
        navigate(-1);
    };

    return (
        <div className="container" style={{ marginTop: "30px" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {/* Validación del campo requerido solo si el formulario ha sido enviado */}
                {submitted && (password === "" || confirmPassword === "") && <p style={{ color: "red" }}>Debe completar todos los campos</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>¡Contraseña cambiada exitosamente!</p>}
                <div className="d-flex justify-content-around">
                    <button type="submit" className="btn btn-primario">Actualizar</button>
                    <button className="btn btn-secondary" onClick={handleGoBack}>Volver a Inicio</button>
                </div>
            </form>
        </div>
    );
};