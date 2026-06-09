// src/app/cart.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  Platform,      // Added to implement cross-platform padding checks
  StatusBar     // Added to handle device height safely instead of SafeAreaView
} from 'react-native';
// Use expo-router navigation hooks to listen safely to screen focusing events without compile errors
import { useNavigation } from 'expo-router';

// 💡 FIX 1: Removed the nonexistent 'clearGlobalCart' and imported 'updateGlobalCart' instead
import { getGlobalCart, updateGlobalCart, CartItem } from '../data/foodData';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigation = useNavigation();

  // Helper function to fetch the latest variables from global active basket storage
  const syncCartStateData = () => {
    setCartItems(getGlobalCart());
  };

  // Automated Synchronization: Listens to the screen focus lifecycle event
  // It triggers automatically whenever the user clicks on the "Carts" tab item
  useEffect(() => {
    // Synchronize data immediately on initial mounting sequence
    syncCartStateData();

    // Attach a listener to re-sync state data every single time the screen comes into active focus view
    const unsubscribe = navigation.addListener('focus', () => {
      syncCartStateData();
    });

    // Clean up event listener tracking on unmount phase
    return unsubscribe;
  }, [navigation]);

  // Math metrics to determine total final cost dynamically
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.food.price * item.quantity), 0);
  };

  // Requirement Check: Alert API execution flow simulating payment capture checkout safely
  const handleMakePayment = () => {
    if (cartItems.length === 0) return;

    const finalAmount = calculateTotal().toFixed(2);

    Alert.alert(
      "Confirm Payment",
      `Proceed to pay RM ${finalAmount} for your order via Online Banking?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Pay Now",
          onPress: () => {
            // Transaction completion logic sequence
            Alert.alert(
              "Payment Success 🎉",
              "Your transaction was processed! Your food is being prepared by the campus kitchen now.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // 💡 FIX 2: Replaced clearGlobalCart() with updateGlobalCart([]) to safely empty the cart data array
                    updateGlobalCart([]); // Wipes global storage variables state securely
                    setCartItems([]);     // Flushes current presentation screen presentation data cache layouts
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    // Replaced SafeAreaView wrapper completely with standard View container layer
    <View style={styles.container}>
      {/* Page Title Block Header section */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.headerTitle}>My Basket</Text>
            <Text style={styles.headerSubtitle}>Review and checkout your cravings</Text>
          </View>
        </View>
      </View>

      {/* Conditional rendering for empty vs populated lists */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your Basket is Empty</Text>
          <Text style={styles.emptySubtext}>Head over to the Food section to fill up your tray and explore our menu!</Text>
        </View>
      ) : (
        <>
          {/* Scrollable list displaying items, quantity scales, and specific text remarks instructions */}
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.food.id}-${index}`}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <Image source={{ uri: item.food.image }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <Text style={styles.foodName}>{item.food.name}</Text>
                  <Text style={styles.foodRemarks} numberOfLines={1}>
                    📝 Note: {item.remarks}
                  </Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.foodPrice}>
                      RM {item.food.price.toFixed(2)} x {item.quantity}
                    </Text>
                    <Text style={styles.itemSubtotal}>
                      RM {(item.food.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />

          {/* Persistent checkout summary anchor calculations card at base */}
          <View style={styles.checkoutFooter}>
            <View style={styles.priceSummaryRow}>
              <Text style={styles.totalLabel}>Total Price:</Text>
              <Text style={styles.totalAmount}>RM {calculateTotal().toFixed(2)}</Text>
            </View>

            <Pressable style={styles.paymentButton} onPress={handleMakePayment}>
              <Text style={styles.paymentButtonText}>Make Payment</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    // Dynamic top layout calculation padding injection to skip phone status notch systems gracefully
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#95A5A6',
    textAlign: 'center',
    lineHeight: 18,
  },
  listContainer: {
    padding: 16,
  },
  cartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  foodRemarks: {
    fontSize: 12,
    color: '#E65100',
    fontStyle: 'italic',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  itemSubtotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  checkoutFooter: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  priceSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D35400',
  },
  paymentButton: {
    backgroundColor: '#D35400',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});