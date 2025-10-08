import Head from "next/head";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";
import { API_ENDPOINTS } from "../../../constants";
import { text } from "stream/consumers";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  const fetchTodos = async () => {
    const token = localStorage && localStorage?.getItem("authToken");

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleAddTodo = async () => {
    const token = localStorage && localStorage?.getItem("authToken");
    if (newTodo.trim().length > 0) {
      try {
        const res = await fetch(`${API_ENDPOINTS.BASE_URL}/todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            todo: {
              text: newTodo?.trim(),
              completed: false,
            },
          }),
        });
        if (res.ok) {
          const data = await res.json();

          setTodos([
            ...todos,
            {
              _id: data.todo?.insertedId,
              text: newTodo?.trim(),
            },
          ] as any);
          setNewTodo("");
        }
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage && localStorage?.getItem("authToken");

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedTodos = todos.filter((todo : any) => todo._id !== id);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const toggleTodoCompletion = async (id, currentStatus) => {
    const token = localStorage && localStorage?.getItem("authToken");

    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (response.ok) {
        const updatedTodos = todos.map((todo : any) =>
          todo._id === id ? { ...todo, completed: !currentStatus } : todo
        );
        setTodos(updatedTodos as any);
      }
    } catch (error) {
      console.error("Failed to toggle todo completion:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering until the component is mounted
  }

  return (
    <Layout>
      <div className="w-full md:w-[80%] flex h-screen bg-[#F5F5F5] relative overflow-hidden">
        <Head>
          <title>Todos | Habstrack</title>
          <meta
            name="description"
            content="Manage your todos effectively with Habstrack"
          />
          <link rel="icon" href="/habstrack.svg" />
        </Head>
        <div
          className={cn(
            " mx-auto w-full  flex justify-between py-4 lg:py-8 lg:gap-8   "
          )}
        >
          <main className={cn("mx-auto w-full  max-w-xl lg:max-w-[70%]")}>
            <div className="flex flex-col gap-4 mx-auto max-w-[600px] h-[70vh] pb-10 overflow-auto bg-[#fdfdfd] shadow-lg rounded-lg p-6 border border-gray-300">
              <div className="flex flex-col md:flex-row gap-y-4 justify-between md:items-end">
                <p className="text-3xl font-bold text-[#2e2e2e]">Todos</p>
              </div>
              <ul className="divide-y divide-gray-300">
                {Array.from({ length: 9 }).map((_, index) => {
                  const todo : any = todos[index];
                  return (
                    <li
                      key={todo?._id || index}
                      className="flex justify-between items-center py-2"
                      onClick={() =>
                        todo && toggleTodoCompletion(todo._id, todo.completed)
                      }
                    >
                      <span
                        className={`text-lg ${
                          todo?.completed
                            ? "line-through text-gray-500"
                            : "text-black"
                        } ${!todo?.text ? "opacity-0" : ""}`}
                      >
                        {todo?.text || "___"}
                      </span>
                      {todo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTodo(todo._id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              {todos.length < 9 && (
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new todo"
                  className="p-3 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f9f9] shadow-inner"
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default App;
