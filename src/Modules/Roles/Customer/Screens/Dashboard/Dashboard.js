import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../../../../Constants/Colors';

const categories = [
  { id: '1', name: 'Food' },
  { id: '2', name: 'Electronics' },
  { id: '3', name: 'Fashion' },
  { id: '4', name: 'Home' },
  { id: '5', name: 'Beauty' },
];

const products = [
  { id: '1', name: 'Smart Watch', price: 99 },
  { id: '2', name: 'Headphones', price: 149 },
  { id: '3', name: 'Shoes', price: 79 },
  { id: '4', name: 'Bag', price: 59 },
];

const Dashboard = () => {
  const [search, setSearch] = useState('');

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = item => (
    <TouchableOpacity style={styles.productCard} key={item.id}>
      <View style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 FIXED HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hi, Anshu 👋</Text>
          <Text style={styles.subtitle}>Find your products</Text>
        </View>

        <TouchableOpacity>
          <Icon name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 📱 SCROLLABLE CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 🔍 SEARCH */}
          <View style={styles.searchBar}>
            <Icon name="search" size={18} color={colors.textSecondary} />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {/* 🎯 BANNER */}
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>🔥 Mega Sale</Text>
            <Text style={styles.bannerText}>Up to 50% off</Text>
          </View>

          {/* 📂 CATEGORIES */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            keyExtractor={item => item.id}
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          />

          {/* 🛍 PRODUCTS */}
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.productGrid}>{products.map(renderProduct)}</View>

          {/* 🔥 DEALS */}
          <Text style={styles.sectionTitle}>Deals of the Day</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map(item => (
              <View key={item.id} style={styles.dealCard}>
                <View style={styles.dealImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  /* 🔥 SAFE AREA */
  safeArea: {
    flex: 1,
    backgroundColor: colors.orange, // top color
  },

  /* 🔥 HEADER */
  header: {
    height: 70,
    backgroundColor: colors.orange,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },

  subtitle: {
    color: '#FFE7D6',
    fontSize: 12,
  },

  /* 📱 CONTENT */
  content: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    marginBottom: 30,
  },

  /* 🔍 SEARCH */
  searchBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderColor: colors.orange,
    borderWidth: 2,
    elevation: 2,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: colors.textPrimary,
  },

  /* 🎯 BANNER */
  banner: {
    height: 150,
    backgroundColor: colors.orange,
    borderRadius: 16,
    marginTop: 16,
    justifyContent: 'center',
    padding: 16,
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  bannerText: {
    color: '#FFE7D6',
    marginTop: 4,
  },

  sectionTitle: {
    marginTop: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  /* 📂 CATEGORY */
  categoryCard: {
    backgroundColor: colors.background2,
    padding: 14,
    borderRadius: 12,
    marginRight: 10,
  },

  categoryText: {
    fontWeight: '600',
    color: colors.textPrimary,
  },

  /* 🛍 PRODUCT */
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  productCard: {
    width: '48%',
    backgroundColor: colors.background2,
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,

    elevation: 3,
  },

  productImage: {
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 8,
  },

  productName: {
    fontWeight: '600',
    color: colors.textPrimary,
  },

  productPrice: {
    color: colors.orange,
    fontWeight: '700',
  },

  /* 🔥 DEAL */
  dealCard: {
    backgroundColor: colors.background2,
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    width: 140,
  },

  dealImage: {
    height: 80,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 6,
  },
});
