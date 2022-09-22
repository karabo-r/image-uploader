import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import defaultImage from "./assets/default-preview.svg";

import axios from "axios";
const App = () => {
	const [file, setFile] = useState("");
	const [fileServerID, setFileServerID] = useState("asdf");
	const [previewImage, setPreviewImage] = useState(defaultImage);
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
			setFile({ name: files[0].name, imagePath: filePath, data: files[0] });
		}
	};

	function handleInputClick() {
		input.current.click();
	}

	function handleInput(e) {
		const filePath = URL.createObjectURL(e.target.files[0]);
		setPreviewImage(filePath);
		saveFile(e, filePath);
	}

	function saveFile(e, filePath) {
		const newFile = {
			name: e.target.files[0].name,
			path: filePath,
			data: e.target.files[0],
		};
		setFile(newFile);
		console.log(newFile);
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
				setPreviewImage(defaultImage);
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
			// eslint-disable-next-line no-fallthrough
			default:
				// resetToDefaultStates()
				setFileDownload(false);
				setIsFileUploaded(false);
				setIsFileUploading(false);
		}
		return;
	}

	function resetToDefaultStates() {
		setPreviewImage(defaultImage);
		handleDisplayRenders(); // default value resets display states
		setFileServerID();
		setFile();
	}

	function copyDownloadLinkToClipboard() {
		navigator.clipboard.writeText(fileServerID);
	}

	function handleFileServerID() {
		setFileServerID(downloadInput.current.value);
	}

	async function previewFile() {
		// get the image from the backend using the provided ID
		const response = await axios.post(
			`http://localhost:3003/download/${fileServerID}`,
		);

		const returnedImageBuffer = response.data.image.data.data;
		const base64String = btoa(
			String.fromCharCode(...new Uint8Array(returnedImageBuffer)),
		);
		const newPath = `data:image/png;base64,${base64String}`;

		setFile({ path: newPath });
		setPreviewImage(newPath);
	}

	function downloadFile() {
		downloadButton.current.href = previewImage;
		downloadButton.current.click();
	}

	return (
		<Container>
			{!isFileUploading && !isFileUploaded && !isFileDownload && (
				<div className="card">
					<h1 className="card-title">Upload your image</h1>
					<p className="card-description">File should be a Png, Jpeg...</p>
					<div
						ref={drop}
						className="card-image-preview"
						style={{ backgroundImage: `url(${previewImage})` }}
					>
						<input
							ref={input}
							type="file"
							onChange={(e) => handleInput(e)}
							style={{ display: "none" }}
						/>
					</div>
					{!file && (
						<>
							<button onClick={handleInputClick}>Choose a file</button>
						</>
					)}
					{file && <button onClick={uploadFile}>Upload</button>}
				</div>
			)}
			{isFileDownload && (
				<div className="card">
					<h1 className="card-title">Download your image</h1>
					{!file && <p className="card-description">Please input an ID</p>}

					{file && (
						<div
							className="card-image-preview"
							style={{ backgroundImage: `url(${previewImage})` }}
						></div>
					)}
					{!file && (
						<input
							ref={downloadInput}
							value={fileServerID}
							onChange={handleFileServerID}
						/>
					)}
					<a ref={downloadButton} style={{ display: "none" }} download />

					{!file && <button onClick={previewFile}>Preview</button>}
					{file && <button onClick={downloadFile}>Download</button>}
				</div>
			)}

			{isFileUploading && (
				<div className="file-loading">
					<h1 className="file-loading-title">Uploading...</h1>
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
				</div>
			)}

			{isFileUploaded && (
				<div className="file-uploaded">
					<h1>Uploaded Successfully</h1>
					<div
						className="preview"
						style={{ backgroundImage: `url(${previewImage})` }}
					></div>
					<div className="download">
						<div className="download-link">{fileServerID}</div>
						<button
							className="download-btn"
							onClick={copyDownloadLinkToClipboard}
						>
							Copy Link
						</button>
					</div>
					<p className="reset" onClick={resetToDefaultStates}>
						Upload another file
					</p>
				</div>
			)}
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
					onClick={() => handleDisplayRenders("default")}
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
