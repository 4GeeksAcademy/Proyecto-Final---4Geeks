import React, { useState, useEffect, useContext } from 'react';
import MedicalAppointmentCardDoctor from "./MedicalAppoinmentCardDoctor";
import { Context } from '../../store/appContext';

const ListAppointmentDoctor = ({}) => {
    const [appointments, setAppointments] = useState([]); // Define setAppointments como parte del estado
    const { store } = useContext(Context);

    const id = parseInt(localStorage.getItem("id"));

    useEffect(() => {
        let isMounted = true; // Variable para rastrear si el componente está montado

        const loadAppointmentMeetingURL = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/appointments_and_meetings`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (isMounted) {
                    setAppointments(data.result);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        loadAppointmentMeetingURL();

        return () => {
            // Función de limpieza para cancelar la tarea asincrónica si el componente se desmonta
            isMounted = false;
        };
    }, []);

    return (
        <div>
            {appointments.map((appointment) => {
                if (appointment.doctor_id === id) {
                    return <MedicalAppointmentCardDoctor key={appointment.id} appointment={appointment} />;
                }
                return null;
            })}
            {/* No hacemos nada si appointments es un array vacío */}
            {appointments.length === 0 && appointments !== null && appointments !== undefined && ''}
        </div>
    );
};

export default ListAppointmentDoctor;