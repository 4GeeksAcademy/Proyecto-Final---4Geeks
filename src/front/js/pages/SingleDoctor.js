import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "./../../styles/singleDoctor.css"; // Importa tu archivo CSS para los estilos personalizados

export const SingleDoctor = (props) => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [speciality, setSpeciality] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        // Verificar si el doctor está definido y si tiene un ID antes de realizar la solicitud
        if (doctor && doctor.id) {
            // Obtener la URL de la imagen del perfil
            const fetchPicture = async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/profilepicture/doctor/${doctor.id}`);
                    if (response.ok) {
                        const result = await response.json();
                        setProfilePictureUrl(result.url_picture);
                    } else {
                        throw new Error('Error al obtener la imagen del perfil');
                    }
                } catch (error) {
                    // console.error("Error obteniendo la imagen del perfil:", error);
                    // Establecer la imagen por defecto aquí
                    const defaultPictureUrl = 'https://i.postimg.cc/sX2n2Rjy/Doctores.jpg';
                    setProfilePictureUrl(defaultPictureUrl);
                }
            };
            fetchPicture();
        }
    }, [doctor]);

    useEffect(() => {
        const loadSpecialities = async () => {
            try {
                await actions.loadSpecialities();
            } catch (error) {
                // console.error("Error loading specialities:", error);
            }
        };

        loadSpecialities();

    }, [])

    useEffect(() => {
        if (id && store.doctors && store.doctors.length > 0) {
            const selectedDoctor = store.doctors.find(doctor => doctor.id.toString() === id);
            if (selectedDoctor) {
                setDoctor(selectedDoctor);
                setLoading(false);

                // Buscar la especialidad correspondiente al médico
                const foundSpeciality = store.specialities.find(speciality => speciality.id === selectedDoctor.speciality_id);
                setSpeciality(foundSpeciality);
            } else {
                setLoading(false);
            }
        }
    }, [id, store.doctors, store.specialities]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!doctor) {
        return <p>No se pudo encontrar la información del médico.</p>;
    }

    return (
        <div className="container-fluid" style={{marginBottom: "15px"}}>
            <div className="jumbotron mb-4">
                <h1 className="display-4">EQUIPO MÉDICO</h1>
                <p className="lead">El experto</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6" style={{maxWidth: "400px"}}>
                    <img src={profilePictureUrl} alt="Medicina General" className="medicina-general-image img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2 className="title">{doctor.name}&nbsp;{doctor.surname}</h2>
                    <p className="text-black">
                        ESPECIALIDAD:&nbsp;{speciality.name}
                    </p>
                    <p className="text-black">
                        Nº COLEGIADO:&nbsp;{doctor.medical_license}
                    </p>
                    <p className="text-black">
                        BIO:&nbsp;{doctor.bio}
                    </p>
                    <div className="buttons d-flex justify-content-center">
                        <Link to={"/register/medical_appointment"}>
                            <button className="btn btn-primario">Registrar cita</button>
                        </Link>
                        <button onClick={()=>{navigate(-1)}} className="btn btn-secundario">Volver</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

SingleDoctor.propTypes = {
    match: PropTypes.object
};