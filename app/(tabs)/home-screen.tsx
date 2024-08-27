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

  const renderItem = ({ item }: { item: typeof tasks[0] }) => (
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
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        scrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
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
  flatListContent: {
    paddingBottom: 80, // Add padding to ensure the last item isn't obstructed by the add button
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