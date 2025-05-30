import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Tasks from './Tasks';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  );
  const [error, setError] = useState('');
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '') {
      setError('Please enter a valid task.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
    setError('');
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white shadow-xl place-self-center w-11/12 max-w-md flex flex-col px-6 py-8 rounded-2xl animate-fadeIn">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <img className="w-10 h-10" src={todo_icon} alt="logo" />
        <h1 className="text-3xl font-bold text-blue-700">My To Do List</h1>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center bg-gray-100 rounded-full shadow-outer hover:shadow-lg transition duration-100">
          <input
            ref={inputRef}
            className="bg-transparent pl-6 pr-2 w-full h-14 rounded-full text-slate-700
              border-0 outline-none placeholder:text-slate-500"
            type="text"
            placeholder="Add your task"
          />
          <button
            onClick={add}
            className="rounded-full bg-blue-600 hover:bg-blue-700 transition-colors w-32 h-14 text-white font-semibold"
          >
            Add Task
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm pl-4 mt-1">{error}</p>}
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {todoList.map((item) => (
          <Tasks
            key={item.id}
            Text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
