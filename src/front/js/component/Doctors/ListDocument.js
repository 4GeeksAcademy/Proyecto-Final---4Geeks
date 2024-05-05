import React, { useEffect, useState, useContext } from "react";
import LoadAttachment from "../AttachmentFile/LoadAttachment";
import { Context } from "../../store/appContext";

const ListDocument = () => {
    const [selectedPatientId, setSelectedPatientId] = useState(""); // Estado para almacenar el ID del paciente seleccionado
    const { store, actions } = useContext(Context);
    const [patients, setPatients] = useState([]);

    const handlePatientChange = (e) => {
        setSelectedPatientId(e.target.value);
    };

    useEffect(() => {
        // Cargar los pacientes en la tienda cuando se monte el componente
        actions.loadPatients();
    }, [actions]);

    // Actualizar el estado 'patients' cada vez que cambie la lista de pacientes en la tienda
    useEffect(() => {
        setPatients(store.patients);
    }, [store.patients]);

    return (
        <>
            <div className="container">
            <select className="form-select form-select-lg mb-3" aria-label="Large select example"
                id="inputspatientID"
                name="patientID"
                value={selectedPatientId}
                onChange={handlePatientChange}
            >
                <option value="">Elige una opción</option> {/* Opción por defecto */}
                {/* Opciones de pacientes */}
                {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name} {patient.surname}</option>
                ))}
                {/* Agrega más opciones según tus necesidades */}
            </select>
{/* 
             Renderizar el componente LoadAttachment con el userId del paciente seleccionado */}
            {selectedPatientId && <LoadAttachment userId={selectedPatientId} key={selectedPatientId} />} 
            </div>
        </>
    );
};

export default ListDocument;