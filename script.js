// ==============
// 1. Data State
// ==============
let tasks = [];
let input = document.getElementById("textInput");
let listOfTasks = document.querySelector(".task-list");
let addBtn = document.getElementById("addBtn");

// =========================================
//  2. Loading data when the page is opened
// =========================================
function loadTask() {
  // 2.1 We read from localStorage; if it doesn't exist, we enter an empty array.
  let stored = localStorage.getItem("task");
  tasks = stored ? JSON.parse(stored) : [];

  // 2.2 We are rebuilding the user interface based on the matrix.
  tasks.forEach((task) => {
    taskElement(task.text, task.id, task.completed);
  });
}

// ==============================
//  3. Save data in localStorage
// ==============================
function saveTask() {
  // 3.1 We convert the array to text and save it.
  localStorage.setItem("task", JSON.stringify(tasks));
}

// ====================
//  4. Add A New Task
// ====================

addBtn.addEventListener("click", function () {
  // 4.1 Check if the input is empty or has just spaces.
  if (input.value.trim() === "") {
    alert(`Please Write Something!`);
    return;
  }
  //  else {
  //   taskElement(input.value);
  // }

  // 4.2 We create the new task object.
  const newTask = {
    id: Date.now(),
    text: input.value.trim(),
    completed: false,
  };

  // 4.3 add to the array.
  tasks.push(newTask);

  // 4.4 add to the screen.
  taskElement(newTask.text, newTask.id, false);

  // 4.5 save it to local storage.
  saveTask();

  // delete the value from the input after user add the task
  input.value = "";
});
// ==================================
// 5. Task element creation function
// ==================================
function taskElement(text, id, completed) {
  // 5.1 Create The Elements
  let task = document.createElement("div");
  let btnActions = document.createElement("div");
  let h3 = document.createElement("h3");
  let delBtn = document.createElement("button");
  let doneBtn = document.createElement("button");

  // 5.2 Add there class
  task.className = "task";
  task.dataset.id = id;
  btnActions.className = "btn-actions";
  delBtn.className = "del-item";
  doneBtn.className = "done-item";

  // 5.3 add content
  delBtn.textContent = "Delete";
  doneBtn.textContent = "Done";
  h3.textContent = text;

  // 5.4 If the task is completed, apply the formatting.
  if (completed) {
    h3.style.textDecoration = "line-through";
    h3.style.color = "#ada7a7";
  }

  // 5.5 add in the page
  listOfTasks.appendChild(task);
  task.appendChild(h3);
  task.appendChild(btnActions);
  btnActions.appendChild(doneBtn);
  btnActions.appendChild(delBtn);

  // Button logic

  // 5.6 Delete Button
  delBtn.addEventListener("click", function () {
    tasks = tasks.filter((taskObj) => {
      return taskObj.id !== id;
    });

    // 5.6.1 remove from the screen.
    task.remove();

    // 5.6.1 Save changes in localStorage
    saveTask();
  });

  // 5.7 Achievement button
  doneBtn.addEventListener("click", function () {
    // 5.7.1 We look for the task in the array and change the status of "completed".
    let foundTask = tasks.find(function (taskObj) {
      return taskObj.id === id;
    });

    if (foundTask) {
      // 5.7.2 We reverse the state (true becomes false and vice versa)
      foundTask.completed = !foundTask.completed;
    }
    // 5.7.3 We adjust the shape on the screen
    if (foundTask.completed) {
      h3.style.color = "#ada7a7";
      h3.style.textDecoration = "line-through";
    } else {
      h3.style.color = "";
      h3.style.textDecoration = "none";
    }
    // 5.7.4 We save the changes in localStorage
    saveTask();
  });
}

// =========================================
// 6. Start downloading when the page opens
// =========================================
loadTask();
