import { makeStyles } from "@material-ui/core/styles";
import { table, paper } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let tableObj = table(theme);
	let paperObj = paper(theme);
	return { ...tableObj, ...paperObj };
});

export default useStyles;
