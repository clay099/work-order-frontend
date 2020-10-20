import React from "react";
import {
	Typography,
	Link,
	ListItem,
	ListItemText,
	List,
	ListItemIcon,
} from "@material-ui/core";
import CustomListItem from "../CustomListItem/CustomListItem";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";

/** About Project Component
 *
 * - provides users details with project goals, methods and outcomes
 *
 */
const AboutProject = () => {
	const classes = useStyles();

	return (
		<div className={classes.aboutContent}>
			<Typography
				component="h4"
				variant="h4"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				About This Project
			</Typography>

			{/* project goals section */}
			<Typography
				component="h5"
				variant="h5"
				color="textPrimary"
				gutterBottom
			>
				Project Goals:
			</Typography>

			<Typography variant="body1" paragraph>
				The project has been completed into two separate parts
				containing a front-end (
				<Link href="https://github.com/clay099/work-order-frontend">
					github link
				</Link>
				) and a separate API back-end (
				<Link href="https://github.com/clay099/work-order-backend">
					github link
				</Link>
				,&nbsp;
				<Link href="https://work-order-backend.herokuapp.com/tradesmen">
					server link
				</Link>
				) .
			</Typography>

			<Typography variant="body1" paragraph>
				The project is a peer-to-peer outsourcing program which matches
				general users with qualified tradesmen to complete real-world
				jobs. At a high level there will be two types of users who will
				utilize this project. General Users & Tradesmen
			</Typography>
			<Typography variant="body1" paragraph>
				General Users will be anyone who needs to have a job completed
				which they need assistance completing. This can be anything from
				mowing their lawn, painting their house to a Bathroom
				renovation.
			</Typography>
			<Typography variant="body1" paragraph>
				Tradesmen will be people who are able to provide their expertise
				to help their parties complete their projects.
			</Typography>

			{/* functionality Section */}
			<Typography
				component="h5"
				variant="h5"
				color="textPrimary"
				gutterBottom
			>
				Project Functionality:
			</Typography>

			<Typography variant="body1" paragraph>
				The user experience is broken up into two parts. One for the
				general users and one for tradesmen. To gain the best
				understanding of the functionality as some processes can only be
				completed by general users or tradesmen, it is suggested that
				you many need to log out as a user and login as a tradesmen
				multiple times.
			</Typography>
			<Typography variant="body1" paragraph>
				As the project uses a local storage, if you wish to login as a
				general user and tradesmen at the same time on one computer
				please use chrome's incognito mode or another browsers private
				mode to avoid saving to local storage.
			</Typography>

			<Typography variant="h6" color="textPrimary" gutterBottom>
				User functionality:
			</Typography>
			<Typography variant="body1" paragraph>
				<List dense={true}>
					<CustomListItem listText="Register a new profile" />
					<CustomListItem listText="Update their profile information" />
					<CustomListItem listText="Create a new project to be completed" />
					<CustomListItem
						listText="Review and select a winning bid from quotes provided
							by tradesmen"
					/>
					<CustomListItem listText="Cancel / Delete a project" />
					<CustomListItem listText="Mark a Project as Complete" />
					<CustomListItem listText="Provide tradesmen feedback & node project issues" />
				</List>
			</Typography>

			<Typography variant="h6" color="textPrimary" gutterBottom>
				Tradesmen functionality:
			</Typography>
			<Typography variant="body1" paragraph>
				<List dense={true}>
					<CustomListItem listText="Register a new tradesmen profile" />

					<CustomListItem listText="Update their profile information" />

					<CustomListItem
						listText="Review projects which are at an bid stage & provide
							a project bid if they choose"
					/>

					<CustomListItem
						listText="If no bids have been selected tradesmen can update
							their project bid (tradesmen are only able to submit
							one bid per project)"
					/>

					<CustomListItem
						listText="Review project status and any feedback / reviews the
							general user has provided"
					/>

					<CustomListItem listText="Review all projects they are associated with" />
				</List>
			</Typography>

			{/* The Data Section */}
			<Typography
				component="h5"
				variant="h5"
				color="textPrimary"
				gutterBottom
			>
				Project Data:
			</Typography>

			<Typography variant="body1" paragraph>
				As this project is designed to be a peer-to-peer platform there
				is no external third party database to connect to. As outlined
				above a separate back-end API has been designed for this
				project.
			</Typography>
			<Typography variant="body1" paragraph>
				The project is seeded with limited general users & tradesmen
				data to allow for testing of the platform without needing to
				create all data from scratch.
			</Typography>
			<Typography variant="body1" paragraph>
				To login in as a General User or Tradesmen please use the
				following credentials or feel free to register your own user:
			</Typography>
			<List dense={true}>
				<ListItem>
					<ListItemText>
						Email: "user@gmail.com" or "tradesmen@gmail.com"
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>Password: "password"</ListItemText>
				</ListItem>
			</List>

			{/* Technologies Section */}
			<Typography
				component="h5"
				variant="h5"
				color="textPrimary"
				gutterBottom
			>
				Major Technologies Incorporated:
			</Typography>

			<List dense={true}>
				<CustomListItem listText="React - front-end user interface" />
				<CustomListItem listText="React-Redux - predictable state container" />
				<CustomListItem
					listText="Redux-Persist - allows for Redux state to be stored an
						persisted through hard refreshes using local-storage"
				/>
				<CustomListItem
					listText="Redux-Thunk - middleware to allow for async operations
						(API call's to back-end)"
				/>
				<CustomListItem listText="React-Router-DOM - front-end routing" />
				<CustomListItem listText="Axios - HTTP client" />
				<CustomListItem listText="Material-UI - Pre-made User Interface React Components" />
				<CustomListItem listText="Jest & React Testing Library - Test runner" />
			</List>

			{/* Sensitive Information Section */}
			<Typography
				component="h5"
				variant="h5"
				color="textPrimary"
				gutterBottom
			>
				Sensitive Information:
			</Typography>

			<Typography variant="body1" paragraph>
				As many users will have work completed at their address both
				their names and addresses are considered sensitive information.
			</Typography>
			<Typography variant="body1" paragraph>
				When tradesman bid on a project they will only be able to see
				the city, ZIP and country (they will not see the exact address).
				The project address will only be provided to the winner of the
				marketplace bid so they can complete the project.
			</Typography>

			<Typography
				component="h6"
				variant="h6"
				color="textPrimary"
				gutterBottom
			>
				Sensitive functionality which is not implemented:
			</Typography>
			<List dense={true}>
				<CustomListItem listText="User ID verification - avoid duplicate users" />
				<CustomListItem
					listText="Tradesmen ID verification - avoid badly rated tradesmen
						creating a new identification to start again"
				/>
				<CustomListItem
					listText="Fake project completion - avoid tradesmen creating users
						and acting as if they have completed projects"
				/>
			</List>
		</div>
	);
};

export default AboutProject;
