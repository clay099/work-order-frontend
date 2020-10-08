import React from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core/";
import dateHelper from "../../helperFunctions/dateHelper";
import currencyHelper from "../../helperFunctions/currencyHelper";

const TableContents = ({ bodyData }) => {
	return (
		<TableBody>
			{bodyData.map((project) => (
				<TableRow key={project.id}>
					{project.description ? (
						<TableCell>{project.description}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.street_address ? (
						<TableCell>{project.street_address}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.address_city ? (
						<TableCell>{project.address_city}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.created_at ? (
						<TableCell>{dateHelper(project.created_at)}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.price ? (
						<TableCell>{currencyHelper(project.price)}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.status ? (
						<TableCell>{project.status}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.completed_at ? (
						<TableCell>
							{dateHelper(project.completed_at)}
						</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
					{project.issues ? (
						<TableCell>{project.issues}</TableCell>
					) : (
						<TableCell>no data</TableCell>
					)}
				</TableRow>
			))}
		</TableBody>
	);
};

export default TableContents;
