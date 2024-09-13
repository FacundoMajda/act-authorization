import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/api.js";

export const todosPage = () => {
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

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "Todo List";

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
  ["ID", "Title", "Completed", "Owner ID", "Actions"].forEach((text) => {
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

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(form);
  container.appendChild(tableContainer);

  const renderTodos = async () => {
    try {
      const data = await getTodos();
      tbody.innerHTML = "";
      data.todos.forEach((todo) => {
        if (todo.id > 10) return;

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

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add(
          "bg-yellow-500",
          "text-white",
          "p-2",
          "rounded",
          "mr-2"
        );
        editButton.addEventListener("click", () => {
          form.id.value = todo.id;
          form.title.value = todo.title;
          form.completed.checked = todo.completed;
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add(
          "bg-red-500",
          "text-white",
          "p-2",
          "rounded"
        );
        deleteButton.addEventListener("click", async () => {
          if (confirm("Are you sure you want to delete this todo?")) {
            try {
              await deleteTodo(todo.id);
              renderTodos();
            } catch (error) {
              console.error("Error deleting todo:", error);
            }
          }
        });

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);
        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todo = {
      title: formData.get("title"),
      completed: formData.get("completed") === "on",
    };

    try {
      if (formData.get("id")) {
        await updateTodo(formData.get("id"), todo);
      }

      await createTodo(todo);

      e.target.reset();
      renderTodos();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  });

  renderTodos();

  return container;
};
