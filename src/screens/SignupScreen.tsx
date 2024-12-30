import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firebase } from '../utils/firebaseConfig'; // Import firebase instance

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid } = userCredential.user; // Get the user's UID

        // Create a new document for the user in Firestore
        firebase
          .firestore()
          .collection('profiles')
          .doc(uid)
          .set({
            fullName: '',
            fatherName: '',
            motherName: '',
            status: '',
            email,
            mobileNumber: '',
            altMobileNumber: '',
            gender: '',
            bloodGroup: '',
            height: '',
            complexion: '',
            gotra: '',
            gon: '',
            aboutMe: '',
            aboutDesire: '',
            occupation: '',
            occupationDetails: '',
            annualIncome: '',
            motherTongue: '',
            highestQualification: '',
            qualificationDetails: '',
            address: '',
            city: '',
            state: '',
            district: '',
            pincode: '',
          })
          .then(() => {
            Alert.alert('Signup Successful!');
            navigation.navigate('Login');
          })
          .catch((error) => {
            console.error('Error creating profile:', error);
            Alert.alert('Error', 'Failed to create profile.');
          });
      })
      .catch((error) => {
        Alert.alert('Signup Failed', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignupScreen;
