import React from "react";
import Especialidades from "../component/Especialidades";
import ListDoctors from "../component/ListDoctors";
import "./../../styles/style.css"
import Prices from "../component/Prices";
import { Contact } from "../pages/Contact";

export const Home = () => {
  return (
    <div>
{/*ESPECIALIDADES*/}
      <section className="bg-light section" id="specialty-section">
        <div className="row justify-content-center pt-4">
          <Especialidades className="col-md-4" />
        </div>
      </section>
{/* DOCTORES */}
      <section className="section" id="doctor-section">
        <div className="container-fluid" >
          <div className="row justify-content-center mb-5 pb-2" >
            <div className="col-md-8 text-center heading-section" >
              <h2 className="mb-4 text-center">Nuestros doctores cualificados</h2>
              <p>Conoce a nuestro equipo</p>
            </div>
          </div>
          <div className="container-fluid px-5 "  >
            <div className="row justify-content-center mx-5"  >
              <ListDoctors />
            </div>
          </div>
        </div>
        </section>
{/*PRECIOS*/}
      {/* <section className="section" id="prices-section">
        <div className="container-fluid px-5 "  >
          <div className="row justify-content-center mx-5"  >
            <Prices />
          </div>
        </div>
      </section> */}
{/* CONTACT */}
      <section className="section contact-section" id="contact-section">
        <div className=" justify-content-center mb-5 pb-3">
          <Contact />
        </div>
      </section>
    </div>
  );
};
