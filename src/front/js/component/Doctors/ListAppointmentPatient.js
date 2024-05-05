import React, { useState, useEffect, useContext } from 'react';
import MedicalAppointmentCard from './MedicalAppointmentCard';
import { Context } from '../../store/appContext';

const ListAppointmentPatient = () => {
  const [appointments, setAppointments] = useState([]);
  const [hasAppointments, setHasAppointments] = useState(false); // Variable de estado para controlar si hay citas disponibles
  const { store } = useContext(Context);

  const loadAppointmentMeetingURL = () => {
    fetch(`${process.env.BACKEND_URL}/appointments_and_meetings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("DATARESULT FLUX APPOINTMENT", data.result);
        setAppointments(data.result);
        setHasAppointments(data.result.some(appointment => appointment.patient_id === store.currentPatient?.id)); // Comprueba si hay al menos una cita para el paciente actual
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    loadAppointmentMeetingURL();
  }, []);
  
    return (
      <div>
      {hasAppointments ? (
        appointments.map((appointment) => {
          if (store.currentPatient && store.currentPatient.id && store.currentPatient.id === appointment.patient_id) {
            return <MedicalAppointmentCard key={appointment.id} appointment={appointment} />;
          } else {
            return null;
          }
        })
      ) : (
        <p>No hay citas</p>
      )}
    </div>
  );
};


export default ListAppointmentPatient;