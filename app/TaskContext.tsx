// TaskContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id: string;
  title: string;
  date: string;  // Date format 'YYYY-MM-DD'
  done: boolean;
  prioritized?: boolean;
  description?: string;
}

interface TaskContextProps {
  tasks: Task[];
  archivedTasks: Task[];
  toggleTaskDone: (taskId: string) => void;
  archiveTask: (taskId: string) => void;
  unarchiveTask: (taskId: string) => void;
  addTask: (title: string, date: string, prioritized?: boolean) => void;
  updateTask: (id: string, title: string, date: string, prioritized?: boolean, description?: string) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  const toggleTaskDone = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const archiveTask = (taskId: string) => {
    const taskToArchive = tasks.find(task => task.id === taskId);
    if (taskToArchive) {
      setArchivedTasks(prevArchived => [...prevArchived, { ...taskToArchive, done: true }]);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  const unarchiveTask = (taskId: string) => {
    const taskToUnarchive = archivedTasks.find(task => task.id === taskId);
    if (taskToUnarchive) {
      setTasks(prevTasks => [...prevTasks, { ...taskToUnarchive, done: false }]);
      setArchivedTasks(prevArchived => prevArchived.filter(task => task.id !== taskId));
    }
  };

  const addTask = (title: string, date: string, prioritized = false) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: String(prevTasks.length + 1 + Math.random()), // Ensure unique ID
        title,
        date,
        done: false,
        prioritized,
      }
    ]);
  };

  const updateTask = (id: string, title: string, date: string, prioritized = false, description = '') => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, title, date, prioritized, description } : task
      );
      return [...updatedTasks]; // Return a new array to trigger a state change
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        archivedTasks,
        toggleTaskDone,
        archiveTask,
        unarchiveTask,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
