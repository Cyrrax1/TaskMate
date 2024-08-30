import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskMateLogin from '../index';
import SignUpScreen from '../sign-up-screen';
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

describe('TaskMate Sign-Up Workflow', () => {
  const mockRouter = { replace: jest.fn(), push: jest.fn() };
  const db = SQLite.openDatabaseSync('taskmate.db');

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should navigate from index to sign up, sign up, and then log in', async () => {
    // Step 1: Render the index page and simulate pressing the "Sign Up" button
    const { getByText, getByPlaceholderText } = render(
      <TaskProvider>
        <TaskMateLogin />
      </TaskProvider>
    );

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/sign-up-screen');
    });

    // Step 2: Simulate the sign-up process on the SignUpScreen
    mockRouter.push.mockClear(); // Clear previous navigation mock

    const { getByPlaceholderText: getByPlaceholderTextSignUp, getByTestId } = render(
      <TaskProvider>
        <SignUpScreen />
      </TaskProvider>
    );

    fireEvent.changeText(getByPlaceholderTextSignUp('Email'), 'newuser@g.ch');
    fireEvent.changeText(getByPlaceholderTextSignUp('Confirm Email'), 'newuser@g.ch');
    fireEvent.changeText(getByPlaceholderTextSignUp('Password'), 'password');

    fireEvent.press(getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });

    // Step 3: Back on the index page, attempt to log in with the new account
    fireEvent.changeText(getByPlaceholderText('Email'), 'newuser@g.ch');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('LOG IN'));

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/home-screen');
    });
  });

  test('should display validation errors if emails do not match during sign up', async () => {
    // Step 1: Render the index page and navigate to the sign-up page
    const { getByText, getByPlaceholderText } = render(
      <TaskProvider>
        <TaskMateLogin />
      </TaskProvider>
    );

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/sign-up-screen');
    });

    // Step 2: Simulate entering mismatched emails on the SignUpScreen
    mockRouter.push.mockClear(); // Clear previous navigation mock

    const { getByPlaceholderText: getByPlaceholderTextSignUp, getByTestId, findByText } = render(
      <TaskProvider>
        <SignUpScreen />
      </TaskProvider>
    );

    fireEvent.changeText(getByPlaceholderTextSignUp('Email'), 'newuser@g.ch');
    fireEvent.changeText(getByPlaceholderTextSignUp('Confirm Email'), 'mismatch@g.ch');
    fireEvent.changeText(getByPlaceholderTextSignUp('Password'), 'password');

    fireEvent.press(getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(findByText('Emails do not match')).toBeTruthy();
    });
  });
});
