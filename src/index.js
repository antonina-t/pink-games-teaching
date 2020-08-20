import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn41IPXvfhPj6D-VVaoyiJYSw7NYlQboQ",
  authDomain: "games-a0d55.firebaseapp.com",
  databaseURL: "https://games-a0d55.firebaseio.com",
  projectId: "games-a0d55",
  storageBucket: "games-a0d55.appspot.com",
  messagingSenderId: "639507015694",
  appId: "1:639507015694:web:fb1c140a1779e5ebb0345f",
  measurementId: "G-L1ZK6G3SVM",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("app"));
