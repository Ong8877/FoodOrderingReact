// src/app/index.tsx

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

// Synchronized Data Imports
import CategoryBadge from '../components/CategoryBadge';
import FoodCard from '../components/FoodCard';
import OrderModal from '../components/OrderModal';
import { FOOD_DATA, FoodItem, getGlobalCart, updateGlobalCart } from '../data/foodData';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredData, setFilteredData] = useState<FoodItem[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);

  // Simulation effect setup tracker
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredData(FOOD_DATA);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 💡 CORE FIX: Refactored logic to perform precise filtering based strictly on food name
  const filterFoodMenu = (search: string, category: string) => {
    let rawData = FOOD_DATA;

    // Filters down item sets by chosen category tags accurately
    if (category !== 'All') {
      rawData = rawData.filter(item => item.category === category);
    }

    const cleanedSearch = search.trim().toLowerCase();

    if (cleanedSearch !== '') {
      // 💡 REFACTORED: Removed item.description matching to prevent irrelevant search results
      rawData = rawData.filter(item =>
        item.name.toLowerCase().includes(cleanedSearch)
      );
    }

    setFilteredData(rawData);
  };

  const handleSearch = (text: string) => {
    const validatedText = text.replace(/[^a-zA-Z0-9\s\u4e00-\u9fa5]/g, '');
    setSearchQuery(validatedText);
    filterFoodMenu(validatedText, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterFoodMenu(searchQuery, category);
  };

  const handleFoodItemPress = (item: FoodItem) => {
    setSelectedFoodItem(item);
    setModalVisible(true);
  };

  const handleAddToCart = (quantity: number, remarks: string) => {
    if (!selectedFoodItem) return;

    const currentCart = [...getGlobalCart()];
    const formattedRemarks = remarks ? remarks.trim() : 'No Remarks';

    const existingItemIndex = currentCart.findIndex(
      item => item.food.id === selectedFoodItem.id && item.remarks === formattedRemarks
    );

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({
        food: selectedFoodItem,
        quantity: quantity,
        remarks: formattedRemarks
      });
    }

    updateGlobalCart(currentCart);
    setModalVisible(false);

    Alert.alert(
      "Added to Basket",
      `${quantity}x ${selectedFoodItem.name} has been added to your cart successfully! 🛒`
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent={false} />
        <ActivityIndicator size="large" color="#D35400" />
        <Text style={styles.loadingText}>Loading Malaysian Delicacies... 🇲🇾</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent={false} />

      {/* 1. Brand Header Section */}
      <View style={styles.brandHeaderContainer}>
        <Image
          source={require('../../assets/images/logoapp.png')}
          style={styles.headerLogoImage}
          resizeMode="contain"
        />
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandMainTitle}>NomNom</Text>
          <Text style={styles.brandSubtitle}>Fresh local treats straight to your campus space!</Text>
        </View>
      </View>

      {/* 2. Live Validated Search Input Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for local cravings..."
          placeholderTextColor="#95A5A6"
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
          maxLength={30}
        />
      </View>

      {/* 3. Horizontal Pill Categories Filter Row */}
      <CategoryBadge
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* 4. Core FlatList Menu Stream Feed */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => handleFoodItemPress(item)}
          />
        )}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyTitle}>No Delicacies Found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search filters!</Text>
          </View>
        }
      />

      {/* 5. Custom Popup Controller Order Modal */}
      <OrderModal
        visible={modalVisible}
        item={selectedFoodItem}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  brandHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerLogoImage: {
    width: 54,
    height: 54,
    borderRadius: 12,
  },
  brandTextContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  brandMainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: 0.2,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
    color: '#2C3E50',
  },
  listPadding: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#95A5A6',
    textAlign: 'center',
    lineHeight: 18,
  },
});