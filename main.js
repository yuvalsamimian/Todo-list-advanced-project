let todosArr = [];
let todoInput = document.querySelector("#todoInput");
let date = document.querySelector("#date");
let time = document.querySelector("#time");
let todosArea = document.querySelector("#todosArea");
let myForm = document.querySelector("#myForm");

if (localStorage.getItem("todosArr")) {
  todosArr = JSON.parse(localStorage.getItem("todosArr"));
  showData();
}

function saveToLocalStorage() {
  localStorage.setItem("todosArr", JSON.stringify(todosArr));
}

function CreateNewTodo(newTodoName, newDate, newTime) {
  this.name = newTodoName;
  this.date = newDate;
  this.time = newTime;
}

function addTodo(event) {
  event.preventDefault();

  // Check if the form is valid
  if (!myForm.checkValidity()) {
    // If the form is invalid, let the browser show validation messages
    return false;
  }

  let newTodoName = todoInput.value;
  let d = new Date(date.value);
  let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  let newTime = time.value;
  let newTodo = new CreateNewTodo(newTodoName, newDate, newTime);
  todosArr.unshift(newTodo);
  saveToLocalStorage();
  showData("in", 0);
  myForm.reset();

  return false;
}

function showData(fade, fadeIndex) {
  todosArea.innerHTML = "";

  let index = 0;
  for (let item of todosArr) {
    let todoDiv = document.createElement("div");
    todoDiv.innerHTML = `
      <p class="textAreaContent">${item.name}</p>
      <div class="deadlineDiv">
        ${item.date} <br>
        ${item.time}
      </div>
      <button onclick="removeItem(${index})">X</button>
    `;
    todoDiv.classList.add("todoDiv");

    if (index === fadeIndex) {
      if (fade === "in") {
        todoDiv.classList.add("newClassTodo");
      }
      if (fade === "out") {
        todoDiv.classList.add("removeClassTodo");
      }
    }
    todosArea.appendChild(todoDiv);
    index++;
  }
}

function removeItem(index) {
  todosArr.splice(index, 1);
  saveToLocalStorage();
  showData("out", index);
}
