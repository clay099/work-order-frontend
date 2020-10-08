import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
class apiRequest {
	static async request(endpoint, paramsOrData = {}, verb = "get") {
		// console.log("API Call:", endpoint, paramsOrData, verb);

		try {
			return (
				await axios({
					method: verb,
					url: `${BASE_URL}/${endpoint}`,
					[verb === "get" ? "params" : "data"]: paramsOrData,
				})
			).data;
			// axios sends query string data via the "params" key,
			// and request body data via the "data" key,
			// so the key we need depends on the HTTP verb
		} catch (err) {
			console.error("API Error:", err.response);
			return err.response;
		}
	}
}

export default apiRequest;
