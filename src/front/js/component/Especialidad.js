import React from 'react';
import "./../../styles/Especialidad.css"

const Especialidad = (props) => {
    return (
        <div
            className="card"
            style={{
                width: "22rem",
                height: "26rem",
                margin: "1rem",
                padding: "0",
                backgroundColor: "#ffffff"
            }}
        >
            <img
                src={props.image}
                className="card-img-top"
                alt="..."
                style={{ width: "100%", height: "190px", objectFit: "cover" }} // Establecer altura de 190px para todas las imágenes
            />
            <div className="card-body d-flex flex-column align-items-center">
                <h4 className="card-title">{props.title}</h4>
                <ul className="card-text mt-1 card-list" style={{fontSize: "15px"}}>
                    {props.text.split(',').map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
                <a href={props.link} className="btn mt-1" style={{ backgroundColor: "#5C8692", color: "#fff", fontSize: "20px", transition: "background-color 0.3s" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>
                    Más información
                </a>
            </div>
        </div>
    );
};

export default Especialidad;
