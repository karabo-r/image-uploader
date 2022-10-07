import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Loading from "./Loading";
import UploadSuccess from "./UploadSuccess";
import defaultImage from "../assets/default-preview.svg";
import PrimaryButton from "./buttons/PrimaryButton";
import RedirectButton from "./buttons/RedirectButton";
import ImageServices from "../services/image";

const Upload = () => {
	const [file, setFile] = useState({ imagePath: defaultImage });

	const navigate = useNavigate();
	const drop = useRef(null);
	const input = useRef(null);

	const redirectToDownload = () => navigate("/download");

	const updateFileStatus = (status) => setFile({ ...file, status })

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
		const fileData = e.target.files[0]
		const filePath = URL.createObjectURL(fileData);
		setFile({ data: fileData, imagePath: filePath });
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
			const fileData = files[0]
			const filePath = URL.createObjectURL(fileData);
			setFile({data: fileData, imagePath: filePath});
		}
	};

	const upload = async () => {
		updateFileStatus("uploading");

		const formData = new FormData();
		formData.append("file", file.data);

		try {
			const response = await ImageServices.upload(formData);
			setFile({ ...file, imageID: response.data.imageID, status: "uploaded" });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		appendEventListeners();
	}, []);

	return (
		<>
			{!file.status && (
				<Card>
					<h1 className="card-title">Upload your image</h1>
					<p className="card-description">File should be a Png, Jpeg...</p>
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
					{!file.data && (
						<PrimaryButton onClick={handleInputClick} name="Choose a file" />
					)}
					{file.data && <PrimaryButton onClick={upload} name="Upload" />}
				</Card>
			)}
			{file.status === "uploaded" && <UploadSuccess file={file} />}
			{file.status === "uploading" && <Loading name="Uploading" />}
			<RedirectButton onClick={redirectToDownload} name="Download image using an ID" />
		</>
	);
};

export default Upload;
