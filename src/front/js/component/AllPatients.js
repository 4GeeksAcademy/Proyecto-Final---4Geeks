import React, { useContext } from "react";
import CardPatient from "./CardPatient";
import { Context } from "../store/appContext";

export const AllPatients = () => {
    const { store, actions } = useContext(Context);


    const handlePatients = () => {
        // Redirige al componente Login
        navigate('/allpatients');
    };

    // Obtener solo los primeros 3 médicos si no se ha hecho clic en "ver más"
    const displayedPatients = store.patients

    return (
        <>
            <h1 className="text-center">Pacientes</h1>
            <div className="container-fluid  text-center">
                <p>

                    En nuestro centro médico, nos enorgullece presentar a nuestros equipo de profesionales comprometidos con la excelencia en la atención médica y el bienestar de nuestros pacientes.

                    Nuestros Patientes no solo poseen una sólida formación académica y experiencia en sus respectivas especialidades, sino que también están dedicados a mantenerse al día con los últimos avances y tecnologías médicas. Su pasión por la medicina se refleja en cada interacción con los pacientes, donde brindan un cuidado compasivo y personalizado.

                    {/* Cada uno de nuestros Patientes ha sido cuidadosamente seleccionado por su experiencia, habilidades clínicas y compromiso con la ética profesional. Desde médicos de atención primaria hasta especialistas en áreas como cardiología, dermatología, pediatría y más, nuestro equipo está capacitado para abordar una amplia gama de necesidades médicas con la más alta calidad y atención. */}

                    Ya sea que necesites una consulta de rutina, tratamiento para una enfermedad específica o simplemente busques orientación sobre tu salud y bienestar, puedes confiar en que nuestros Patientes cualificados estarán allí para brindarte el mejor cuidado posible.

                    {/* En nuestro centro médico, la salud y la seguridad de nuestros pacientes son nuestra principal prioridad, y nuestros Patientes cualificados están aquí para ayudarte en cada paso del camino hacia una vida más saludable y feliz. */}

                    ¡Programa una consulta con nuestros Patientes hoy mismo y experimenta la diferencia que pueden hacer en tu vida!
                </p>
            </div>

            <div className="container-fuid"  >
                <div className="row m-4 justify-content-center">
                    {displayedPatients.length > 0 ? (
                        <>
                            {displayedPatients.map(Patient => (
                                <CardPatient
                                    key={Patient.id}
                                    id={Patient.id}
                                    name={Patient.name}
                                    surname={Patient.surname}
                                    bio={Patient.bio}
                                    speciality={Patient.speciality}
                                />
                            ))}
                        </>
                    ) : (
                        <p>No hay Patientes disponibles.</p>
                    )}
                </div>
            </div>
        </>
    );
};