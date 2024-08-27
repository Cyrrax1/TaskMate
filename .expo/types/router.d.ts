/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/archived-screen` | `/(tabs)/home-screen` | `/(tabs)\add-screen` | `/(tabs)\edit-screen` | `/AppNavigator` | `/TaskContext` | `/_sitemap` | `/archived-screen` | `/home-screen`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
