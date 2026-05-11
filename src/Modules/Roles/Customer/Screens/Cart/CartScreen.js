import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../../../../../Constants/Colors";

const INITIAL_CART = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 120,
    qty: 1,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 180,
    qty: 2,
    image: "https://via.placeholder.com/100",
  },
];

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState(INITIAL_CART);

  const updateQty = (id, type) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        let newQty =
          type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1;
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCart(updated);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = subtotal > 200 ? 50 : 0;
  const total = subtotal - discount;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        {/* 🔢 Quantity */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => updateQty(item.id, "dec")}
            style={styles.qtyBtn}
          >
            <Icon name="remove" size={16} color={colors.orange} />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.qty}</Text>

          <TouchableOpacity
            onPress={() => updateQty(item.id, "inc")}
            style={styles.qtyBtn}
          >
            <Icon name="add" size={16} color={colors.orange} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🗑 Delete */}
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Icon name="trash-outline" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  /* ❌ EMPTY CART */
  if (cart.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.emptyContainer}>
          <Icon name="cart-outline" size={80} color={colors.textSecondary} />
          <Text style={styles.emptyText}>Your cart is empty</Text>

          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.shopText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 CONTENT */}
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* 💰 BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.subtext}>Subtotal ₹{subtotal}</Text>
          <Text style={styles.subtext}>Discount ₹{discount}</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Address")}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  /* 🔥 HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.orange,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* 📦 CARD */
  card: {
    flexDirection: "row",
    backgroundColor: colors.background2,
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: "center",

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.textPrimary,
  },

  price: {
    color: colors.textSecondary,
    marginVertical: 4,
  },

  /* 🔢 QTY */
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  qtyBtn: {
    backgroundColor: colors.oraLight,
    padding: 6,
    borderRadius: 8,
  },

  qtyText: {
    marginHorizontal: 10,
    fontWeight: "600",
  },

  /* 💰 BOTTOM BAR */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 10,
  },

  subtext: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.orange,
    marginTop: 4,
  },

  checkoutBtn: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* 🛒 EMPTY */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#fff",
    fontWeight: "600",
  },
});