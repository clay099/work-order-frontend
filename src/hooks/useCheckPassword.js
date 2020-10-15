import { useDispatch } from "react-redux";
import { checkTradesmenPasswordWithAPI } from "../actions/tradesmen";
import { checkUserPasswordWithAPI } from "../actions/user";

/** useCheckPassword Hook
 * @param  {string} email
 * @param  {string} password
 * @param  {string} userType
 *
 * Creates a custom hook to check if a password validates with the API.
 *
 * When called will submit a call to the API to check that the provided password validates with the API.
 *
 * Returns an error if the API does not validate or returns true if the API validates the provided details
 */
const useCheckPassword = ({ email, password, userType }) => {
	const dispatch = useDispatch();

	const handleSubmit = async () => {
		let resp;
		if (userType === "user") {
			resp = await dispatch(
				checkUserPasswordWithAPI({
					email,
					password,
				})
			);
		} else {
			resp = await dispatch(
				checkTradesmenPasswordWithAPI({
					email,
					password,
				})
			);
		}
		if (resp.type === "ERROR") {
			// user could not be found. return don't redirect, snackbar should provide user feedback
			return false;
		}
		return true;
	};
	return { handleSubmit };
};

export default useCheckPassword;
