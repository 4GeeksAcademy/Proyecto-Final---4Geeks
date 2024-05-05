import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleLoginButtonClickMedicos = () => {
        // Redirige al componente de registro
        navigate('/register');
    };

    const handleLoginButtonClickPacientes = () => {
        // Redirige al componente de inicio de sesión
        navigate('/login');
    };

    const handlePrivate = () => {
        // Obtener el tipo de usuario del almacenamiento local
        const userType = localStorage.getItem("userType");
        // Obtener el id del usuario del almacenamiento local si está disponible
        const userId = localStorage.getItem("id");
        
        // Verificar si el tipo de usuario y el id del usuario están definidos y son válidos
        if (userType && (userType === "doctor" || userType === "patient") && userId) {
            // Redirigir al componente de zona privada correspondiente
            navigate(`/${userType === "doctor" ? 'privatedoctor' : "PrivatePatient"}`);
        } else {
            console.error("Tipo de usuario o ID de usuario no reconocido");
        }
    };

    // useEffect(() => {
    //     console.log("cambió el token")
    //     console.log(localStorage.getItem("token"))
    // }, [store.authentication]);

    function submitLogout() {
        actions.logout();
        localStorage.removeItem("authentication"); // Elimina la autenticación del localStorage al cerrar sesión
        navigate("/"); // Cambia "/login" por la ruta correcta si es diferente
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="d-flex ms-3">
                    <Link className="navbar-brand text-center" to="/">MediConecta</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="d-flex ms-3">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item pe-5 ms-3">
                                <Link className="nav-link active p-2" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item pe-5 ms-3">
                                <Link className="nav-link p-2" to="/contact">Contacto</Link>
                            </li>
                            {/* <li className="nav-item pe-5 ms-3">
                                <Link className="nav-link p-2" to="/prices">Tarifas</Link>
                            </li> */}
                            <li className="nav-item dropdown pe-5 ms-3">
                                <Link className="nav-link dropdown-toggle p-2" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Especialidades
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/MedicinaGeneral">Medicina General</Link></li>
                                    <li><Link className="dropdown-item" to="/Dermatologia">Dermatología</Link></li>
                                    <li><Link className="dropdown-item" to="/Pediatria">Pediatría</Link></li>
                                    <li><Link className="dropdown-item" to="/Psicologia">Psicología</Link></li>
                                    <li><Link className="dropdown-item" to="/Nutricion">Nutrición</Link></li>
                                    <li><Link className="dropdown-item" to="/Fisioterapia">Fisioterapia</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {localStorage.getItem("token") ? (
                        <div className="d-flex ms-auto">
                            <form className="d-flex p-2" role="log out">
                                <button onClick={submitLogout} className="btn btn-outline-danger" type="button">Logout</button>
                            </form>
                            <form className="d-flex p-2" role="log out">
                                <button onClick={handlePrivate} className="btn btn-primario" type="button">Zona Privada</button>
                            </form>
                        </div>
                    ) : (
                        <div className="d-flex ms-auto">
                            <form className="d-flex p-2" role="register">
                                <button className="btn btn-primario me-2" onClick={handleLoginButtonClickMedicos} type="button">Registrate</button>
                            </form>
                            <form className="d-flex p-2" role="log in">
                                <button className="btn btn-primario" onClick={handleLoginButtonClickPacientes} type="button">Login</button>
                            </form>
                            <form className="d-flex p-2" role="log in">
                                <Link to={"/register/medical_appointment"}>
                                    <button className="btn btn-primario" >Registrar cita</button>
                                </Link>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};