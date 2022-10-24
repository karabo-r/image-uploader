import axios from "axios";

// upload
async function upload(data) {
	const response = await axios({
		method: "post",
		url: "/uploads",
		data: data,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response;
}

async function download(imageID) {
	const response = await axios.get(`/download/${imageID}`);
	return response;
}

const services = {
	upload,
	download,
};
export default services;
