import React, { useState, useEffect } from 'react';

const SpecialitySelection = ({ handleSpecialitySelect }) => {
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(""); 

  useEffect(() => {
    fetch(process.env.BACKEND_URL + '/specialities')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching specialities');
        }
        return response.json();
      })
      .then(data => {
        setSpecialities(data.result);
      })
      .catch(error => {
        console.error('Error fetching specialities:', error);
      });
  }, []);

  const handleChange = (e) => {
    const selectedSpecialityId = e.target.value;
    setSelectedSpeciality(selectedSpecialityId);
    handleSpecialitySelect(selectedSpecialityId);
  };

  return (
    <div>
      <h4>Seleccione Especialidad</h4>
      <select value={selectedSpeciality} onChange={handleChange}>
        <option value="">Seleccionar Especialidad</option>
        {specialities.map((speciality) => (
          <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SpecialitySelection;


