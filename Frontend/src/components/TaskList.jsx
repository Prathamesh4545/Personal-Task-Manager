import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { statusConfig } from './statusConfig';

const TaskStatus = ({ status, onUpdate, taskId }) => {
  const handleStatusChange = (e) => {
    onUpdate(taskId, { status: e.target.value });
  };

  const currentStatus = statusConfig[status] || statusConfig.PENDING;

  return (
    <div className="flex items-center">
      <span className={`h-2.5 w-2.5 rounded-full ${currentStatus.dot} mr-2`}></span>
      <select 
        value={status} 
        onChange={handleStatusChange}
        className={`text-sm font-semibold rounded-lg px-2 py-1 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 transition-colors ${currentStatus.color}`}
      >
        {Object.keys(statusConfig).map(statusKey => (
          <option key={statusKey} value={statusKey}>{statusConfig[statusKey].label}</option>
        ))}
      </select>
    </div>
  );
};


const TaskItem = ({ task, onEdit, onDelete, onUpdateStatus }) => {
  const { id, title, description, createdAt, status } = task;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">{title}</h3>
          <TaskStatus status={status} onUpdate={onUpdateStatus} taskId={id} />
        </div>

        {description && <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{description}</p>}

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onEdit(task)} 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors py-1 px-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700"
              aria-label={`Edit task: ${title}`}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(id)} 
              className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors py-1 px-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-700"
              aria-label={`Delete task: ${title}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

const TaskList = ({ tasks, onEdit, onDelete, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tasks, searchTerm, filterStatus]);

  const filterOptions = ['All', ...Object.keys(statusConfig)];

  return (
    <div className="bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/60">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Your Tasks</h2>
        <div className="w-full md:w-auto flex items-center gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex items-center gap-2">
            {filterOptions.map(option => (
              <button
                key={option}
                onClick={() => setFilterStatus(option)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                  filterStatus === option
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {option.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <AnimatePresence>
          <ul className="space-y-4">
            {filteredTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onEdit={onEdit} 
                onDelete={onDelete}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </ul>
        </AnimatePresence>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {tasks.length > 0 ? "Try adjusting your search or filter." : "Create a new task to get started!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;