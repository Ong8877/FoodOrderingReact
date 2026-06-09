// src/components/OrderModal.tsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert // 💡 IMPORT NATIVE ALERT NODE
} from 'react-native';
import { FoodItem } from '../data/foodData';

interface OrderModalProps {
  visible: boolean;
  item: FoodItem | null;
  onClose: () => void;
  onAddToCart: (quantity: number, remarks: string) => void;
}

export default function OrderModal({ visible, item, onClose, onAddToCart }: OrderModalProps) {
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [quantityStr, setQuantityStr] = useState<string>('1');
  const [remarks, setRemarks] = useState<string>('');

  const MAX_LIMIT = 99;

  useEffect(() => {
    if (visible) {
      setIsCustomizing(false);
      setQuantityStr('1');
      setRemarks('');
    }
  }, [visible]);

  const handleTextChange = (text: string) => {
    // Allows text to be completely empty while typing so user can delete the '0' easily
    const cleanNumbers = text.replace(/[^0-9]/g, '');
    setQuantityStr(cleanNumbers);
  };

  const incrementQuantity = () => {
    const currentNum = parseInt(quantityStr, 10) || 0;
    if (currentNum < MAX_LIMIT) {
      setQuantityStr((currentNum + 1).toString());
    }
  };

  const decrementQuantity = () => {
    const currentNum = parseInt(quantityStr, 10) || 0;
    if (currentNum > 1) {
      setQuantityStr((currentNum - 1).toString());
    }
  };

  //  NEW LOGIC RULES: Implements the customized Alert verification node exactly as you requested
  const handleSubmit = () => {
    const finalNum = parseInt(quantityStr, 10);

    //  EXPLICIT UX ACCURACY VALIDATION TRIGGER
    if (isNaN(finalNum) || finalNum === 0) {
      Alert.alert(
        'Invalid Quantity',
        'You must purchase at least 1 item.',
        [
          {
            text: 'Cancel Order',
            onPress: () => onClose(), // Closes the modal framework entirely
            style: 'destructive'
          },
          {
            text: 'Back',
            onPress: () => {
              setQuantityStr('1'); // Automatically resets back up to 1 so they can adjust using + or - buttons easily
            },
            style: 'cancel'
          }
        ]
      );
      return; // Force halt logic tree execution thread instantly
    }

    //  PROCEED ON PRECISE VALUES
    onAddToCart(finalNum, remarks);
  };

  if (!item) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardContainer}
          >
            <View style={styles.modalContent}>

              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {isCustomizing ? "Customize Order" : "Food Details"}
                </Text>
                <Pressable onPress={onClose} hitSlop={12}>
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              {/* STEP 1: DETAILED VIEW MODE */}
              {!isCustomizing ? (
                <View style={styles.detailsContainer}>
                  <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />

                  <View style={styles.metaRow}>
                    <Text style={styles.foodNameText}>{item.name}</Text>
                    <Text style={styles.foodPriceText}>RM {item.price.toFixed(2)}</Text>
                  </View>

                  <View style={styles.tagWrapper}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{item.category}</Text>
                    </View>
                    <Text style={styles.prepTimerText}>⏱️ {item.prepTime || '10 mins'}</Text>
                  </View>

                  <Text style={styles.descriptionBodyText}>{item.description}</Text>

                  <Pressable style={styles.primaryActionButton} onPress={() => setIsCustomizing(true)}>
                    <Text style={styles.primaryActionButtonText}>Want to buy? Add to Basket</Text>
                  </Pressable>
                </View>
              ) : (
                /* STEP 2: CUSTOMIZATION MODE */
                <View>
                  {/* Food Brief Header */}
                  <View style={styles.foodBriefCard}>
                    <Image source={{ uri: item.image }} style={styles.briefImage} />
                    <View style={styles.briefDetails}>
                      <Text style={styles.briefName}>{item.name}</Text>
                      <Text style={styles.briefPrice}>RM {item.price.toFixed(2)}</Text>
                    </View>
                  </View>

                  {/* Stepper Input Counter */}
                  <Text style={styles.sectionLabel}>Select Quantity</Text>
                  <View style={styles.stepperContainer}>
                    <Pressable style={styles.stepButton} onPress={decrementQuantity}>
                      <Text style={styles.stepButtonText}>−</Text>
                    </Pressable>

                    <TextInput
                      style={styles.quantityInput}
                      keyboardType="number-pad"
                      value={quantityStr}
                      onChangeText={handleTextChange}
                      maxLength={2}
                      selectTextOnFocus={true}
                      placeholder="0"
                      placeholderTextColor="#BDC3C7"
                    />

                    <Pressable style={styles.stepButton} onPress={incrementQuantity}>
                      <Text style={styles.stepButtonText}>+</Text>
                    </Pressable>
                  </View>

                  {/* Remarks Input Area */}
                  <Text style={styles.sectionLabel}>Special Instructions</Text>
                  <TextInput
                    style={styles.remarksInput}
                    placeholder="E.g., No onions, extra spicy, sauce on side..."
                    placeholderTextColor="#95A5A6"
                    value={remarks}
                    onChangeText={setRemarks}
                    multiline={true}
                    numberOfLines={3}
                    maxLength={140}
                  />

                  {/* Action Group Row Buttons */}
                  <View style={styles.buttonActionGroupRow}>
                    <Pressable style={styles.backButton} onPress={() => setIsCustomizing(false)}>
                      <Text style={styles.backButtonText}>Back</Text>
                    </Pressable>
                    <Pressable style={styles.confirmButton} onPress={handleSubmit}>
                      <Text style={styles.confirmButtonText}>
                        Confirm (RM {((parseInt(quantityStr, 10) || 0) * item.price).toFixed(2)})
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}

            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardContainer: {
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeIcon: {
    fontSize: 18,
    color: '#95A5A6',
    fontWeight: '600',
  },
  detailsContainer: {
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: 170,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  foodNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 12,
  },
  foodPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D35400',
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E65100',
  },
  prepTimerText: {
    fontSize: 13,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  descriptionBodyText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 20,
  },
  primaryActionButton: {
    backgroundColor: '#D35400',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryActionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodBriefCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F3F4',
  },
  briefImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  briefDetails: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  briefName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  briefPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D35400',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 10,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
  },
  quantityInput: {
    width: 60,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    padding: 0,
  },
  remarksInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
    height: 75,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  buttonActionGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: '25%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  backButtonText: {
    color: '#7F8C8D',
    fontSize: 15,
    fontWeight: '600',
  },
  confirmButton: {
    width: '70%',
    backgroundColor: '#D35400',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});