import { Tabs } from "expo-router";
import { TaskProvider } from "../TaskContext";
import { FontAwesome } from '@expo/vector-icons';
import React from "react";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'home-screen') {
              iconName = 'home';
            } else if (route.name === 'archived-screen') {
              iconName = 'archive';
            } else if (route.name === 'calendar-screen') {
              iconName = 'calendar';
            } else if (route.name === 'premium-screen') {
              iconName = 'star';
            } else if (route.name === 'edit-screen') {
              iconName = 'edit';
            } else if (route.name === 'add-screen') {
              iconName = 'star';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="home-screen" options={{ tabBarLabel: 'Home' }} />
        <Tabs.Screen name="archived-screen" options={{ tabBarLabel: 'Archived' }} />
        <Tabs.Screen name="calendar-screen" options={{ tabBarLabel: 'Calendar' }} />
        <Tabs.Screen name="premium-screen" options={{ tabBarLabel: 'Premium' }} />
        <Tabs.Screen name="add-screen" options={{ tabBarButton: () => null }} />
        <Tabs.Screen name="edit-screen" options={{ tabBarButton: () => null }} />
      </Tabs>
    </TaskProvider>
  );
}
