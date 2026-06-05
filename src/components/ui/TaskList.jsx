import React from 'react';
import { formatDate } from '../../utils/helpers';

const TaskList = React.memo(function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="card p-10 text-center">
        <h3 className="section-title">No tasks found</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Use the button above to create a task and keep your work in one place.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <article key={task.id} className="card border-slate-200 dark:border-slate-800 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`${
                    task.completed ? 'badge-success' : 'badge-info'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Open'}
                </span>
                <h3 className={`text-lg font-semibold ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                  {task.title}
                </h3>
              </div>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                {task.description || 'No description provided.'}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end text-sm text-slate-500 dark:text-slate-400">
              <span>Created {formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 dark:border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer"
              />
              Mark complete
            </label>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-secondary" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button type="button" className="btn-danger" onClick={() => onDelete(task)}>
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
});

export default TaskList;
