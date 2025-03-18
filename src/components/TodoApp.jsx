import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!task) return;
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: task,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Edit a task
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTask(taskToEdit.title);
    setEditMode(true);
    setEditTaskId(id);
  };

  // Update a task
  const updateTask = async () => {
    if (!task) return;
    try {
      const updatedTask = { ...tasks.find((t) => t.id === editTaskId), title: task };
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${editTaskId}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === editTaskId ? updatedTask : t)));
      setTask('');
      setEditMode(false);
      setEditTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === id);
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={editMode ? updateTask : addTask}>
          {editMode ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span onClick={() => toggleTaskCompletion(task.id)}>{task.title}</span>
            <button onClick={() => editTask(task.id)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button onClick={clearAllTasks} className="clear-all-btn">
          Clear All Tasks
        </button>
      )}
    </div>
  );
};

export default TodoApp;
