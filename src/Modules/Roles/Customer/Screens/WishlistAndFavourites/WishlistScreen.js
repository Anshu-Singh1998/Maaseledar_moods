import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../../../../Constants/Colors';

const INITIAL_WISHLIST = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 120,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 180,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200',
  },
];

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const removeItem = id => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* ❤️ REMOVE */}
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => removeItem(item.id)}
      >
        <Icon name="heart" size={18} color="#fff" />
      </TouchableOpacity>

      {/* 🖼 IMAGE */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', { productId: item.id })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      {/* 📦 CONTENT */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.price}>₹{item.price}</Text>

        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /* ❌ EMPTY STATE */
  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.emptyContainer}>
          <Icon name="heart-outline" size={80} color={colors.textSecondary} />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>

          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.shopText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wishlist</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 CONTENT */}
      <View style={styles.contentArea}>
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  /* 🔥 SAFE AREA */
  safeArea: {
    flex: 1,
    backgroundColor: colors.orange,
  },

  /* 🔥 HEADER */
  header: {
    height: 60,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* 📱 CONTENT */
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* 📦 CARD */
  card: {
    backgroundColor: colors.pale,
    borderRadius: 16,
    width: '48%',
    marginBottom: 14,
    overflow: 'hidden',

    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: '100%',
    height: 130,
  },

  content: {
    padding: 10,
  },

  name: {
    fontWeight: '600',
    fontSize: 13,
    color: colors.textPrimary,
  },

  price: {
    color: colors.orange,
    fontWeight: '700',
    marginVertical: 6,
  },

  /* ❤️ FLOATING HEART */
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.orange,
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },

  /* 🛒 BUTTON */
  cartBtn: {
    backgroundColor: colors.orange,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  /* 🛒 EMPTY */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
  },

  shopBtn: {
    marginTop: 20,
    backgroundColor: colors.orange,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  shopText: {
    color: '#fff',
    fontWeight: '600',
  },
});
