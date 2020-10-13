import { useDispatch } from "react-redux";
import { checkTradesmenPasswordWithAPI } from "../actions/tradesmen";
import { checkUserPasswordWithAPI } from "../actions/user";

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
