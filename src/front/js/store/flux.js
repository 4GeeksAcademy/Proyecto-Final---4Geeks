


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			signupSuccesful:null, 
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			authentication:false, 
			messageError: null,
			doctors: [],
			patients: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// login: (email, password, userType) => {
			// 	const requestOptions = {
			// 		method: "POST",
			// 		headers: {"Content-Type": "application/json"},
			// 		body: JSON.stringify({
			// 			"email": email,
			// 			"password": password
			// 		})
			// 	};
				
			// 	fetch(process.env.BACKEND_URL + `/api/login/${userType}`, requestOptions)
			// 	.then((response) => {
			// 		console.log(response.status)
			// 		if (response.status === 200){
			// 			setStore({ authentication: true });
			// 		}
			// 		return response.json();
			// 	})
			// 	.then((data) => {
			// 		localStorage.setItem("token", data.token);
			// 		sessionStorage.setItem("token", data.token);
			// 		localStorage.setItem("authentication", true)
			// 		sessionStorage.setItem("authentication", true);

			// 		localStorage.setItem("id", data.doctor.id)
			// 		sessionStorage.setItem("id", data.doctor.id);

			// 		console.log("DATA LOGIN ->", data)
					
			// 		const user = userType === 'patient' ? data.patient : data.doctor;
			// 		localStorage.setItem("name", user.name);
			// 		sessionStorage.setItem("name", user.name);
			
			// 	})
			// 	.catch((error) => {
			// 		console.error( error);
			// 		setStore({ messageError: error.message });
			// 	});
			// },

			login: (email, password, userType) => {
				const requestOptions = {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify({
					"email": email,
					"password": password
				  })
				};
				
				fetch(process.env.BACKEND_URL + `/api/login/${userType}`, requestOptions)
				.then((response) => {
				  console.log(response.status)
				  if (response.status === 200){
					setStore({ authentication: true });
				  }
				  return response.json();
				})
				.then((data) => {
				  localStorage.setItem("token", data.token);
				  sessionStorage.setItem("token", data.token);
				  localStorage.setItem("authentication", true);
				  sessionStorage.setItem("authentication", true);
			  
				  if (userType === 'patient') {
					localStorage.setItem("id", data.patient.id);
					sessionStorage.setItem("id", data.patient.id);
					localStorage.setItem("name", data.patient.name);
					sessionStorage.setItem("name", data.patient.name);
				  } else if (userType === 'doctor') {
					localStorage.setItem("id", data.doctor.id);
					sessionStorage.setItem("id", data.doctor.id);
					localStorage.setItem("name", data.doctor.name);
					sessionStorage.setItem("name", data.doctor.name);
				  }
				  
				  console.log("DATA LOGIN ->", data);
				})
				.catch((error) => {
				  console.error( error);
				  setStore({ messageError: error.message });
				});
			  },

			register: async (userData, userType) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/register/${userType}`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(userData)
					});
					if (!resp.ok) {
						
						throw new Error("There was a problem in the registration request");
					}
					const data = await resp.json();
					setStore({ signupSuccesful: "Successful registration! Now you can log in." });
			
				} catch (error) {
					setStore({ messageError: error.message });
				}
			},

			logout: ()=>{
				setStore({ authentication: false });
			        // Eliminar el token del almacenamiento local
				localStorage.removeItem('token');
				localStorage.removeItem('name');
				localStorage.removeItem('authentication');
				localStorage.removeItem('id');
				sessionStorage.removeItem('id');
				sessionStorage.removeItem('authentication');
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('name');
					// Redireccionar al usuario a la página de inicio de sesión
				},
			
			loadDoctors: ()=>{
				fetch(process.env.BACKEND_URL + "/doctors")
					.then((response) => response.json())
					.then((data) => setStore({doctors:data.result}))
					.catch((error) => console.error(error))
				}, 

			getinfoDoctor: (id) => { 
				fetch(process.env.BACKEND_URL + `/doctor/${id}`)
				.then((response) => response.json())
				.then((result) => {
				// Aquí se asume que los datos del médico obtenidos del backend están en data
					let updatedDoctor = result; // Suponiendo que los datos del médico se encuentran en data.result
					let updatedDoctors = getStore().doctors.map((Doctor) => {
						if (Doctor.id === id) {
							return updatedDoctor; // Si el ID coincide, reemplaza el médico existente con los nuevos datos
						} else {
							return Doctor; // Si el ID no coincide, conserva el médico sin cambios
						}
					});
					setStore({ doctors: updatedDoctors }); // Actualiza el estado de la tienda con los médicos actualizados
					console.log("UPDATE", updatedDoctors); // Muestra los médicos actualizados en la consola
				});
			},

			updateDoctor: (doctors, id) => {
				const requestOptions = {
					method: "PUT",
					body: JSON.stringify(doctors),
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				  };
				  
				  fetch(process.env.BACKEND_URL + `/doctor/${id}`, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log("RESULTADOS", result)
						fetch(process.env.BACKEND_URL + "/doctors")
						.then((response) => response.json())
						.then((data) => setStore({doctors:data.result}))
						.catch((error) => console.error(error))
							
							
					})
					.catch((error) => console.error(error));
			 
			},

			loadPatients: ()=>{
				fetch(process.env.BACKEND_URL + "/patients")
					.then((response) => response.json())
					.then((data) => setStore({patients:data.result}))
					.catch((error) => console.error(error))
				}, 
			
			
			// getinfoPatient: (id) => { 
			// 	fetch(process.env.BACKEND_URL + `/patient/${id}`)
			// 	.then((response) => response.json())
			// 	.then((result) => {
			// 		// Aquí se asume que los datos del paciente obtenidos del backend están en data
			// 			let updatedPatient = result; // Suponiendo que los datos del médico se encuentran en data.result
			// 			let updatedPatients = getStore().patients.map((Patient) => {
			// 				if (Patient.id === id) {
			// 					return updatedPatient; // Si el ID coincide, reemplaza el médico existente con los nuevos datos
			// 				} else {
			// 					return Patient; // Si el ID no coincide, conserva el médico sin cambios
			// 				}
			// 			});
			// 			setStore({ patients: updatedPatients }); // Actualiza el estado de la tienda con los médicos actualizados
			// 			console.log("UPDATE", updatedPatients); // Muestra los médicos actualizados en la consola
			// 		});
			// 	},

			getinfoPatient: (id) => { 
				fetch(process.env.BACKEND_URL + `/patient/${id}`)
				.then((response) => response.json())
				.then((result) => {
					// Actualizar el estado global con la información del paciente que ha iniciado sesión
					setStore({ currentPatient: result });
				})
				.catch((error) => {
					console.error("Error al obtener la información del paciente:", error);
					setStore({ messageError: "Error al obtener la información del paciente" });
				});
			},

			//PARA USAR EN EL PrivateMedico.js
			getinfoMedico: (id) => { 
				fetch(process.env.BACKEND_URL + `/doctor/${id}`)
				.then((response) => response.json())
				.then((result) => {
					// Actualizar el estado global con la información del paciente que ha iniciado sesión
					setStore({ currentMedico: result });
				})
				.catch((error) => {
					console.error("Error al obtener la información del paciente:", error);
					setStore({ messageError: "Error al obtener la información del paciente" });
				});
			},
			
		},
	}
};


export default getState;
