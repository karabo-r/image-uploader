const UploadSuccess = (props) => {
	const file = props.file

	const copyDownloadLinkToClipboard = () => {
		navigator.clipboard.writeText(file.imageID);
	}

	return (
		<div className="file-uploaded">
			<h1>Uploaded Successfully</h1>
			<div
				className="preview"
				style={{ backgroundImage: `url(${file.imagePath})` }}
			></div>
			<div className="download">
				<div className="download-link">{file.imageID}</div>
				<button className="download-btn" onClick={copyDownloadLinkToClipboard}>
					Copy Link
				</button>
			</div>
		</div>
	);
};

export default UploadSuccess;
