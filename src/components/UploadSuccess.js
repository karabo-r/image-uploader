import { useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "./buttons/PrimaryButton";
import useNotification from "../hooks/useNotification";

const UploadSuccess = (props) => {
	const notification = useNotification();

	const file = props.file;

	const copyDownloadLinkToClipboard = () => {
		navigator.clipboard.writeText(file.imageID);
	};

	useEffect(() => {
		notification.update("uploaded");
	}, []);
	
	return (
		<Container>
			{notification.display && notification.message}
			<div className="file-uploaded">
				<h1>Uploaded Successfully</h1>
				<div
					className="preview"
					style={{ backgroundImage: `url(${file.imagePath})` }}
				></div>
				<div className="download">
					<div className="download-link">{file.imageID}</div>
					<PrimaryButton
						onClick={copyDownloadLinkToClipboard}
						name="Copy Link"
					/>
				</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
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
export default UploadSuccess;
