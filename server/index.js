require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 3003 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect(`${process.env.MONGODB_URI}`)
	.then(() => console.log("Connected to database"));

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

const ImageModel = new mongoose.model("ImageModel", imageScheme);

app.get("/", (req, res) => {
	res.send("<h1>Hello mom</h1>");
});

app.post("/uploads", fileUpload(), (req, res) => {
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
			console.log("NEW IMAGE RECIVIED");
			res.json({ imageID: response.id });
		})
		.catch((err) => console.log(err));
});

// return an image from a link
app.get("/download/:id", async (req, res) => {
	const imageID = req.params.id;
	const returnImage = await ImageModel.findById(imageID);
	res.json(returnImage);
});

app.post("test", (req, res) => {
	console.log(req.body);
});

app.listen(PORT, () => console.log("Server is live:" + PORT));
