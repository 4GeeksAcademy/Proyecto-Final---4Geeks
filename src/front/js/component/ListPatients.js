
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import CardPatient from "./CardPatient";

const ListPatients = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Cargar la información del paciente que ha iniciado sesión
        actions.getinfoPatient(localStorage.getItem("id"));
    }, []);

    return (
        <>
            {store.currentPatient ? (
                <CardPatient 
                    id={store.currentPatient.id}
                    name={store.currentPatient.name}
                    surname={store.currentPatient.surname}
                    bio={store.currentPatient.bio}
                    speciality={store.currentPatient.speciality}
                />
            ) : (
                <p>No hay paciente disponible.</p>
            )}
        </>
    );
};

export default ListPatients;
