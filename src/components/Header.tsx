// components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.mainTitle}>{title}</Text>
      <Text style={styles.subTitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
});