import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import paciente2 from "../../img/paciente2.jpg"

import { Link, useNavigate } from 'react-router-dom';

import GetProfilePicture from "../component/ProfilePicture/GetProfilePicture";
import ListAppointmentPatient from "../component/Doctors/ListAppointmentPatient";
import LoadAttachment from "../component/AttachmentFile/LoadAttachment";

export const PrivatePatient = () => {
    const { store, actions } = useContext(Context);
    const [patientId, setPatientId] = useState(null);

    const userType = localStorage.getItem("userType");
    const navigate = useNavigate()


    useEffect(() => {
        const id = localStorage.getItem("id");
        setPatientId(id);

        if (id) {
            actions.getinfoPatient(id);
        }

    }, []); // Ejecutar solo una vez al cargar el componente

    if (!userType || userType !== "patient") {
        // Si el usuario no está autenticado o no es un médico, redirige a la página de inicio
        navigate('/');
        return null; // No renderizar nada si el usuario no está autorizado
    }

    console.log(store.currentPatient);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="col-lg-6 container card mt-5">

                    <div className="d-flex flex-column align-items-start mb-3">

                        <GetProfilePicture />
                    </div>
                    <h4 className="container d-flex justify-content-center align-items-center m-2 p-0">Información del paciente</h4>
                    {store.currentPatient ? (
                        <div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item mb-1" style={{ borderRadius: '10px' }}>
                                    <p className="mb-0" style={{ fontFamily: 'Manrope', fontSize: 'inherit', display: 'flex', justifyContent: 'space-between' }}><span>Nombre: {store.currentPatient.name}</span><i className="fa-regular fa-user fa-xl" style={{ alignSelf: 'center', color: "#5C8692" }}></i></p>
                                </li>
                                <li className="list-group-item mb-1" style={{ borderRadius: '10px' }}>
                                    <p className="mb-0" style={{ fontFamily: 'Manrope', fontSize: 'inherit', display: 'flex', justifyContent: 'space-between' }}><span>Apellido: {store.currentPatient.surname}</span><i className="fa-sharp fa-regular fa-user fa-xl" style={{ alignSelf: 'center', color: "#5C8692" }}></i></p>
                                </li>
                                <li className="list-group-item mb-1" style={{ borderRadius: '10px' }}>
                                    <p className="mb-0" style={{ fontFamily: 'Manrope', fontSize: 'inherit', display: 'flex', justifyContent: 'space-between' }}><span>Edad: {store.currentPatient.age}</span><i className="fa-regular fa-calendar-days fa-xl" style={{ alignSelf: 'center', color: "#5C8692" }}></i></p>
                                </li>
                                <li className="list-group-item mb-1" style={{ borderRadius: '10px' }}>
                                    <p className="mb-0" style={{ fontFamily: 'Manrope', fontSize: 'inherit', display: 'flex', justifyContent: 'space-between' }}><span>Identificación: {store.currentPatient.identification}</span><i className="fa-solid fa-id-card fa-xl" style={{ alignSelf: 'center', color: "#5C8692" }}></i></p>
                                </li>
                                <li className="list-group-item mb-1" style={{ borderRadius: '10px' }}>
                                    <p className="mb-0" style={{ fontFamily: 'Manrope', fontSize: 'inherit', display: 'flex', justifyContent: 'space-between' }}><span>Seguro Social: {store.currentPatient.social_security}</span><i className="fa-solid fa-user-doctor fa-xl" style={{ alignSelf: 'center', color: "#5C8692" }}></i></p>
                                </li>
                                <li className="list-group-item mb-1" style={{ borderRadius: '10px' }}>
                                    <p className="mb-0" style={{ fontFamily: 'Manrope', fontSize: 'inherit', display: 'flex', justifyContent: 'space-between' }}><span>Email: {store.currentPatient.email}</span><i className="fa-solid fa-envelope fa-xl" style={{ alignSelf: 'center', color: "#5C8692" }}></i></p>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <p className="mb-0">No se encontró información del paciente.</p>
                    )}

                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="d-flex justify-content-center">
                            <form className="d-flex p-2">
                                {patientId && (
                                    <Link to={`/editPatient/${patientId}`}>

                                        <button className="btn me-2" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Editar información <i className="fa-solid fa-pen-to-square"></i></button>

                                    </Link>
                                )}
                            </form>
                        </div>
                        <div className="d-flex justify-content-center">

                            <Link to={`/changepassword`} className="mx-2">
                                <button className="btn" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Cambiar contraseña <i className="fa-solid fa-lock"></i></button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center" style={{ height: "600px" }}>
                    <img src={paciente2} alt="Doctor" className="img-fluid rounded mb-3" style={{ maxWidth: "100%", maxHeight: "400px" }} />
                    <form className="d-flex flex-column align-items-center" role="log in">
                        <Link to={"/register/medical_appointment"} className="mb-2">
                            <button className="btn w-100" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Registrar cita<i className="fa-regular fa-calendar-days ms-2"></i></button>
                        </Link>
                        <Link to={"/uploadfile"} className="mb-2">
                            <button className="btn w-100" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Subir documentos<i className="fa-solid fa-file-arrow-up ms-2"></i></button>

                        </Link>
                    </form>
                </div>
            </div>
            <div className="container-fluid d-flex justify-content-around mt-5">
                <div className="col-lg-6">
                    <h1 className="text-center">Citas pendientes</h1>
                    <div className="container">
                        {patientId && <ListAppointmentPatient userId={patientId} />}
                    </div>
                </div>
                <div className="col-lg-6">
                    <h2 className="text-center">Mis documentos</h2>
                    {patientId && <LoadAttachment userId={patientId} />}
                </div>
            </div>
        </>
    );
};