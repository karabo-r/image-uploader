import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import Loading from "../Loading";
import UploadSuccess from "./UploadSuccess";
import PrimaryButton from "../buttons/PrimaryButton";
import RedirectButton from "../buttons/RedirectButton";
import ImageServices from "../../services/image";
import useNotification from "../../hooks/useNotification";
import useFile from "../../hooks/useFile";

const Upload = () => {
	const file = useFile();
	const notification = useNotification();
	const navigate = useNavigate();
	const drop = useRef(null);
	const input = useRef(null);

	const redirectToDownload = () => navigate("/download");

	const updateFileStatus = (imageStatus) => file.update({ imageStatus });

	const appendEventListeners = () => {
		drop.current.addEventListener("dragover", handleFileDragOver);
		drop.current.addEventListener("drop", handleFileDrop);
		drop.current.addEventListener("click", handleInputClick);

		return () => {
			drop.current.removeEventListener("dragover", handleFileDragOver);
			drop.current.removeEventListener("drop", handleFileDrop);
			drop.current.removeEventListener("click", handleInputClick);
		};
	};

	const handleInput = (e) => {
		const fileData = e.target.files[0];
		const filePath = URL.createObjectURL(fileData);
		file.update({ imageData: fileData, imagePath: filePath });
		notification.update("upload");
	};

	const handleInputClick = () => {
		input.current.click();
	};

	const handleFileDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleFileDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const { files } = e.dataTransfer;

		if (files && files.length) {
			const fileData = files[0];
			const filePath = URL.createObjectURL(fileData);
			file.update({ imageData: fileData, imagePath: filePath });
			notification.update("upload");
		}
	};

	const upload = async () => {
		updateFileStatus("uploading");

		const formData = new FormData();
		formData.append("file", file.imageData);

		try {
			const response = await ImageServices.upload(formData);
			file.update({
				imageID: response.data.imageID,
				imageStatus: "uploaded",
			});
		} catch (error) {
			notification.custom(
				`${error.message}. Please check your internet connection or file type`,
			);
			file.reset();
			appendEventListeners();
		}
	};

	useEffect(() => {
		appendEventListeners();
	}, []);

	return (
		<>
			{notification.display && notification.message}
			{!file.imageStatus && (
				<Card>
					<h1 className="card-title">Upload your image</h1>
					<div
						ref={drop}
						className="card-image-preview"
						style={{ backgroundImage: `url(${file.imagePath})` }}
					>
						<input
							ref={input}
							type="file"
							onChange={(e) => handleInput(e)}
							style={{ display: "none" }}
						/>
					</div>
					{!file.imageData && (
						<PrimaryButton onClick={handleInputClick} name="Choose a file" />
					)}
					{file.imageData && <PrimaryButton onClick={upload} name="Upload" />}
				</Card>
			)}
			{file.imageStatus === "uploaded" && <UploadSuccess file={file} />}
			{file.imageStatus === "uploading" && <Loading name="Uploading" />}
			<RedirectButton onClick={redirectToDownload} name="Download image using an ID" />
		</>
	);
};

export default Upload;
