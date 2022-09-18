require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3003 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect(`${process.env.MONGODB_URI}`)
	.then(() => console.log("Connected to database"));

const imageScheme = new mongoose.Schema({
	name: String,
	image: {
		data: Buffer,
		contentType: String,
	},
});

const ImageModel = new mongoose.model("ImageModel", imageScheme);

app.get("/", (req, res) => {
	res.send("<h1>Hello mom</h1>");
});

app.post("/uploads", (req, res) => {
	const newImage = ImageModel({
		name: req.body.name,
		image: {
			data: req.file,
			contentType: "image/png",
		},
	});

	newImage
		.save()
		.then(() => console.log("image was saved"))
		.catch((err) => console.log(err));
	res.end();
});

// return an image from a link
app.get("/download/:id", async (req, res) => {
	const imageId = req.params.id;
	const imageReturned = await ImageModel.findById(imageId);
	res.json({ image: imageReturned });
});
app.listen(PORT, () => console.log("Server is live:" + PORT));
