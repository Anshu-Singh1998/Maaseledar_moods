import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── DUMMY DATA
const PRODUCTS = [
  {
    id: '1',
    name: 'Bikaneri Bhujia',
    price: 120,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    active: true,
  },
  {
    id: '2',
    name: 'Masala Peanuts',
    price: 80,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    active: false,
  },
];

// ─── MAIN
const ProductList = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const ProductCard = ({ item, navigation }) => {
    return (
      <CustomCards style={styles.card}>
        {/* IMAGE */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {!item.active && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Out of Stock</Text>
            </View>
          )}
        </View>

        {/* INFO */}
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <Text style={styles.stock}>Stock: {item.stock}</Text>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Pressable
            onPress={() => navigation.navigate('EditProduct', { item })}
          >
            <Icon name="create-outline" size={18} color="#F97316" />
          </Pressable>

          <Pressable onPress={() => {}}>
            <Icon name="trash-outline" size={18} color="#EF4444" />
          </Pressable>
        </View>
      </CustomCards>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="search-outline" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 🛒 LIST */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard item={item} navigation={navigation} />
        )}
      />

      {/* ➕ FAB */}
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Icon name="add" size={26} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // 🔍 SEARCH
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  searchInput: {
    flex: 1,
    padding: 10,
  },

  // 📦 LIST
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },

  // 🛒 CARD
  card: {
    width: '48%',
    marginBottom: 14,
    padding: 10,
  },

  imageWrap: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: moderateScale(110),
    borderRadius: 10,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  overlayText: {
    color: '#fff',
    fontWeight: '700',
  },

  name: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 13,
  },

  price: {
    color: '#F97316',
    fontWeight: '700',
    marginTop: 2,
  },

  stock: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  // ➕ FAB
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#F97316',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
export default ProductList;
