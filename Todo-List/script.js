document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Load tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem("todos")) || [];
  savedTasks.forEach(task => addTask(task));

  // Form submission event
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = input.value.trim();
    if (newTask !== "") {
      addTask(newTask);
      saveTask(newTask);
      input.value = ""; // Clear the input field
    }
  });

  // Function to add a task to the list
  function addTask(task) {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      removeTask(task);
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.push(task);
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  function removeTask(task) {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  }
});
