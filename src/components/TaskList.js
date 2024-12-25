import React, { useState } from "react";
import api from "../api";

const TaskList = ({ tasks, onEdit, fetchTasks }) => {
  const [filter, setFilter] = useState("All");

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.status === filter
  );

  return (
    <div>
      <h2>Task List</h2>
      <div className="taskListCont">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <strong>{task.name}</strong>
            <div style={{ display: "flex", justifyContent: "right" }}>
              - {task.description}
            </div>
            <div>
              (Priority: {task.priority})
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
