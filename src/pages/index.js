import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    isEditing: false,
    index: -1,
  });

  const titleChange = (e) => {
    setTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const descriptionChange = (e) => {
    setTodo({
      ...todo,
      description: e.target.value,
    });
  };

  const buttonClicked = () => {
    if (todo.title.trim() === "" || todo.description.trim() === "") {
      return;
    }

    setTodos([...todos, todo]);
    setTodo({
      title: "",
      description: "",
      isEditing: false,
      index: -1,
    });
  };

  const editClicked = (index, todo) => {
    setTodo({
      title: todo.title,
      description: todo.description,
      isEditing: true,
      index: index,
    });
  };

  const updateClicked = () => {
    if (todo.title.trim() === "" || todo.description.trim() === "") {
      return;
    }

    const newTodos = [...todos];
    newTodos[todo.index] = todo;

    setTodos(newTodos);
    setTodo({
      title: "",
      description: "",
      isEditing: false,
      index: -1,
    });
  };

  const deleteClicked = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    setTodos(newTodos);
  };

  const handleTodoDone = (index) => {
    const newTodos = [...todos];
    const doneTodo = newTodos.splice(index, 1);

    setDoneTodos([...doneTodos, ...doneTodo]);
    setTodos(newTodos);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="grow shrink-0 w-[500px]">
        <div className="pt-5">
          <div className="text-lg font-bold">Todos</div>
          Title:{" "}
          <input
            name="title"
            value={todo.title}
            onChange={titleChange}
            className="shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
          />
          Description:{" "}
          <input
            name="description"
            value={todo.description}
            onChange={descriptionChange}
            className="shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
          />
          {todo.isEditing ? (
            <button
              onClick={updateClicked}
              className="mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Update
            </button>
          ) : (
            <button
              onClick={buttonClicked}
              className="mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Add todo
            </button>
          )}
        </div>
        <ul>
        {todos.map((todo, index) => (
      <li key={index}>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">{todo.title}</div>
            <div>{todo.description}</div>
          </div>
          <div>
            <button
              onClick={() => editClicked(index, todo)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-3"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => deleteClicked(index)}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
        <button
          onClick={() => handleTodoDone(index)}
          className="mt-3 shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Done
        </button>
      </li>
    ))}
    </ul>
    {doneTodos.length > 0 && (
      <div className="mt-5">
        <div className="text-lg font-bold">Done Todos</div>
        <ul>
          {doneTodos.map((todo, index) => (
            <li key={index}>
              <div>
                <div className="font-bold">{todo.title}</div>
                <div>{todo.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>
);
}