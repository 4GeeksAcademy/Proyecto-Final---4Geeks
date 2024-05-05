import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const { store, actions } = useContext(Context);
  
  const navigate = useNavigate();

  const id = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.login(email, password, userType);
      setTimeout(() => {
        if (store.authentication) {
          navigate(userType === 'doctor' ? "/log" : "/PrivatePatient");
        }
      }, 3000); // Delay de 3 segundos
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="container-fluid mt-2  mb-5" >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ boxShadow: "10px 5px 5px grey" }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Usuario:</label>
                  <select
                    className="form-control"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="patient">Paciente</option>
                    <option value="doctor">Médico</option>
                  </select>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primario me-3">Login</button>
                  <Link to={"/"}>
                    <button type="button" className="btn btn-secundario">Back home</button>
                  </Link>
                  
                </div>
                <div className="text-center">
                <Link to={"/recoverpassword"}>
                    <button   type="button" className="btn btn-primario mt-3">Recuperar contraseña</button>
                  </Link>
                  </div>
              </form>
              {store.messageError && <div className="mt-3 text-danger">{store.messageError}</div>}
              {store.authentication && (
                <div className="popup text-center">
                  <p>¡Login exitoso!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};