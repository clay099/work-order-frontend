import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
	Button,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import logoutAll from "../../actions/logout";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

/** NavBar Component
 *
 * Gets user_type from Redux store
 *
 * Renders a navbar with the following:
 *    - Appearing on Each page:
 *        - HomeIcon - links to homepage
 *        - "Project Freelance" Link - links to homepage
 *
 *    - Checks if user/tradesmen is logged in:
 *        - If logged in:
 *            - If userType is "user"
 *                - "Create New Project" Button - links to "/newproject"
 *            - "Dashboard" Button - links to "/user" or "/tradesmen" based on userType
 *            - IconButton (displays as white circle with blue human body outline) - When clicked displays menu containing:
 *                - "Profile" MenuItem - links to "/user/profile" or "/tradesmen/profile" based on userType
 *                - "Logout" MenuItem - links to "/" & dispatches the logout action (clears all state)
 *
 *        - If not logged in:
 *            - "Register" Button - links to "/register"
 */
export default function NavBar() {
	const classes = useStyles();

	const { userType } = useSelector((st) => ({
		userType: st.login.user_type,
	}));

	const [auth, setAuth] = useState(Boolean(userType));
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		setAuth(Boolean(userType));
	}, [userType]);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();
	const history = useHistory();

	const logout = () => {
		dispatch(logoutAll());
		history.push("/");
	};

	const register = () => {
		history.push("/register");
	};

	const newProject = () => {
		history.push("/user/newproject");
	};

	const dashboard = () => {
		history.push(`/${userType}`);
	};

	const userProfile = () => {
		handleClose();
		history.push(`/${userType}/profile`);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/" className="homeLink">
						<HomeIcon className={classes.icon} />
					</Link>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" className="homeLink">
							Project Freelance
						</Link>
					</Typography>
					{auth && (
						<div>
							{userType === "user" ? (
								<Button color="inherit" onClick={newProject}>
									Create New Project
								</Button>
							) : null}
							<Button color="inherit" onClick={dashboard}>
								{userType} Dashboard
							</Button>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={userProfile}>
									Profile
								</MenuItem>
								<MenuItem onClick={logout}>Logout</MenuItem>
							</Menu>
						</div>
					)}
					{!auth && (
						<Button color="inherit" onClick={register}>
							Register
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
