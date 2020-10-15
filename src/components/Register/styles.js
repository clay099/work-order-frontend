import { makeStyles } from "@material-ui/core/styles";
import { paper, avatar, userType } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let paperObj = paper(theme);
	let avatarObj = avatar(theme);
	let userTypeObj = userType(theme);
	return { ...paperObj, ...avatarObj, ...userTypeObj };
});

export default useStyles;
