import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Header from '../components/Header';

const Home = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refreshTasks = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div>
      <Header />
      <button onClick={() => setShowForm(true)}>Add Task</button>
      <TaskList onEdit={(task) => {
        setEditingTask(task);
        setShowForm(true);
      }} />
      {showForm && (
        <TaskForm task={editingTask} onClose={() => setShowForm(false)} refreshTasks={refreshTasks} />
      )}
    </div>
  );
};

export default Home;
