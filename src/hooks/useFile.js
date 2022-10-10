import { useState } from "react";
import defaultImage from "../assets/default-preview.svg";

const useFile = () => {
	const [file, setFile] = useState({ imagePath: defaultImage });

	const update = (data) => {
		setFile({ ...file, ...data });
	};

	const reset = () => {
		setFile({ imagePath: defaultImage });
	};

	return {
		imageStatus: file.imageStatus,
		imageData: file.imageData,
		imagePath: file.imagePath,
		imageID: file.imageID,
		update,
		reset,
	};
};

export default useFile;
