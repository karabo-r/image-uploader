import React from "react";

const Download = (props) => {
	return (
		<div className="card">
			<h1 className="card-title">Download your image</h1>
			{!props.file && <p className="card-description">Please input an ID</p>}

			{props.file.data && (
				<div
					className="card-image-preview"
					style={{ backgroundImage: `url(${props.file.imagePath})` }}
				></div>
			)}
			{!props.file.data && (  
				<input
					ref={props.downloadInput}
					value={props.fileServerID}
					onChange={props.handleFileServerID}
				/>
			)}
			{props.file.imagePath && <a ref={props.downloadButton} style={{ display: "none" }} download />}

			{!props.file.data && <button onClick={props.previewFile}>Preview</button>}
			{props.file.data && <button onClick={props.downloadFile}>Download</button>}
		</div>
	);
};

export default Download;
