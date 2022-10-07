/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import defaultImage from "../assets/default-preview.svg";
import { useNavigate } from "react-router-dom";
import ImageServices from "../services/image";
import Loading from "./Loading";
import Card from "./Card";
import PrimaryButton from "./buttons/PrimaryButton";
import RedirectButton from "./buttons/RedirectButton";
import UserInput from "./inputs/UserInput";

const Download = () => {

	const [file, setFile] = useState({
		imagePath: defaultImage,
		imageID: "",
	});
	
	const navigate = useNavigate();
	const downloadButton = useRef(null);

	const redirectToUpload = () => navigate("/");

	const updateFileStatus = (status) => setFile({ ...file, status });

	const handleSetImageID = (e) => setFile({ ...file, imageID: e.target.value });

	const previewFetchedImage = async () => {
		updateFileStatus("downloading");
		
		const response = await ImageServices.download(file.imageID);

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
	};

	const saveImageTolocalStorage = () => {
		// attached to a hiiden a tag - <a download />
		downloadButton.current.href = file.imagePath;
		downloadButton.current.click();
	};

	return (
		<>
			{!file.status && (
				<Card>
					<h1 className="card-title">Download your image</h1>
					{!file.data && <p className="card-description">Please input an ID</p>}
					{file.data && (
						<div
							className="card-image-preview"
							style={{ backgroundImage: `url(${file.imagePath})` }}
						></div>
					)}
					{!file.data && (
						<UserInput
							value={file.imageID}
							onChange={(e) => handleSetImageID(e)}
						/>
					)}
					{file.data && (
						// eslint-disable-next-line jsx-a11y/anchor-has-content
						<a ref={downloadButton} style={{ display: "none" }} download />
					)}
					{!file.data && (
						<PrimaryButton name="Preview" onClick={previewFetchedImage} />
					)}
					{file.data && (
						<PrimaryButton name="Download" onClick={saveImageTolocalStorage} />
					)}
				</Card>
			)}
			{file.status === "downloading" && <Loading name="Downloading" />}
			<RedirectButton onClick={redirectToUpload} name="Upload an image and get an ID" />
		</>
	);
};

export default Download;
