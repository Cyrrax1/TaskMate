import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/home-screen';
import ArchivedScreen from './(tabs)/archived-screen';
import { FontAwesome } from '@expo/vector-icons';
import { TaskProvider } from './TaskContext';
import { useRouter } from 'expo-router';
import CalendarScreen from './(tabs)/calendar-screen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const router = useRouter();

  const handleLogout = () => {
    // Navigate back to the login screen
    router.replace('/');
  };

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
              } else if (route.name === 'Calendar') {
                iconName = 'calendar';
              } else if (route.name === 'Logout') {
                iconName = 'sign-out';
              }

              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Archived" component={ArchivedScreen} />
          <Tab.Screen name="calendar" component={CalendarScreen} options={{ tabBarLabel: 'Calendar' }} />

          <Tab.Screen
            name="Logout"
            component={() => null} // Placeholder for the logout
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handleLogout();
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default AppNavigator;
