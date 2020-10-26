import React from "react";
import { Helmet } from "react-helmet";

const HelmetTags = () => {
	return (
		<Helmet>
			{/* <!-- HTML Meta Tags --> */}
			<title>Project Freelance</title>
			<meta
				name="description"
				content="Peer-To-Peer Outsourcing Project"
			/>

			{/* <!-- Google / Search Engine Tags -- /> */}
			<meta itemprop="name" content="Project Freelance" />
			<meta
				itemprop="description"
				content="Peer-To-Peer Outsourcing Project"
			/>
			<meta
				itemprop="image"
				content={process.env.PUBLIC_URL + "renovation.jpg"}
			/>

			{/* <!-- Facebook Meta Tags -- /> */}
			<meta
				property="og:url"
				content="https://project-freelance.netlify.app"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Project Freelance" />
			<meta
				property="og:description"
				content="Peer-To-Peer Outsourcing Project"
			/>
			<meta
				property="og:image"
				content={process.env.PUBLIC_URL + "renovation.jpg"}
			/>

			{/* <!-- Twitter Meta Tags -- /> */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Project Freelance" />
			<meta
				name="twitter:description"
				content="Peer-To-Peer Outsourcing Project"
			/>
			<meta
				name="twitter:image"
				content={process.env.PUBLIC_URL + "renovation.jpg"}
			/>
		</Helmet>
	);
};

export default HelmetTags;
