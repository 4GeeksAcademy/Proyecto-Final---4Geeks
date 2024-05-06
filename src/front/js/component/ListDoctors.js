import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CardDoctor from "./CardDoctor";
import { useNavigate } from "react-router-dom";
import "./../../styles/ListDoctors.css"

const ListDoctors = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate('/alldoctors');
    };

    // Obtener solo los primeros 3 médicos si no se ha hecho clic en "ver más"
    const displayedDoctors = store.doctors.slice(0, 3);

    return (
        <div className="list-doctors-container">
            <div className="doctors-grid">
                {displayedDoctors.map(doctor => (
                    <CardDoctor 
                        key={doctor.id}
                        id={doctor.id}
                        name={doctor.name}
                        surname={doctor.surname}
                        bio={doctor.bio}
                        speciality={doctor.speciality}
                    />
                ))}
            </div>
            {store.doctors.length > 3 && (
                 <button className="btn btn-secondary" onClick={handleViewMore}>Accede a ver más doctores</button>
            )}
        </div>
    );
};

export default ListDoctors;