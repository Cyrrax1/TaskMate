import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'To-do Task 1', done: false },
    { id: '2', title: 'To-do Task 2', done: false },
    { id: '3', title: 'To-do Task 3', done: false },
    { id: '4', title: 'To-do Task 4', done: false },
    { id: '5', title: 'To-do Task 5', done: false },
  ]);

  const router = useRouter();

  const toggleTaskDone = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburgerMenu} onPress={() => console.log('Hamburger menu pressed')}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Home</Text>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskContainer, item.done && styles.taskContainerDone]}>
            <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
              {item.title}
            </Text>
            <View style={styles.taskIcons}>
              <FontAwesome name="star-o" size={24} color="black" style={styles.iconSpacing} />
              <FontAwesome
                name="pencil"
                size={24}
                color="black"
                style={styles.iconSpacing}
                onPress={() => router.push({ pathname: '/edit-screen', params: { task: JSON.stringify(item) } })}
              />
              <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
                <FontAwesome
                  name={item.done ? "check-square" : "square-o"} // Toggle between checked and unchecked
                  size={24}
                  color={item.done ? "green" : "black"} // Change color if done
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-screen')}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E4DE',
  },
  hamburgerMenu: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 15,
    marginBottom: 30,
  },
  taskContainerDone: {
    opacity: 0.5, // Reduce opacity when task is marked as done
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Take up remaining space
  },
  taskTextDone: {
    textDecorationLine: 'line-through', // Strike-through effect when done
    color: '#888',
  },
  taskIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align icons to the right
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 15, // Add space between icons
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
