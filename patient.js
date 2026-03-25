let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let patientName = localStorage.getItem("patientName");

let selectedDoctor = null;

// ========================
// LOAD DOCTORS
// ========================

function loadDoctors(){

let doctorList = document.getElementById("doctorList");
if(!doctorList) return;

doctorList.innerHTML = "";

doctors.forEach(doc => {

doctorList.innerHTML += `

<div onclick="selectDoctor('${doc.name}')"
style="cursor:pointer; border:1px solid #ccc; padding:15px; margin:10px; border-radius:10px;">

<img src="${doc.image}" width="120"><br> <b>${doc.name}</b><br>
${doc.department}

</div>`;
});

}

loadDoctors();

// ========================
// SELECT DOCTOR
// ========================

function selectDoctor(name){

let doctor = doctors.find(d => d.name === name);
if(!doctor) return;

selectedDoctor = doctor;

document.getElementById("doctorDetails").style.display = "flex";

document.getElementById("doctorImage").src = doctor.image;
document.getElementById("doctorName").innerText = doctor.name;
document.getElementById("doctorDept").innerText = "Department: " + doctor.department;
document.getElementById("doctorExp").innerText = "Experience: " + doctor.experience + " years";

updateSummary();

}

// ========================
// UPDATE SUMMARY
// ========================

function updateSummary(){

let dateInput = document.getElementById("appointmentDate");
let timeInput = document.getElementById("appointmentTime");

let date = dateInput ? dateInput.value : "";
let time = timeInput ? timeInput.value : "";

if(!selectedDoctor) return;

let box = document.getElementById("summaryBox");
if(!box) return;

box.innerHTML = `

<p><b>Patient:</b> ${patientName}</p>
<p><b>Doctor:</b> ${selectedDoctor.name}</p>
<p><b>Date:</b> ${date}</p>
<p><b>Time:</b> ${time}</p>
<p><b>Fee:</b> ₹500</p>
`;

}

// ========================
// EVENT LISTENERS
// ========================

window.onload = function(){

let dateInput = document.getElementById("appointmentDate");
let timeInput = document.getElementById("appointmentTime");

if(dateInput){
dateInput.addEventListener("change", updateSummary);
}

if(timeInput){
timeInput.addEventListener("change", updateSummary);
}

}

// ========================
// SHOW PAYMENT
// ========================

function showPayment(){

let dateInput = document.getElementById("appointmentDate");
let timeInput = document.getElementById("appointmentTime");

let date = dateInput ? dateInput.value : "";
let time = timeInput ? timeInput.value : "";

if(!selectedDoctor){
alert("Select Doctor First");
return;
}

if(!date || !time){
alert("Select Date and Time First");
return;
}

let payment = document.getElementById("paymentSection");
if(payment) payment.style.display = "block";

}

// ========================
// SUBMIT APPOINTMENT
// ========================

function submitAppointment(){

let cardNumber = document.getElementById("cardNumber")?.value;
let cardName = document.getElementById("cardName")?.value;
let cvv = document.getElementById("cvv")?.value;

let date = document.getElementById("appointmentDate")?.value;
let time = document.getElementById("appointmentTime")?.value;

if(!cardNumber || !cardName || !cvv){
alert("Fill Payment Details");
return;
}

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

appointments.push({
doctor: selectedDoctor.name,
patient: patientName,
date: date,
time: time,
amount: 500,
status: "Paid"
});

localStorage.setItem("appointments", JSON.stringify(appointments));

alert("Appointment Booked Successfully!");

document.getElementById("paymentSection").style.display = "none";
document.getElementById("doctorDetails").style.display = "none";

}

// ========================
// EMERGENCY ALERT
// ========================

function sendEmergency(){

let emergency = {
patient: patientName,
time: new Date().toLocaleTimeString(),
status: "waiting",
doctor: null
};

localStorage.setItem("emergencyAlert", JSON.stringify(emergency));

alert("🚨 Emergency Alert Sent!");

}
