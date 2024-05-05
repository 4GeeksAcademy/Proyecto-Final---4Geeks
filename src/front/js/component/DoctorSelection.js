import React, { useState, useEffect } from 'react';

const DoctorSelection = ({ handleDoctorSelect, selectedSpeciality }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (selectedSpeciality) {
      fetch(`${process.env.BACKEND_URL}/doctors/speciality/${selectedSpeciality}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching doctors');
          }
          return response.json();
        })
        .then(data => {
          setDoctors(data.doctors);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
    }
  }, [selectedSpeciality]);

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    handleDoctorSelect(doctorId);
  };

  return (
    <div>
      <h4>Seleccione Doctor</h4>
      <select onChange={handleDoctorChange}>
        <option value="">Seleccionar Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
        ))}
      </select>
    </div>
  );
};

export default DoctorSelection;






