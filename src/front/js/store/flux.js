const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			signupSuccesful: null,
			authentication: false,
			messageError: null,
			doctors: [],
			specialities: [],
			patients: [],
			currentPatient: null,
			currentDoctor: null,
			profilespictures: [],
			folder: [],
			attachmentFiles: [],
			appointments: [],
			meetings: [],
			meetingsURL: []
		},
		actions: {

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
						if (response.status === 200) {
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
						localStorage.setItem("userType", userType); // Añade esta línea para guardar el tipo de usuario
						console.log("UserType stored in localStorage:", localStorage.getItem("userType")); // Verifica si se almacenó correctamente
						console.log("DATA LOGIN ->", data);
					})
					.catch((error) => {
						console.error(error);
						setStore({ messageError: error.message });
					});
			},



			register: async (userData, userType, id) => {
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



			logout: () => {
				setStore({ authentication: false });
				// Eliminar el token del almacenamiento local
				localStorage.removeItem('token');
				localStorage.removeItem('name');
				localStorage.removeItem('authentication');
				localStorage.removeItem('id');
				localStorage.removeItem('userType');
				sessionStorage.removeItem('userType');
				sessionStorage.removeItem('id');
				sessionStorage.removeItem('authentication');
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('name');
				// Redireccionar al usuario a la página de inicio de sesión
			},

			//<-- DOCTORS
			loadDoctors: () => {
				fetch(process.env.BACKEND_URL + "/doctors")
					.then((response) => response.json())
					.then((data) => setStore({ doctors: data.result }))
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
						setStore({ currentDoctor: updatedDoctors }); // Actualiza el estado de la tienda con los médicos actualizados		
					});
			},


			updateDoctor: (editDoctor, id) => {
				const requestOptions = {
					method: "PUT",
					body: JSON.stringify(editDoctor),
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};

				fetch(process.env.BACKEND_URL + `/doctor/${id}`, requestOptions)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then((result) => {
						console.log("RESULT FLUX UPGRATE", result);
						if (result && result.doctor) {
							setStore(prevStore => ({
								...prevStore,
								doctors: prevStore.doctors.map(doctor => doctor.id === id ? result.doctor : doctor)
							}));
						}
					})
					.catch((error) => console.error("Fetch error:", error));
			},


			idontknow: (editDoctor, id) => {
				const requestOptions = {
					method: "PUT",
					body: JSON.stringify(editDoctor),
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				};
				fetch(process.env.BACKEND_URL + `/doctor/${id}`, requestOptions)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then((result) => {
						console.log("RESULT FLUX UPGRATE", result);
						const conStore = getStore()
						const doctorsUpdate = conStore.doctors.map((doctor) => {
							if (doctor.id === id) {
								return result.doctor
							} return doctor
						})
						setStore({ doctors: doctorsUpdate });
					})
					.catch((error) => console.error("Fetch error:", error));
			},

			//<-- SPECIALTY  
			loadSpecialities: () => {
				fetch(process.env.BACKEND_URL + "/specialities")
					.then((response) => response.json())
					.then((data) => {
						// console.log("fetchSpeciality FLUX",data)
						// console.log("DATARESULT FLUX", data.result)
						setStore({ specialities: data.result })
					})
					.catch((error) => console.error(error))
			},
			//<-- PATIENT
			loadPatients: () => {
				fetch(process.env.BACKEND_URL + "/patients")
					.then((response) => response.json())
					.then((data) => setStore({ patients: data.result }))
					.catch((error) => console.error(error))
			},

			loadCurrentPatient: () => {
				fetch(process.env.BACKEND_URL + "/patients")
					.then((response) => response.json())
					.then((data) => setStore({ currentPatient: data.result }))
					.catch((error) => console.error(error))
			},

			getinfoPatient: (id) => {
				console.log("Fetching patient info for ID:", id);
				fetch(process.env.BACKEND_URL + `/patient/${id}`)
					.then((response) => response.json())
					.then((result) => {
						console.log("Received patient info:", result);
						// Actualizar el estado global con la información del paciente que ha iniciado sesión
						setStore({ currentPatient: result.patient });
					})
					.catch((error) => {
						console.error("Error al obtener la información del paciente:", error);
						setStore({ messageError: "Error al obtener la información del paciente" });
					});
			},

			updatePatient: async (editPatient, id) => {
				try {
					console.log("ID in updatePatient:", id); // Agregar este console.log
					console.log("Data to be sent:", editPatient)
					const requestOptions = {
						method: "PUT",
						body: JSON.stringify(editPatient),
						headers: { "Content-Type": "application/json" }
					};
					const response = await fetch(`${process.env.BACKEND_URL}/patient/${id}`, requestOptions);
					const data = await response.json();
					if (!response.ok) {
						throw new Error(data.message || "Failed to update patient");
					}
					console.log("Response data:", data);
					// Actualizar el estado global con los datos actualizados del paciente
					setStore({ currentPatient: editPatient });
					return data;
				} catch (error) {
					console.error("Error updating patient:", error);
					throw error;
				}
			},

//<-- PASSWORD
			recoverPassword: (email, userType) => {
				const requestOptions = {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify({
					"email": email,
					"userType": userType
				})
				};

				fetch(process.env.BACKEND_URL + "/send_password", requestOptions)
				  .then((response) => response.text())
				  .then((result) => console.log(result))
				  .catch((error) => console.error(error));
			},

			changePassword: async (password, id) => {
				try {
					const userType = localStorage.getItem("userType");
					const requestOptions = {
						method: "PUT",
						body: JSON.stringify({ password }),
						headers: { "Content-Type": "application/json" },
					};
			
					const response = await fetch(process.env.BACKEND_URL + `/changepassword/${userType}/${id}`, requestOptions);
					
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
			
					return true;
				} catch (error) {
					throw new Error('Error while changing password: ' + error.message);
				}
			},


//<-- PROFILE PICTURE
			loadPictures: ()=>{
				fetch(process.env.BACKEND_URL + "/profilepicture")
					.then((response) => response.json())
					.then((data) => setStore({profilespictures:data.result}))
					.catch((error) => console.error(error))
				}, 

			getPicture: (id, userType) => { 
				fetch(process.env.BACKEND_URL + `/profilepicture/${userType}/${id}`)
				.then((response) => response.json())
				.then((result) => {
				// Aquí se asume que los datos del médico obtenidos del backend están en data
					let updatedPicture = result; // Suponiendo que los datos del médico se encuentran en data.result
					let updatedPictures = getStore().profilespictures.map((Profilespicture) => {
						if (Profilespicture.id === id) {
							return updatedPicture; // Si el ID coincide, reemplaza el médico existente con los nuevos datos
						} else {
							return Profilespicture; // Si el ID no coincide, conserva el médico sin cambios
						}
					});
					setStore({ profilespictures: updatedPictures }); // Actualiza el estado de la tienda con los médicos actualizados
					
				});
			},

			changeUploadImage: async (formData, userId, userType) => {
				try {
				  const response = await fetch(process.env.BACKEND_URL + `/uploadprofilepicture/${userType}/${userId}`, {
					method: "POST",
					body: formData,
				  });
				   
				  if (!response.ok) {
					throw new Error("Failed to upload image");
				  }
				  
				  const responseData = await response.json();
			  
				} catch (error) {
				  console.error("Error uploading image:", error);
				  throw new Error("Error al cargar la imagen. Inténtalo de nuevo."); // Agregar un mensaje de error específico
				}
			  },
	
				deletePicture: () => {
				const userType = localStorage.getItem("userType")
				const id = localStorage.getItem("id")
				fetch(process.env.BACKEND_URL + `/deleteprofilepicture/${userType}/${id}`, {
					method: 'DELETE',
				})
				.then((response) => {
					// Verificar el estado de la respuesta
					if (!response.ok) {
						console.log (userType)
						console.log (id)
						throw new Error('Error al eliminar la imagen de perfil');
					}
					// Devolver la respuesta en formato JSON
					return response.json();
					
				})
				.then((data) => {
					console.log (userType)
					// Manejar los datos de la respuesta
					console.log("Respuesta del servidor: <3", data);
					// Recargar la página para mostrar la imagen predeterminada
					window.location.reload();
				})
				.catch((error) => {
					console.error(error);
				});
			},

			//<-- ATTACHMENT FILE 
			loadFolder: () => {
				fetch(process.env.BACKEND_URL + `/attachemntfiles`)
					.then((response) => response.json())
					.then((data) => {
						// console.log("fetchSpeciality FLUX",data)
						// console.log("DATARESULT FLUX", data.result)
						setStore({ attachmentFiles: data.result })
					})
					.catch((error) => console.error(error))
			},

			changeUploadFile: async (formData, id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/uploadattachmentfile/patient/${id}`, {
						method: "POST",
						body: formData,
					});
					if (!response.ok) {
						throw new Error("Failed to upload document");
					}

					const responseData = await response.json();
					// Aquí puedes manejar la respuesta del servidor según sea necesario
					console.log("Documento cargado exitosamente:", responseData);

					return responseData; // Devuelve los datos de respuesta si es necesario
				} catch (error) {
					console.error("Error uploading document:", error);
					throw new Error("Error al cargar el documento. Inténtalo de nuevo."); // Agregar un mensaje de error específico
				}
			},

			//<-- LISTADO DE CITAS
			loadAppoinment: () => {
				console.log("LISENT")
				fetch(process.env.BACKEND_URL + `/medical_appoinments`)
					.then((response) => response.json())
					.then((data) => {
						// console.log("fetchSpeciality FLUX",data)
						console.log("DATARESULT FLUX APPOINTMENT", data.result)
						setStore({ appointments: data.result })
					})
					.catch((error) => console.error(error))
			},

			loadMeeting: () => {
				console.log("EY LINK")
				fetch(process.env.BACKEND_URL + `/meetings`)
					.then((response) => response.json())
					.then((data) => {
						// console.log("fetchSpeciality FLUX",data)
						console.log("DATARESULT FLUX MEETING", data.result)
						setStore({ meetings: data.result })
					})
					.catch((error) => console.error(error))
			},

			// loadAppoinmentMeetingURL: ()=>{
			// 	console.log("LISENT")
			// 	fetch(process.env.BACKEND_URL + `/appointments_and_meetings`)
			// 	.then((response) => response.json())
			// 		.then((data) => {
			// 			// console.log("fetchSpeciality FLUX",data)
			// 			console.log("DATARESULT FLUX APPOINTMENT", data.result)
			// 			setStore({ meetingsURL: data.result })})
			// 		.catch((error) => console.error(error))
			// },

			// getinfoAttachment: (id) => { 
			// 	console.log("Fetching MEETING-ATTACHMENT info for ID:", id);
			// 	fetch(process.env.BACKEND_URL + `/appointments_and_meetings/${id}`)
			// 	.then((response) => response.json())
			// 	.then((result) => {
			// 		console.log("Received meeting info:", result);
			// 		// Actualizar el estado global con la información del paciente que ha iniciado sesión
			// 		setStore({ meetingsURL: result});
			// 	})
			// 	.catch((error) => {
			// 		console.error("Error al obtener la información del meeting:", error);
			// 		setStore({ messageError: "Error al obtener la información del meeting" });
			// 	});
			// },



			// getAttachmentFilesByPatientId: (id) => { 
			// 	  fetch(process.env.BACKEND_URL + `/attachmentfile/patient/${id}`)
			// 		.then((response) => response.json())
			// 		.then((result) => console.log("getAttachmentFilesByPatientId",result))
			// 		.catch((error) => console.error(error));

			// .then((response) => response.json())
			// .then((result) => {
			// // Aquí se asume que los datos del médico obtenidos del backend están en data
			// 	let updatedaAttachmentFile = result; // Suponiendo que los datos del médico se encuentran en data.result
			// 	let updatedaAttachmentFiles = getStore().attachmentFiles.map((Attachemntfiles) => {
			// 		if (Attachemntfiles.id === id) {
			// 			return updatedaAttachmentFile; // Si el ID coincide, reemplaza el médico existente con los nuevos datos
			// 		} else {
			// 			return Profilespicture; // Si el ID no coincide, conserva el médico sin cambios
			// 		}
			// 	});
			// 	setStore({ attachmentFiles: updatedaAttachmentFiles }); // Actualiza el estado de la tienda con los médicos actualizados

			// });
			//},

			// deleteFolder: (id, attachment_id) => {
			// 	fetch(process.env.BACKEND_URL + `/deletefile/patient/${id}/${attachment_id}`, {
			// 		method: 'DELETE',
			// 	})
			// 	.then((response) => {
			// 		if (!response.ok) {
			// 			throw new Error('Error al eliminar el documento del perfil');
			// 		}
			// 		return response.json();
			// 	})
			// 	.then((data) => {
			// 		console.log (userType)
			// 		// Manejar los datos de la respuesta
			// 		console.log("Respuesta del servidor: <3", data);
			// 		// Recargar la página para mostrar la imagen predeterminada
			// 		window.location.reload();
			// 	})
			// 	.catch((error) => {
			// 		console.error(error);
			// 	});
			// },






			privateZone: async () => {
				try {
					const token = localStorage.getItem('token');

					const requestOptions = {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}
					};

					const resp = await fetch(process.env.BACKEND_URL + "/api/protected", requestOptions);

					if (!resp.ok) {
						throw new Error("There was a problem in the login request");
					} else if (resp.status === 403) {
						throw new Error("Missing or invalid token");
					}

					const data = await resp.json();
					console.log("This is the data you requested", data);
					return data;
				} catch (error) {
					console.error(error);

				}

			},

		},
	}
};


// loadAppointment: ()=>{
// 	fetch(process.env.BACKEND_URL + "/medical_appoinments")
// 	.then((response)=> response.json())
// 	.then((data)=>{
// 		setStore({appointments: data.result})})
// 	.catch((err)=> console.error(err))
// },

// loadMeetings: ()=>{
// 	fetch(process.env.BACKEND_URL + "/meetings")
// 	.then((response)=>response.json())
// 	.then((data)=>{
// 		setStore({meetings: data.result})})
// 	.catch((err)=>console.err(err))
// },


export default getState;