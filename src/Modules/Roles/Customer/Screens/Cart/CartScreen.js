import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
};

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

        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => updateQty(item.id, "dec")}
            style={styles.qtyBtn}
          >
            <Icon name="remove" size={18} />
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 10 }}>{item.qty}</Text>

          <TouchableOpacity
            onPress={() => updateQty(item.id, "inc")}
            style={styles.qtyBtn}
          >
            <Icon name="add" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Icon name="trash-outline" size={22} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="cart-outline" size={80} color="#9CA3AF" />
        <Text style={styles.emptyText}>Your cart is empty</Text>

        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Start Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Bottom Summary */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.subtext}>Subtotal: ₹{subtotal}</Text>
          <Text style={styles.subtext}>Discount: ₹{discount}</Text>
          <Text style={styles.total}>Total: ₹{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Address")}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.text,
  },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  details: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    fontWeight: "600",
    color: COLORS.text,
  },

  price: {
    color: COLORS.subtext,
    marginVertical: 4,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    backgroundColor: "#E5E7EB",
    padding: 5,
    borderRadius: 6,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subtext: {
    color: COLORS.subtext,
    fontSize: 12,
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 4,
  },

  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.subtext,
  },

  shopBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});