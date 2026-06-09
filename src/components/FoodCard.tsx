// src/components/FoodCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { FoodItem } from '../data/foodData';

interface FoodCardProps {
  item: FoodItem;
  onPress: () => void;
}

export default function FoodCard({ item, onPress }: FoodCardProps) {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      {/* Left Side: Dynamic Network Image Rendering */}
      {/* 💡 FIX: Using uri object format to render Unsplash network image links flawlessly */}
      <Image
        source={{ uri: item.image }}
        style={styles.foodImage}
        resizeMode="cover"
      />

      {/* Right Side: Food Details */}
      <View style={styles.infoContainer}>
        {/* Top row: Name and Category Badge */}
        <View style={styles.titleRow}>
          <Text style={styles.foodName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
        </View>

        {/* Middle: Short description */}
        <Text style={styles.foodDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Bottom row: Price and Preparation Time */}
        <View style={styles.footerRow}>
          <Text style={styles.foodPrice}>RM {item.price.toFixed(2)}</Text>
          {/* 💡 FIX: Safely fallback to 10 mins if prepTime string is somehow unavailable */}
          <Text style={styles.prepTime}>⏱️ {item.prepTime || '10 mins'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  foodImage: {
    width: 95,
    height: 95,
    borderRadius: 12,
    backgroundColor: '#E0E0E0', // Visual placeholder block background before network loading finished
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E65100',
  },
  foodDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    lineHeight: 16,
    marginVertical: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D35400',
  },
  prepTime: {
    fontSize: 11,
    color: '#95A5A6',
  },
});