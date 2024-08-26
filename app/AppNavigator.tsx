import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/home-screen';
import ArchivedScreen from './(tabs)/archived-screen';
import { FontAwesome } from '@expo/vector-icons';
import { TaskProvider } from './TaskContext';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Archived') {
                iconName = 'archive';
              }

              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Archived" component={ArchivedScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default AppNavigator;
