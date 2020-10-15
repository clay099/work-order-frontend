import { makeStyles } from "@material-ui/core/styles";
import { paper, form, submit } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let paperObj = paper(theme);
	let formObj = form(theme);
	let submitObj = submit(theme);
	return { ...paperObj, ...formObj, ...submitObj };
});

export default useStyles;
