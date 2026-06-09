// src/app/login.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  //  AUTOMATED FLUSH: Automatically clears credentials whenever this screen gains active view focus
  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPassword('');
    }, [])
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    if (username.trim() === 'admin' && password === '1234') {
      router.replace('/');
    } else {
      Alert.alert('Error', 'Invalid Username or Password');
    }
  };


  if (isLoading) {
    return (
      <View style={styles.splashLoadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />


        <View style={styles.splashBrandBox}>
          <Image
            source={require('../../assets/images/logoapp.png')}
            style={styles.splashLogoImage}
            resizeMode="contain"
          />
          <Text style={styles.splashLogoText}>NomNom</Text>
          <Text style={styles.splashSubtext}>Delicious campus delivery straight to you</Text>
        </View>


        <ActivityIndicator size="large" color="#D35400" style={styles.splashSpinner} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <View style={styles.brandWrapper}>
        <Image
          source={require('../../assets/images/logoapp.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>NomNom</Text>
        <Text style={styles.subtext}>Delicious campus delivery straight to you</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter username"
          placeholderTextColor="#95A5A6"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter password"
          placeholderTextColor="#95A5A6"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  splashLoadingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 60,
  },
  splashBrandBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  splashLogoImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  splashLogoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
  },
  splashSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 6,
  },
  splashSpinner: {
    marginTop: 20,
  },
  brandWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 12,
  },
  subtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2C3E50',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#D35400',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});