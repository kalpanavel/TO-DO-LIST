document.addEventListener('DOMContentLoaded', function () {
    // Check for saved tasks in local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Populate tasks on page load
    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = { text: taskText, completed: false, priority: false };
            savedTasks.push(newTask);

            // Save tasks to local storage
            localStorage.setItem('tasks', JSON.stringify(savedTasks));

            // Add task to the DOM
            addTaskToDOM(newTask);

            // Clear input field
            taskInput.value = '';
        }
    };

    // Function to add task to the DOM
    function addTaskToDOM(task) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <input type="checkbox" onchange="toggleTaskStatus(this)" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Function to toggle task status
    window.toggleTaskStatus = function (checkbox) {
        const li = checkbox.parentNode;
        const taskIndex = Array.from(li.parentNode.children).indexOf(li);
        savedTasks[taskIndex].completed = checkbox.checked;

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        // Apply completed styling
        li.querySelector('span').classList.toggle('completed', checkbox.checked);
    };

    // Function to delete a task
    window.deleteTask = function (button) {
        const li = button.parentNode;
        const taskIndex = Array.from(li.parentNode.children).indexOf(li);
        savedTasks.splice(taskIndex, 1);

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        // Remove task from the DOM
        li.remove();
    };
});
