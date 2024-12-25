import React, { useState } from 'react';
import api from '../api';

const TaskForm = ({ task, onClose, refreshTasks }) => {
  const [form, setForm] = useState(
    task || { name: '', description: '', dueDate: '', status: 'Pending', priority: 'Low' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      await api.patch(`/tasks/${task._id}`, form);
    } else {
      await api.post('/tasks', form);
    }
    refreshTasks();
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Task Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
