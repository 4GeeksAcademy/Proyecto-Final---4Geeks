import React, { useContext } from 'react';
import "./../../styles/Dermatologia.css"
import pediatria from "../../img/image_3.jpg"
import { Context } from '../store/appContext';
import CardDoctor from "./CardDoctor";

const Pediatria = () => {
  const { store, actions } = useContext(Context);

  const pediSpecialtyId = store.specialities.find(specialty => specialty.name === "Fisioterapia");
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

<div className="dermatologia-container">
    <div className="image-container">
      <img src={pediatria} alt="Dermatología" className="dermatologia-image" />
    </div>
    <div className="text-container">
      <h2 className="title">Pediatria</h2>
      <p className="text">
        Bienvenido a MediConecta, donde la salud y el bienestar de la piel de nuestros pacientes son nuestra prioridad número uno. En nuestro equipo, contamos con expertos en dermatología dedicados a brindar atención especializada y personalizada para tus necesidades dermatológicas.
      </p>
      <p className="text">
        La Dermatología es una especialidad médica fundamental que se centra en el diagnóstico, tratamiento y prevención de enfermedades y condiciones de la piel, cabello y uñas. Nuestros dermatólogos son profesionales altamente capacitados y dedicados a proporcionar atención integral y continua a nuestros pacientes.
      </p>
      <ul className="service-list">
        <li>Consulta dermatológica virtual</li>
        <li>Tratamiento de enfermedades de la piel</li>
        <li>Cuidado de la piel y procedimientos estéticos</li>
        <li>Manejo de enfermedades dermatológicas crónicas</li>
      </ul>
      <p className="text">
        En MediConecta, estamos comprometidos a brindar atención dermatológica de alta calidad y accesible a todos. Ya sea que necesites una consulta para un problema de piel específico, tratamiento de una enfermedad dermatológica o simplemente cuidado preventivo de la piel, nuestro equipo de dermatología está aquí para cuidarte. ¡Pide una cita con nosotros hoy mismo y toma el control de la salud de tu piel!
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
