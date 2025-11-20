let unassigned = [];
let conferenceRoom= [];
let securite = [];
let reception = [];
let archives = [];
let servers = [];
let staffRomm = [];

let experiences = 0;
let ID = 1;

document.getElementById('add-worker-btn').addEventListener('click', () => {
    document.getElementById("form").classList.remove("is-hidden");
    document.querySelector(".error").classList.add("is-hidden");
    document.querySelectorAll('input').forEach(ele => ele.style.borderColor = "black");
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let nameRegex = /^[a-zA-Z]+$/;
        let imageRegex = /\.(jpe?g|png|gif|bmp|svg|webp)$/;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phoneNumRegex = /[\d]/;
        let name = document.getElementById("form-name");
        let role = document.getElementById("form-role");
        let imageUrl = document.getElementById("form-image");
        let email = document.getElementById("form-email");
        let phoneNum = document.getElementById("form-phone-number");

        // to check the name input
        if (!nameRegex.test(name.value.trim())) {
            isValid = false;
            name.style.borderColor = "red";
        }
        else
            name.style.borderColor = "black";

        // to check image url input
        if (!imageRegex.test(imageUrl.value.trim())) {
            isValid = false;
            imageUrl.style.borderColor = "red";
        }
        else
            imageUrl.style.borderColor = "black";

        // to check the validation of the email
        if (!emailRegex.test(email.value.trim())) {
            isValid = false;
            email.style.borderColor = "red";
        }
        else
            email.style.borderColor = "black";

        // to check phone number
        if (!phoneNumRegex.test(phoneNum.value.trim())) {
            isValid = false;
            phoneNum.style.borderColor = "red";
        }
        else
            phoneNum.style.borderColor = "black";

        // final check
        if (isValid) {
            addWorker(name.value, role.value, imageUrl.value, email.value, phoneNum.value);
            displayWorker();
            document.getElementById("form").classList.add("is-hidden");
            document.getElementById("form").reset();
        }
        else {
            document.querySelector(".error").classList.remove("is-hidden");
        }
        console.log("unassigned array: ", unassigned);
    })
})

function addWorker(name, role, imageUrl, email, phoneNum) {
    unassigned.push({
        Name: name,
        Role: role,
        ImageUrl: imageUrl,
        email: email,
        phoneNum: phoneNum,
        experiances: []
    })
}

function displayWorker() {
    document.querySelector(".users-cards").innerHTML += `
    <div class="card">
            <div class="image-div"><img src="${unassigned[unassigned.length - 1].ImageUrl}" alt="worker image"></div>
            <div>
                <h4>${unassigned[unassigned.length - 1].Name}</h4>
                <p style="font-size: 10px">${unassigned[unassigned.length - 1].Role}</p>
            </div>
         </div>`
}

document.getElementById('form-closer').addEventListener('click', () => {
    document.getElementById("form").classList.add("is-hidden");
    document.getElementById("form").reset();
})