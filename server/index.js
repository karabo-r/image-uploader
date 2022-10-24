require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UploadRouter = require("./controllers/UploadRouter");
const DownloadRouter = require("./controllers/DownloadRouter");

const app = express();
const PORT = 3003 || process.env.PORT;

app.use(express.static("build"))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", UploadRouter);
app.use("/download", DownloadRouter);

mongoose
	.connect(`${process.env.MONGODB_URI}`)
	.then(() => console.log("Connected to database"));

// say hello to parents :)
app.get("/", (req, res) => {
	res.send("<h1>Hello mom and dad!</h1>");
});

app.listen(PORT, () => console.log("Server is live:" + PORT));
