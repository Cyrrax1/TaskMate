import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTaskContext } from '../TaskContext';

export default function CalendarScreen() {
  const { tasks } = useTaskContext();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Mark tasks on the calendar
  const markedDates = tasks.reduce((acc, task) => {
    const date = task.date;
    if (date) {
      acc[date] = { marked: true, dotColor: 'blue', color: '#70d7c7' };
    }
    return acc;
  }, {});

  const handleDayPress = (day) => {
    const tasksForDay = tasks.filter(task => task.date === day.dateString).map(task => task.title);
    setSelectedTasks(tasksForDay);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <View style={styles.calendarWrapper}>
        <Calendar
          markedDates={markedDates}
          theme={{
            todayTextColor: 'red',
            arrowColor: 'blue',
            dotColor: 'red',
            selectedDayBackgroundColor: 'blue',
            selectedDayTextColor: '#ffffff',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
          }}
          onDayPress={handleDayPress}
          style={styles.calendar}
        />
      </View>

      {/* Modal for task details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tasks for the Day</Text>
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task, index) => (
                <Text key={index} style={styles.modalText}>{task}</Text>
              ))
            ) : (
              <Text style={styles.modalText}>No tasks for this day.</Text>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E4DE',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40, // Consistent with other screens
    marginBottom: 20,
  },
  calendarWrapper: {
    flex: 1, // Takes available space to adjust positioning
    justifyContent: 'center', // Centers the calendar vertically
  },
  calendar: {
    borderRadius: 15, // Keeps the edges rounded
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
