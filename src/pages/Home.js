import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Header from "../components/Header";
import api from "../api";
import "./index.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshTasks = () => {
    fetchTasks();
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div>
      <Header />
      <div className="buttonCont">
        <button onClick={() => setShowForm(true)}>Add Task</button>
      </div>
      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        fetchTasks={fetchTasks}
      />
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => setShowForm(false)}
          refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
};

export default Home;
