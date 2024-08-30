import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTaskContext } from '../TaskContext';

export default function ArchivedScreen() {
  const { archivedTasks, unarchiveTask } = useTaskContext();

  const handleUnarchive = (taskId: string) => {
    unarchiveTask(taskId); // Unarchive the task and move it back to the active tasks list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archived</Text>
      
      {archivedTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No archived tasks yet!</Text>
          <Text style={styles.emptySubText}>Archived tasks will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={archivedTasks}
          keyExtractor={(item, index) => item.id + index} // Ensure unique key by combining id and index
          renderItem={({ item }) => (
            <View style={[styles.taskContainer, styles.taskContainerDone]}>
              <Text style={[styles.taskText, styles.taskTextDone]}>
                {item.title}
              </Text>
              <View style={styles.taskIcons}>
                <FontAwesome
                  name={item.prioritized ? "star" : "star-o"}
                  size={24}
                  color={item.prioritized ? "gold" : "black"}
                  style={styles.iconSpacing}
                />
                <FontAwesome
                  name="pencil"
                  size={24}
                  color="black"
                  style={styles.iconSpacing}
                  onPress={() => console.log(`Edit ${item.title}`)}
                />
                <TouchableOpacity onPress={() => handleUnarchive(item.id)}>
                  <FontAwesome
                    name="check-square"
                    size={24}
                    color="green"
                    style={styles.iconSpacing}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
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
    backgroundColor: '#D3D3D3',
    opacity: 0.6,
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
});
