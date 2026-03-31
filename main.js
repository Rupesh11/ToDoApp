// <!-- Create a To-Do List where users can:
// - Add new tasks
// - Mark tasks as completed
// - Delete tasks
// - Save tasks in Local Storage so they persist after a page refresh -->

const addTask = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let taskData = [];

function render(tasks) {
  let taskItems = "";
  for (let i = 0; i < tasks.length; i++) {
    taskItems += `
    <li >
      <p class = ' ${tasks[i].completed ? "completed" : ""}'> ${tasks[i].text}
      </p>
      <div class='controls'>
       <input class = 'completes' type = 'checkbox' ${tasks[i].completed ? "checked" : ""} data-index = '${i}'>
        <button data-index= '${i}' class = 'delete'> Delete </button>
      </div>
    </li>
    `;
  }
  taskList.innerHTML = taskItems;
}

addTask.addEventListener("click", () => {
  if (taskInput.value === "") {
    alert("Please enter task");
  } else {
    taskData.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    localStorage.setItem("taskData", JSON.stringify(taskData));
    render(taskData);
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    taskData.splice(e.target.dataset.index, 1);
    localStorage.setItem("taskData", JSON.stringify(taskData));
    render(taskData);
  }
  if (e.target.classList.contains("completes")) {
    const index = e.target.dataset.index;
    taskData[index].completed = e.target.checked;
    localStorage.setItem("taskData", JSON.stringify(taskData));
    render(taskData);
  }
});

function loadPage() {
  if (localStorage.getItem("taskData")) {
    taskData = JSON.parse(localStorage.getItem("taskData"));
  } else {
    taskData = [];
  }
  render(taskData);
}
loadPage();
