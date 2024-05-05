import React, { useContext } from 'react';
import "./../../styles/Pediatria.css"
import pediatria from "../../img/image_3.jpg"
import { Context } from '../store/appContext';
import CardDoctor from "./CardDoctor";

const Pediatria = () => {
  const { store, actions } = useContext(Context);
  const pediSpecialtyId = store.specialities.find(specialty => specialty.name === "Pediatria");
  const pediDoctors = store.doctors.filter(doctor => doctor.speciality_id === pediSpecialtyId?.id);

  let doctorsComponent;
  
  if (pediDoctors.length > 0) {
    doctorsComponent = (
      <div className="row justify-content-center mx-5">
        {pediDoctors.map(doctor => (
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
      <div className="pediatria-container">
        <div className="image-container">
          <img src={pediatria} alt="Pediatria" className="pediatria-image" />
        </div>
        <div className="text-container">
          <h2 className="title">Pediatria</h2>
          <p className="text-black">
           Bienvenido a MediConecta, donde la salud y el bienestar de nuestros pacientes son nuestra prioridad número uno. En nuestro equipo, contamos con expertos en diversas especialidades médicas.
          </p>
          <p className="text-black">
          El pediatra se encarga del cuidado completo de los más pequeños para velar por su salud y bienestar. Entre sus funciones está la de vigilar el crecimiento del niño, orientar a los padres sobre el estado y desarrollo de su hijo, solucionar problemas emocionales, mentales, conductuales y sociales, prevenir y atender las enfermedades más comunes, y dar apoyo en los asuntos relacionados con la adolescencia y pubertad, entre otras.
          </p>
          <ul className="service-list">
            <li>Exámenes rutinarios</li>
            <li>Gestión de medicamentos</li>
            <li>Tratamientos de salud mental</li>
            <li>Tratamiento y prevención</li>
          </ul>
          <p className="text-black">
            En MediConecta, estamos comprometidos a brindar atención pediátrica de alta calidad y accesible a todos. ¡Pide una cita con nosotros hoy mismo y toma el control de la salud de tus hijos!
          </p>
        </div>
      </div>
      <div className='container d-flex justify-content-center text-align-center mt-4'><h3>Especialistas en Pediatria</h3></div>
      <div className="container-fluid px-5 "  >
        <div className="row justify-content-center mx-5 text-cen" style={{marginBottom:"35px"}} >
          {doctorsComponent}
        </div>
      </div>
    </>
  );
}

export default Pediatria;