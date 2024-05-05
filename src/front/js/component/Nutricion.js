import React, { useContext } from 'react';
import "./../../styles/Nutricion.css";
import nutricion from "../../img/nutricionn.jpg";
import { Context } from '../store/appContext';
import CardDoctor from "./CardDoctor";

const Nutricion = () => {
  const { store, actions } = useContext(Context);

  const nutriSpecialtyId = store.specialities.find(specialty => specialty.name === "Nutrición");
  const nutriDoctors = store.doctors.filter(doctor => doctor.speciality_id === nutriSpecialtyId?.id);

  let doctorsComponent;
  
  if (nutriDoctors.length > 0) {
    doctorsComponent = (
      <div className="row justify-content-center mx-5">
        {nutriDoctors.map(doctor => (
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
      <div className="nutricion-container">
        <div className="image-container">
          <img src={nutricion} alt="Nutrición" className="nutricion-image" />
        </div>
        <div className="text-container">
          <h2 className="title">Nutrición</h2>
          <p className="text-black">
            Bienvenido a MediConecta, donde la salud y el bienestar de nuestros pacientes son nuestra prioridad número uno. En nuestro equipo, contamos con expertos en diversas especialidades médicas. 
          </p>
          <p className="text-black">
            La nutrición es fundamental para la salud y el bienestar. Nuestros especialistas en nutrición pueden ayudarte con una amplia gama de servicios, desde la pérdida de peso hasta la mejora de tu dieta general para optimizar tu salud.
          </p>
          <ul className="service-list">
            <li>Consulta nutricional personalizada</li>
            <li>Planificación de comidas</li>
            <li>Evaluación de necesidades dietéticas específicas</li>
            <li>Consejos sobre alimentación saludable</li>
          </ul>
          <p className="text-black">
            Nuestro equipo de nutricionistas está comprometido a brindarte la mejor atención posible para que puedas alcanzar tus objetivos de salud y bienestar. ¡Programa una consulta con nosotros hoy mismo!
          </p>
        </div>
      </div>
      <div className='container d-flex justify-content-center text-align-center mt-4'><h3>Especialistas en Nutrición</h3></div>
      <div className="container-fluid px-5 "  >
        <div className="row justify-content-center mx-5 text-center" style={{marginBottom:"35px"}} >
          {doctorsComponent}
        </div>
      </div>
    </>
  );
}

export default Nutricion;