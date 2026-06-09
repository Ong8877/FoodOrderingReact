// src/components/CategoryBadge.tsx

import React from 'react';
import { Text, StyleSheet, Pressable, FlatList, View } from 'react-native';

const CATEGORIES = ['All', 'Local Rice', 'Noodles', 'Roti', 'Sides', 'Drinks'];

interface CategoryBadgeProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryBadge({ selectedCategory, onSelectCategory }: CategoryBadgeProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isActive = item === selectedCategory;

          return (
            <Pressable
              style={[
                styles.badgeContainer,
                isActive ? styles.activeBadge : styles.inactiveBadge
              ]}
              onPress={() => onSelectCategory(item)}
            >
              <Text
                style={[
                  styles.badgeText,
                  isActive ? styles.activeText : styles.inactiveText
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  listPadding: {
    paddingHorizontal: 16,
  },
  badgeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeBadge: {
    backgroundColor: '#D35400',
    borderColor: '#D35400',
  },
  inactiveBadge: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#7F8C8D',
  },
});