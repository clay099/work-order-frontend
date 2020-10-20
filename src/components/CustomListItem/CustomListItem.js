import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const CustomListItem = ({ listText }) => {
	return (
		<ListItem>
			<ListItemIcon>
				<AddIcon fontSize="small" />
			</ListItemIcon>
			<ListItemText>{listText}</ListItemText>
		</ListItem>
	);
};

export default CustomListItem;
