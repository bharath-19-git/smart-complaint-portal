import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.trackComplaint = function () {

    const id = document.getElementById("trackId").value;
    const result = document.getElementById("result");

    const complaintsRef = ref(database, "complaints");

    onValue(complaintsRef, (snapshot) => {

        let found = false;
        const data = snapshot.val();

        for (let key in data) {
            if (data[key].complaintID === id) {
                result.innerHTML = `
                    <b>Status:</b> ${data[key].status}
                `;
                found = true;
                break;
            }
        }

        if (!found) {
            result.innerHTML = "❌ Invalid Complaint ID";
        }
    });
};