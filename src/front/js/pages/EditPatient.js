import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    
    const [isMounted, setIsMounted] = useState(false);
    const [editPatient, setEditPatient] = useState({
        name: '',
        surname: '',
        email: '',
        age: null,
        identification: null,
        social_security: null,
    });

    useEffect(() => {
        setIsMounted(true);
        console.log(store.currentPatient)
        if (store.currentPatient) {
            const { name, surname, email, age, identification, social_security } = store.currentPatient
            setEditPatient({ name:name || "", surname: surname || "", email: email || "", age, identification, social_security });
        }
        return () => {
            setIsMounted(false);
        };
    }, [store.currentPatient]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form...');
        if (!isMounted) {
            console.warn('Component is unmounted, state update aborted');
            return;
        }
        if (!editPatient) {
            console.error('Edit patient is undefined or null');
            return;
        }
        console.log('Edit patient data:', editPatient);
        console.log('Age:', editPatient.age);
        console.log('Identification:', editPatient.identification);
        console.log('Social Security:', editPatient.social_security);

        try {
            console.log('Edit patient data:', editPatient);
            await actions.updatePatient(editPatient, id);
            await actions.getinfoPatient(id);
            navigate(`/PrivatePatient`);
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    return (
        <div className="container">
            <h1>Edit Patient</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" value={editPatient.name} onChange={e => setEditPatient({ ...editPatient, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="surname" value={editPatient.surname} onChange={e => setEditPatient({ ...editPatient, surname: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad</label>
                    <input type="number" className="form-control" id="age" value={editPatient.age || ""} onChange={e => setEditPatient({ ...editPatient, age: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="identification" className="form-label">Identificación</label>
                    <input type="number" className="form-control" id="identification" value={editPatient.identification || ""} onChange={e => setEditPatient({ ...editPatient, identification: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="social_security" className="form-label">Seguro Social</label>
                    <input type="number" className="form-control" id="social_security" value={editPatient.social_security || ""} onChange={e => setEditPatient({ ...editPatient, social_security: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" required = {true} className="form-control" id="email" value={editPatient.email} onChange={e => setEditPatient({ ...editPatient, email: e.target.value })} />
                </div>
                <div className='d-flex justify-content-center'>
                <button type="submit" className="btn" style={{backgroundColor: "#5C8692", color: "#fff", marginRight: "20px", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" }}} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Actualizar</button>
                <Link to={`/PrivatePatient`} className="btn" style={{backgroundColor: "#5C8692", color: "#fff", transition: "background-color 0.3s", ":hover": { backgroundColor: "#7A9CA5" }}} onMouseEnter={(e) => e.target.style.backgroundColor = "#7A9CA5"} onMouseLeave={(e) => e.target.style.backgroundColor = "#5C8692"}>Cancelar</Link>
                </div>
            </form>
        </div>
    );
};
