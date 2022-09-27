import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImage from "./assets/default-preview.svg";

import axios from "axios";
import Loading from "./components/Loading";
import Download from "./components/Download";
import UploadSuccess from "./components/UploadSuccess";
import Upload from "./components/Upload";
const App = () => {
	const [file, setFile] = useState({ imagePath: defaultImage });
	const [fileServerID, setFileServerID] = useState("");
	const [isFileUploading, setIsFileUploading] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [isFileDownload, setFileDownload] = useState(false);

	const drop = useRef(null);
	const input = useRef(null);
	const downloadInput = useRef(null);
	const downloadButton = useRef(null);

	function appendEventListeners() {
		drop.current.addEventListener("dragover", handleFileDragOver);
		drop.current.addEventListener("drop", handleFileDrop);
		drop.current.addEventListener("click", handleInputClick);

		return () => {
			drop.current.removeEventListener("dragover", handleFileDragOver);
			drop.current.removeEventListener("drop", handleFileDrop);
			drop.current.removeEventListener("click", handleInputClick);
		};
	}
	useEffect(() => {
		if (!isFileUploading && !isFileUploaded && !isFileDownload) {
			appendEventListeners();
		}
	});

	const handleFileDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleFileDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const { files } = e.dataTransfer;

		if (files && files.length) {
			const filePath = URL.createObjectURL(files[0]);
			setFile({ imagePath: filePath, data: files[0] });
		}
	};

	function handleInputClick() {
		input.current.click();
	}

	function handleInput(e) {
		const filePath = URL.createObjectURL(e.target.files[0]);
		saveFile(e, filePath);
	}

	function saveFile(e, filePath) {
		const newFile = {
			imagePath: filePath,
			data: e.target.files[0],
		};
		setFile(newFile);
	}

	async function uploadFile() {
		setIsFileUploading(true);

		const formData = new FormData();
		formData.append("file", file.data);
		try {
			const response = await axios({
				method: "post",
				url: "http://localhost:3003/uploads",
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
			setFileServerID(response.data.imageID);
			handleDisplayRenders("uploaded");
		} catch (error) {
			console.log(error);
		}
	}

	function handleDisplayRenders(string) {
		switch (string) {
			case "upload":
				setFile({ imagePath: defaultImage });
				setIsFileUploaded(false);
				setIsFileUploading(false);
				break;
			case "uploading":
				setIsFileUploading(true);
				break;
			case "uploaded":
				setIsFileUploaded(true);
				setIsFileUploading(false);
				break;
			case "download":
				resetToDefaultStates(); // default value resets display states
				setFileDownload(true);
				break;
			default:
				setFileDownload(false);
				setIsFileUploaded(false);
				setIsFileUploading(false);
		}
		return;
	}

	function resetToDefaultStates() {
		setFile({ imagePath: defaultImage });
		handleDisplayRenders(); // default value resets display states
		setFileServerID();
	}

	function copyDownloadLinkToClipboard() {
		navigator.clipboard.writeText(fileServerID);
	}

	function handleFileServerID() {
		setFileServerID(downloadInput.current.value);
	}

	async function previewFile() {
		// get the image from the backend using the provided ID
		const response = await axios.get(
			`http://localhost:3003/download/${fileServerID}`,
		);

		function _arrayBufferToBase64(buffer) {
			var binary = "";
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return window.btoa(binary);
		}

		console.log(response);
		const returnedImageBuffer = response.data.image.data.data;
		const base64String = _arrayBufferToBase64(returnedImageBuffer);

		const newPath = `data:image/png;base64,${base64String}`;
		setFile({ data: true, imagePath: newPath });
	}

	function downloadFile() {
		downloadButton.current.href = `${file.imagePath}`;
		downloadButton.current.click();
	}

	const propsCollection = {
		file,
		setFile,
		fileServerID,
		setFileServerID,
		isFileUploading,
		setIsFileUploading,
		isFileUploaded,
		setIsFileUploaded,
		isFileDownload,
		setFileDownload,
		handleInput,
		downloadFile,
		downloadInput,
		handleFileServerID,
		previewFile,
		resetToDefaultStates,
		copyDownloadLinkToClipboard,
		handleInputClick,
		uploadFile,
		drop,
		input,
		downloadButton,
	};

	return (
		<Container>
			{!isFileUploading && !isFileUploaded && !isFileDownload && (
				<Upload {...propsCollection} />
			)}
			{isFileDownload && <Download {...propsCollection} />}

			{isFileUploading && <Loading />}

			{isFileUploaded && <UploadSuccess {...propsCollection} />}
			{!isFileDownload && (
				<p
					className="download-button"
					onClick={() => handleDisplayRenders("download")}
				>
					Download a file using an ID
				</p>
			)}
			{isFileDownload && (
				<p
					className="download-button"
					onClick={() => handleDisplayRenders()}
				>
					Upload a file and get an ID
				</p>
			)}
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
