import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/api.js";

const createButton = (text, classes, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(...classes);
  button.addEventListener("click", onClick);
  return button;
};

const createTable = (headers) => {
  const tableContainer = document.createElement("div");
  tableContainer.classList.add(
    "w-full",
    "overflow-x-auto",
    "bg-white",
    "shadow-md",
    "rounded-lg"
  );

  const table = document.createElement("table");
  table.classList.add("min-w-full", "divide-y", "divide-gray-200");

  const thead = document.createElement("thead");
  thead.classList.add("bg-gray-50");

  const headerRow = document.createElement("tr");
  headers.forEach((text) => {
    const th = document.createElement("th");
    th.classList.add(
      "px-6",
      "py-3",
      "text-left",
      "text-xs",
      "font-medium",
      "text-gray-500",
      "uppercase",
      "tracking-wider"
    );
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.classList.add("bg-white", "divide-y", "divide-gray-200");
  table.appendChild(tbody);

  tableContainer.appendChild(table);
  return { tableContainer, tbody };
};

const createForm = (onSubmit) => {
  const form = document.createElement("form");
  form.classList.add("mb-4", "bg-white", "p-4", "rounded", "shadow");
  form.innerHTML = `
    <input type="hidden" name="id">
    <div class="mb-2">
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input type="text" id="title" name="title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>
    <div class="mb-2">
      <label for="completed" class="block text-sm font-medium text-gray-700">Completed</label>
      <input type="checkbox" id="completed" name="completed" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>
    <button type="submit" class="bg-green-500 text-white p-2 rounded hover:bg-green-600">Save Todo</button>
  `;
  form.addEventListener("submit", onSubmit);
  return form;
};

const handleEditTodo = (form, todo) => {
  form.id.value = todo.id;
  form.title.value = todo.title;
  form.completed.checked = todo.completed;
};

const handleDeleteTodo = async (todoId, row) => {
  if (confirm("¿Estás seguro de que deseas eliminar este todo?")) {
    try {
      await deleteTodo(todoId);
      row.remove();
    } catch (error) {
      console.error("Error al eliminar el todo:", error);
    }
  }
};

const handleFormSubmit = (tbody, userId) => async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const todo = {
    title: formData.get("title"),
    completed: formData.get("completed") === "on",
    owner: userId,
  };

  try {
    if (formData.get("id")) {
      await updateTodo(formData.get("id"), todo);
    } else {
      const response = await createTodo(todo);
      renderTodoRow(response.todo, tbody, e.target);
    }
    e.target.reset();
  } catch (error) {
    console.error("Error al guardar el todo:", error);
  }
};

const renderTodoRow = (todo, tbody, form) => {
  if (!tbody || !form) {
    console.error("tbody or form is undefined", { tbody, form });
    return;
  }

  const tr = document.createElement("tr");

  const createTd = (content) => {
    const td = document.createElement("td");
    td.classList.add("px-6", "py-4", "whitespace-nowrap");
    td.textContent = content;
    return td;
  };

  tr.appendChild(createTd(todo.id));
  tr.appendChild(createTd(todo.title));
  tr.appendChild(createTd(todo.completed ? "Yes" : "No"));
  tr.appendChild(createTd(todo.owner));

  const actionsTd = document.createElement("td");
  actionsTd.classList.add("px-6", "py-4", "whitespace-nowrap");

  const editButton = createButton(
    "Edit",
    ["bg-yellow-500", "text-white", "p-2", "rounded", "mr-2"],
    () => handleEditTodo(form, todo)
  );
  const deleteButton = createButton(
    "Delete",
    ["bg-red-500", "text-white", "p-2", "rounded"],
    () => handleDeleteTodo(todo.id, tr)
  );

  actionsTd.appendChild(editButton);
  actionsTd.appendChild(deleteButton);
  tr.appendChild(actionsTd);

  tbody.appendChild(tr);
};

const renderTodos = async (tbody, form) => {
  try {
    const data = await getTodos();
    tbody.innerHTML = "";
    data.todos.forEach((todo) => {
      if (todo.id > 10) return;
      renderTodoRow(todo, tbody, form);
    });
  } catch (error) {
    console.error("Error al obtener los todos:", error);
  }
};

export const todosPage = (userId) => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-h-screen",
    "bg-gray-200",
    "p-4"
  );

  const btnHome = createButton(
    "Home",
    [
      "bg-blue-500",
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-blue-600",
      "mb-4",
    ],
    () => {
      window.location.pathname = "/home";
    }
  );

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "Todo List";

  const { tableContainer, tbody } = createTable([
    "ID",
    "Title",
    "Completed",
    "Owner ID",
    "Actions",
  ]);

  const form = createForm(handleFormSubmit(tbody, userId));

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(form);
  container.appendChild(tableContainer);

  renderTodos(tbody, form);

  return container;
};
