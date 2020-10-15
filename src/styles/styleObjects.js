const aboutContent = (theme) => ({
	aboutContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
});

const advancedProjectDetails = (theme) => ({
	advancedProjectDetails: { marginTop: theme.spacing(4) },
});

const form = (theme) => ({
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
});

const submit = (theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

const table = (theme) => ({
	table: {
		marginTop: theme.spacing(4),
		padding: theme.spacing(4),
	},
});

const dashboard = (theme) => ({
	dashboard: {
		marginTop: theme.spacing(4),
	},
});

const homeContent = (theme) => ({
	homeContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
		marginTop: theme.spacing(4),
	},
});

const backdrop = (theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
});

const styledButton = (theme) => ({
	styledButton: {
		marginTop: theme.spacing(2),
	},
});

const root = (theme) => ({
	root: {
		flexGrow: 1,
	},
});

const title = (theme) => ({
	title: {
		flexGrow: 1,
	},
});

const icon = (theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
});

const paper = (theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
});

const avatar = (theme) => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
});

const userType = (theme) => ({
	userType: {
		marginTop: theme.spacing(1),
	},
});

const sliderTitle = (theme) => ({
	sliderTitle: {
		marginTop: theme.spacing(2),
	},
});

const tableHead = (theme) => ({
	tableHead: {
		fontWeight: 800,
	},
});

export {
	aboutContent,
	advancedProjectDetails,
	form,
	submit,
	table,
	dashboard,
	homeContent,
	backdrop,
	styledButton,
	root,
	title,
	icon,
	paper,
	avatar,
	userType,
	sliderTitle,
	tableHead,
};
