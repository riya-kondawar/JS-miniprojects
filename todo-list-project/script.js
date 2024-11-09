const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.className = "task-item";
  li.innerHTML = `
    <label>
      <input type="checkbox" />
      <span>${task}</span>
    </label>
    <button class="edit-btn" onclick="editTask(this)">Edit</button>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;

  listContainer.appendChild(li);
  inputBox.value = ""; // Clear input box
  inputBox.focus();

  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  updateCounters();
}

function editTask(button) {
  const li = button.closest("li");
  const taskText = li.querySelector("span");
  const updatedTask = prompt("Edit task:", taskText.textContent);

  if (updatedTask !== null && updatedTask.trim()) {
    taskText.textContent = updatedTask.trim();
    li.classList.remove("completed");
    li.querySelector("input[type='checkbox']").checked = false;
    updateCounters();
  }
}

function deleteTask(button) {
  if (confirm("Are you sure you want to delete this task?")) {
    button.closest("li").remove();
    updateCounters();
  }
}

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
