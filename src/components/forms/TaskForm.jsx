import React, { useEffect, useState } from 'react';
import { sanitizeInput } from '../../utils/helpers';

function TaskForm({ initialTask, onSave, onSuccess, onCancel, className = 'card p-6 space-y-6' }) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialTask?.title || '');
    setDescription(initialTask?.description || '');
    setErrors({});
  }, [initialTask]);

  const validate = () => {
    const nextErrors = {};
    if (!sanitizeInput(title)) nextErrors.title = 'Task title is required';
    if (title.length > 100) nextErrors.title = 'Title should be 100 characters or fewer';
    if (description.length > 300) nextErrors.description = 'Description should be 300 characters or fewer';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSave({
      ...initialTask,
      title: sanitizeInput(title),
      description: sanitizeInput(description),
    });
    resetForm();
    if (onSuccess) onSuccess();
  };
  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <h2 className="section-title">{initialTask ? 'Edit task' : 'Create new task'}</h2>
      
      <div className="space-y-2">
        <label htmlFor="task-title" className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          placeholder="Build dashboard UI"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-describedby="task-title-error"
          maxLength={100}
        />
        {errors.title && (
          <span className="text-sm text-red-600 dark:text-red-400" id="task-title-error">
            {errors.title}
          </span>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-right">{title.length}/100</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="task-description" className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          Description
        </label>
        <textarea
          id="task-description"
          placeholder="Define task details and completion criteria."
          className="input-field resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-describedby="task-description-error"
          rows={4}
          maxLength={300}
        />
        {errors.description && (
          <span className="text-sm text-red-600 dark:text-red-400" id="task-description-error">
            {errors.description}
          </span>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-right">{description.length}/300</p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
