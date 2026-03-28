import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';

// ─── FILTERS
const FILTERS = ['All', 'Active', 'Out of Stock'];

// ─── MOCK DATA
const PRODUCTS = [
  {
    id: '1',
    name: 'Bikaneri Bhujia',
    vendor: 'Bikaner Store',
    price: 120,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200',
    active: true,
  },
  {
    id: '2',
    name: 'Masala Peanuts',
    vendor: 'Snack Hub',
    price: 80,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200',
    active: false,
  },
];

const AdminProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const toggleStatus = id => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  };

  const handleDelete = id => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.vendor.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === 'All' ||
      (filter === 'Active' && p.active) ||
      (filter === 'Out of Stock' && p.stock === 0);

    return matchSearch && matchFilter;
  });

  const ProductCard = ({ item, onToggle, onDelete, onEdit }) => {
    return (
      <CustomCards style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.vendor}>{item.vendor}</Text>

            <Text style={styles.price}>₹{item.price}</Text>

            <Text style={styles.stock}>Stock: {item.stock}</Text>
          </View>

          <Switch value={item.active} onValueChange={onToggle} />
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Pressable onPress={onEdit}>
            <Icon name="create-outline" size={18} />
          </Pressable>

          <Pressable onPress={onDelete}>
            <Icon name="trash-outline" size={18} color="red" />
          </Pressable>
        </View>
      </CustomCards>
    );
  };

  const EmptyState = () => (
    <View style={styles.empty}>
      <Icon name="cube-outline" size={40} color="#9CA3AF" />
      <Text style={styles.emptyText}>No products found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>

        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Icon name="add" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="search" size={16} color="#6B7280" />
        <TextInput
          placeholder="Search products or vendor"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* FILTER */}
      <View style={styles.filterRow}>
        {FILTERS.map(item => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filterBtn, filter === item && styles.filterActive]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.filterTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onToggle={() => toggleStatus(item.id)}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate('EditProduct', { product: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  addBtn: {
    backgroundColor: '#F97316',
    padding: 8,
    borderRadius: 20,
  },

  // SEARCH
  searchBox: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    gap: 6,
  },

  searchInput: {
    flex: 1,
  },

  // FILTER
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8,
  },

  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  filterActive: {
    backgroundColor: '#F97316',
  },

  filterText: {
    fontSize: 12,
  },

  filterTextActive: {
    color: '#fff',
  },

  // CARD
  card: {
    marginBottom: 12,
    padding: 12,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  name: {
    fontWeight: '700',
  },

  vendor: {
    fontSize: 12,
    color: '#6B7280',
  },

  price: {
    color: '#F97316',
    fontWeight: '700',
  },

  stock: {
    fontSize: 12,
    color: '#374151',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 16,
  },

  // EMPTY
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: '#6B7280',
  },
});
export default AdminProductListScreen;
