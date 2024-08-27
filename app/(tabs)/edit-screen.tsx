import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskContext } from '../TaskContext';

export default function EditScreen({ route }) {
  const { task } = route.params; // Nehmen Sie an, dass die Task-Daten von HomeScreen übergeben wurden
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDate, setTaskDate] = useState(new Date(task.date));
  const [taskDescription, setTaskDescription] = useState(task.description || '');
  const [isPrioritized, setIsPrioritized] = useState(task.prioritized);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const { updateTask } = useTaskContext();

  const handleSave = () => {
    updateTask(task.id, taskTitle, taskDate.toISOString().split('T')[0], isPrioritized);
    router.push('/home-screen'); // Zurück zur Startseite nach dem Speichern
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || taskDate;
    setShowDatePicker(Platform.OS === 'ios'); // Auf iOS bleibt der Picker geöffnet
    setTaskDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Titel */}
        <Text style={styles.title}>Edit</Text>

        {/* Task-Titel-Eingabe */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        {/* Kalender-Eingabe */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Calendar</Text>
          <TouchableOpacity
            style={styles.calendarInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ flex: 1 }}>
              {taskDate.toDateString()} {/* Zeigt das ausgewählte Datum an */}
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

        {/* Task-Beschreibung-Eingabe */}
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

        {/* Priorisieren umschalten */}
        <View style={styles.priorityContainer}>
          <Text style={styles.label}>Prioritize?</Text>
          <TouchableOpacity onPress={() => setIsPrioritized(!isPrioritized)}>
            <FontAwesome name={isPrioritized ? "star" : "star-o"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Aktions-Buttons */}
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
    marginTop: 40, // Passt die Position an den Titel der Startseite an
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
    marginBottom: 5,
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
    height: 100,
    textAlignVertical: 'top',
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
