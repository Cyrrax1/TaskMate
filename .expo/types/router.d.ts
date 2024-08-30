/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/add-screen` | `/(tabs)/archived-screen` | `/(tabs)/calendar-screen` | `/(tabs)/edit-screen` | `/(tabs)/home-screen` | `/(tabs)/premium-screen` | `/AppNavigator` | `/TaskContext` | `/_sitemap` | `/_tests_/add-edit.test` | `/_tests_/add-picture.test` | `/_tests_/buy-premium.test` | `/_tests_/delete-todo.test` | `/_tests_/login.test` | `/_tests_/navigation.test` | `/_tests_/signup.test` | `/_tests_/task-done.test` | `/_tests_/todo-per-calendar.test` | `/add-screen` | `/archived-screen` | `/calendar-screen` | `/edit-screen` | `/home-screen` | `/premium-screen` | `/sign-up-screen`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
