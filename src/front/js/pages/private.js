import React from "react";
import { useNavigate } from "react-router-dom";
import './../../styles/Private.css';

export const Private = ( ) => {

    const navigate = useNavigate();
    const user = localStorage.getItem('name')
   
 

    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 private-container">
                    <h1 className="text-center">Bienvenido, {user}!</h1>
                    <p className="text-center">¡Gracias por iniciar sesión!</p>
                   
                </div>
            </div>
        </div>
    );
};