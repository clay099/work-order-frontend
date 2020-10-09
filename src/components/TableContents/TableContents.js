import React from "react";
import { TableBody, TableRow, Button, Icon } from "@material-ui/core/";
import { Send } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import ShortRow from "../ShortRow/ShortRow";
import RemainderRow from "../RemainderRow/RemainderRow";
import useToggle from "../../hooks/useToggle";
import Bid from "../Bid/Bid";

const TableContents = ({ bodyData, tableType }) => {
	const history = useHistory();
	const advancedProjectDetails = (id) => {
		history.push(`/project/${id}`);
	};

	return (
		<TableBody>
			{bodyData.map((project) => (
				<TableRow
					key={project.id}
					onClick={() => advancedProjectDetails(project.id)}
				>
					<ShortRow project={project} />
					{tableType === "full" ? (
						<RemainderRow project={project} />
					) : null}
					{tableType === "auction" ? <Bid /> : null}
				</TableRow>
			))}
		</TableBody>
	);
};

export default TableContents;
