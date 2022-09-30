import axios from "axios";
import defaultImage from "../assets/default-preview.svg";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadSuccess from "./UploadSuccess";
import Loading from './Loading'

const Upload = () => {
	const [file, setFile] = useState({ imagePath: defaultImage });

	const navigate = useNavigate();

	const drop = useRef(null);
	const input = useRef(null);

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
		const filePath = URL.createObjectURL(e.target.files[0]);
		setFile({ data: e.target.files[0], imagePath: filePath });
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
			const filePath = URL.createObjectURL(files[0]);
			setFile({ imagePath: filePath, data: files[0] });
		}
	};

	const upload = async () => {
		setFile({...file, status: 'uploading'})
		const formData = new FormData();
		formData.append("file", file.data);
		try {
			const response = await axios({
				method: "post",
				url: "http://localhost:3003/uploads",
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
			setFile({ ...file, imageID: response.data.imageID, status: "uploaded" });
			console.log(file);
		} catch (error) {
			console.log(error);
		}
	};

	// 6334c6887646856bc1681471

	const redirectToDownload = () => {
		navigate("/download");
	};

	useEffect(() => {
		appendEventListeners();
	}, []);

	return (
		<>
			{!file.data && (
				<div className="card">
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
					{!file.data && <button onClick={handleInputClick}>Choose a file</button>}
					{file.data && <button onClick={upload}>Upload</button>}
				</div>
			)}
			{file.status ==='uploaded' && <UploadSuccess file={file} />}
			{file.status === 'uploading' && <Loading name='Uploading'/>}
			<p className="download-button" onClick={redirectToDownload}>
				Download image using an ID
			</p>
		</>
	);
};

export default Upload;
