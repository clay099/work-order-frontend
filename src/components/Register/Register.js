import React from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import {
	CssBaseline,
	Container,
	Typography,
	Avatar,
	Button,
	Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useToggle from "../../hooks/useToggle";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	userType: {
		marginTop: theme.spacing(1),
	},
}));

const Register = () => {
	const classes = useStyles();

	const { setTrue: showUser, setFalse: hideUser, toggle } = useToggle(true);

	let userVariant;
	let tradesmenVariant;

	if (toggle) {
		userVariant = "contained";
		tradesmenVariant = "outlined";
	} else {
		userVariant = "outlined";
		tradesmenVariant = "contained";
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<CssBaseline />
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Grid spacing={2} container className={classes.userType}>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant={userVariant}
							color="primary"
							onClick={showUser}
						>
							New User
						</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant={tradesmenVariant}
							color="primary"
							onClick={hideUser}
						>
							New Tradesmen
						</Button>
					</Grid>
				</Grid>
				{toggle ? (
					<RegisterForm userType="user" />
				) : (
					<RegisterForm userType="tradesmen" />
				)}
			</div>
		</Container>
	);
};

export default Register;
