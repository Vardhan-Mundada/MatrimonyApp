import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Ionicons for icons
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      {/* Profile Icon Button */}
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person-circle" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default HomeScreen;
