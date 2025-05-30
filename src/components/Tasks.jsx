import React from 'react';
import ticked from '../assets/tick.png';
import not_ticked from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const Tasks = ({ Text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer gap-2"
      >
        <img src={isComplete ? ticked : not_ticked} alt="checked" />
        <p
          className={`text-[17px] ml-4 ${
            isComplete ? 'line-through text-gray-400' : 'text-slate-700'
          }`}
        >
          {Text}
        </p>
      </div>
      <div>
        <img
          onClick={() => deleteTodo(id)}
          src={delete_icon}
          alt="delete"
          className="w-5.5 h-7 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
};

export default Tasks;
