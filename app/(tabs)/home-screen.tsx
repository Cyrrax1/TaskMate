import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTaskContext } from '../TaskContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { tasks, toggleTaskDone, archiveTask } = useTaskContext();
  const router = useRouter();

  const handleToggleDone = (taskId: string) => {
    toggleTaskDone(taskId);
    setTimeout(() => archiveTask(taskId), 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id} // Ensure unique ID is used
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
              {item.title}
            </Text>
            <View style={styles.taskIcons}>
              <FontAwesome
                name="star-o"
                size={24}
                color="black"
                style={styles.iconSpacing}
              />
              <FontAwesome
                name="pencil"
                size={24}
                color="black"
                style={styles.iconSpacing}
                onPress={() => router.push({ pathname: '/edit-screen', params: { task: JSON.stringify(item) } })}
              />
              <TouchableOpacity onPress={() => handleToggleDone(item.id)}>
                <FontAwesome
                  name={item.done ? "check-square" : "square-o"}
                  size={24}
                  color={item.done ? "green" : "black"}
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 15,
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
