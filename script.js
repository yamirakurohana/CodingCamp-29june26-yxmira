
const greeting = document.getElementById ("greeting");
const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");
const userName = document.getElementById("userName");

function updateDateTime() {
    const now = new Date();


    const hour = now.getHours();

    if (hour < 12) {
        greeting.textContent = "Good Morning";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon";
    } else if (hour < 21) {
        greeting.textContent = "Good Evening";
    } else {
        greeting.textContent = "Good Night";
    }

    currentDate.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    currentTime.textContent = now.toLocaleTimeString("en-US");
}

updateDateTime();
setInterval(updateDateTime, 1000);

const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");

let savedName = localStorage.getItem("userName") || "Guest";

userName.textContent = `Welcome, ${savedName}!`;

nameInput.value = savedName === "Guest" ? "" : savedName;

saveNameBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();

    if(name === ""){
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("userName", name);

    userName.textContent = `Welcome, ${name}!`;

}
)

userName.textContent = `Welcome, ${savedName}!`;

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "Light Mode";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeBtn.textContent = "Dark Mode";

    }

});



const timer = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let totalSeconds = 25 * 60;

let countdown;

let running = false;

function displayTimer() {

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

displayTimer();

startBtn.addEventListener("click", () => {

    if (running) return;

    running = true;

    countdown = setInterval(() => {

        totalSeconds--;

        displayTimer();

        if (totalSeconds <= 0) {

            clearInterval(countdown);

            running = false;

            alert("⏰ Time's Up!");

        }

    }, 1000);

});

stopBtn.addEventListener("click", () => {

    clearInterval(countdown);

    running = false;

});

resetBtn.addEventListener("click", () => {

    clearInterval(countdown);

    running = false;

    totalSeconds = 25 * 60;

    displayTimer();

});


const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");


        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        if (task.done) {
            taskText.classList.add("done");
        }


        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("task-buttons");

        const doneBtn = document.createElement("button");
        doneBtn.textContent = task.done ? "Undo" : "Done";

        doneBtn.addEventListener("click", () => {

            tasks[index].done = !tasks[index].done;

            saveTasks();

            renderTasks();

        });

   
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {

            const newTask = prompt("Edit task:", task.text);

            if (newTask === null) return;

            const text = newTask.trim();

            if (text === "") {
                alert("Task cannot be empty.");
                return;
            }

  
            const duplicate = tasks.some((item, i) =>
                i !== index &&
                item.text.toLowerCase() === text.toLowerCase()
            );

            if (duplicate) {
                alert("Task already exists.");
                return;
            }

            tasks[index].text = text;

            saveTasks();

            renderTasks();

        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {

            if (confirm("Delete this task?")) {

                tasks.splice(index, 1);

                saveTasks();

                renderTasks();

            }

        });

        buttonGroup.appendChild(doneBtn);
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(buttonGroup);

        taskList.appendChild(li);

    });

}


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    const duplicate = tasks.some(task =>
        task.text.toLowerCase() === text.toLowerCase()
    );

    if (duplicate) {

        alert("Task already exists.");

        return;

    }

    tasks.push({

        text: text,

        done: false

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

}


renderTasks();


const linkName = document.getElementById("linkName");
const linkURL = document.getElementById("linkURL");
const addLinkBtn = document.getElementById("addLinkBtn");
const quickLinks = document.getElementById("quickLinks");


let links = JSON.parse(localStorage.getItem("quickLinks")) || [];


function saveLinks() {
    localStorage.setItem("quickLinks", JSON.stringify(links));
}


function renderLinks() {

    quickLinks.innerHTML = "";

    links.forEach((link, index) => {

        const container = document.createElement("div");
        container.classList.add("link-item");


        const website = document.createElement("a");

        website.href = link.url;
        website.target = "_blank";
        website.classList.add("link-card");
        website.textContent = link.name;


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.style.marginLeft = "8px";

        deleteBtn.addEventListener("click", () => {

            if (confirm("Delete this link?")) {

                links.splice(index, 1);

                saveLinks();

                renderLinks();

            }

        });

        container.appendChild(website);
        container.appendChild(deleteBtn);

        quickLinks.appendChild(container);

    });

}


addLinkBtn.addEventListener("click", addLink);

function addLink() {

    const name = linkName.value.trim();
    let url = linkURL.value.trim();

    if (name === "" || url === "") {

        alert("Please fill in all fields.");

        return;

    }

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {
        url = "https://" + url;
    }

    const duplicate = links.some(
        link => link.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {

        alert("Link already exists.");

        return;

    }

    links.push({

        name: name,

        url: url

    });

    saveLinks();

    renderLinks();

    linkName.value = "";
    linkURL.value = "";

}

renderLinks();