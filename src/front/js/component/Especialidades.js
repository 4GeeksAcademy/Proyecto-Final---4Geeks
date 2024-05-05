import React from 'react';
import Especialidad from './Especialidad';
import medicina_general_dos from "../../img/Medicina-general-dos.jpg";
import image_3 from "../../img/image_3.jpg"
import dermatologia from "../../img/dermatologia.jpg"
import nutricion2 from "../../img/nutricion2.jpg"
import fisioterapia from "../../img/fisioterapia.jpg"
import psicologia from "../../img/psicologia.jpg"
import "./../../styles/Especialidades.css"

const Especialidades = () => {
  let cardData = [
    { title: "Medicina General", text: "Consultas médicas virtuales, Atención preventiva, Manejo de enfermedades crónicas, Referencias y coordinación de atención", image: medicina_general_dos, link: "/MedicinaGeneral" },
    { title: "Pediatría", text: "Exámenes rutinarios, Gestión de medicamentos, Tratamientos de salud mental, Tratamiento y prevención", image: image_3, link: "/Pediatria" },
    { title: "Dermatología", text: "Consulta dermatológica virtual, Tratamiento de enfermedades de la piel, Cuidados estéticos de la piel, Manejo de enfermedades dermatológicas", image: dermatologia, link: "/Dermatologia" },
    { title: "Psicología ", text: "Trastornos por ansiedad, Trastornos del estado de ánimo, Ludopatía, Trastorno de déficit de atención", image: psicologia, link: "/Psicologia" },
    { title: "Nutrición", text: "Ganancia o pérdida de peso, Protección cardiovascular, Mejora sistema inmunológico, Control de procesos inflamatorios", image: nutricion2, link: "/Nutricion" },
    { title: "Fisioterapia", text: "Fisioterapia neurológica, Fisioterapia respiratoria, Fisioterapia pediatrica, Rehabilitación", image: fisioterapia, link: "/Dermatologia" }
  ];

  // Función para dividir el array en grupos de tres elementos
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  // Dividir el array en grupos de tres elementos
  const cardGroups = chunkArray(cardData, 3);

  return (
    <>
      <div className="texto_ruben d-flex justify-content-center mt-4">
        {/* <button className="btn btn-outline-secondary" style={{ backgroundColor: "#83a8b1", color: "#fff" }}>Especialidades</button> */}
            {/* <h1 className="t-stroke t-shadow">ESPECIALIDADES</h1> */}
  <h4>E</h4>
  <h4>S</h4>
  <h4>P</h4>
  <h4>E</h4>
  <h4>C</h4>
  <h4>I</h4>
  <h4>A</h4>
  <h4>L</h4>
  <h4>I</h4>  
  <h4>D</h4>
  <h4>A</h4>
  <h4>D</h4>
  <h4>E</h4>
  <h4>S</h4>  

      </div>

      <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
        <div className="carousel-inner">
          {cardGroups.map((group, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="d-flex justify-content-center">
                {group.map((card, cardIndex) => (
                  <div key={cardIndex} className="p-2">
                    <Especialidad title={card.title} text={card.text} image={card.image} link={card.link} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev" style={{ color: 'black', backgroundColor: 'transparent' }}>
          <span className="carousel-control-prev-icon" style={{ backgroundColor: "#5C8692" }} aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next" style={{ color: 'black', backgroundColor: 'transparent' }}>
          <span className="carousel-control-next-icon" style={{ backgroundColor: "#5C8692" }} aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Especialidades;
