import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { storageService } from '../services/storageService';

export const TaskContext = createContext({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  toggleTaskComplete: () => {},
});

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => storageService.getTasks());
  const [storageValid, setStorageValid] = useState(() => storageService.hasValidTasks());
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      return;
    }

    if (!storageValid && tasks.length === 0) {
      return;
    }

    storageService.setTasks(tasks);
    setStorageValid(true);
  }, [tasks, storageValid]);

  const addTask = useCallback((taskData) => {
    const nextTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((current) => [nextTask, ...current]);
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }, []);

  const toggleTaskComplete = useCallback((taskId) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, toggleTaskComplete }),
    [tasks, addTask, updateTask, deleteTask, toggleTaskComplete]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
