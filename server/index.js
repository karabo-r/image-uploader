require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
	res.send("<h1>Hello mom</h1>");
});

app.post("/uploads", upload.single("image"), (req, res) => {
	const newImage = ImageModel({
		name: req.body.name,
		image: {
			data: fs.readFileSync("uploads/" + req.file.filename),
			contentType: "image/png",
		},
	});

	newImage.save().then(() => {
		console.log("image was saved");
		res.end();
	});
});

app.listen(PORT, () => console.log("Server is live:" + PORT));
