import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDay } from "date-fns";

const AvailabilityCalendar = ({ handleAppointment, doctorAvailability, bookedAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [workHours] = useState({ start: 9, end: 16, endMinutes: 30 }); // Horario laboral hasta las 16:30

  const transformAvailabilityToExcludeTimes = () => {
    if (!doctorAvailability) {
      return [];
    }
    
    return doctorAvailability.flatMap(availability => {
      const startTime = new Date(`1970-01-01T${availability.start_time}`);
      const endTime = new Date(`1970-01-01T${availability.end_time}`);
      return { start: startTime, end: endTime };
    });
  };

  const filterUnavailableTimes = (time) => {
    const isAvailable = isTimeAvailable(time);
    const isInWorkHours = filterWorkHours(time);
    return isAvailable && isInWorkHours;
  };

  const isTimeAvailable = (time) => {
    if (!bookedAppointments) {
      return true;
    }

    const appointmentTime = time.getTime();
    return bookedAppointments.every(appointment => {
      const appointmentDateTime = new Date(appointment.appointment_date);
      return appointmentTime !== appointmentDateTime.getTime();
    });
  };

  useEffect(() => {
    console.log('Disponibilidad del médico:', doctorAvailability);
  }, [doctorAvailability]);

  const handleDateChange = date => {
    // Convertir la hora seleccionada a la zona horaria del servidor (UTC)
    const utcDate = new Date(date.getTime());
    setSelectedDate(utcDate);
    handleAppointment(utcDate);
  };

  const filterWeekdays = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const filterWorkHours = (time) => {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const withinStartAndEnd = hour > workHours.start || (hour === workHours.start && minutes >= 0);
    const withinEnd = hour < workHours.end || (hour === workHours.end && minutes <= workHours.endMinutes);
    return withinStartAndEnd && withinEnd;
  };

  return (
    <div>
      <h2>Seleccione una fecha y hora disponibles</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy HH:mm"
        minDate={new Date()}
        placeholderText="Seleccione una fecha y hora"
        excludeTimes={transformAvailabilityToExcludeTimes()}
        filterTime={filterUnavailableTimes}
        filterDate={filterWeekdays}
        shouldCloseOnSelect={false}
      />
    </div>
  );
};

export default AvailabilityCalendar;
































