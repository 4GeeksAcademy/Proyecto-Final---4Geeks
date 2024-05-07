import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Espera 3 segundos antes de enviar la solicitud
            await actions.recoverPassword(email, userType);
            navigate("/login");
        } catch (error) {
            console.error("Error al recuperar la contraseña:", error);
        }
    };

    // console.log("EMAIL", email)
    // console.log("USERTYPE", userType)
    return (
        <>
            <div className="container  " style={{marginTop:"30px"}} >
                <form onSubmit={handleSubmit }>
                    <div className="mb-3 ">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input  type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        {/* <div id="emailHelp" className="form-text">Introduce tu email para que podamos mandarte tu correo.</div> */}
                    </div>
                    <div className="form-group">
                      <label>Tipo de Usuario:</label>
                      <select
                        className="form-control"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Elige una opción</option>
                        <option value="patient">Paciente</option>
                        <option value="doctor">Médico</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primario">Hecho</button>
                    {submitted && <p style={{ color: "green" }}>La contraseña se ha enviado con éxito.</p>}
                </form>
            </div>
        </>
        )
    } 