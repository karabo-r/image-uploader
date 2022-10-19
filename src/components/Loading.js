import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Loading = ({ name }) => {
	return (
		<Container>
			{/* <div className="file-loading"> */}
				<h1 className="file-loading-title">{name}</h1>
				<div className="container">
					<motion.div
						className="element"
						animate={{ x: 230 }}
						transition={{
							repeat: Infinity,
							repeatType: "mirror",
							duration: 1.5,
						}}
					></motion.div>
				</div>
			{/* </div> */}
		</Container>
	);
};

const Container = styled.div`
	/* .file-loading { */
		height: 7rem;
		width: 23rem;
		padding: 1rem;
		display: flex;
		font-size: 18px;
		line-height: 27px;
		flex-direction: column;
		justify-content: center;
		letter-spacing: -0.035em;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;

		.file-loading-title {
			padding-left: 1rem;
			font-size: 1.3rem;
			
		}

		.container {
			margin-top: 1rem;
			height: 10px;
			width: 90%;
			background: #f2f2f2;
			border-radius: 8px;
			position: relative;
			margin-left: 1rem;

			.element {
				height: 100%;
				width: 30%;
				background: red;
				background: #2f80ed;
				border-radius: 8px;
			}
		}
	/* } */

	@media screen and (max-width: 600px) {
		box-shadow: none;
	}
`;

export default Loading;
