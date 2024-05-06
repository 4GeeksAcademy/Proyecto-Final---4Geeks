import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../../store/appContext";
import { Link } from "react-router-dom";

const GetProfilePicture = (props) => {
    const { store, actions } = useContext(Context);
    const [profilePicture, setProfilePicture] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null); // Estado para el mensaje de confirmación

    useEffect(() => {
        getPicture();
    }, []);

    const getPicture = () => {
        const id = localStorage.getItem("id");
        const userType = localStorage.getItem("userType");
        fetch(process.env.BACKEND_URL + `/profilepicture/${userType}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener la imagen de perfil');
                }
                return response.json();
            })
            .then((data) => {
                setProfilePicture(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deletePicture = async () => {
        try {
            await actions.deletePicture();
            setConfirmationMessage("Imagen eliminada satisfactoriamente."); // Establecer el mensaje de confirmación
        } catch (error) {
            console.error(error);
            setConfirmationMessage("Error al eliminar la imagen de perfil.");
        }
    };

    return (

  <div className="col-fluid-md-4 mb-3 cardDoctore" >
    <div className="cardDoctor d-flex flex-row text-center align-items-center justify-content-between mt-2" style={{marginLeft: "80px"}}>
      {/* Renderizado condicional para mostrar la imagen de perfil */}
      <div className="d-flex flex-column align-items-start" style={{ maxWidth: "200px", maxHeight: "400px", marginRight: "20px" }}>
    <img src={profilePicture ? profilePicture.url_picture : "https://cdn-icons-png.freepik.com/512/3177/3177438.png"} alt="Imagen del perfil" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
      <div className="buttons mt-3" style={{ width: "50%" }}>
        {/* Agregar el evento onClick con la función deletePicture */}
        <div className="d-flex flex-column">
         
          <Link to={"/uploadpicture"}>
              <button className="btn" style={{ marginBottom:"15px",backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" } }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Subir foto <i className="fa-solid fa-circle-arrow-up" style={{ marginLeft: "5px" }}></i></button>
          </Link>
          <button onClick={deletePicture} className="btn btn-danger mb-2">Eliminar foto <i className="fa-solid fa-trash"></i></button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetProfilePicture;