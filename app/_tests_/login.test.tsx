import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskMateLogin from '../index';
import HomeScreen from '../(tabs)/home-screen';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';
import { TaskProvider } from '../TaskContext';

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => ({
    execAsync: jest.fn(),
    runAsync: jest.fn(),
    getFirstAsync: jest.fn().mockReturnValue({ id: 1, email: 'abc@gmail.com', password: 'abc' }),
  })),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('TaskMate App Workflow', () => {
  const mockRouter = { replace: jest.fn(), push: jest.fn() };
  const db = SQLite.openDatabaseSync('taskmate.db');

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks(); // Ensure all mocks are reset after tests
  });

  test('should display validation errors for incorrect email and password', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <TaskProvider>
        <TaskMateLogin />
      </TaskProvider>
    );

    fireEvent.press(getByText('LOG IN'));

    await waitFor(() => {
      expect(findByText('Please enter a valid email')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidemail');
    fireEvent.changeText(getByPlaceholderText('Password'), 'test');

    fireEvent.press(getByText('LOG IN'));

    await waitFor(() => {
      expect(findByText('Please enter a valid email')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@g.ch');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    (db.getFirstAsync as jest.Mock).mockResolvedValueOnce(null);

    fireEvent.press(getByText('LOG IN'));

    await waitFor(() => {
      expect(findByText('Invalid credentials. Please try again.')).toBeTruthy();
    });
  }, 10000);

  test('should log in with correct credentials and then log out', async () => {
    (db.getFirstAsync as jest.Mock).mockResolvedValueOnce({ email: 'test@g.ch', password: 'test' });

    const { getByPlaceholderText, getByText } = render(
      <TaskProvider>
        <TaskMateLogin />
      </TaskProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@g.ch');
    fireEvent.changeText(getByPlaceholderText('Password'), 'test');

    fireEvent.press(getByText('LOG IN'));

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/home-screen');
    });

    const { getByTestId } = render(
      <TaskProvider>
        <HomeScreen />
      </TaskProvider>
    );

    fireEvent.press(getByTestId('logout-button'));

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });
  });
});
