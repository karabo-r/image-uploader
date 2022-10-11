const mongoose = require('mongoose')

const imageScheme = new mongoose.Schema(
	{
		name: String,
		image: {
			data: Buffer,
			contentType: String,
		},
	},

	{ timestamps: true },
);

// delete image data after 24 hours
imageScheme.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const ImageModel =  new mongoose.model("ImageModel", imageScheme); 

module.exports = ImageModel