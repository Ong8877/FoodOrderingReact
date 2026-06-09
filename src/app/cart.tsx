// src/app/cart.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
  StatusBar
} from 'react-native';
// Import only the existing getGlobalCart method from data store layer
import { getGlobalCart, CartItem } from '../data/foodData';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load the global basket repository state context dynamically
  const loadCart = () => {
    const currentCart = getGlobalCart();
    setCartItems([...currentCart]);
  };

  useEffect(() => {
    loadCart();
    // Keep internal local rendering synchronized with state background threads
    const interval = setInterval(loadCart, 800);
    return () => clearInterval(interval);
  }, []);

  // Removes a specific unique item configuration block out of the global cart array safely
  const handleDeleteItem = (indexToDelete: number) => {
    const currentCart = getGlobalCart();

    if (indexToDelete >= 0 && indexToDelete < currentCart.length) {
      // Directly slice the target item out of the global referenced mutable data array
      currentCart.splice(indexToDelete, 1);
      // Synchronize and trigger UI reactive render tree refresh instantly
      setCartItems([...currentCart]);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Basket', 'Please add some local cravings before checking out.');
      return;
    }

    Alert.alert('Success', 'Payment Successful! Your food is being prepared.', [
      {
        text: 'OK',
        onPress: () => {
          // Reset global mutable array length to 0 to safely flush cart state upon checkout
          const currentCart = getGlobalCart();
          currentCart.length = 0;
          setCartItems([]);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Screen Title Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Basket</Text>
        <Text style={styles.headerSubtitle}>Review and checkout your cravings</Text>
      </View>

      {/* Conditional Rendering Base Ecosystem */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Your basket is empty</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          {cartItems.map((item, index) => (
            <View key={`${item.food.id}-${index}`} style={styles.cartCard}>
              <Image source={{ uri: item.food.image }} style={styles.foodImage} />

              <View style={styles.itemMetaBox}>
                <Text style={styles.foodName}>{item.food.name}</Text>

                {/* Special Instructions Note Tag node */}
                <View style={styles.remarksBadge}>
                  <Text style={styles.remarksText} numberOfLines={1}>
                    📝 Note: {item.remarks.trim() || 'No special instructions'}
                  </Text>
                </View>

                <Text style={styles.quantityMultiplier}>
                  RM {item.food.price.toFixed(2)} x {item.quantity}
                </Text>
              </View>

              {/* Layout wrapper mapping for rightmost action row group positioning */}
              <View style={styles.actionRightBlock}>
                <Text style={styles.itemTotalCost}>
                  RM {(item.food.price * item.quantity).toFixed(2)}
                </Text>

                {/* Trash Icon Deletion CTA Action Node Button */}
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(index)}
                  hitSlop={12}
                >
                  <Text style={styles.deleteIconText}>🗑️</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Sticky Structural Operational Footer Section */}
      {cartItems.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.totalPriceRow}>
            <Text style={styles.totalLabel}>Total Price:</Text>
            <Text style={styles.totalValue}>RM {calculateTotal().toFixed(2)}</Text>
          </View>

          <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Make Payment</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 2,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#95A5A6',
    fontWeight: '500',
  },
  cartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F0F3F4',
  },
  itemMetaBox: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  remarksBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
    maxWidth: '95%',
  },
  remarksText: {
    fontSize: 11,
    color: '#E65100',
    fontWeight: '600',
  },
  quantityMultiplier: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  actionRightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 56,
  },
  itemTotalCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  deleteButton: {
    backgroundColor: '#FDEDEC',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  deleteIconText: {
    fontSize: 14,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F3F4',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  totalPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 15,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D35400',
  },
  checkoutButton: {
    backgroundColor: '#D35400',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});