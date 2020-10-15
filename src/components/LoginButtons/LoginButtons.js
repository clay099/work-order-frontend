import React from "react";
import { Grid, Button, Dialog } from "@material-ui/core";
import LoginForm from "../LoginForm/LoginForm";
import useToggle from "../../hooks/useToggle";
import useStyles from "./styles";

const LoginButtons = () => {
	const {
		setTrue: handleOpenUser,
		setFalse: handleCloseUser,
		toggle: userOpen,
	} = useToggle(false);

	const {
		setTrue: handleOpenTradesmen,
		setFalse: handleCloseTradesmen,
		toggle: tradesmenOpen,
	} = useToggle(false);

	const classes = useStyles();
	return (
		<div className={classes.styledButton}>
			<Grid container spacing={2} justify="center">
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						onClick={handleOpenUser}
					>
						User Login
					</Button>
					<Dialog open={userOpen} onClose={handleCloseUser}>
						<LoginForm
							userType="User"
							handleClose={handleCloseUser}
						/>
					</Dialog>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						color="primary"
						onClick={handleOpenTradesmen}
					>
						Tradesmen Login
					</Button>
					<Dialog open={tradesmenOpen} onClose={handleCloseTradesmen}>
						<LoginForm
							userType="Tradesmen"
							handleClose={handleCloseTradesmen}
						/>
					</Dialog>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginButtons;
