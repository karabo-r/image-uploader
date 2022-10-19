import PrimaryButton from "../buttons/PrimaryButton";
import Card from "../Card";

const UploadSuccess = (props) => {
	const file = props.file;

	const copyDownloadLinkToClipboard = () => {
		navigator.clipboard.writeText(file.imageID);
	};

	return (
		<Card>
			<h1 className="card-title">Uploaded Successfully</h1>
			<div
				className="card-image-preview"
				style={{ backgroundImage: `url(${file.imagePath})` }}
			></div>
			<div className="card-download">
				<button className="card-download-link" disabled>
					{file.imageID}
				</button>
				<PrimaryButton onClick={copyDownloadLinkToClipboard} name="Copy Link" />
			</div>
		</Card>
	);
};

export default UploadSuccess;
