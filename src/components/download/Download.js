/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import defaultImage from "../../assets/default-preview.svg";
import { useNavigate } from "react-router-dom";
import ImageServices from "../../services/image";
import Loading from "../Loading";
import Card from "../Card";
import PrimaryButton from "../buttons/PrimaryButton";
import RedirectButton from "../buttons/RedirectButton";
import UserInput from "../inputs/UserInput";
import useNotification from "../../hooks/useNotification";
import useFile from "../../hooks/useFile";

const Download = () => {
	const file = useFile();
	const notification = useNotification();
	const navigate = useNavigate();
	const downloadButton = useRef(null);

	const redirectToUpload = () => navigate("/");

	const updateFileStatus = (imageStatus) => file.update({ imageStatus });

	const handleSetImageID = (e) => file.update({ imageID: e.target.value });

	const previewFetchedImage = async () => {
		updateFileStatus("downloading");
		try {
			const response = await ImageServices.download(file.imageID);
			const returnedImageBuffer = response.data.image.data.data;
			const base64String = _arrayBufferToBase64(returnedImageBuffer);

			const newImagePath = `data:image/png;base64,${base64String}`;
			file.update({ imageData: true, imagePath: newImagePath });
			notification.update("preview");

		} catch (error) {
			notification.custom(
				`${error.message}. Please check your internet connection or image ID`,
			);
			file.update({ imagePath: defaultImage });
		}

		function _arrayBufferToBase64(buffer) {
			var binary = "";
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return window.btoa(binary);
		}
	};

	const saveImageTolocalStorage = () => {
		// attached to a hiiden a tag - <a download />
		downloadButton.current.href = file.imagePath;
		downloadButton.current.click();
		notification.custom("Downloading image");
	};

	return (
		<>
			{notification.display && notification.message}
			{!file.imageStatus && (
				<Card>
					<h1 className="card-title">Download your image</h1>
					{!file.imageData && (
						<p className="card-description">Please input an ID</p>
					)}
					{file.imageData && (
						<div
							className="card-image-preview"
							style={{ backgroundImage: `url(${file.imagePath})` }}
						></div>
					)}
					{!file.imageData && (
						<UserInput
							value={file.imageID}
							onChange={(e) => handleSetImageID(e)}
						/>
					)}
					{file.imageData && (
						// eslint-disable-next-line jsx-a11y/anchor-has-content
						<a ref={downloadButton} style={{ display: "none" }} download />
					)}
					{!file.imageData && (
						<PrimaryButton name="Preview" onClick={previewFetchedImage} />
					)}
					{file.imageData && (
						<PrimaryButton name="Download" onClick={saveImageTolocalStorage} />
					)}
				</Card>
			)}
			{file.imageStatus === "downloading" && <Loading name="Downloading" />}
			<RedirectButton onClick={redirectToUpload} name="Upload an image and get an ID" />
		</>
	);
};

export default Download;
