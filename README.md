# Netflix GPT

- Start the project - npm run dev
- Configured Tailwind CSS
- Header
- Routing of App
- Login form / Sign up form
- Form validation in react - https://formik.org/
- useRef hook - Used for reference the value
- Firebase setup
- Deployment our app to production


## Features

- Login/Sign Up
    - Sign in/ Sign up form
    - Redirect to browser page
- Browse (After authentication)
    - Header
    - Main Movie
        - Trailer in background
        - Title & Description
        - Movie Suggestions
            - Movie Lists * N
- NetflixGPT
    - Search Bar
    - Movie Suggestions

------------------------------------------------------

# Firebase Setup And Deploy

## Add Firebase SDK

    -- npm install firebase

utils/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

## Install Firebase CLI

To host your site with Firebase Hosting, you need the Firebase CLI (a command line tool).

Run the following npm command to install the CLI or update to the latest CLI version.

    -- npm install -g firebase-tools

## Deploy to Firebase Hosting

You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

    -- firebase login

Initiate your project
Run this command from your app's root directory:

    -- firebase init


When you're ready, deploy your web app
Put your static files (e.g. HTML, CSS, JS) in your app's deploy directory (the default is 'public'). Then, run this command from your app's root directory:

    -- firebase deploy

Note - To build the project use the command (npm run build) - It will create a build/dist folder which will be used to deploy on server

------------------------------------------
Project Console: https://console.firebase.google.com/project/netflixgpt-ab441/overview
Hosting URL: https://netflixgpt-ab441.web.app