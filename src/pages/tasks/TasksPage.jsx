import React, { useCallback, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Search, ArrowUpDown, Plus, X } from 'lucide-react';
import TaskForm from '../../components/forms/TaskForm';
import TaskList from '../../components/ui/TaskList';
import Modal from '../../components/common/Modal';
import { TaskContext } from '../../context/TaskContext';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Open' },
];

function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete } = useContext(TaskContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [activeTask, setActiveTask] = useState(null);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const handleOpenModal = useCallback(() => {
    setActiveTask(null);
    setTaskModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setTaskModalOpen(false);
    setActiveTask(null);
  }, []);

  const handleSaveTask = useCallback(
    (taskData) => {
      if (taskData.id) {
        updateTask(taskData.id, {
          title: taskData.title,
          description: taskData.description,
        });
        toast.success('Task updated successfully');
      } else {
        addTask({
          title: taskData.title,
          description: taskData.description,
        });
        toast.success('Task created successfully');
      }
      handleCloseModal();
    },
    [addTask, handleCloseModal, updateTask]
  );

  const handleEditTask = useCallback((task) => {
    setActiveTask(task);
    setTaskModalOpen(true);
  }, []);

  const handleDeleteTask = useCallback(() => {
    if (!deleteCandidate) return;
    deleteTask(deleteCandidate.id);
    setDeleteCandidate(null);
    toast.success('Task deleted');
  }, [deleteCandidate, deleteTask]);

  const tasksWithSearch = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch = normalized
        ? task.title.toLowerCase().includes(normalized) || task.description.toLowerCase().includes(normalized)
        : true;
      const matchesFilter =
        filter === 'completed'
          ? task.completed
          : filter === 'pending'
          ? !task.completed
          : true;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const sortedTasks = useMemo(() => {
    return [...tasksWithSearch].sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return a.title.localeCompare(b.title);
    });
  }, [tasksWithSearch, sortOrder]);

  const openTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1 max-w-3xl">
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">Tasks</p>
          <h1 className="page-title">Task management</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Search, update, and ship tasks from a clean workflow view.</p>
        </div>

        <button type="button" className="btn-primary h-11 px-5 inline-flex items-center gap-2" onClick={handleOpenModal}>
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      <div className="card p-4 grid gap-3 lg:grid-cols-[1.6fr_1fr_0.9fr] items-center">
        <div className="min-w-0">
          <label htmlFor="search" className="sr-only">
            Search tasks
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="search"
              type="search"
              placeholder="Search tasks"
              className="input-field w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700'
              }`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-[180px]">
          <label htmlFor="sort" className="sr-only">
            Sort tasks
          </label>
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            id="sort"
            className="input-field w-full pl-10"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>{sortedTasks.length} tasks visible</span>
        <span>{openTasks} open task{openTasks !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-4">
        <TaskList tasks={sortedTasks} onToggle={toggleTaskComplete} onEdit={handleEditTask} onDelete={setDeleteCandidate} />
      </div>

      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4">
          <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  {activeTask ? 'Edit task' : 'Create task'}
                </p>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {activeTask ? 'Update this task' : 'Add a new task'}
                </h2>
              </div>
              <button type="button" className="btn-ghost rounded-full p-2" onClick={handleCloseModal}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <TaskForm
              initialTask={activeTask}
              onSave={handleSaveTask}
              onSuccess={handleCloseModal}
              onCancel={handleCloseModal}
              className="space-y-6 p-6"
            />
          </div>
        </div>
      )}

      {deleteCandidate && (
        <Modal
          title="Delete task"
          description={`Delete task "${deleteCandidate.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteTask}
          onCancel={() => setDeleteCandidate(null)}
        />
      )}
    </div>
  );
}

export default TasksPage;
