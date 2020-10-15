import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * Class to allow for api requests to be in structured Axio format
 */
class apiRequest {
	/**Format Axios request
	 * @param  {string} endpoint
	 * @param  {object} paramsOrData - default empty object
	 * @param  {string} verb - default "get"
	 *
	 * Creates and runs an Axios request based on the passed params.
	 *
	 * Returns the Axios request data or error
	 */
	static async request(endpoint, paramsOrData = {}, verb = "get") {
		// provide console info when in debug mode to see the call about to be made
		console.debug("API Call:", endpoint, paramsOrData, verb);

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
