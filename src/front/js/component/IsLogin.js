import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export const IsLogin = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [token, setToken] = useState(null);
    const id = localStorage.getItem("id")

    
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenFromStorage = localStorage.getItem("token");
                console.log("Token recuperado de localStorage:", tokenFromStorage);
                if (tokenFromStorage) {
                    setToken(tokenFromStorage);
                }
            } catch (error) {
                console.error("Error al obtener el token del almacenamiento local:", error);
            } finally {
                // Simulamos un retraso de 3 segundos antes de establecer isLoading en false
                setTimeout(() => {
                    setIsLoading(false); // Actualiza el estado de carga una vez que se obtiene el token
                }, 2000);
            }
        };
    
        fetchToken();
    }, []);

    // Muestra una pantalla de carga mientras se espera la información
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className="container text-center mt-4">
                <h4 style={{fontWeight: "bold"}}>ADVERTENCIA</h4>
                <p>Para la correcta funcionalidad de la web, debes tener completo la información del perfil</p>
                
                <div className="container-fluid d-flex justify-content-between">
                    <Link to={`/privatedoctor`}>
                        <button className="btn btn-primario">Ir a zona privada</button>
                    </Link>
                    {/* Utilizamos el valor actualizado de token */}
                    { token && (
                        <Link to={`/editDoctor/${id}`}>
                        <button className="btn btn-secundario">Modificar perfil</button>
                     </Link>
                    )}
                 
                </div>
            
            </div>
        </>
    );
};