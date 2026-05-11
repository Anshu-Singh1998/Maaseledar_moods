import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// ✅ YOUR COLORS FILE
import colors from '../../../../../Constants/Colors';

// 🔥 MORE CATEGORIES
const categoriesData = [
  { id: '1', name: 'Food', icon: 'fast-food-outline' },
  { id: '2', name: 'Electronics', icon: 'phone-portrait-outline' },
  { id: '3', name: 'Fashion', icon: 'shirt-outline' },
  { id: '4', name: 'Home', icon: 'home-outline' },
  { id: '5', name: 'Beauty', icon: 'heart-outline' },
  { id: '6', name: 'Sports', icon: 'basketball-outline' },
  { id: '7', name: 'Books', icon: 'book-outline' },
  { id: '8', name: 'Toys', icon: 'game-controller-outline' },
  { id: '9', name: 'Grocery', icon: 'cart-outline' },
  { id: '10', name: 'Furniture', icon: 'bed-outline' },
  { id: '11', name: 'Jewelry', icon: 'diamond-outline' },
  { id: '12', name: 'Appliances', icon: 'tv-outline' },
];

const CategoriesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.iconBox}>
        <Icon name={item.icon} size={26} color={colors.orange} />
      </View>

      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Categories</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 CONTENT */}
      <View style={styles.content}>
        {/* 🔍 SEARCH */}
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color={colors.textSecondary} />
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor={colors.textSecondary}
            style={styles.searchInput}
          />
        </View>

        {/* 📦 GRID */}
        <FlatList
          data={categoriesData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;

// ================= STYLES =================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.orange, // 🔥 iOS top color
  },

  /* 🔥 HEADER */
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.orange,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* 📱 CONTENT */
  content: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    marginBottom:30
  },

  /* 🔍 SEARCH */
  searchBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderColor:colors.orange,
    borderWidth:2,
    elevation: 2,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: colors.textPrimary,
  },

  /* 📦 CARD */
  card: {
    flex: 0.48,
    backgroundColor: colors.background2,
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,

    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  iconBox: {
    backgroundColor: colors.oraLight,
    padding: 12,
    borderRadius: 14,
  },

  text: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 13,
    color: colors.textPrimary,
  },
});