async function loadTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const item = document.createElement("div");
    item.className = "todo-item";

    const text = document.createElement("span");
    text.textContent = todo.text;

    const del = document.createElement("button");
    del.textContent = "X";
    del.className = "delete-btn";

item.appendChild(text);
item.appendChild(del);
li.appendChild(item);
    if (todo.done) text.style.textDecoration = "line-through";

    li.onclick = async () => {
      await fetch(`/api/todos/${todo.id}`, { method: "PUT" });
      loadTodos();
    };

    del.onclick = async (e) => {
  e.stopPropagation();

  li.classList.add("removing");

  setTimeout(async () => {
    await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
    loadTodos();
  }, 300);
};

    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  if (!input.value) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  loadTodos();
}

loadTodos();