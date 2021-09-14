const $ = document;
const input = $.querySelector(".input");
const button = $.querySelector(".button");
const todoList = $.querySelector(".todoList");
const options = $.querySelector(".options");

button.addEventListener("click", addtodo);
todoList.addEventListener("click", checkRemove);
options.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodo);

function addtodo(e) {
	e.preventDefault();
	// console.log(e);
	const createDiv = $.createElement("div");
	createDiv.classList.add("todo");
	const newTodo = `
        <li>${input.value}</li>
            <span>
        <i class="far fa-check-square"></i>
        </span>
        <span>
            <i class="far fa-trash-alt"></i>
        </span>`;
	createDiv.innerHTML = newTodo;
	todoList.appendChild(createDiv);
	saveLocalTodo(input.value);
	input.value = "";
}

function checkRemove(e) {
	const classList = [...e.target.classList];
	const item = e.target;
	// console.log(item.parentElement.parentElement);
	if (classList[1] === "fa-check-square") {
		const todo = item.parentElement.parentElement;
		todo.classList.toggle("compelet");
	} else if (classList[1] === "fa-trash-alt") {
		const todo = item.parentElement.parentElement;
		removeLocalTodo(todo);
		todo.remove();
	}
}

function filterTodo(e) {
	const todos = [...todoList.childNodes];
	// console.log(e);
	todos.forEach((todo) => {
		switch (e.target.value) {
			case "all":
				todo.style.display = "block";
				break;
			case "read":
				if (todo.classList.contains("selectRead")) {
					todo.style.display = "block";
				} else {
					todo.style.display = "none";
				}
				break;
			case "unread":
				if (!todo.classList.contains("selectRead")) {
					todo.style.display = "block";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodo(todo) {
	let saveTodo = localStorage.getItem("todos")
		? JSON.parse(localStorage.getItem("todos"))
		: [];
	saveTodo.push(todo);
	localStorage.setItem("todos", JSON.stringify(saveTodo));
}

function getLocalTodo() {
	let saveTodo = localStorage.getItem("todos")
		? JSON.parse(localStorage.getItem("todos"))
		: [];
	saveTodo.forEach((todo) => {
		const createDiv = $.createElement("div");
		createDiv.classList.add("todo");
		const newTodo = `
        <li>${todo}</li>
            <span>
        <i class="far fa-check-square"></i>
        </span>
        <span>
            <i class="far fa-edit"></i>
        </span>
        <span>
            <i class="far fa-trash-alt"></i>
        </span>`;
		createDiv.innerHTML = newTodo;
		todoList.appendChild(createDiv);
	});
}

function removeLocalTodo(todo) {
	// console.log(todo.children[0].innerText);
	let saveTodo = localStorage.getItem("todos")
		? JSON.parse(localStorage.getItem("todos"))
		: [];
	const filterTodo = saveTodo.filter((t) => t !== todo.children[0].innerText);
	localStorage.setItem("todos", JSON.stringify(filterTodo));
}
