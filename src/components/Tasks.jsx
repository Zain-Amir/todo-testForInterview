"use client";

import React, { useState } from "react";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";
import DotIcon from "../assets/icons/DotIcon";
import ChevronIcon from "../assets/icons/ChevronIcon";
import { CSSTransition } from "react-transition-group";
import axios from 'axios';


const Task = ({ task ,onTaskUpdate, onTaskDelete}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleComplete = () => {
    const updatedTask = {
      isCompleted: !task.isCompleted,
      completedAt: task.isCompleted ? null : new Date(),
    };

    axios.put(`http://localhost:3000/tasks/${task._id}`, updatedTask)
      .then(response => {
        console.log('Task updated:', response.data);
        onTaskUpdate(response.data);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/tasks/${task._id}`)
      .then(response => {
        console.log('Task deleted:', response.data);
        onTaskDelete(task._id);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="bg-white bg-opacity-70 w-[90vw] md:w-[35vw] mb-1  flex flex-col items-center justify-between p-2 border-b-2 border-gray-500 rounded-lg">
      <div className="flex items-center justify-between w-full">
        <button className="p-2 " onClick={handleComplete}>
          {task.isCompleted ? (
            <CheckCircleIcon width="24" height="24" fill="black" />
          ) : (
            <CheckCircleIcon
              width="24"
              height="24"
              fill="white"
              stroke="black"
            />
          )}
        </button>
        <h2 className="text-xl">{task.name}</h2>
        <button
          className="p-2 border-1 "
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <DotIcon width="24" height="24" fill="black" />
        </button>
      </div>
    <CSSTransition
        in={isExpanded}
        timeout={200}
        classNames="roll"
        unmountOnExit
    >
        <div className="flex flex-col text-left w-[90%] mt-4">
            <p>{task.details}</p>
            <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Completed at: {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'Not completed yet'}</p>
            <button className="mt-2 p-1  w-full bg-red-500 bg-opacity-75 text-red-600"
            onClick={handleDelete}>
                Delete
            </button>
        </div>
    </CSSTransition>
    </div>
  );
};

export default Task;
