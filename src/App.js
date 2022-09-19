import React from "react";
import styled from "styled-components";
import defaultImage from "./assets/default-preview.svg";
import { motion } from "framer-motion";
const App = () => {
	return (
		<Container>
			{/* <div className="card">
				<h1>Upload your image</h1>
				<p>File should be a Png, Jpeg...</p>
				<div className="preview"></div>
				<p>or</p>
				<button>Choose a file</button>
			</div> */}
			<div className="loading">
				<h1>Uploading...</h1>
				<div className="container">
					<motion.div
						className="element"
						//  initial={{ x: "100%" }}
						animate={{ x: 230 }}
						transition={{
							repeat: Infinity,
							repeatType: "mirror",
							duration: 1.5,
						}}
					></motion.div>
				</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.card {
		line-height: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25rem;
		height: 25rem;
		max-width: 25rem;
		max-height: 25rem;
		background-color: rebeccapurple;

		background: #ffffff;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;

		h1 {
			/* font-size: 1.5rem; */
			font-family: "Poppins";
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 27px;
			/* identical to box height */
			margin-bottom: 1rem;

			letter-spacing: -0.035em;

			/* Gray 2 */

			/* color: #4f4f4f; */
		}

		p {
			font-family: "Poppins";
			margin-bottom: 1rem;
			font-style: normal;
			font-weight: 500;
			font-size: 10px;
			line-height: 15px;
			/* identical to box height */

			text-align: center;
			letter-spacing: -0.035em;

			/* Gray 3 */

			/* color: #828282; */
		}

		.preview {
			box-sizing: border-box;

			/* position: absolute; */
			width: 338px;
			height: 218.9px;
			left: 551.82px;
			top: 427.97px;

			background: #f6f8fb;
			border: 2px dashed #97bef4;
			border-radius: 12px;
			background-image: url(${defaultImage});
			background-size: 12rem;
			background-position: center;
			background-repeat: no-repeat;
		}

		button {
			font-family: "Noto Sans";
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			letter-spacing: -0.035em;

			color: #ffffff;
			background: #2f80ed;
			border-radius: 8px;
			outline: none;
			border: none;
			padding: 0.5rem 1rem;
		}
	}

	.loading {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		/* align-items: center;/ */
		justify-content: center;
		width: 23rem;
		height: 7rem;
		background-color: rebeccapurple;
		/* max-width: 25rem; */
		/* max-height: 25rem; */
		text-align: left;
		font-family: "Poppins";
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 27px;
		/* identical to box height */
		/* padding: 1rem; */

		letter-spacing: -0.035em;
		background: #ffffff;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;

		h1 {
			padding-left: 1rem;
		}
		.container {
			/* display: flex; */
			margin-top: 1rem;
			height: 10px;
			width: 90%;
			background: #f2f2f2;
			border-radius: 8px;
			position: relative;
			margin-left: 1rem;

			.element {
				/* border-radius: 8px; */
				/* position: absolute; */
				height: 100%;
				width: 30%;
				background: red;
				background: #2f80ed;
				border-radius: 8px;
			}
		}
	}
`;
export default App;
