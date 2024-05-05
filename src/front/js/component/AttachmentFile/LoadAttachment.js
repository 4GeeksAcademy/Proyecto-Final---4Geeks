import React, { useState, useEffect } from "react";

const LoadAttachment = ({ userId }) => {
    const [files, setFiles] = useState([]);
    const userType = localStorage.getItem("userType")

    useEffect(() => {
        const fetchAttachmentFiles = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/attachmentfile/patient/${userId}`);
                if (!response.ok) {
                    throw new Error("Error fetching attachment files");
                }
                const attachmentFiles = await response.json();
                setFiles(attachmentFiles);
                console.log("Datos recibidos del backend:", attachmentFiles);
            } catch (error) {
                console.error("Error fetching attachment files:", error);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        };

        fetchAttachmentFiles();
    }, [userId]);

    const deleteFolder = async (attachment_id) => {
        try {
            const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este PDF?");
            if (confirmDelete) {
                const response = await fetch(`${process.env.BACKEND_URL}/deletefile/patient/${userId}/${attachment_id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el documento del perfil');
                }
                // Actualizar el estado files después de eliminar el archivo
                setFiles(prevFiles => prevFiles.filter(file => file.id !== attachment_id));
            }
        } catch (error) {
            console.error("Error al eliminar el PDF:", error);
            setConfirmationMessage("Error al eliminar el PDF. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            {/* Mostrar la lista de documentos cargados */}
            {files.length > 0 ? (
                <div>
                    {files.map((file, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{file.description}</h5>
                                <p className="card-text">
                                    <a href={file.url_file} target="_blank" rel="noopener noreferrer" className="link-document">{file.url_file}</a>
                                </p>
                                {userType === 'patient' && (
    <button onClick={() => deleteFolder(file.id)} className="btn btn-danger">Eliminar</button>
)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se han cargado archivos aún.</p>
            )}
        </>
    );
};

export default LoadAttachment;