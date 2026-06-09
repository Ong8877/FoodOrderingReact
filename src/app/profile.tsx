// src/app/profile.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
// Use useRouter hook from expo-router to handle clean navigation routing redirects
import { useRouter } from 'expo-router';
// Import updateGlobalCart to securely wipe memory tray cache during sign-out sequence
import { updateGlobalCart } from '../data/foodData';

export default function ProfileScreen() {
  const router = useRouter();

  // 💡 LOGOUT IMPLEMENTATION FUNCTION
  const handleLogout = () => {
    Alert.alert(
      "Logout Account",
      "Are you sure you want to sign out from NomNom? 👤",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // 1. Flush and clear all contents inside the shopping cart memory matrix
            updateGlobalCart([]);

            // 2. Clear route stack memory and push user fully back to the authentication screen
            router.replace('/login');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent={false} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* User Avatar & Name Banner Card */}
        <View style={styles.profileHeaderCard}>
          <Image
            source={{ uri: 'https://api.dicebear.com/7.x/adventurer/png?seed=CuteUser' }}
            style={styles.avatarImage}
          />
          <Text style={styles.profileName}>Ng Wei Wen</Text>
          <Text style={styles.profileEmail}>ngweiwen@email.com</Text>
        </View>

        {/* Info Rows Container */}
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Username</Text>
            <Text style={styles.infoValue}>admin</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📱 Phone Number</Text>
            <Text style={styles.infoValue}>012-3456789</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎂 Birthday</Text>
            <Text style={styles.infoValue}>18 December 2003</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Location</Text>
            <Text style={styles.infoValue}>Ipoh, Perak</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>⭐ Membership Level</Text>
            <Text style={styles.infoValueStyle}>Gold Member</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🔥 Reward Points</Text>
            <Text style={styles.infoValueStyle}>1,250 Points</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📧 Email Verified</Text>
            <Text style={styles.infoValue}>Yes</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>📅 Joined Date</Text>
            <Text style={styles.infoValue}>01 January 2025</Text>
          </View>
        </View>

        {/* 💡 THE RED LOGOUT ACTION CALL-TO-ACTION BUTTON */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeaderCard: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  profileEmail: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 2,
  },
  infoBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  infoLabel: {
    fontSize: 14,
    color: '#34495E',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  infoValueStyle: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});