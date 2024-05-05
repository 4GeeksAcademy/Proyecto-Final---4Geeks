import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false)
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleSubmit =(e)=> {
        e.preventDefault();
        setFormSubmitted(true); 
        actions.recoverPassword(email, userType)
        setTimeout(() => {
            navigate ("/login")
        }, 3000);
    }

  

    console.log("EMAIL", email)
    console.log("USERTYPE", userType)
    return (
        <>
            <div className="container  " style={{marginTop:"30px"}} >
                <form onSubmit={handleSubmit }>
                    <div className="mb-3 ">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input  type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        <div id="emailHelp" className="form-text">Introduce tu email para que podamos mandarte tu correo.</div>
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
                    <button type="submit " className="btn btn-primario">Submit</button>
                </form>
                {formSubmitted && (
                        <div className="popup text-center">
                            <p>¡Password temporal enviado!</p>
                        </div>
                    )}
            </div>
        </>
        )
    }