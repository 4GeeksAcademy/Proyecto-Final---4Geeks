import React, { useContext } from 'react';
import "./../../styles/MedicinaGeneral.css";
import Medicina_general_dos from "../../img/Medicina-general-dos.jpg";
import { Context } from '../store/appContext';
import CardDoctor from "./CardDoctor";

const MedicinaGeneral = () => {
  const { store, actions } = useContext(Context);

  const medGenSpecialtyId = store.specialities.find(specialty => specialty.name === "Medicina General");
  const medGenDoctors = store.doctors.filter(doctor => doctor.speciality_id === medGenSpecialtyId?.id);

  let doctorsComponent;

  if (medGenDoctors.length > 0) {
    doctorsComponent = (
      <div className="row justify-content-center mx-5">
        {medGenDoctors.map(doctor => (
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
      <div className="medicina-general-container">
        <div className="image-container">
          <img src={Medicina_general_dos} alt="Medicina General" className="medicina-general-image" />
        </div>
        <div className="text-container">
          <h2 className="title">Medicina General</h2>
          <p className="text-black">
            Bienvenido a MediConecta, donde la salud y el bienestar de nuestros pacientes son nuestra prioridad número uno. En nuestro equipo, contamos con expertos en diversas especialidades médicas. 
          </p>
          <p className="text-black">
            La Medicina General es la base fundamental de la atención médica, abordando una amplia gama de problemas de salud que afectan a personas de todas las edades y condiciones. Nuestros médicos generales son profesionales altamente capacitados y dedicados a proporcionar atención integral y continua a nuestros pacientes. Tipos de terapias a realizar:
          </p>
          <ul className="service-list">
            <li>Consultas médicas virtuales</li>
            <li>Atención preventiva</li>
            <li>Manejo de enfermedades crónicas</li>
            <li>Referencias y coordinación de atención</li>
          </ul>
          <p className="text-black">
            En MediConecta, estamos comprometidos a brindar atención médica de alta calidad y accesible a todos. Ya sea que necesites una consulta de rutina, atención preventiva o manejo de una enfermedad crónica, nuestro equipo de Medicina General está aquí para cuidarte. ¡Pide una cita con nosotros hoy mismo y toma el control de tu salud!
          </p>
        </div>
      </div>
      <div className='container d-flex justify-content-center text-align-center mt-4'><h3>Especialistas en Medicina General</h3></div>
      <div className="row justify-content-center mx-5" style={{marginBottom:"35px"}} >
        {doctorsComponent}
      </div>
    </>
  );
}

export default MedicinaGeneral;