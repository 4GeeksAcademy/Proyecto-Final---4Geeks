import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import MediConecta from "../../img/MediConecta.jpg"
 

export const Footer = () => {

  const email = "mediconecta1@gmail.com";
  const subject = "Consulta";

  const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  // const handleInstagram = () => {
  //   // Redirige al componente Login
  //   navigate('Instagram');
  // };
  // const handleFacebook = () => {
  //   // Redirige al componente Login
  //   navigate('Facebook');
  // };
  // const handleTwitter= () => {
  //   // Redirige al componente Login
  //   navigate('Twitter');
  // };
  // const handleLinkedin = () => {
  //   // Redirige al componente Login
  //   navigate('Linkedin');
  // };

  return(
	<footer className="footer mt-auto py-3 text-center">

      {/* <div className="overlay"></div> */}
      <div className="container-fluid px-md-5">
        <div className="row mb-5">
          
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Especialidades</h2>
              <div className="">
                <ul className="list-unstyled">
                {/* <li>
                  <button className="btn btn-Facebook" style={{color: "white"}}onClick={handleFacebook}>
                  <i className="fa-brands fa-facebook fa-xl"></i>
                  </button>
                </li> */}
                  <li><Link className="dropdown-item-footer" to="/Dermatologia">Dermatología</Link></li>
                  <li><Link className="dropdown-item-footer" to="/Fisioterapia">Fisioterapia</Link></li>
                  <li><Link className="dropdown-item-footer" to="/MedicinaGeneral">Medicina General</Link></li>
                  <li><Link className="dropdown-item-footer" to="/Nutricion">Nutrición</Link></li>
                  <li><Link className="dropdown-item-footer" to="/Pediatria">Pediatría</Link></li>
                  <li><Link className="dropdown-item-footer" to="/Psicologia">Psicología</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Conócenos</h2>

              <ul className="list-unstyled">
                <li><a href="/">Inicio</a></li>
                {/* <li><a href="#about-section">Sobre Nosotros</a></li> */}
                {/* <li><a href="#specialty-section">Departamentos</a></li> */}
                <li><a href="/alldoctors">Doctores</a></li>
                {/* <li><a href="#blog-section">Blog</a></li> */}
                {/* <li><a href="#">Precios</a></li> */}
                <li><a href="/contact">Contactenos</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">

              <div className="">
                  <a href="/"><img src={MediConecta} alt="MediConecta" style={{borderRadius:"50%"}}/></a>
              {/* <p className="mt-2">Muy muy lejos, detrás de la palabra montañas, lejos de los países..</p> */}
              </div>
              {/* <div className="d-flex justify-content-center">
              <div className="Instagram">
                  <button className="btn btn-Instagram" style={{color: "white"}}onClick={handleInstagram}>
                  <i className="fab fa-instagram fa-xl"></i> 
                  </button>
                </div>
                <div className="Facebook">
                  <button className="btn btn-Facebook" style={{color: "white"}}onClick={handleFacebook}>
                  <i className="fa-brands fa-facebook fa-xl"></i>
                  </button>
                </div>
                <div className="Twitter">
                  <button className="btn btn-Twitter" style={{color: "white"}}onClick={handleTwitter}>
                  <i className="fa-brands fa-twitter fa-xl"></i>
                  </button>
                </div>
                <div className="Linkedin">
                  <button className="btn btn-Linkedin" style={{color: "white"}}onClick={handleLinkedin}>
                  <i className="fa-brands fa-linkedin fa-xl"></i>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Servicios</h2>

              <ul className="list-unstyled">
                <li> <span className="icon-long-arrow-right mr-2" style={{color:"#ffff"}}>Lunes a viernes</span> </li>
                <li> <span className="icon-long-arrow-right mr-2" style={{color:"#ffff"}}>9.00 - 17.00 h</span></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Contacto</h2>
              <div className="block-23 mb-3">
                <ul className="list-unstyled">
                  {/* <li><span className="icon icon-map-marker"></span><span className="text" style={{color:"#ffff"}}>203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                  <li><a href="#"><span className="icon icon-phone"></span><span className="text" style={{color:"#ffff"}}>+32 569 874 875</span></a></li> */}
                  <a href={mailToLink} className="card-text" style={{ marginBottom: "15px", textDecoration: "underline", color:"white" }}>{email}</a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ color: "#ffff", width: "100%", margin:"0", paddingTop:"15px"}}>
          <div className="col-md-12 text-center">
            <p>Todos los derechos reservados | Web diseñada por Diana Pérez - José Reimondez - Ruben MP para <a href="https://4geeksacademy.com/es/inicio" target="_blank" rel="noopener noreferrer">4geek</a> © Copyright 2024</p>
          </div>
        </div>
    </footer>
  
  )
    
};
