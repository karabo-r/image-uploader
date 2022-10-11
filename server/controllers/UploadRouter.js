const UploadRouter = require("express").Router();
const ImageModel = require("../models/ImageModel");
const fileUpload = require("express-fileupload");

UploadRouter.post("/", fileUpload(), (req, res) => {
	const file = req.files.file;
	const newImage = ImageModel({
		name: file.name,
		image: {
			data: file.data,
			contentType: file.mimetype,
		},
	});

	newImage
		.save()
		.then((response) => {
			res.json({ imageID: response.id });
		})
		.catch((err) => res.send(err));
});

module.exports = UploadRouter;
