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

            <div className="container-fluid" style={{ backgroundColor: "#EBF3F5", paddingTop: "15px" }}>
                <h1 className="text-center my-4">Información del Paciente</h1>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <GetProfilePicture />
                            {store.currentPatient ? (
                                <div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item mb-1">
                                            <p className="mb-0"><span>Nombre: {store.currentPatient.name}</span><i className="fa-regular fa-user fa-xl ms-2" style={{ color: "#5C8692" }}></i></p>
                                        </li>
                                        <li className="list-group-item mb-1">
                                            <p className="mb-0"><span>Apellido: {store.currentPatient.surname}</span><i className="fa-regular fa-user fa-xl ms-2" style={{ color: "#5C8692" }}></i></p>
                                        </li>
                                        <li className="list-group-item mb-1">
                                            <p className="mb-0"><span>Edad: {store.currentPatient.age}</span><i className="fa-regular fa-calendar-days fa-xl ms-2" style={{ color: "#5C8692" }}></i></p>
                                        </li>
                                        <li className="list-group-item mb-1">
                                            <p className="mb-0"><span>Identificación: {store.currentPatient.identification}</span><i className="fa-solid fa-id-card fa-xl ms-2" style={{ color: "#5C8692" }}></i></p>
                                        </li>
                                        <li className="list-group-item mb-1">
                                            <p className="mb-0"><span>Seguro Social: {store.currentPatient.social_security}</span><i className="fa-solid fa-user-doctor fa-xl ms-2" style={{ color: "#5C8692" }}></i></p>
                                        </li>
                                        <li className="list-group-item mb-1">
                                            <p className="mb-0"><span>Email: {store.currentPatient.email}</span><i className="fa-solid fa-envelope fa-xl ms-2" style={{ color: "#5C8692" }}></i></p>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-center">No se encontró información del paciente.</p>
                            )}
                            <div className="text-center mt-3 mb-2">
                                <div className="d-inline">
                                    {patientId && (
                                        <Link to={`/editPatient/${patientId}`} className="btn me-2" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>
                                            Editar información <i className="fa-solid fa-pen-to-square ms-1"></i>
                                        </Link>
                                    )}
                                </div>
                                <div className="d-inline">
                                    <Link to={`/changepassword`} className="btn mx-2" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>
                                        Cambiar contraseña <i className="fa-solid fa-lock ms-1"></i>

                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <img src={paciente2} alt="Doctor" className="card-img-top" style={{ maxHeight: "400px", objectFit: "cover" }} />
                            <div className="card-body text-center d-flex flex-column justify-content-center">
                                <h5 className="card-title">Acciones rápidas</h5>
                                <div className="d-flex justify-content-between">
                                    <Link to={"/register/medical_appointment"} className="btn" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", marginRight: "5px" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>
                                        Registrar cita <i className="fa-regular fa-calendar-days ms-1"></i>
                                    </Link>
                                    <div style={{ width: "10px" }}></div> {/* Espacio entre los botones */}
                                    <Link to={"/uploadfile"} className="btn" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>
                                        Subir documentos <i className="fa-solid fa-file-arrow-up ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-6">
                        <h2 className="text-center">Citas pendientes</h2>
                        <div className="container">
                            {patientId && <ListAppointmentPatient userId={patientId} />}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2 className="text-center">Mis documentos</h2>
                        {patientId && <LoadAttachment userId={patientId} />}


                    </div>
                </div>
            </div>
        </>
    );
};
