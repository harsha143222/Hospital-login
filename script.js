// ================= TOGGLE PASSWORD =================
function togglePassword() {

    const role = document.getElementById("role").value;
    const passwordField = document.getElementById("password");

    if (role === "patient") {
        passwordField.style.display = "none";
    } else {
        passwordField.style.display = "block";
    }
}

// ================= LOGIN =================
function login() {

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // PATIENT LOGIN (NO PASSWORD)
    if (role === "patient") {

        if (username.trim() !== "") {

            localStorage.setItem("patientName", username);
            window.location.href = "patient.html";

        } else {
            alert("Enter Patient Name");
        }
    }

    // DOCTOR LOGIN
    else if (role === "doctor") {

        let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

        const found = doctors.find(doc =>
            doc.name === username && doc.password === password
        );

        if (found) {
            localStorage.setItem("loggedDoctor", username);
            window.location.href = "doctor.html";
        } else {
            alert("Invalid Doctor Credentials");
        }
    }

    // CHAIRMAN LOGIN
    else if (role === "chairman") {

        if (username === "Chairman" && password === "admin123") {
            window.location.href = "chairman.html";
        } else {
            alert("Invalid Chairman Credentials");
        }
    }

    else {
        alert("Select Role");
    }
}

// ================= REGISTER DOCTOR =================
function registerDoctor() {

    const name = document.getElementById("newName").value;
    const department = document.getElementById("newDepartment").value;
    const experience = document.getElementById("newExperience").value;
    const password = document.getElementById("newPassword").value;
    const imageInput = document.getElementById("newImage");

    if (!name || !department || !experience || !password || imageInput.files.length === 0) {
        alert("Fill all fields and upload image");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

        doctors.push({
            name: name,
            department: department,
            experience: experience,
            password: password,
            image: e.target.result
        });

        localStorage.setItem("doctors", JSON.stringify(doctors));

        alert("Doctor Registered Successfully!");
        window.location.href = "login.html";
    };

    reader.readAsDataURL(imageInput.files[0]);
}

// ================= CHAIRMAN FUNCTIONS =================
function clearAllDoctors() {

    if (confirm("Are you sure you want to delete all doctors?")) {

        localStorage.removeItem("doctors");
        alert("All Doctors Deleted");

        location.reload();
    }
}

function displayDoctors() {

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let list = document.getElementById("doctorList");

    if (!list) return;

    list.innerHTML = "";

    doctors.forEach(doc => {
        list.innerHTML += `
            <div style="margin-bottom:10px;">
                <img src="${doc.image}" width="80"><br>
                ${doc.name} - ${doc.department}
            </div>
        `;
    });
}

 // ================= EMERGENCY ALERT =================

function sendEmergency(){

    const name = document.getElementById("username")?.value || "Unknown Patient";

    let emergency = {
        patient: name,
        time: new Date().toLocaleTimeString(),
        status: "waiting",
        doctor: null
    };

    localStorage.setItem("emergencyAlert", JSON.stringify(emergency));

    alert("🚨 Emergency Alert Sent");

}
// ================= OPEN EMERGENCY PAGE =================

function goEmergency(){

const name = document.getElementById("username")?.value || "Unknown Patient";

// save patient name for emergency page
localStorage.setItem("patientName", name);

// open emergency page
window.location.href = "energency.html";

}

function logout() {
    window.location.href = "login.html";
}