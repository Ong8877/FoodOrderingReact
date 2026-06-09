// src/app/_layout.tsx

import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { getGlobalCart } from '../data/foodData';

export default function AppLayout() {
  const [cartCount, setCartCount] = useState<number>(0);

  // Poll global variables state periodically to ensure the basket badge increments automatically
  useEffect(() => {
    const updateCount = () => {
      const currentCart = getGlobalCart();
      const total = currentCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCount();
    const interval = setInterval(updateCount, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs
      screenOptions={{
        // 💡 HIGHLIGHT CONFIG: This sets the text and active icon indicator tint globally
        tabBarActiveTintColor: '#D35400',   // Signature NomNom Orange when the screen is focused
        tabBarInactiveTintColor: '#7F8C8D', // Muted Slate Gray when the screen is unfocused

        // Base styling container layout for the bottom navigation tray
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        // Typography font settings styling for the labels below emojis
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        // Fully hides the default native blank top header bar
        headerShown: false,
      }}
    >
      {/* 0. LOGIN PAGE CONFIGURATION - TOTAL HIDDEN CONTEXT */}
      {/* Completely isolates the login interface away from the bottom navigation frame layout */}
      <Tabs.Screen
        name="login"
        options={{
          href: null,
          tabBarStyle: { display: 'none' }, // Strips the tray out entirely on login
        }}
      />

      {/* 1. Food (Main Delivery Feed Screen) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Food',
          // 💡 HIGHLIGHT LOGIC: The 'focused' boolean is passed down natively by Expo Router
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                styles.tabIcon,
                // If focused, it remains fully solid orange/opaque. If unfocused, it turns slightly translucent gray
                { color: focused ? '#D35400' : '#7F8C8D', opacity: focused ? 1 : 0.6 }
              ]}
            >
              🍔
            </Text>
          ),
        }}
      />

      {/* 2. Carts Screen Tray */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carts',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#E74C3C',
            color: '#FFFFFF',
            fontSize: 10,
            lineHeight: 14,
          },
          // 💡 HIGHLIGHT LOGIC: Synchronized active focus highlight styling tracker for Cart Tray
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                styles.tabIcon,
                { color: focused ? '#D35400' : '#7F8C8D', opacity: focused ? 1 : 0.6 }
              ]}
            >
              🛒
            </Text>
          ),
        }}
      />

      {/* 3. Account / Profile Screen */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Account',
          // 💡 HIGHLIGHT LOGIC: Synchronized active focus highlight styling tracker for Profile Screen
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                styles.tabIcon,
                { color: focused ? '#D35400' : '#7F8C8D', opacity: focused ? 1 : 0.6 }
              ]}
            >
              👤
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20, // Clean viewport friendly scale factor sizing for native emojis
  }
});