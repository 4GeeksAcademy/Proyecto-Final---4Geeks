import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import paciente2 from "../../img/paciente2.jpg"
import { Link, useParams } from "react-router-dom";
import GetProfilePicture from "../component/ProfilePicture/GetProfilePicture";
import LoadAttachment from "../component/AttachmentFile/LoadAttachment";
import ListAppointmentPatient from "../component/Doctors/ListAppointmentPatient";


export const PrivatePatient = () => {
    const { store, actions } = useContext(Context);
    const [patientId, setPatientId] = useState(null);
  
    useEffect(() => {
        // Obtener el ID del paciente almacenado en el almacenamiento local
        const id = localStorage.getItem("id");
        setPatientId(id);

        // Verificar si el ID del paciente existe y es válido
        if (id) {
            // Llamar a la acción para obtener la información del paciente utilizando el ID almacenado
            actions.getinfoPatient(id);
        }
    }, []); // Ejecutar solo una vez al cargar el componente


    useEffect(() => {
        // Obtener el ID del paciente almacenado en el almacenamiento local
        const id = localStorage.getItem("id");
        setPatientId(id);

        // Verificar si el ID del paciente existe y es válido
        if (id) {
            // Llamar a la acción para obtener la información del paciente utilizando el ID almacenado
            actions.getinfoPatient(id);
        }
    }, []); // Ejecutar solo una vez al cargar el componente

    useEffect(() => {
        // Obtener el ID del paciente almacenado en el almacenamiento local
        const id = localStorage.getItem("id");
        setPatientId(id);
        // Verificar si el ID del paciente existe y es válido
        if (id) {
            // Llamar a la acción para obtener la información del paciente utilizando el ID almacenado
            actions.getinfoPatient(id);
        }
    }, []); // Ejecutar solo una vez al cargar el componente

    console.log(store.currentPatient);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="col-lg-6 container card mt-5">
                <div className="d-flex flex-column align-items-start">
                    <GetProfilePicture />
                    </div>
                    <h4 className=" container d-flex justify-content-center align-items-center m-2 p-0">Información del paciente</h4>
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
                                    <button className="btn" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Editar información <i className="fa-solid fa-pen-to-square" style={{ marginLeft: "5px" }}></i></button>
                                </Link>
                            )}
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">

                        <Link to={`/changepassword`} className="mx-2">

                            <button className="btn" style={{ backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Cambiar contraseña <i className="fa-solid fa-lock" style={{ marginLeft: "5px" }}></i></button>
                        </Link>
                    </div>
                    </div>

                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center" style={{height: "600px"}}>
                    <img src= {paciente2} alt="Doctor" style={{ height: "400px", width: "600px", marginRight: "60px", marginBottom: "20px", borderRadius: "10px", marginLeft: "10px" }} />
                    <form className="d-flex p-2" role="log in">
                            <Link to={"/register/medical_appointment"}>
                                <button className="btn" style={{ marginRight:"30px", backgroundColor: "#5C8692", color: "#fff", width: "200px", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Registrar cita<i className="fa-regular fa-calendar-days fa-xl" style={{ marginLeft: "15px" }}></i></button>
                            </Link>

                            <Link to={"/uploadfile"}>

                                <button className="btn" style={{ backgroundColor: "#5C8692", color: "#fff", width: "200px", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Subir documentos<i className="fa-solid fa-file-arrow-up fa-xl" style={{ marginLeft: "15px" }}></i></button>
                            </Link>
                    </form>
                </div>
            </div>

            <div className="container-fluid d-flex justify-content-around" >
                <div >
                    <h1 className="text-center">Citas pendientes</h1>
                    <div className="container">
                    {patientId &&  <ListAppointmentPatient userId={patientId} />}
                    </div>
                </div>
                <div>
                    <h2>Mis documentos</h2>
                    {patientId && <LoadAttachment userId={patientId} />}
                </div>
            </div>
        </>
    )
};
