export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
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
  title.textContent = "List of Todos";

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

  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add(
    "px-6",
    "py-3",
    "text-left",
    "text-xs",
    "font-medium",
    "text-gray-500",
    "uppercase",
    "tracking-wider"
  );
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add(
    "px-6",
    "py-3",
    "text-left",
    "text-xs",
    "font-medium",
    "text-gray-500",
    "uppercase",
    "tracking-wider"
  );
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add(
    "px-6",
    "py-3",
    "text-left",
    "text-xs",
    "font-medium",
    "text-gray-500",
    "uppercase",
    "tracking-wider"
  );
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add(
    "px-6",
    "py-3",
    "text-left",
    "text-xs",
    "font-medium",
    "text-gray-500",
    "uppercase",
    "tracking-wider"
  );
  th4.textContent = "Owner Id";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("bg-white", "divide-y", "divide-gray-200");

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(tableContainer);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      data.todos.forEach((todo) => {
        if (todo.id > 10) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("px-6", "py-4", "whitespace-nowrap");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("px-6", "py-4", "whitespace-nowrap");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("px-6", "py-4", "whitespace-nowrap");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("px-6", "py-4", "whitespace-nowrap");
        td4.textContent = todo.owner;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  fetchTodos();

  return container;
};
