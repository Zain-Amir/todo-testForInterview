"use client";
import Task from "@/components/Tasks";
import { useState, useEffect } from "react";
import UserIcon from "../assets/images/profile.jpg";
import Image from "next/image";
import ListIcon from "../assets/icons/ListIcon";
import ChevronIcon from "..//assets/icons/ChevronIcon";
import { CSSTransition } from "react-transition-group";
import axios from "axios";


export default function Home() {
  const [isTasksVisible, setTasksVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
    // console.log(newTask);
  };

  useEffect(() => {
    axios
      .get("https://server-production-3eb0.up.railway.app/tasks")
      .then((response) => {
        console.log("Tasks fetched:", response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const onTaskUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const onTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }
  
    const taskData = {
      name: newTask,
      createdAt: new Date(),
      completedAt: null,
      isCompleted: false,
    };
    // console.log("Adding task:", taskData);
    axios
      .post("https://server-production-3eb0.up.railway.app/tasks", taskData)
      .then((response) => {
        console.log("Task created:", response.data);
        const newTasks = [...tasks, response.data];
        console.log("New tasks state:", newTasks);
        setTasks(newTasks);
        setNewTask("");
        alert ("Task added successfully");
      })
      .catch((error) => {
        // console.error("Error creating task:", error);
        alert("Error creating task");
      });
  };

  return (
    <>
      <div className="flex-col flex  items-center justify-center h-screen">
        <div className="flex-col p-1 bg-white bg-opacity-50 rounded-full items-center justify-center">
          <div className="w-24 h-24 relative">
            <Image
              src={UserIcon}
              alt="User Icon"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center bg-white mb-2 rounded-lg justify-between w-[90vw] md:w-[35vw] mt-4">
          <input
            type="text"
            className="p-2 border-1 ml-4 w-full"
            placeholder="New task"
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            className="p-1 border-1 hover:bg-black hover:text-white text-3xl ml-2 px-4"
            onClick={handleAddTask}
          >
            +
          </button>
        </div>

        <div className="bg-transparent text-black border-[2px] border-black w-[90vw] md:w-[35vw]  mb-5 flex flex-col items-center justify-between rounded-lg backdrop-blur">
          <div className="flex items-center justify-between w-full">
            <button className="p-2 ">
              {" "}
              <ListIcon width="24" height="24" fill="black" />
            </button>
            <h2 className="text-md">Your Tasks</h2>
            <button
              className="p-2 border-1 "
              onClick={() => setTasksVisible(!isTasksVisible)}
            >
              <ChevronIcon
                width="24"
                height="24"
                fill="black"
                style={{
                  transform: `rotate(${isTasksVisible ? 180 : 0}deg)`,
                  transition: "transform 0.3s",
                }}
              />
            </button>
          </div>
        </div>

        <CSSTransition
          in={isTasksVisible}
          timeout={300}
          classNames="roll"
          unmountOnExit
        >
          <div className="overflow-hidden">
            <div className="flex-col items-center w-[90vw] md:w-[35vw] h-[30vh] overflow-auto overflow-x-hidden custom-scrollbar">
              {tasks.length > 0 ? (
                [...tasks].reverse().map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onTaskUpdate={onTaskUpdate}
                    onTaskDelete={onTaskDelete}
                  />
                ))
              ) : (
                <p className="bg-white bg-opacity-75 p-2 rounded-lg">No todos yet</p>
              )}
              
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
