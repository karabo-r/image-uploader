<h1 align="center">Image Uploader</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://{your-demo-link.your-domain}">
      Demo
    </a>
    <span> | </span>
    <a href="https://{your-url-to-the-solution}">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

<!-- OVERVIEW -->

## Overview

![screenshot](https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png)

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
- Recieve an image id that references the file on the database
  
**Download images**

- Enter in an image ID and preview the file on screen.
- Download the file to local storage.

**Also includes**

- Notification system
  
  <br>

 **Where can I see your demo?**
 You can view the live demo [here](). 🙂
 <br>
 **What was your experience?**
  Had a lot of fun creating this project. It took longer than I expected and if I had to start all over again, I would defiently set time limits to simulate deadlines when adding features 💡. I tried staying true to the original designs as much as possible while incorparating my own ideas on navigation and features.  
  <br>
**What have you learned/improved?**
  I've always tried being on consistent on code readablity and management, which includes refactoring. One example of this would be the states relating to the image file being uploaded or downloaded. At first the states were individually made and mantained.
  **_Before_ :**

  ```
  const [imageData, ... ] = () // selected file data
  const [imagePath, ... ] = () // url pointing to the image
  const [imageID, ... ] = () // reference id to an image on the database
   ```

  **_After :_**

  ```
   const [file, ...] = ({
      imageData: {},
      imagePath: "https://..."
      imageID: "123ABR342..."
   })
   ```
  
Although a small fix just like many others, this greatly improved the mangement of the code and reduced the number of states i had to keep track of as this states were closely related to the image file in some form.
  <br>

**Your wisdom?**
  You don't need Redux at this project scale 😅. I recently spent 2 full days learning about react redux and thought maybe i could possibly add it to my project, I thought worry. The code became way to complicated to follow and reduanted, it seemed better and it was, to stick to react's useState throughout for this size.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/karabo-r/image-uploader

# Install dependencies
$ npm **install**


# Run the app (**Both** frontend and backend)
# Read through scripts to run one -end of the app 
$ npm start

```

**Note:** A Mongodb database would be required to fully run or test the backend api and some aspects of the frontend. Install a MongoDB shell on your local computer. 

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example -->

- [Steps to replicate a design with only HTML and CSS](https://devchallenges-blogs.web.app/how-to-replicate-design/)

## Contact

- Website [karabo.dev](https://karabo.dev)
- GitHub [@karabo-r](https://{github.com/your-usermame})
- Twitter [@karabo_dev](https://{twitter.com/your-username})
