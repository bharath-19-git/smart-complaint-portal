import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { firebaseConfig }
from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

window.registerCitizen = function(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then(() => {

        alert("Registration Successful");

    })
    .catch(error => {

        alert(error.message);

    });

};

window.loginCitizen = function(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    signInWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then(() => {

        window.location.href =
        "index.html";

    })
    .catch(error => {

        alert(error.message);

    });

};