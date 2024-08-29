import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskContext } from '../TaskContext'; // Import TaskContext

export default function AddScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState('');
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const { addTask } = useTaskContext(); // Use TaskContext

  const handleSave = () => {
    addTask(taskTitle, taskDate.toISOString().split('T')[0], isPrioritized);
    router.push('/home-screen'); // Zurück zur Startseite nach dem Speichern
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || taskDate;
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, keep the picker open
    setTaskDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Add</Text>

        {/* Task Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        {/* Calendar Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Calendar</Text>
          <TouchableOpacity
            style={styles.calendarInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ flex: 1 }}>
              {taskDate.toDateString()} {/* Display the selected date */}
            </Text>
            <FontAwesome name="calendar" size={24} color="black" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={taskDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        {/* Task Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter task description"
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline
          />
        </View>

        {/* Prioritize Toggle */}
        <View style={styles.priorityContainer}>
          <Text style={styles.label}>Prioritize?</Text>
          <TouchableOpacity onPress={() => setIsPrioritized(!isPrioritized)}>
            <FontAwesome name={isPrioritized ? "star" : "star-o"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/home-screen')}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#F7F6F2',
    padding: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8, // Added margin to space label from the input
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 120, // Increased height for better appearance
    textAlignVertical: 'top',
    paddingTop: 12, // Added padding to avoid text touching the top edge
    paddingBottom: 12, // Added padding to avoid text touching the bottom edge
  },
  calendarInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#CDCABE',
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#1C1A1A',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});