import React from "react";

const UploadSuccess = (props) => {
	return (
		<div className="file-uploaded">
			<h1>Uploaded Successfully</h1>
			<div
				className="preview"
				style={{ backgroundImage: `url(${props.file.imagePath})` }}
			></div>
			<div className="download">
				<div className="download-link">{props.fileServerID}</div>
				<button
					className="download-btn"
					onClick={props.copyDownloadLinkToClipboard}
				>
					Copy Link
				</button>
			</div>
			<p className="reset" onClick={props.resetToDefaultStates}>
				Upload another file
			</p>
		</div>
	);
};

export default UploadSuccess;
