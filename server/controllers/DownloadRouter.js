const DownloadRouter = require('express').Router()
const ImageModel = require('../models/ImageModel')

DownloadRouter.get("/:id", async (req, res) => {
	const imageID = req.params.id;
	const returnImage = await ImageModel.findById(imageID);
	res.json(returnImage);
});

module.exports = DownloadRouter