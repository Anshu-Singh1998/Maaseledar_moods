import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

const INITIAL_WISHLIST = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 120,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 180,
    image: "https://via.placeholder.com/150",
  },
];

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: item.id })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Icon name="heart" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (wishlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="heart-outline" size={80} color="#9CA3AF" />
        <Text style={styles.emptyText}>Your wishlist is empty</Text>

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
      <Text style={styles.title}>Wishlist</Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default WishlistScreen;

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
    backgroundColor: COLORS.card,
    borderRadius: 12,
    width: "48%",
    marginBottom: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 120,
  },

  content: {
    padding: 10,
  },

  name: {
    fontWeight: "600",
    color: COLORS.text,
  },

  price: {
    color: COLORS.subtext,
    marginVertical: 4,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  cartBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
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