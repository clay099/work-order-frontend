import React from "react";
import { TableBody, TableRow } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import ShortRow from "../ShortRow/ShortRow";
import RemainderRow from "../RemainderRow/RemainderRow";
import ReviewProjectIcon from "../ReviewProjectIcon/ReviewProjectIcon";
import Bid from "../Bid/Bid";

const TableContents = ({ bodyData, tableType }) => {
	const history = useHistory();
	const advancedProjectDetails = (id) => {
		if (tableType !== "auction") {
			history.push(`/project/${id}`);
		}
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
						<>
							<RemainderRow project={project} />
							<ReviewProjectIcon id={project.id} />
						</>
					) : null}
					{tableType === "auction" ? (
						<Bid projectId={project.id} />
					) : null}
				</TableRow>
			))}
		</TableBody>
	);
};

export default TableContents;
