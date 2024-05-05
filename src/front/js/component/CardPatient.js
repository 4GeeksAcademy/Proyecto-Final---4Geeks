import React, {useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams  } from "react-router-dom";

const CardPatient = (props) => {
    const { store, actions } = useContext(Context);
    const [patientData, setPatientData] = useState(null);
   const { id } = useParams(); // Obtener los parámetros de la URL correctamente

    useEffect(() => {
        // Obtener la información del patient solo si aún no se ha cargado
        if (!patientData) {
            actions.getinfoPatient(id);
        }
    }, [patientData]);

    useEffect(() => {
        // Cuando se actualice el contexto con la información del paciente, actualizar el estado local
        setPatientData(store.patients.find(patient => patient.id === props.id));
    }, [store.patients]);

    // Esperar hasta que patientData tenga valor antes de renderizar el componente
    if (!patientData) {
        return <div>Cargando...</div>;
    }

    return (
        <>  
        <div className="col-md-4 mb-3" > 
            <div className="card text-center" >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_qLv_ueyszEkB_U0nWQxsPujgcsZe89czAjeWa5S7Q&s"
                     className="card-img-top mx-auto object-fit-sm-contain" alt="img_doc" style={{width:"18rem", objectFit:"contain"}}/>
                <div className="card-body justify-content-center ">
                    <h5 className="card-title aling-text-center">{patientData.name}&nbsp;{patientData.surname}</h5>
                    <h6>{patientData.speciality}</h6>
                    <p>{patientData.bio}</p>
                </div>
                <hr/>
                <div className="buttons" style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                    <Link to={"/patient/" + props.id + "/details"}>
                        <button className="btn btn-primario" style={{  marginBottom:"5px"}}>Leer más</button>
                    </Link> 
                    <Link to={"/"}>
                        <button className="btn btn-primario" style={{  marginBottom:"5px"}}>Pedir cita</button>
                    </Link>
                </div>
            </div>
        </div>

        
        </>
    );
};


export default CardPatient;