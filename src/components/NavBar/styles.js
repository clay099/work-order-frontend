import { makeStyles } from "@material-ui/core/styles";
import { root, title, icon } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let rootObj = root(theme);
	let titleObj = title(theme);
	let iconObj = icon(theme);
	return { ...rootObj, ...titleObj, ...iconObj };
});

export default useStyles;
