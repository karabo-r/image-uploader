import styled from "styled-components";
import Upload from "./components/Upload";
import Download from "./components/Download";
import { Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<Container>
			<Routes>
				<Route path="/" element={<Upload />} />
				<Route path="/download" element={<Download /> } />
			</Routes>
		</Container>
	);
};

const Container = styled.div`
	font-family: "Poppins";
	font-style: normal;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	input {
		width: 70%;
		outline: none;
		padding: 0.5rem;
	}

	button {
		cursor: pointer;
		font-family: "Noto Sans";

		font-size: 12px;

		letter-spacing: -0.035em;

		color: #ffffff;
		background: #2f80ed;
		outline: none;
		border: none;
		padding: 0.5rem 1rem;
	}

	button:hover {
		background-color: #0b428c;
	}
	.download-button {
		/* font-size:2rem ; */
		position: absolute;
		bottom: 1.5rem;
		font-family: "Poppins";
		font-style: normal;
		font-weight: 500;
		opacity: 60%;
		cursor: pointer;
	}
	.download-button:hover {
		opacity: 100%;
	}
	.card {
		display: flex;
		align-items: center;
		width: 25rem;
		flex-direction: column;
		height: 25rem;
		justify-content: center;
		background: #ffffff;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;

		.card-title {
			font-size: 1.5rem;
			font-weight: 500;
			font-size: 18px;
			line-height: 27px;
			margin-bottom: 1rem;

			letter-spacing: -0.035em;
		}

		p {
			margin-bottom: 1rem;

			font-weight: 500;
			font-size: 11px;
		}

		.card-image-preview {
			width: 338px;
			height: 218.9px;
			left: 551.82px;
			top: 427.97px;

			background: #f6f8fb;
			border: 2px dashed #97bef4;
			background-size: 13rem;
			background-position: center;
			background-repeat: no-repeat;

			input {
				visibility: hidden;
			}
		}

		button {
			margin-top: 1rem;
		}
	}

	.file-loading {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		justify-content: center;
		width: 23rem;
		height: 7rem;

		font-size: 18px;
		line-height: 27px;

		letter-spacing: -0.035em;

		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;

		.file-loading-title {
			padding-left: 1rem;
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
	}

	.file-uploaded {
		line-height: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 23rem;
		height: 25rem;
		max-width: 25rem;
		max-height: 25rem;
		background-color: rebeccapurple;

		background: #ffffff;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		padding: 1rem;

		h1 {
			font-size: 18px;
			line-height: 27px;

			letter-spacing: -0.035em;
			margin-top: 0.5rem;
			margin-bottom: 1rem;
		}

		.preview {
			width: 338px;
			height: 218.9px;
			left: 551.82px;
			top: 427.97px;

			background: #f6f8fb;
			border: 2px dashed #97bef4;
			border-radius: 12px;
			background-size: 12rem;
			background-position: center;
			background-repeat: no-repeat;
		}

		.download {
			height: 2rem;
			width: 80%;
			margin-top: 1rem;
			background-color: rebeccapurple;
			display: grid;
			grid-template-columns: 70% auto;
			background: #f6f8fb;
			align-items: center;

			border: 1px solid #e0e0e0;

			.download-link {
				font-size: 0.7rem;
				line-height: 12px;

				text-align: center;
				letter-spacing: -0.035em;
			}
		}
		.reset {
			font-size: 0.9rem;
			font-family: "Poppins";
			font-style: normal;
			font-weight: 500;
			margin-top: 1.2rem;
			cursor: pointer;
			opacity: 60%;
		}
		.reset:hover {
			opacity: 100%;
		}
	}
`;
export default App;
