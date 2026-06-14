import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById("complaintForm").addEventListener("submit", async function(e) {
e.preventDefault();

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const area = document.getElementById("area").value;
const issue = document.getElementById("issue").value;
const priority = document.getElementById("priority").value;
const description = document.getElementById("description").value;
const imageFile = document.getElementById("image").files[0];
const complaintId = "CMP" + Date.now();

let imageURL = "";

try {

if (imageFile) {
const formData = new FormData();
formData.append("file", imageFile);
formData.append("upload_preset", "complaint_images");

const response = await fetch(
"https://api.cloudinary.com/v1_1/dg8yyv4ls/image/upload",
{
method: "POST",
body: formData
}
);

const data = await response.json();
imageURL = data.secure_url;
}

await push(ref(database, "complaints"), {
complaintID: complaintId,
name,
phone,
area,
issue,
priority,
description,
imageURL,
status: "Pending",
createdAt: new Date().toLocaleString()
});

document.getElementById("message").innerHTML =
`✅ Complaint Submitted! Your ID: <b>${complaintId}</b>`;

alert("Save this Complaint ID: " + complaintId);

document.getElementById("complaintForm").reset();

} catch (error) {
console.error(error);
alert("Error: " + error.message);
}
});