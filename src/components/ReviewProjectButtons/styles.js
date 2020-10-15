import { makeStyles } from "@material-ui/core/styles";
import { styledButton, sliderTitle } from "../../styles/styleObjects";

const useStyles = makeStyles((theme) => {
	let styledButtonObj = styledButton(theme);
	let sliderTitleObj = sliderTitle(theme);
	return { ...styledButtonObj, ...sliderTitleObj };
});

export default useStyles;
