import { makeStyles } from "@material-ui/core/styles";
import { form, submit } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let formObj = form(theme);
	let submitObj = submit(theme);
	return { ...formObj, ...submitObj };
});

export default useStyles;
