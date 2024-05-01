const API_GATEWAY =
	"https://z6my0pr9u3.execute-api.us-west-1.amazonaws.com/prod";
const API_AUTH = API_GATEWAY + "/auth";
const API_GET = API_GATEWAY + "/get";

export function authenticate() {
	const data = {
		username: "1123",
		password: "123",
	};

	const options = {
		method: "POST",
		cache: "default",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	return fetch(API_AUTH, options)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			//console.log(error);
			return { error: true, msg: error.message };
		});
}

export function get(token) {
	const data = {
		token: token,
	};

	const options = {
		method: "POST",
		cache: "default",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	return fetch(API_GET, options)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((response) => {
			//console.log(response);
			return response;
		})
		.catch((error) => {
			//console.log(error);
			return { error: true, msg: error.message };
		});
}
