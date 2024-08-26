import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id: string;
  title: string;
  done: boolean;
  prioritized?: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  archivedTasks: Task[];
  toggleTaskDone: (taskId: string) => void;
  archiveTask: (taskId: string) => void;
  unarchiveTask: (taskId: string) => void;
  addTask: (title: string, prioritized?: boolean) => void;
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
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'To-do Task 1', done: false },
    { id: '2', title: 'To-do Task 2', done: false },
    { id: '3', title: 'To-do Task 3', done: false },
    { id: '4', title: 'To-do Task 4', done: false },
    { id: '5', title: 'To-do Task 5', done: false },
  ]);

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

  const addTask = (title: string, prioritized = false) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: String(prevTasks.length + 1 + Math.random()), // Ensures unique ID
        title,
        done: false,
        prioritized,
      }
    ]);
  };

  return (
    <TaskContext.Provider value={{ tasks, archivedTasks, toggleTaskDone, archiveTask, unarchiveTask, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
