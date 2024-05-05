import React from 'react'
import { useNavigate } from "react-router-dom";
import medicina_general from "../../img/medicina_general.jpg"
import "./../../styles/prices.css"



const Prices = () => {

    const handlePideCita = () => {
        // Redirige al 
        navigate('');
    };

    return (
        <>

            {/* <div className="jumbotron jumbotron-fluid background-private d-flex justify-content-center align-items-center flex-column" style={{ backgroundColor: "#425054", height: "200px" }}>
                <div className="container-private d-flex justify-content-center align-items-center flex-column">
                    <h1 className="prices" style={{color: "white"}}>Nuestros precios</h1>
                    <button type="btn" className='btn btn-secondary mt-2' onClick={handlePideCita} style={{ backgroundColor: "#83a8b1", color: "white", width: "150px" }}>Pide Cita</button>
                    <div className="container-private d-flex justify-content-center align-items-center flex-column"></div>
                </div>
            </div> */}

            <div className='Prices-list'>
                <div className='wrapper'>
                    <div className='single-price basic'>
                        <h1>Basic</h1>
                        <div className='price'>
                            <h2>15€</h2>
                        </div>
                        <div className='deals' style={{ marginTop: "10%" }}>
                            <h4>Acceso a cualquier especialidad</h4>
                            <h4>Atención total las 24 horas</h4>
                            <h4>1 consulta al mes</h4>
                            <h4>Incluye videollamada o consulta</h4>
                        </div>
                        <a href='#'>Seleccionar</a>
                    </div>
                    <div className='single-price standard'>
                        <h1>Standard</h1>
                        <div className='price'>
                            <h2>30€</h2>
                        </div>
                        <div className='deals' style={{ marginTop: "10%" }}>
                            <h4>Acceso a cualquier especialidad</h4>
                            <h4>Atención total las 24 horas</h4>
                            <h4>2 consultas al mes</h4>
                            <h4>Incluye videollamada o consulta</h4>
                        </div>
                        <a href='#'>Seleccionar</a>
                    </div>
                    <div className='single-price premium'>
                        <h1>Premium</h1>
                        <div className='price'>
                            <h2>50€</h2>
                        </div>
                        <div className='deals' style={{ marginTop: "10%" }}>
                            <h4>Acceso a cualquier especialidad</h4>
                            <h4>Atención total las 24 horas</h4>
                            <h4>Consultas ilimitadas</h4>
                            <h4>Incluye videollamada o consulta</h4>
                        </div>
                        <a href='#'>Seleccionar</a>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Prices;