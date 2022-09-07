const { parentPort } = require("worker_threads");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
require('dotenv').config();

// Initialize Firebase
initializeApp({
    credential: applicationDefault(),
});
let db = getFirestore();
// get current data in DD-MM-YYYY format
let date = new Date();
let currDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
// recieve crawled data from main thread
parentPort.once("message", (message) => {
  console.log("Recieved data from mainWorker...");
  // store data gotten from main thread in database
  db.collection("Rates")
    .doc(currDate)
    .set({
      rates: JSON.stringify(message),
    })
    .then(() => {
      // send data back to main thread if operation was successful
      parentPort.postMessage("Data saved successfully");
    })
    .catch((err) => console.log(err));
});
