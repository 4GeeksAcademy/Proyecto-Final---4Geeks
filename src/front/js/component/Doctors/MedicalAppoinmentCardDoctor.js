import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/appContext';

const MedicalAppointmentCardDoctor = ({ appointment }) => {
  const { id, appointment_date, doctor_id, patient_id, meeting, } = appointment; 
  const { store } = useContext(Context);
  const [doctorData, setDoctorData] = useState(null);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    if (doctor_id) {
      const doctor = store.doctors.find(doctor => doctor.id === doctor_id);
      if (doctor) {
          setDoctorData(doctor);
      }
    }
  }, [store.doctors, doctor_id]);

  useEffect(() => {
    if (patient_id) {
      const patient = store.patients.find(patient => patient.id === patient_id);
      if (patient) {
          setPatientData(patient);
      }
    }
  }, [store.patients, patient_id]);

  // Verificar si hay datos de cita antes de renderizar
  if (!appointment_date) {
    return null;
  }

  return (
    <div className="card" style={{marginBottom: "10px", padding:"13px"}}>
      <p style={{color:"#18863d", fontWeight: "bold"}}>Fecha de cita: {new Date(appointment_date).toLocaleString()}</p>
      {/* <p>Doctor: {doctorData ? `${doctorData.name} ${doctorData.surname}` : ' '}</p> */}
      <p>Paciente: {patientData ? `${patientData.name} ${patientData.surname}` : ' '}</p>
      {meeting && (
        <div>
          <h4><strong>Reunión</strong></h4>
          <a className='url_meeting' style={{color:"#e97f1d", fontWeight: "bold"}} href={meeting.room_url}>Acceder a la reunión</a>
        </div>
      )}
    </div>
  );
};

export default MedicalAppointmentCardDoctor;