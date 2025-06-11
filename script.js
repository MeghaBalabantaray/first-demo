let students = JSON.parse(localStorage.getItem("students")) || [];
let isEditing = false;
let editIndex = -1;

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.class}</td>
                <td>${student.roll}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const cls = document.getElementById("class").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Input validation
    if (!name || !id || !cls || !roll || !email || !contact) {
        alert("Please fill all fields.");
        return;
    }

    if (!/^[0-9]+$/.test(id)) {
        alert("Student ID must be numeric.");
        return;
    }

    if (!/^[0-9]+$/.test(contact)) {
        alert("Contact must be numeric.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Name must contain only letters.");
        return;
    }

    if (!email.includes("@")) {
        alert("Invalid email address.");
        return;
    }

    if (isEditing) {
        // Update existing student
        students[editIndex] = { name, id, class: cls, roll, email, contact };
        isEditing = false;
        editIndex = -1;
        document.querySelector("button").textContent = "Add Student";
    } else {
        // Add new student
        students.push({ name, id, class: cls, roll, email, contact });
    }

    saveData();
    displayStudents();
    document.querySelectorAll("input").forEach(input => input.value = "");
}

function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("class").value = student.class;
    document.getElementById("roll").value = student.roll;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    
    isEditing = true;
    editIndex = index;
    document.querySelector("button").textContent = "Update Student";
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        saveData();
        displayStudents();
        
        // If deleting the record being edited, reset form
        if (index === editIndex) {
            document.querySelectorAll("input").forEach(input => input.value = "");
            isEditing = false;
            editIndex = -1;
            document.querySelector("button").textContent = "Add Student";
        }
    }
}

window.onload = displayStudents;