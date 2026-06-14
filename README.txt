🏛️ Smart Complaint Management System

A web-based complaint management system built using **HTML, CSS, JavaScript, and Firebase**.  
It allows citizens to submit complaints about public issues and enables officials to manage and update complaint status in real time.

🚀 Features

👤 Citizen Features
- Submit complaints without login
- Enter details like name, area, issue, priority, description
- Upload complaint images (stored in Firebase Storage)
- Get unique Complaint ID
- Track complaint status using Complaint ID

👮 Official Features
- Secure login for officials
- View all submitted complaints in dashboard
- Update complaint status:
  - Pending
  - Accepted
  - In Progress
  - Completed
  - Rejected

☁️ Firebase Integration
- Firebase Realtime Database → stores complaint data
- Firebase Storage → stores complaint images
- Real-time updates without refreshing page


🛠️ Technologies Used
- HTML5 – Structure
- CSS3 – Styling and UI design
- JavaScript (ES6) – Logic
- Firebase Realtime Database – Backend database
- Firebase Storage – File storage

⚙️ WORKING
1. Citizen fills complaint form
2. System generates unique Complaint ID
3. Data is stored in Firebase Realtime Database
4. Image (if any) is stored in Firebase Storage
5. Complaint ID is shown to user
6. Officials update complaint status from dashboard
7. Citizens can track status using Complaint ID

🔐 Security
- Only officials can access admin dashboard
- Basic login protection using credentials/localStorage
- Firebase rules control database access

