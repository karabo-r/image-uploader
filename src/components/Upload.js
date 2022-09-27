import React from "react";

const Upload = (props) => {
	return (
		<div className="card">
			<h1 className="card-title">Upload your image</h1>
			<p className="card-description">File should be a Png, Jpeg...</p>
			<div
				ref={props.drop}
				className="card-image-preview"
				style={{ backgroundImage: `url(${props.file.imagePath})` }}
			>
				<input
					ref={props.input}
					type="file"
					onChange={(e) => props.handleInput(e)}
					style={{ display: "none" }}
				/>
			</div>
			{!props.file.data && (
				<>
					<button onClick={props.handleInputClick}>Choose a file</button>
				</>
			)}
			{props.file.data && <button onClick={props.uploadFile}>Upload</button>}
		</div>
	);
};

export default Upload;
