import { makeStyles } from "@material-ui/core/styles";
import { paper, submit } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let paperObj = paper(theme);
	let submitObj = submit(theme);
	return { ...paperObj, ...submitObj };
});

export default useStyles;
