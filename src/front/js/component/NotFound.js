import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>

            <div className="container-fluid notFound">
                <div className="container text-center">
                    <span className="notFound-text">404</span>
                    <h1>¡Página no encontrada!</h1>
                    <p>La página que estás buscando no existe. Intente buscar otra página o regrese a la página de inicio del sitio web para encontrar lo que está buscando.</p>
                    <Link to={"/"}>
                        <button type="button" className="btn btn-secondary">Back home</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound