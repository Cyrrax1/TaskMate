import { Tabs } from "expo-router";
import { TaskProvider } from "../TaskContext";
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/'); // Navigate back to the login screen
  };

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
            } else if (route.name === 'calendar') {
              iconName = 'calendar';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="home-screen" options={{ tabBarLabel: 'Home' }} />
        <Tabs.Screen name="archived-screen" options={{ tabBarLabel: 'Archived' }} />
        <Tabs.Screen name="calendar" options={{ tabBarLabel: 'Calendar' }} />
        {/* Custom Logout Button */}
        <Tabs.Screen
          name="logout"
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome name="sign-out" size={24} color="tomato" />
                <Text style={{ color: 'tomato', fontSize: 12 }}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
