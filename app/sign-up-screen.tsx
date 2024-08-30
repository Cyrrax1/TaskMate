import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();

  const db = SQLite.openDatabaseSync('taskmate.db'); // Open the database synchronously

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (email !== confirmEmail) {
      setEmailError('Emails do not match');
      return;
    }

    setEmailError('');
    setGeneralError('');

    try {
      db.runSync('INSERT INTO users (email, password) VALUES (?, ?)', email, password);
      console.log('User signed up successfully');
      router.replace('/'); // Navigate back to login after successful sign-up
    } catch (error) {
      console.error('Error during sign up:', error);
      setGeneralError('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.titleText}>TaskMate</Text>
      <Text style={styles.loginText}>Sign Up</Text>

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Confirm Email"
        placeholderTextColor="#000"
        value={confirmEmail}
        onChangeText={(text) => setConfirmEmail(text)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} testID="sign-up-button">
        <Text style={styles.buttonText}>Sign Up</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/')}>
        <Text style={styles.signupText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E4DE',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 18,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 15,
    fontSize: 14,
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#1C1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#CDCABE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  signupText: {
    color: '#000',
    fontSize: 16,
  },
});
