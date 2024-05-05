import React, { useContext } from 'react';
import "./../../styles/Psicologia.css"
import psicologia from "../../img/psicologia.jpg"
import { Context } from '../store/appContext';
import CardDoctor from "./CardDoctor";

const Psicologia = () => {
  const { store, actions } = useContext(Context);

  const psicoSpecialtyId = store.specialities.find(specialty => specialty.name === "Psicología");
  const psicoDoctors = store.doctors.filter(doctor => doctor.speciality_id === psicoSpecialtyId?.id);

  let doctorsComponent;

  if (psicoDoctors.length > 0) {
    doctorsComponent = (
      <div className="row justify-content-center mx-5">
        {psicoDoctors.map(doctor => (
          <CardDoctor
            key={doctor.id}
            id={doctor.id}
            name={doctor.name}
            surname={doctor.surname}
            specialty={doctor.specialty}
          />
        ))}
      </div>
    );
  } else {
    doctorsComponent = <p className='text-center'>No hay doctores disponibles</p>;
  }

  return (
    <>
      <div className="psicologia-container">
        <div className="image-container">
          <img src={psicologia} alt="Psicologia" className="psicologia-image" />
        </div>
        <div className="text-container">
          <h2 className="title">Psicología</h2>
          <p className="text-black">
            Bienvenido a MediConecta, donde la salud y el bienestar de nuestros pacientes son nuestra prioridad número uno. En nuestro equipo, contamos con expertos en diversas especialidades médicas.
          </p>
          <p className="text-black">
            La psicología es fundamental para el bienestar mental. Nuestros especialistas en psicología pueden ayudarte con una amplia gama de servicios, desde el manejo de la ansiedad y la depresión hasta el tratamiento de trastornos específicos.
          </p>
          <ul className="service-list">
            <li>Terapia cognitivo-conductual</li>
            <li>Terapia de aceptación y compromiso (ACT)</li>
            <li>Terapia de exposición para trastornos de ansiedad</li>
            <li>Terapia de pareja y familiar</li>
          </ul>
          <p className="text-black">
            Nuestro equipo de psicólogos está comprometido a brindarte la mejor atención posible para que puedas alcanzar tu bienestar mental. ¡Programa una consulta con nosotros hoy mismo!
          </p>
        </div>
      </div>
      <div className='container d-flex justify-content-center text-align-center mt-4'><h3>Especialistas en Psicología</h3></div>
      <div className="container-fluid px-5 "  >
        <div className="row justify-content-center mx-5 text-center" style={{marginBottom:"35px"}} >
          {doctorsComponent}
        </div>
      </div>
    </>
  );
}

export default Psicologia;