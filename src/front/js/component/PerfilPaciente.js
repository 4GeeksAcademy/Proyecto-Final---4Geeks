import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { Context } from "../store/appContext";



const { store, actions } = useContext(Context);

// useEffect(() => {
//   actions.privateZone()
// }, []);


if (!store.authentication) {
  return <Navigate to = "/"/>;
}
 

const PerfilPaciente =()=>{
    return (
        <div className="jumbotron jumbotron-fluid background-private">
        <div className= "container-private">
            <h1 className='display-1'>HI!</h1>
            <p className='display-5'> USER</p>
            <p className="display-6"><strong>I hope you have a good day</strong></p>
        
        <Link to={"/"}>
          <button type="btn" className='btn btn-secondary'>Back home</button>
        </Link>
        </div>
      </div>
    
    )
}

export default PerfilPaciente