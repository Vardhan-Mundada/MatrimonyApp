import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { firebase } from '../utils/firebaseConfig'; // Import firebase instance

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);

  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    if (!currentUser) {
      Alert.alert('Error', 'No user is authenticated!');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const userId = currentUser.uid;
        const doc = await firebase.firestore().collection('profiles').doc(userId).get();

        if (doc.exists) {
          setProfileData(doc.data());
        } else {
          Alert.alert('Error', 'Profile data not found.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Failed to fetch profile data.');
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSave = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'No user is authenticated!');
      return;
    }

    try {
      const userId = currentUser.uid;
      await firebase.firestore().collection('profiles').doc(userId).set(profileData);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while saving the profile.');
    }
  };

  if (!profileData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Update Profile</Text>
      {Object.keys(profileData).map((field) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
          <TextInput
            style={styles.input}
            value={profileData[field]}
            onChangeText={(text) => handleChange(field, text)}
            placeholder={`Enter ${field}`}
          />
        </View>
      ))}
      <Button title="Save Profile" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
