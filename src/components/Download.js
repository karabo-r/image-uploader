/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import defaultImage from "../assets/default-preview.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Download = () => {
	const navigate = useNavigate();
	const [file, setFile] = useState({
		imagePath: defaultImage,
		imageID: "",
	});

	const downloadButton = useRef(null);

	function handleSetImageID(e) {
		setFile({ ...file, imageID: e.target.value });
	}

	async function previewFetchedImage() {
		// fetch using the provided ID
		const response = await axios.get(
			`http://localhost:3003/download/${file.imageID}`,
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

		const returnedImageBuffer = response.data.image.data.data;
		const base64String = _arrayBufferToBase64(returnedImageBuffer);

		const newImagePath = `data:image/png;base64,${base64String}`;
		setFile({ data: true, imagePath: newImagePath });
	}

	function saveImageTolocalStorage() {
		// attached to a hiiden a tag - <a download />
		downloadButton.current.href = file.imagePath;
		downloadButton.current.click();
	}

	function redirectToUpload() {
		navigate("/");
	}
	return (
		<>
			<div className="card">
				<h1 className="card-title">Download your image</h1>
				<p className="card-description">Please input an ID</p>

				{file.data && (
					<div
						className="card-image-preview"
						style={{ backgroundImage: `url(${file.imagePath})` }}
					></div>
				)}
				{!file.data && (
					<input
						placeholder="Image ID"
						value={file.imageID}
						onChange={(e) => handleSetImageID(e)}
					/>
				)}
				{file.data && (
					// eslint-disable-next-line jsx-a11y/anchor-has-content
					<a ref={downloadButton} style={{ display: "none" }} download />
				)}

				{!file.data && <button onClick={previewFetchedImage}>Preview</button>}
				{file.data && (
					<button onClick={saveImageTolocalStorage}>Download</button>
				)}
			</div>
			<p className="download-button" onClick={redirectToUpload}>
				Upload an image and get an ID
			</p>
		</>
	);
};

export default Download;
