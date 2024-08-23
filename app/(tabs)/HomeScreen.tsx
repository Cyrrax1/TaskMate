import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const tasks = [
  { id: '1', title: 'To-do Task 1' },
  { id: '2', title: 'To-do Task 2' },
  { id: '3', title: 'To-do Task 3' },
  { id: '4', title: 'To-do Task 4' },
  { id: '5', title: 'To-do Task 5' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.title}</Text>
            <View style={styles.taskIcons}>
              <FontAwesome name="star-o" size={24} color="black" />
              <FontAwesome name="pencil" size={24} color="black" />
              <FontAwesome name="square-o" size={24} color="black" />
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add new task')}>
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
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
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
