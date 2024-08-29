// PremiumScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function PremiumScreen() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubscribe = () => {
    // Simulate the subscription process
    setIsSubscribed(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/home-screen'); // Redirect to home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.freeTrialButton}>
          <Text style={styles.freeTrialText}>3 Monate kostenlos</Text>
        </TouchableOpacity>

        <Text style={styles.featuresText}>Jederzeit kündbar</Text>
        <Text style={styles.featuresText}>1 Premium Konto</Text>
        <Text style={styles.featuresText}>Rabatt für berechtigte Studierende</Text>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeText}>3 Monate kostenlos testen</Text>
        </TouchableOpacity>

        <Text style={styles.subscriptionInfo}>
          3 Monate kostenlos, danach 13.95 CHF pro Monat.
        </Text>
      </View>

      {/* Modal for subscription confirmation */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Erfolgreich abonniert!</Text>
            <Text style={styles.modalMessage}>Du hast jetzt Zugang zu den Premium-Funktionen.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>OK</Text>
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
    marginTop: 40, // Adjusted to match the title positioning of other screens
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 60, // Moved the card container further down
  },
  freeTrialButton: {
    backgroundColor: '#CDCABE',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  freeTrialText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  featuresText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
  },
  subscribeButton: {
    backgroundColor: '#1C1A1A',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  subscribeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subscriptionInfo: {
    fontSize: 12,
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
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
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#1C1A1A',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
