import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  title: string;
  date: string; // Date format 'YYYY-MM-DD'
  done: boolean;
  prioritized?: boolean;
  description?: string;
  imageUri?: string; // Image URI path
}

interface TaskContextProps {
  tasks: Task[];
  archivedTasks: Task[];
  toggleTaskDone: (taskId: string) => void;
  archiveTask: (taskId: string) => void;
  unarchiveTask: (taskId: string) => void;
  addTask: (title: string, date: string, prioritized?: boolean, description?: string, imageUri?: string) => void;
  updateTask: (id: string, title: string, date: string, prioritized?: boolean, description?: string, imageUri?: string) => void;
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

// Open the database synchronously
const db = SQLite.openDatabaseSync('taskmate.db');

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<number | null>(null); // State to track the current user's ID

  useEffect(() => {
    initializeDatabase();
    getCurrentUserId().then((userId) => {
      setUserId(userId ? Number(userId) : null);
      if (userId) {
        loadTasks(Number(userId));
      }
    });
  }, []);

  const initializeDatabase = () => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT,
          date TEXT,
          done INTEGER,
          prioritized INTEGER,
          description TEXT,
          imageUri TEXT,
          userId INTEGER,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
      `);
      db.execSync(`
        CREATE TABLE IF NOT EXISTS archived_tasks (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT,
          date TEXT,
          done INTEGER,
          prioritized INTEGER,
          description TEXT,
          imageUri TEXT,
          userId INTEGER,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
      `);
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  };

  const getCurrentUserId = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('userId');
  };

  const loadTasks = (currentUserId: number) => {
    try {
      const loadedTasks = db.getAllSync('SELECT * FROM tasks WHERE userId = ?', currentUserId);
      console.log(`Loaded tasks for user ${currentUserId}:`, loadedTasks);
      setTasks(
        loadedTasks.map((task: any) => ({
          ...task,
          done: task.done === 1,
          prioritized: task.prioritized === 1,
        }))
      );

      const loadedArchivedTasks = db.getAllSync('SELECT * FROM archived_tasks WHERE userId = ?', currentUserId);
      console.log(`Loaded archived tasks for user ${currentUserId}:`, loadedArchivedTasks);
      setArchivedTasks(
        loadedArchivedTasks.map((task: any) => ({
          ...task,
          done: task.done === 1,
          prioritized: task.prioritized === 1,
        }))
      );
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTaskToDatabase = (task: Task) => {
    if (!userId) return;
    try {
      db.runSync(
        'INSERT OR REPLACE INTO tasks (id, title, date, done, prioritized, description, imageUri, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        task.id,
        task.title,
        task.date,
        task.done ? 1 : 0,
        task.prioritized ? 1 : 0,
        task.description ?? null,
        task.imageUri ?? null,
        userId
      );
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const deleteTaskFromDatabase = (taskId: string) => {
    if (!userId) return;
    try {
      db.runSync('DELETE FROM tasks WHERE id = ? AND userId = ?', taskId, userId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteArchivedTaskFromDatabase = (taskId: string) => {
    if (!userId) return;
    try {
      db.runSync('DELETE FROM archived_tasks WHERE id = ? AND userId = ?', taskId, userId);
    } catch (error) {
      console.error('Error deleting archived task:', error);
    }
  };

  const saveArchivedTaskToDatabase = (task: Task) => {
    if (!userId) return;
    try {
      db.runSync(
        'INSERT OR REPLACE INTO archived_tasks (id, title, date, done, prioritized, description, imageUri, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        task.id,
        task.title,
        task.date,
        task.done ? 1 : 0,
        task.prioritized ? 1 : 0,
        task.description ?? null,
        task.imageUri ?? null,
        userId
      );
    } catch (error) {
      console.error('Error saving archived task:', error);
    }
  };

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
      saveArchivedTaskToDatabase(taskToArchive);
      deleteTaskFromDatabase(taskId);
    }
  };

  const unarchiveTask = (taskId: string) => {
    const taskToUnarchive = archivedTasks.find(task => task.id === taskId);
    if (taskToUnarchive) {
      setTasks(prevTasks => [...prevTasks, { ...taskToUnarchive, done: false }]);
      setArchivedTasks(prevArchived => prevArchived.filter(task => task.id !== taskId));
      saveTaskToDatabase(taskToUnarchive);
      deleteArchivedTaskFromDatabase(taskId);
    }
  };

  const addTask = (title: string, date: string, prioritized = false, description = '', imageUri = '') => {
    const newTask: Task = {
      id: String(Date.now()),
      title,
      date,
      done: false,
      prioritized,
      description,
      imageUri,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    saveTaskToDatabase(newTask);
  };

  const updateTask = (id: string, title: string, date: string, prioritized = false, description = '', imageUri = '') => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, title, date, prioritized, description, imageUri } : task
      );
  
      // Save updated tasks to the database
      updatedTasks.forEach(task => saveTaskToDatabase(task));
      
      // Sort tasks to ensure prioritized tasks are always at the top
      return updatedTasks.sort((a, b) => (b.prioritized ? 1 : 0) - (a.prioritized ? 1 : 0));
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    deleteTaskFromDatabase(taskId);
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

export default TaskProvider;
