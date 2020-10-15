import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	homeContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
		marginTop: theme.spacing(4),
	},
}));

export default useStyles;
