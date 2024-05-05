import React from "react";

export const Contact = () => {
    const email = "mediconecta1@gmail.com";
    const subject = "Consulta";

    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    return (
        <div className="container-fluid text-center" style={{ marginTop: "15px" }}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://i.postimg.cc/tgzkKhry/pexels-tom-fisk-1692693.jpg" className="img-fluid rounded" alt="contact" style={{ maxHeight: "400px", objectFit: "cover" }} />
                            </div>
                            <div className="col-md-8 d-flex align-items-center">
                                <div className="card-body text-center">
                                    <h1 className="card-title" style={{ marginBottom: "15px" }}>Como contactar</h1>
                                    <h5 className="card-text" style={{ marginBottom: "15px" }}>Mándanos un correo a la siguiente dirección:</h5>
                                    <a href={mailToLink} className="card-text" style={{ marginBottom: "15px", textDecoration: "underline", color:"black" }}>{email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}