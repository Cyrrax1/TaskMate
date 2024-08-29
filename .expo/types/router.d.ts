/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/add-screen` | `/(tabs)/archived-screen` | `/(tabs)/calendar-screen` | `/(tabs)/edit-screen` | `/(tabs)/home-screen` | `/(tabs)\premium-screen` | `/AppNavigator` | `/TaskContext` | `/_sitemap` | `/add-screen` | `/archived-screen` | `/calendar-screen` | `/edit-screen` | `/home-screen` | `/sign-up-screen`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
