import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
export const EditDoctor = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const idFromUrl = parseInt(id);
    const navigate = useNavigate();
    const [speciality, setSpeciality] = useState({});
    const [specialities, setSpecialities] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false); // Nuevo estado
    const [editDoctor, setEditDoctor] = useState({
        name: "",
        surname: "",
        email: "",
        age: "",
        bio: "",
        identification: "",
        medical_license: "",
        speciality_id: ""
    });
    useEffect(() => {
        const loadSpecialities = async () => {
            try {
                await actions.loadSpecialities();
            } catch (error) {
                console.error("Error loading specialities:", error);
            }
        };
        loadSpecialities();
    }, []);
    useEffect(() => {
        setSpecialities(store.specialities);
    }, [store.specialities]);

    useEffect(() => {
        const editDoctor = Array.isArray(store.doctors) ? store.doctors.find(doctor => doctor.id === idFromUrl) : null;
        if (editDoctor) {
            setEditDoctor({
                name: editDoctor.name || "",
                surname: editDoctor.surname || "",
                email: editDoctor.email || "",
                age: editDoctor.age || "",
                bio: editDoctor.bio || "",
                identification: editDoctor.identification || "",
                medical_license: editDoctor.medical_license || "",
                speciality_id: editDoctor.speciality_id || ""
            });
        }
    }, [idFromUrl, store.doctors]);

    useEffect(() => {
        if (editDoctor && editDoctor.speciality_id) {
            const foundSpeciality = specialities.find(speciality => speciality.id === editDoctor.speciality_id);
            setSpeciality(foundSpeciality);
        }
    }, [editDoctor, specialities]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar si todos los campos están completados
        if (editDoctor.name && editDoctor.surname && editDoctor.email && editDoctor.age && editDoctor.bio && editDoctor.identification && editDoctor.medical_license && editDoctor.speciality_id) {
            try {
                await actions.updateDoctor(editDoctor, id);
                console.log("Doctor actualizado:", editDoctor);
                setFormSubmitted(true); // Marcar el formulario como enviado
                setTimeout(() => {
                    navigate('/privatedoctor');
                }, 3000);
            } catch (error) {
                console.error("Error updating doctor:", error);
            }
        } else {
            // Mostrar mensaje de error o alerta si no todos los campos están completados
            alert("Por favor complete todos los campos antes de enviar el formulario.");
        }
        console.log("Doctor antes de la actualización:", editDoctor);

    };
    return (
        <>
            <div className='content' style={{ padding: "50px" }}>
                <form onSubmit={handleSubmit}>
                   
                    <div className="mb-3">
                        <label htmlFor="inputname" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputname" name="name" placeholder="Name"
                            onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })}
                            value={editDoctor.name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" name="email" rows="3" placeholder="Enter email"
                            onChange={(e) => setEditDoctor({ ...editDoctor, email: e.target.value })}
                            value={editDoctor.email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputsurname" className="form-label">surname</label>
                        <input type="text" className="form-control" id="inputssurname" name="surname" rows="3" placeholder="Enter surname"
                            onChange={(e) => setEditDoctor({ ...editDoctor, surname: e.target.value })}
                            value={editDoctor.surname}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAge" className="form-label">Edad</label>
                        <input type="number" className="form-control" id="inputAge" rows="3" name="age" placeholder="Enter age"
                            onChange={(e) => setEditDoctor({ ...editDoctor, age: e.target.value })}
                            value={editDoctor.age}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputbio" className="form-label">bio</label>
                        <input type="text" className="form-control" id="inputbio" rows="3" name="bio" placeholder="Enter bio"
                            onChange={(e) => setEditDoctor({ ...editDoctor, bio: e.target.value })}
                            value={editDoctor.bio}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputidentification" className="form-label">DNI/NIE</label>
                        <input type="number" className="form-control" id="inputidentification" rows="3" name="identification" placeholder="Enter identification"
                            onChange={(e) => setEditDoctor({ ...editDoctor, identification: e.target.value })}
                            value={editDoctor.identification}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputmedical_license" className="form-label">Nº Colegiado/a</label>
                        <input type="number" className="form-control" id="inputmedical_license" rows="3" name="medical license<" placeholder="Enter  medical_license"
                            onChange={(e) => setEditDoctor({ ...editDoctor, medical_license: e.target.value })}
                            value={editDoctor.medical_license}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputspeciality" className="form-label">Speciality</label>
                        <select
                            className="form-select"
                            id="inputspeciality"
                            name="speciality"
                            value={speciality ? speciality.id : ""}
                            onChange={(e) => {
                                const selectedSpecialityId = parseInt(e.target.value);
                                const selectedSpeciality = specialities.find(spec => spec.id === selectedSpecialityId);
                                setSpeciality(selectedSpeciality);
                                setEditDoctor({ ...editDoctor, speciality_id: selectedSpecialityId });
                            }}
                        >
                            <option value="">Elige una opción</option> {/* Opción por defecto */}
                            {specialities.map(speciality => (
                                <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Botón de enviar */}
                    <div className='d-grid gap-2'>
                        <button className="btn btn-primario" type="submit" >Actualzar</button>
                    </div>
                    {/* Mensaje de éxito */}
                    {formSubmitted && (
                        <div className="popup text-center">
                            <p>¡Actualización exitosa!</p>
                        </div>
                    )}

                    <Link to={"/privatedoctor"}>
                        <div className='d-grid gap-2' style={{marginTop:"15px"}}>
                            <button className='btn btn-outline-danger' type="submit">Cancelar</button>
                        </div>
                    </Link>
                </form>

            </div>
        </>
    );
};