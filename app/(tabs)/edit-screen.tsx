import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker
import { useTaskContext } from '../TaskContext';

export default function EditScreen() {
  const router = useRouter();
  const { updateTask } = useTaskContext();
  const { task } = useLocalSearchParams();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null); // State to store selected image URI

  useEffect(() => {
    if (task) {
      try {
        const parsedTask = JSON.parse(task); 
        setTaskTitle(parsedTask.title || '');
        setTaskDate(parsedTask.date ? new Date(parsedTask.date) : new Date());
        setTaskDescription(parsedTask.description || '');
        setIsPrioritized(parsedTask.prioritized || false);
        setImageUri(parsedTask.imageUri || null); // Ensure imageUri is set from the task details
      } catch (error) {
        console.error('Error parsing task:', error);
      }
    }
  }, [task]);
  
  // Handle Save function
  const handleSave = () => {
    // Validation check for task title and date
    if (!taskTitle) {
      Alert.alert('Validation Error', 'Please enter a task title.');
      return;
    }
    if (!taskDate) {
      Alert.alert('Validation Error', 'Please select a date for the task.');
      return;
    }

    const parsedTask = JSON.parse(task); 
    updateTask(parsedTask.id, taskTitle, taskDate.toISOString().split('T')[0], isPrioritized, taskDescription, imageUri);
    router.push('/home-screen');
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || taskDate;
    setShowDatePicker(Platform.OS === 'ios');
    if (currentDate) {
      setTaskDate(currentDate);
    }
  };

  // Function to handle image picking
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Set the selected image URI
    }
  };

  // Function to handle taking a photo
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Set the captured image URI
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Calendar</Text>
          <TouchableOpacity
            style={styles.calendarInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ flex: 1 }}>
              {taskDate ? taskDate.toDateString() : 'Select a date'}
            </Text>
            <FontAwesome name="calendar" size={24} color="black" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={taskDate || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

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

        <View style={styles.priorityContainer}>
          <Text style={styles.label}>Prioritize?</Text>
          <TouchableOpacity onPress={() => setIsPrioritized(!isPrioritized)}>
            <FontAwesome name={isPrioritized ? "star" : "star-o"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Image Picker Section */}
        <View style={styles.imagePickerContainer}>
          {/* Display the image preview if imageUri is available */}
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.noImageText}>No image selected</Text>
          )}
          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Text style={styles.imageButtonText}>Take a Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    marginBottom: 8,
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
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingBottom: 12,
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
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#CDCABE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#000',
    fontSize: 16,
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
