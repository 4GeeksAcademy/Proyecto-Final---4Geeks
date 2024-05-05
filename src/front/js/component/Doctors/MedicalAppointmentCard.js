import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/appContext';

const MedicalAppointmentCard = ({ appointment }) => {
  const { id, appointment_date, doctor_id, patient_id, meeting, } = appointment; 
  const { store } = useContext(Context);
  const [doctorData, setDoctorData] = useState(null);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Buscar la información del médico según su ID
    const doctor = store.doctors.find(doctor => doctor.id === doctor_id);
    setDoctorData(doctor);
  }, [store.doctors, doctor_id]);

  useEffect(() => {
    // Buscar la información del paciente según su ID
    const patient = store.patients.find(patient => patient.id === patient_id);
    setPatientData(patient);
  }, [store.patients, patient_id]);

  return (
    <div className="card" style={{marginBottom: "10px", padding:"13px"}}>
      <p style={{color:"#18863d", fontWeight: "bold"}}>Fecha de cita: {new Date(appointment_date).toLocaleString()}</p>
      <p>Doctor: {doctorData ? `${doctorData.name} ${doctorData.surname}` : ' '}</p>
      {/* <p>Paciente: {patientData ? `${patientData.name} ${patientData.surname}` : ' '}</p> */}
      {meeting && (
        <div>
          <h4><strong>Reunión</strong></h4>
          <a className='url_meeting' style={{color:"#e97f1d", fontWeight: "bold"}} href={meeting.room_url}>Acceder a la reunión</a>
        </div>
      )}
    </div>
  );
};

export default MedicalAppointmentCard;