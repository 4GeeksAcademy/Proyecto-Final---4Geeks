import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const ProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { store, actions } = useContext(Context);
  const userId = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate(); // Llamar a useNavigate fuera de la función

  const changeUploadImage = async (e) => {
    try {
      setLoading(true); // Mostrar mensaje de carga
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_PRESENT);
      formData.append("id", userId);
      formData.append("userType", userType);
  
      await actions.changeUploadImage(formData, userId, userType);
  
      setConfirmationMessage("Imagen cargada con éxito. Redirigiendo...");
  
      // Redireccionar a la página anterior después de tres segundos
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setConfirmationMessage("Error al cargar la imagen. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Ocultar mensaje de carga
    }
  };

  const goBack = () => {
    navigate(-1); // Llamar a navigate dentro de la función goBack
  };

  return (
    <div className="container text-center">
      <div >
        <label htmlFor="formFile" className="form-label">Carga imágenes que no sean mayores de 400 x 400 px</label>
        <input className="form-control" accept="image/*" type="file" id="formFile" onChange={changeUploadImage}/>
      
        {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga */}
        {confirmationMessage && <p>{confirmationMessage}</p>}
        {store.profilespictures && (
          <div className="mt-3">
            <button className="btn btn-secondary" onClick={goBack}>Volver</button>
          </div>
        )}
      </div>
    </div>
  );
};