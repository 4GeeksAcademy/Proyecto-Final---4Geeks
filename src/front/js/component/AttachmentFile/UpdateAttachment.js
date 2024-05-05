import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const UpdateAttachment = () => {

  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [description, setDescription] = useState(""); // Estado para almacenar la descripción
  const { store, actions } = useContext(Context);
  const userId = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();

  const changeUploadFolder = async (e) => {

    try {
      setLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);
      formData.append("upload_preset", process.env.CLOUDINARY_PRESENT);
      formData.append("id", userId);
      formData.append("userType", userType);

      await actions.changeUploadFile(formData, userId, userType);

      setConfirmationMessage("PDF cargado con éxito. Redirigiendo...");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Error al cargar el PDF:", error);
      setConfirmationMessage("Error al cargar el PDF. Inténtalo de nuevo.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginBottom: "25px" }}>
      <div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label htmlFor="formFile" className="form-label">Carga tu documento PDF</label>
        <input className="form-control" accept=".pdf" type="file" id="formFile" onChange={changeUploadFolder} />

        {loading && <p>Cargando...</p>}
        {confirmationMessage && <p>{confirmationMessage}</p>}

        
      </div>
      <Link to={"/PrivatePatient"}>
        <div className='text-center' style={{ marginTop: "15px" }}>
          <button className='btn btn-secundario' type="submit">Cancelar</button>
        </div>
      </Link>
    </div>
  );
};