let unassigned = [];
let assigned = [];

let experiencesCounter = 0;
let ID = 1;

let targetedZone;
// demos
for (let i = 0; i < 5; i++) {
    addWorker(`name${i + 1}`, (i > 2) ? "it" : "manager", "img/xIcon.webp", "test@gmail.com", "0123456789");
    displayWorker(unassigned[unassigned.length - 1]);
}

// for displaying and hidding the side bar
document.querySelector(".side-bar-toggle").addEventListener('click', () => {
    document.querySelector("aside").classList.toggle("hidden");
})

// add a new worker button
document.getElementById('add-worker-btn').addEventListener('click', () => {
    document.getElementById("form").classList.toggle("is-hidden");
    document.querySelector(".error").classList.add("is-hidden");
    document.querySelectorAll('input').forEach(ele => ele.style.borderColor = "black");
    document.querySelector(".experiences").insertAdjacentHTML('afterend', `<button id="add-experience" type="button">Add an experience</button>`);

    // add experience button
    document.getElementById("add-experience").addEventListener('click', (e) => {
        experiencesCounter++;
        document.querySelector(".experiences").insertAdjacentHTML("beforeend", `<div class="experience">
                <label for="">Company:</label>
                <input type="text">
                <label for="">Role:</label>
                <input type="text">
                <label for="">From:</label>
                <input type="date">
                <label for="">To:</label>
                <input type="date">
                <button type="button" class="remove-experience" onclick="removeExperience(this)">X</button>
            </div>`);
    })

    // form submit hundler
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let nameRegex = /^[a-zA-Z]+$/;
        let imageRegex = /\.(jpe?g|png|gif|bmp|svg|webp)$/;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phoneNumRegex = /^\+?\d{10,13}$/;
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

        // experiences validation
        document.querySelectorAll(".experience").forEach(exper => {
            // to check the company input
            if (!nameRegex.test(exper.children[1].value.trim())) {
                isValid = false;
                exper.children[1].style.borderColor = "red";
            }
            else
                exper.children[1].style.borderColor = "black";

            // to check role input
            if (!nameRegex.test(exper.children[3].value.trim())) {
                isValid = false;
                exper.children[3].style.borderColor = "red";
            }
            else
                exper.children[3].style.borderColor = "black";

            // to check if the dates are valid
            if (!(exper.children[5].value < exper.children[7].value)) {
                isValid = false;
                exper.children[5].style.borderColor = "red";
                exper.children[7].style.borderColor = "red";
            }
            else{
                exper.children[5].style.borderColor = "black";
                exper.children[7].style.borderColor = "black";
            }
        })

        // final check
        if (isValid) {
            addWorker(name.value, role.value, imageUrl.value, email.value, phoneNum.value);
            displayWorker(unassigned[unassigned.length - 1]);
            document.getElementById("form").classList.add("is-hidden");
            document.getElementById("form").reset();
            experiencesCounter = 0;
            document.querySelector(".experiences").innerHTML = "";
            document.getElementById("add-experience").outerHTML = "";
        }
        else {
            document.querySelector(".error").classList.remove("is-hidden");
        }
        console.log("unassigned array: ", unassigned);
    })
})

// for removing experiences
function removeExperience(element) {
    element.parentElement.outerHTML = "";
    experiencesCounter--;
}

// pushing each new worker in to the unnassigned array
function addWorker(name, role, imageUrl, email, phoneNum) {
    unassigned.push({
        id: ID++,
        name: name,
        role: role,
        imageUrl: imageUrl,
        email: email,
        phoneNum: phoneNum,
        experiances: []
    })
    // pushing experiences values
    document.querySelectorAll(".experience").forEach(exper => {
        unassigned[unassigned.length - 1].experiances.push({
            company: exper.children[1].value,
            role: exper.children[3].value,
            from: exper.children[5].value,
            to: exper.children[7].value,
        })
    })
}

// for displaying worker card for each new unassigned worker
function displayWorker(worker) {
    document.querySelector(".users-cards").insertAdjacentHTML("beforeend", `
    <div class="card" onclick="showDetails(${worker.id})">
            <div class="image-div"><img src="${worker.imageUrl}" alt="worker image"></div>
            <div>
                <h4>${worker.name}</h4>
                <p style="font-size: 10px">${worker.role}</p>
            </div>
         </div>`);
}

// for closing the form
document.getElementById('form-closer').addEventListener('click', () => {
    document.getElementById("form").classList.add("is-hidden");
    document.getElementById("form").reset();
    document.querySelector(".experiences").innerHTML = "";
    document.getElementById("add-experience").outerHTML = "";
    experiencesCounter = 0;
})

// for the details modal
function showDetails(id) {
    let target = unassigned.find(worker => worker.id == id) ? unassigned.find(user => user.id == id) : assigned.find(wrkr => wrkr.id == id);
    // console.log("targettttttt: ", target);
    document.getElementById("detail--modal").style.display = "flex";
    document.getElementById("detail--modal").innerHTML = `<img src="${target.imageUrl}" alt="worker-image">
            <h2>${target.name}</h2>
            <p>Role: ${target.role}</p>
            <p>Email: ${target.email}</p>
            <p>Phone number: ${target.phoneNum}</p>
            <p>${(target.experiances.length > 0) ? "Experiences: " + target.experiances.length : "No experiences"}</p>
            <button class="close-modal-btn" onclick="closeModal()">Close</button>`


}
function closeModal() { document.getElementById("detail--modal").style.display = "none" }

// to check if the important zone are empty
function zoneEmpty() {
    if (document.getElementById("securite").firstElementChild.children.length == 0)
        document.getElementById("securite").style.backgroundColor = "rgba(255, 0, 0, 0.404)";
    else
        document.getElementById("securite").style.backgroundColor = "rgba(0, 255, 255, 0.204)";

    if (document.getElementById("reception").firstElementChild.children.length == 0)
        document.getElementById("reception").style.backgroundColor = "rgba(255, 0, 0, 0.404)";
    else
        document.getElementById("reception").style.backgroundColor = "rgba(0, 255, 255, 0.204)";

    if (document.getElementById("servers").firstElementChild.children.length == 0)
        document.getElementById("servers").style.backgroundColor = "rgba(255, 0, 0, 0.404)";
    else
        document.getElementById("servers").style.backgroundColor = "rgba(0, 255, 255, 0.204)";
}
zoneEmpty();

// displaying of the modal with the worker that can be assigned targeted zone
document.querySelectorAll(".add-to-room-btn").forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById("adding--modal").firstElementChild.innerHTML = "";
        targetedZone = btn.parentElement.firstElementChild;
        if (unassigned.length != 0) {
            let zone = btn.previousElementSibling.innerHTML;
            // console.log("zone: ", zone)
            document.getElementById("adding--modal").style.display = "flex"
            switch (zone) {
                case "conference-room":
                    unassigned.forEach(worker => assigningModal(worker));
                    break;
                case "servers":
                    unassigned.forEach(worker => {
                        if (worker.role == "it" || worker.role == "manager" || worker.role == "cleaning")
                            assigningModal(worker);
                    });
                    break;
                case "securite":
                    unassigned.forEach(worker => {
                        if (worker.role == "securite" || worker.role == "manager" || worker.role == "cleaning")
                            assigningModal(worker);
                    });
                    break;
                case "reception":
                    unassigned.forEach(worker => {
                        if (worker.role == "receptionist" || worker.role == "manager" || worker.role == "cleaning")
                            assigningModal(worker);
                    });
                    break;
                case "staff-room":
                    unassigned.forEach(worker => assigningModal(worker));
                    break;
                case "archives":
                    unassigned.forEach(worker => {
                        if (worker.role == "it" || worker.role == "manager")
                            assigningModal(worker);
                    });
                    break;
            }
            if(document.querySelector("#adding--modal").firstElementChild.children.length == 0)
                document.getElementById("adding--modal").style.display = "none"
        }

    })
    document.getElementById('close-adding-modal').addEventListener("click", () => {
        document.getElementById("adding--modal").style.display = "none";
    })
})

function assigningModal(worker) {
    document.querySelector("#adding--modal").firstElementChild.insertAdjacentHTML("beforeend", `
    <div class="modalCard">
            <div class="image-div"><img src="${worker.imageUrl}" alt="worker image"></div>
            <div>
                <h4>${worker.name}</h4>
                <p style="font-size: 10px">${worker.role}</p>
            </div>
            <button class="add-to-zone" onclick="assignToZone(this, ${worker.id})">Add</button>
         </div>`);
}

function assignToZone(ele, id) {
    if (targetedZone.children.length < 5) {
        indexToRemove = unassigned.indexOf(unassigned.find(worker => worker.id == id));
        assigned.push(unassigned.splice(indexToRemove, 1)[0]);
        document.querySelector(".users-cards").children[indexToRemove].outerHTML = "";
        ele.parentElement.outerHTML = "";
        if (document.getElementById("adding--modal").firstElementChild.children.length == 0)
            document.getElementById("adding--modal").style.display = "none";
        targetedZone.insertAdjacentHTML('beforeend', `<div><img src="${assigned[assigned.length - 1].imageUrl}" alt="worker image" onclick="showDetails(${assigned[assigned.length - 1].id})"><h3>${assigned[assigned.length - 1].name}</h3><button class="remove-from-zone" onclick="unassignFromZone(this)"></button><span style="display: none">${assigned[assigned.length - 1].id}</span></div>`);
        zoneEmpty();
    }
}

function unassignFromZone(ele) {
    unassigned.push(assigned.splice(assigned.indexOf(assigned.find(worker => worker.id == ele.nextElementSibling.innerHTML)), 1)[0])
    ele.parentElement.outerHTML = "";
    console.log("after unassing: ", unassigned);
    displayWorker(unassigned[unassigned.length - 1]);
    assigningModal(unassigned[unassigned.length - 1]);
    zoneEmpty();
}