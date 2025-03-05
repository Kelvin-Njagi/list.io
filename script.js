// script.js
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
          tasks.push({ text: taskText, completed: false });
          taskInput.value = '';
          updateLocalStorage();
          renderTasks();
      }
  });

  function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.textContent = task.text;
          if (task.completed) {
              li.classList.add('completed');
          }

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.classList.add('delete-btn');
          deleteBtn.addEventListener('click', (event) => {
              event.stopPropagation(); // Prevent li click when delete is clicked
              tasks.splice(index, 1);
              updateLocalStorage();
              renderTasks();
          });

          li.appendChild(deleteBtn);

          li.addEventListener('click', () => {
              task.completed = !task.completed;
              updateLocalStorage();
              renderTasks();
          });

          taskList.appendChild(li);
      });
  }

  function updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});