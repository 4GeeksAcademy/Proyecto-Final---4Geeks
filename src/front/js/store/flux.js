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

			login: (email, password, userType) => {
				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
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
					
					const user = userType === 'patient' ? data.patient : data.doctor;
					localStorage.setItem("name", user.name);
					sessionStorage.setItem("name", user.name);

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
		},
	}
};


export default getState;
