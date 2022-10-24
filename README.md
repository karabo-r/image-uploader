<h1 align="center">Image Uploader</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://image-uploader-vabs.onrender.com/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/karabo-r/image-uploader">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>
<br>
<!-- TABLE OF CONTENTS -->

## Upload images temporarily on a database for 24 hours. You'll also receive an image ID that's connected to your image. Download it, whenever. 💚 <br>

![](/public/assets/screenshot-2.gif)

## Table of Contents

- [Upload images temporarily on a database for 24 hours. You'll also receive an image ID that's connected to your image. Download it, whenever. 💚 <br>](#upload-images-temporarily-on-a-database-for-24-hours-youll-also-receive-an-image-id-thats-connected-to-your-image-download-it-whenever--)
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [Project Story](#project-story)
  - [Where can I see your demo?](#where-can-i-see-your-demo)
  - [What was your experience?](#what-was-your-experience)
  - [What have you learned/improved?](#what-have-you-learnedimproved)
  - [Your wisdom?](#your-wisdom)
- [How To Use](#how-to-use)
- [Contact](#contact)

<!-- OVERVIEW -->

## Overview




### Built With

- Frontend
  - [React](https://reactjs.org/)
  - [React Router]()
  - [Framer motion]()
  - [Styled-Components]()

- Backend
  - [Node.js]()
  - [Express.js]()
  - [Mongoose]()

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx) was to build an application to complete the given user stories. Includes extended ideas.

**Upload images**

- Drag and drop or select an image file.
- Store uploaded image file to a database for 24 hours.
- Recieve an image ID that references the file on the database
  
**Download images**

- Enter in an image ID and preview the file on screen.
- Download the file to local machine.

**Also includes**

- Notification system

**For Nerds**  _Coming soon_

- Intergration testing with Jest
- Performance optimization 

  <br>

## Project Story

 ### Where can I see your demo?
 You can view the live demo [here](https://image-uploader-vabs.onrender.com/). 🙂<br><br>
 ### What was your experience?
I had fun creating this project. It took longer than I expected and would definitely set time limits to simulate deadlines when adding features on a the next project💡. I tried staying true to the original designs as much as possible while incorporating my own ideas on navigation and features.<br><br>
### What have you learned/improved?
 I've always tried being consistent on code readability and management, which includes refactoring. One example of this would be the states relating to the image file being uploaded or downloaded. At first the states were individually made and maintained for every component that needed them.
  **_Before_ :**

  ```
  const [imageData, ... ] = () // selected file data.
  const [imagePath, ... ] = () // url pointing to the image.
  const [imageID, ... ] = () // reference id to the image on the database.
  const [imageStatus, ...] = () // is image uploading, downloading etc.

  const updateImageData = e => ...
  const updateImagePath = e => ...
  ...
   ```
Repeating these lines of code for every component that needed them made the project prone to bugs and searching for a better way to distribute default states and its functions, I learned about **custom hooks** 🎊.

  **_After : Using a custom hook_**

  ```
   const [file, setFile] = useState({imagePath: defualtImage})
   
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
   ```
  
  <!-- The custom hook (useFile) greatly improved code management and some of it's logic while reducing repeated lines. Any component that require file states can initilize the hook. And now when working on new features that require new file states, they'll be added to the hook. I've always thought of customs hooks to be confusing and scary but I'm glad I finally learned about them. -->

  ```
  upload component example
  const file = useFile()

  const upload = async () => {
    response = await ....
    file.update({ imageID: response.data.id })
  }
  ``` 
  <br>
  
### Your wisdom?
You don't need Redux at this project scale 😅. I've spent a few days learning about react redux and thought maybe I could possibly add it to my project, I thought worry. The code became way too complicated to follow and redundant, it seemed better and it was, to stick to react's useState throughout for this size with some states in custom hooks. I would imagine if the project continued to grow, a state management would be needed.
  

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/karabo-r/image-uploader

# Install dependencies
$ npm install


# Run the app (**Both** frontend and backend)
# Read through scripts to run one -end of the app 
$ npm start

```

**Note:** A Mongodb database would be required to fully run or test the backend api and some aspects of the frontend. You can install a [MongoDB shell](https://www.mongodb.com/docs/v4.4/mongo/) on your computer to run a local server. 

Create an .env file in parent directory of the project with the format
```
MONGODB_URI=(your local server connection string)
``` 
You're set up 🎊.

## Contact

- Website [karabo.dev](https://karabo.dev)
- GitHub [@karabo-r](https://{github.com/your-usermame})
- Twitter [@karabo_dev](https://{twitter.com/your-username})
