import React from 'react';
import { TotalTasksIcon, CompletedTasksIcon, InProgressTasksIcon, PendingTasksIcon } from './TaskStatsIcons';

const TaskStats = ({ tasks }) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const totalTasks = safeTasks.length;
  const completedTasks = safeTasks.filter(task => task.status === 'COMPLETED').length;
  const inProgressTasks = safeTasks.filter(task => task.status === 'IN_PROGRESS').length;
  const pendingTasks = safeTasks.filter(task => task.status === 'PENDING').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: <TotalTasksIcon />, color: 'text-blue-500' },
    { label: 'Completed', value: completedTasks, icon: <CompletedTasksIcon />, color: 'text-green-500' },
    { label: 'In Progress', value: inProgressTasks, icon: <InProgressTasksIcon />, color: 'text-yellow-500' },
    { label: 'Pending', value: pendingTasks, icon: <PendingTasksIcon />, color: 'text-gray-500' },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className={`text-3xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Overall Progress</span>
          </div>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;