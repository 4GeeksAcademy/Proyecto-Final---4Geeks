import React, { useContext } from "react";
import CardDoctor from "./CardDoctor";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AllDoctors =()=> {
    const { store, actions } = useContext(Context);
    

    // const handleDoctors = () => {
    //     // Redirige al componente Login
    //     navigate('/alldoctors');
    //   };

    const displayedDoctors = store.doctors

    console.log(store.doctors)

    return (
        <>  
         
        <div className="container-fluid  text-center" style={{marginTop:"35px"}}>
            <p>

En nuestro centro médico, nos enorgullece presentar a nuestros equipo de profesionales comprometidos con la excelencia en la atención médica y el bienestar de nuestros pacientes.

Nuestros doctores no solo poseen una sólida formación académica y experiencia en sus respectivas especialidades, sino que también están dedicados a mantenerse al día con los últimos avances y tecnologías médicas. Su pasión por la medicina se refleja en cada interacción con los pacientes, donde brindan un cuidado compasivo y personalizado.

{/* Cada uno de nuestros doctores ha sido cuidadosamente seleccionado por su experiencia, habilidades clínicas y compromiso con la ética profesional. Desde médicos de atención primaria hasta especialistas en áreas como cardiología, dermatología, pediatría y más, nuestro equipo está capacitado para abordar una amplia gama de necesidades médicas con la más alta calidad y atención. */}

Ya sea que necesites una consulta de rutina, tratamiento para una enfermedad específica o simplemente busques orientación sobre tu salud y bienestar, puedes confiar en que nuestros doctores cualificados estarán allí para brindarte el mejor cuidado posible.

{/* En nuestro centro médico, la salud y la seguridad de nuestros pacientes son nuestra principal prioridad, y nuestros doctores cualificados están aquí para ayudarte en cada paso del camino hacia una vida más saludable y feliz. */}

¡Programa una consulta con nuestros doctores hoy mismo y experimenta la diferencia que pueden hacer en tu vida!
            </p>
        </div>
   
            <div className="container-fuid"  >
                <div className="row m-4 justify-content-center">
                        {displayedDoctors.map(Doctor => (
                            <CardDoctor 
                                key={Doctor.id}
                                id={Doctor.id}
                                name={Doctor.name}
                                surname={Doctor.surname}
                                speciality={Doctor.speciality}
                            />
                        ))}
                </div>
                <Link to={"/"}>
                    <div className="d-grid gap-2 col-6 mx-auto text-center pb-5">
                        <button className="btn btn-primario">Volver a Inicio</button>
                    </div>
                </Link>
            </div>

        </>
    );
};