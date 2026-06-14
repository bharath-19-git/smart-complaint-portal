import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const table = document.getElementById("complaintTable");
const department = localStorage.getItem("department");
if (!department) {
    window.location.href = "official-login.html";
}
const departmentMap = {
    "Sanitation Department": "Garbage",
    "Water Supply Department": "Water Leakage/Water Supply",
    "Road Maintenance Department": "Road Damage",
    "Street Light Department": "Street Light",
    "Electricity Department": "Electricity",
    "Encroachment Control Department": "Public Space Obstruction"
};
const allowedIssue = departmentMap[department];
const complaintsRef = ref(database, "complaints");
onValue(complaintsRef, (snapshot) => {
    let total = 0;
    let pending = 0;
    let accepted = 0;
    let progress = 0;
    let completed = 0;
    let rejected = 0;
    table.innerHTML = "";
    const data = snapshot.val();
    if (!data) {
        table.innerHTML = `
            <tr>
                <td colspan="9">No complaints found.</td>
            </tr>
        `;
        updateAnalytics(0, 0, 0, 0, 0, 0);
        return;
    }
    for (let id in data) {
        let c = data[id];
        if (c.issue !== allowedIssue) {
            continue;
        }
        total++;
        switch (c.status || "Pending") {
            case "Pending":
                pending++;
                break;
            case "Accepted":
                accepted++;
                break;
            case "In Progress":
                progress++;
                break;
            case "Completed":
                completed++;
                break;
            case "Rejected":
                rejected++;
                break;
        }
        table.innerHTML += `
            <tr>
                <td>${c.complaintID || "-"}</td>
                <td>${c.name || "-"}</td>
                <td>${c.area || "-"}</td>
                <td>${c.issue || "-"}</td>
                <td>${c.description || "-"}</td>
                <td>${c.priority || "-"}</td>
                <td>${c.status || "Pending"}</td>
                <td>
                    ${
                        c.imageURL
                        ? `
                            <img
                                src="${c.imageURL}"
                                width="80"
                                height="80"
                                style="
                                    border-radius:8px;
                                    object-fit:cover;
                                    border:1px solid #ddd;
                                "
                            >
                            <br><br>
                            <a
                                href="${c.imageURL}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Full Size
                            </a>
                        `
                        : "No Image"
                    }
                </td>
                <td>
                    <button
                        class="action-btn"
                        onclick="updateStatus('${id}','Accepted')"
                    >
                        Accept
                    </button>
                    <button
                        class="action-btn"
                        onclick="updateStatus('${id}','In Progress')"
                    >
                        Start
                    </button>
                    <button
                        class="action-btn"
                        onclick="updateStatus('${id}','Completed')"
                    >
                        Complete
                    </button>
                    <button
                        class="action-btn"
                        onclick="updateStatus('${id}','Rejected')"
                    >
                        Reject
                    </button>
                </td>
            </tr>
        `;
    }
    if (total === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="9">
                    No complaints found for ${department}.
                </td>
            </tr>
        `;
    }
    updateAnalytics(
        total,
        pending,
        accepted,
        progress,
        completed,
        rejected
    );
});
function updateAnalytics(
    total,
    pending,
    accepted,
    progress,
    completed,
    rejected
) {
    document.getElementById("totalCount").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("acceptedCount").textContent = accepted;
    document.getElementById("progressCount").textContent = progress;
    document.getElementById("completedCount").textContent = completed;
    document.getElementById("rejectedCount").textContent = rejected;
}
window.updateStatus = function (id, status) {
    update(ref(database, "complaints/" + id), {
        status: status,
        updatedAt: new Date().toLocaleString()
    })
    .then(() => {
        console.log(`Complaint updated to ${status}`);
    })
    .catch((error) => {
        alert("Error updating status: " + error.message);
        console.error(error);
    });
};
document.getElementById("logoutBtn")
.addEventListener("click", () => {
    localStorage.removeItem("department");
    window.location.href = "official-login.html";
});