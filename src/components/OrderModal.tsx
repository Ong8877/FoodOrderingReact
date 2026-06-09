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
  Keyboard
} from 'react-native';
import { FoodItem } from '../data/foodData';

interface OrderModalProps {
  visible: boolean;
  item: FoodItem | null;
  onClose: () => void;
  onAddToCart: (quantity: number, remarks: string) => void;
}

export default function OrderModal({ visible, item, onClose, onAddToCart }: OrderModalProps) {
  // quantity state is now tracked as a string to allow fluid user backspace typing typing flows smoothly
  const [quantityStr, setQuantityStr] = useState<string>('1');
  const [remarks, setRemarks] = useState<string>('');

  const MAX_LIMIT = 99; // 💡 Rule: Hard upper ceiling to block absurd values

  // Reset the control values every time a new card pops into viewpoint context
  useEffect(() => {
    if (visible) {
      setQuantityStr('1');
      setRemarks('');
    }
  }, [visible]);

  // 💡 Validation Logic 1: Handle text inputs safely as the user typing alive
  const handleTextChange = (text: string) => {
    // Strips out everything except clean numerical digit characters completely
    const cleanNumbers = text.replace(/[^0-9]/g, '');

    if (cleanNumbers === '') {
      setQuantityStr(''); // Allow temporary empty state so backspacing to zero doesn't lock up
      return;
    }

    const numValue = parseInt(cleanNumbers, 10);
    if (numValue > MAX_LIMIT) {
      setQuantityStr(MAX_LIMIT.toString());
    } else {
      setQuantityStr(numValue.toString());
    }
  };

  // 💡 Validation Logic 2: Secure boundaries whenever inputs lose visual user focus or get processed
  const finalizeQuantityAndValidate = () => {
    const currentNum = parseInt(quantityStr, 10);
    // If the box is empty, equal to 0, or corrupted, safely fall back to 1
    if (isNaN(currentNum) || currentNum < 1) {
      setQuantityStr('1');
      return 1;
    }
    return currentNum;
  };

  const incrementQuantity = () => {
    const currentNum = parseInt(quantityStr, 10) || 0;
    if (currentNum < MAX_LIMIT) {
      setQuantityStr((currentNum + 1).toString());
    }
  };

  const decrementQuantity = () => {
    const currentNum = parseInt(quantityStr, 10) || 1;
    if (currentNum > 1) {
      setQuantityStr((currentNum - 1).toString());
    }
  };

  const handleSubmit = () => {
    const finalValidQuantity = finalizeQuantityAndValidate();
    onAddToCart(finalValidQuantity, remarks);
  };

  if (!item) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          {/* KeyboardAvoidingView keeps the popover active tray safely above phone virtual keyboards */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardContainer}
          >
            <View style={styles.modalContent}>

              {/* Modal Header Row */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Customize Order</Text>
                <Pressable onPress={onClose} hitSlop={12}>
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              {/* Item Card Banner display */}
              <View style={styles.foodBriefCard}>
                <Image source={{ uri: item.image }} style={styles.briefImage} />
                <View style={styles.briefDetails}>
                  <Text style={styles.briefName}>{item.name}</Text>
                  <Text style={styles.briefPrice}>RM {item.price.toFixed(2)}</Text>
                </View>
              </View>

              {/* Action Stepper Area with typing layout added */}
              <Text style={styles.sectionLabel}>Select Quantity</Text>
              <View style={styles.stepperContainer}>
                <Pressable style={styles.stepButton} onPress={decrementQuantity}>
                  <Text style={styles.stepButtonText}>−</Text>
                </Pressable>

                {/* 💡 Modded: Standard Text converted into an active text input block with filter traps */}
                <TextInput
                  style={styles.quantityInput}
                  keyboardType="number-pad"
                  value={quantityStr}
                  onChangeText={handleTextChange}
                  onBlur={finalizeQuantityAndValidate} // Fire sanitization checks immediately when user exits box
                  maxLength={2} // Blocks values beyond 2 digits (e.g., 99 Max)
                  selectTextOnFocus={true} // Automatically highlights value for swift overwriting
                />

                <Pressable style={styles.stepButton} onPress={incrementQuantity}>
                  <Text style={styles.stepButtonText}>+</Text>
                </Pressable>
              </View>

              {/* Remarks/Special Instructions Input area */}
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

              {/* Submission CTA footer */}
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Add to Basket</Text>
              </Pressable>

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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed backdrop overlay aura
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeIcon: {
    fontSize: 18,
    color: '#95A5A6',
    fontWeight: '600',
  },
  foodBriefCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  briefImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  briefDetails: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  briefName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  briefPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D35400',
    marginTop: 4,
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
    marginBottom: 24,
  },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonText: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: '500',
  },
  // 💡 Sizing and typography stylings tailored for the new input node
  quantityInput: {
    width: 60,
    height: 44,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    padding: 0, // Strips default native baseline offsets out
  },
  remarksInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
    height: 80,
    textAlignVertical: 'top', // Aligns placeholder prompt safely on Android
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#D35400',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});