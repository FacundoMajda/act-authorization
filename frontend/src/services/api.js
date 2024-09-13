const URL = "http://localhost:3000/todos";

export const getTodos = async () => {
  try {
    console.log("Iniciando solicitud para obtener todos los todos...");
    const response = await fetch(URL, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Falló obtener todos los todos");
    }

    console.log("Todos obtenidos exitosamente");
    return response.json();
  } catch (error) {
    console.error("Error al obtener los todos:", error);
  }
};

export const createTodo = async (todo) => {
  try {
    console.log("Iniciando solicitud para crear un nuevo todo...");
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Falló crear el todo");
    }

    console.log("Todo creado exitosamente");
    return response.json();
  } catch (error) {
    console.error("Error al crear el todo:", error);
  }
};

export const updateTodo = async (id, todo) => {
  try {
    console.log(`Iniciando solicitud para actualizar el todo con ID: ${id}...`);
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Falló actualizar el todo");
    }

    console.log(`Todo con ID: ${id} actualizado exitosamente`);
    return response.json();
  } catch (error) {
    console.error("Error al actualizar el todo:", error);
  }
};

export const deleteTodo = async (id) => {
  try {
    console.log(`Iniciando solicitud para eliminar el todo con ID: ${id}...`);
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Falló eliminar el todo");
    }

    console.log(`Todo con ID: ${id} eliminado exitosamente`);
    return response.json();
  } catch (error) {
    console.error("Error al eliminar el todo:", error);
  }
};
