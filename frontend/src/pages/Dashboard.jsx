// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchProfile, getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { FaEdit, FaTrash, FaUserCircle, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      }
    };
    getProfile();
    fetchTasks();
  }, [filterCompleted, search]);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filterCompleted !== 'all') params.completed = filterCompleted === 'completed';
      if (search) params.search = search;

      const { data } = await getTasks(params);
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, { title, description });
        setEditingTaskId(null);
      } else {
        await createTask({ title, description });
      }
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch {
      setError('Failed to save task');
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError('Failed to delete task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      fetchTasks();
    } catch {
      setError('Failed to update task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  return (
    <div className="page-background overflow-auto min-h-screen">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
        {profile && (
          <div className="flex items-center bg-blue-50 rounded-lg p-4 mb-8 shadow-sm">
            <FaUserCircle className="w-16 h-16 text-blue-500 mr-4 rounded-full border-2 border-blue-500" />
            <div>
              <h2 className="text-2xl font-semibold text-blue-900 mb-1">Welcome, {profile.name}!</h2>
              <p className="text-blue-800 text-lg">{profile.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        )}

        <div className="flex items-center mb-6">
          <FaClipboardList className="w-10 h-10 mr-3 text-gray-600" />
          <h1 className="text-4xl font-extrabold text-gray-800">Your Tasks</h1>
        </div>

        {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
          >
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </form>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
            className="px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
        </div>

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="w-5 h-5 cursor-pointer"
                  title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                />
                <div>
                  <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  {task.description && <p className="text-gray-600">{task.description}</p>}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg flex items-center space-x-2 transition duration-150"
                  title="Edit Task"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition duration-150"
                  title="Delete Task"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
