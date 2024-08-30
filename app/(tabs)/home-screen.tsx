import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTaskContext } from '../TaskContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { tasks, toggleTaskDone, archiveTask, deleteTask, updateTask } = useTaskContext();
  const router = useRouter();

  // Sort tasks based on priority
  const sortedTasks = [...tasks].sort((a, b) => (b.prioritized ? 1 : 0) - (a.prioritized ? 1 : 0));

  const handleToggleDone = (taskId: string) => {
    toggleTaskDone(taskId);
    setTimeout(() => archiveTask(taskId), 500); // Archive task after toggling done
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleTogglePriority = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      // Toggle the priority of the task
      updateTask(taskId, task.title, task.date, !task.prioritized, task.description);
    }
  };

  const renderItem = ({ item }: { item: typeof tasks[0] }) => (
    <View style={styles.taskContainer}>
      <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
        {item.title}
      </Text>
      <View style={styles.taskIcons}>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <FontAwesome name="trash" size={24} color="red" style={styles.iconSpacing} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTogglePriority(item.id)}>
          <FontAwesome
            name={item.prioritized ? "star" : "star-o"}
            size={24}
            color={item.prioritized ? "gold" : "black"}
            style={styles.iconSpacing}
          />
        </TouchableOpacity>
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
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="logout-button" style={styles.logoutButton} onPress={() => router.replace('/')}>
        <FontAwesome name="sign-out" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Home</Text>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Welcome to TaskMate!</Text>
          <Text style={styles.emptySubText}>Press the "+" button below to create a new task.</Text>
        </View>
      ) : (
        <FlatList
          data={sortedTasks} // Use sorted tasks to render
          keyExtractor={item => item.id}
          renderItem={renderItem}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          scrollEnabled={true}
          contentContainerStyle={styles.flatListContent}
        />
      )}

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
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  flatListContent: {
    paddingBottom: 80,
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
