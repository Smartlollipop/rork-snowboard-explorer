import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable, 
  TextInput, 
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Plus, X } from 'lucide-react-native';

import { useChecklistStore } from '@/store/checklist-store';
import Colors from '@/constants/colors';

export default function ChecklistScreen() {
  const { items, toggleItem, addItem, removeItem, getCompletionPercentage } = useChecklistStore();
  const [newItemText, setNewItemText] = useState('');
  const [listFilterCategory, setListFilterCategory] = useState<string | null>(null); // For filtering the list
  const [newItemCategory, setNewItemCategory] = useState<string>('gear'); // For the new item form
  const [showAddItem, setShowAddItem] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  const inputRef = useRef<TextInput>(null);

  const completionPercentage = getCompletionPercentage();
  
  // Track keyboard visibility and height
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  
  // Group items by category
  const categories = items.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  // Filter by selected category or show all
  const filteredCategories = listFilterCategory 
    ? { [listFilterCategory]: categories[listFilterCategory] } 
    : categories;
  
  // Category labels
  const categoryLabels: Record<string, string> = {
    gear: 'Gear',
    clothing: 'Clothing',
    accessories: 'Accessories',
    documents: 'Documents',
    other: 'Other',
  };
  
  const handleAddItem = () => {
    if (newItemText.trim()) {
      addItem({
        id: Date.now().toString(),
        title: newItemText.trim(),
        completed: false,
        category: newItemCategory as any,
      });
      setNewItemText('');
      setNewItemCategory('gear'); // Reset to default
      setShowAddItem(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Trip Checklist</Text>
          <Text style={styles.subtitle}>Make sure you're ready for the slopes</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${completionPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{completionPercentage}% Complete</Text>
        </View>
        
        <View style={styles.categoryFilter}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <Pressable
              style={[
                styles.categoryButton,
                listFilterCategory === null && styles.categoryButtonActive,
              ]}
              onPress={() => setListFilterCategory(null)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  listFilterCategory === null && styles.categoryButtonTextActive,
                ]}
              >
                All
              </Text>
            </Pressable>
            
            {Object.keys(categories).map(category => (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  listFilterCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setListFilterCategory(category)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    listFilterCategory === category && styles.categoryButtonTextActive,
                  ]}
                >
                  {categoryLabels[category] || category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            showAddItem && keyboardVisible && { paddingBottom: keyboardHeight }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(filteredCategories).map(([category, categoryItems]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                {categoryLabels[category] || category}
              </Text>
              
              {categoryItems.map(item => (
                <Pressable 
                  key={item.id}
                  style={styles.checklistItem}
                  onPress={() => toggleItem(item.id)}
                >
                  <Pressable 
                    style={[
                      styles.checkbox,
                      item.completed && styles.checkboxChecked,
                    ]}
                    onPress={() => toggleItem(item.id)}
                  >
                    {item.completed && <Check size={16} color="white" />}
                  </Pressable>
                  <Text 
                    style={[
                      styles.checklistItemText,
                      item.completed && styles.checklistItemTextChecked,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <X size={16} color={Colors.text.light} />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
        
        {showAddItem ? (
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          >
            <View style={styles.addItemContainer}>
              <View style={styles.addItemForm}>
                <TextInput
                  ref={inputRef}
                  style={styles.addItemInput}
                  placeholder="Add new item..."
                  value={newItemText}
                  onChangeText={setNewItemText}
                  autoFocus
                />
                <View style={styles.categorySelect}>
                  <Text style={styles.addItemCategoryLabel}>Category:</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                  >
                    {Object.keys(categoryLabels).map(category => (
                      <Pressable
                        key={category}
                        style={[
                          styles.addItemCategoryButton,
                          newItemCategory === category && styles.addItemCategoryButtonActive,
                        ]}
                        onPress={() => setNewItemCategory(category)}
                      >
                        <Text 
                          style={[
                            styles.addItemCategoryText,
                            newItemCategory === category && styles.addItemCategoryTextActive,
                          ]}
                        >
                          {categoryLabels[category]}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.addItemActions}>
                  <Pressable 
                    style={styles.addItemCancel}
                    onPress={() => {
                      setShowAddItem(false);
                      Keyboard.dismiss();
                    }}
                  >
                    <Text style={styles.addItemCancelText}>Cancel</Text>
                  </Pressable>
                  <Pressable 
                    style={styles.addItemSubmit}
                    onPress={handleAddItem}
                  >
                    <Text style={styles.addItemSubmitText}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <Pressable 
            style={styles.addButton}
            onPress={() => setShowAddItem(true)}
          >
            <Plus size={24} color="white" />
          </Pressable>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  progressContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 0,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
    textAlign: 'right',
  },
  categoryFilter: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  categoryScroll: {
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checklistItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  checklistItemTextChecked: {
    textDecorationLine: 'line-through',
    color: Colors.text.light,
  },
  deleteButton: {
    padding: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addItemContainer: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 100,
  },
  addItemForm: {
    width: '100%',
  },
  addItemInput: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categorySelect: {
    marginBottom: 16,
  },
  addItemCategoryLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  addItemCategoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addItemCategoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addItemCategoryText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  addItemCategoryTextActive: {
    color: 'white',
  },
  addItemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  addItemCancel: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  addItemCancelText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  addItemSubmit: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addItemSubmitText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});