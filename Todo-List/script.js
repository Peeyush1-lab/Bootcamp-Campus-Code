document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const clearAllBtn = document.getElementById("clear-all");

  const savedTasks = JSON.parse(localStorage.getItem("todos")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = input.value.trim();
    if (newTask !== "") {
      addTask(newTask, false);
      saveTask(newTask, false);
      input.value = "";
    }
  });

  clearAllBtn.addEventListener("click", () => {
    todoList.innerHTML = "";
    localStorage.removeItem("todos");
  });

  function addTask(taskText, completed) {
    const li = document.createElement("li");
    li.classList.toggle("completed", completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
      updateTaskCompletion(taskText, checkbox.checked);
      li.classList.toggle("completed", checkbox.checked);
    });

    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;
    if (completed) {
      taskLabel.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      removeTask(taskText);
    });

    li.appendChild(checkbox);
    li.appendChild(taskLabel);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }

  function saveTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  }

  function updateTaskCompletion(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = completed;
      localStorage.setItem("todos", JSON.stringify(tasks));
    }
  }
});
