document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const progressBar = document.querySelector(".progress-bar");
    const taskCounter = document.querySelector(".task-counter");

    let tasks = [];

    addTaskBtn.addEventListener("click", function() {
        if (taskInput.value.trim() !== "") {
            addTask(taskInput.value);
            taskInput.value = "";
            updateProgress();
        }
    });

    function addTask(taskText) {
        const task = document.createElement("li");
        task.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="complete">✔</button>
                <button class="delete">✖</button>
            </div>
        `;
        taskList.appendChild(task);
        tasks.push({ text: taskText, completed: false });
        updateProgress();

        const completeBtn = task.querySelector(".complete");
        completeBtn.addEventListener("click", function() {
            task.classList.toggle("completed");
            if (task.classList.contains("completed")) {
                completeBtn.style.color = "white";
                completeBtn.style.backgroundColor = "green";
            } else {
                completeBtn.style.color = "black";
                completeBtn.style.backgroundColor = "transparent";
            }
            updateProgress();
        });

        task.querySelector(".delete").addEventListener("click", function() {
            task.remove();
            tasks = tasks.filter(t => t.text !== taskText);
            updateProgress();
        });
    }

    function updateProgress() {
        let completed = document.querySelectorAll(".completed").length;
        let total = document.querySelectorAll("#taskList li").length;
        let progress = total > 0 ? (completed / total) * 100 : 0;
        progressBar.style.width = `${progress}%`;
        taskCounter.textContent = `${completed}/${total}`;
    }

    document.getElementById('openTodo').addEventListener('click', function() {
        window.location.href = 'task.html';
    });
});
