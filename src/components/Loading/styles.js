import { makeStyles } from "@material-ui/core/styles";
import { backdrop } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	return backdrop(theme);
});

export default useStyles;
