import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
};

const PRODUCTS = [
  { id: "1", name: "Smart Watch", price: 99, rating: 4.5 },
  { id: "2", name: "Headphones", price: 149, rating: 4.2 },
  { id: "3", name: "Shoes", price: 79, rating: 4.0 },
  { id: "4", name: "Bag", price: 59, rating: 4.3 },
  { id: "5", name: "T-Shirt", price: 29, rating: 4.1 },
  { id: "6", name: "Laptop", price: 999, rating: 4.7 },
];

const ProductListScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [grid, setGrid] = useState(true);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={grid ? styles.gridCard : styles.listCard}
      onPress={() => navigation.navigate("ProductDetails")}
    >
      {/* Image */}
      <View style={styles.imageBox}>
        <TouchableOpacity style={styles.wishlistIcon}>
          <Icon name="heart-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View style={{ flex: 1, marginLeft: grid ? 0 : 10 }}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color="#F59E0B" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>

        <Text style={styles.price}>${item.price}</Text>

        <TouchableOpacity style={styles.cartBtn}>
          <Text style={{ color: "#fff", fontSize: 12 }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Products</Text>

      {/* Search + Controls */}
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color={COLORS.subtext} />
          <TextInput
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="filter" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setGrid(!grid)}
        >
          <Icon name={grid ? "list" : "grid"} size={20} />
        </TouchableOpacity>
      </View>

      {/* Sort Options */}
      <View style={styles.sortRow}>
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Text>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortBtn}>
          <Text>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortBtn}>
          <Text>Newest</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={PRODUCTS}
        key={grid ? 2 : 1}
        numColumns={grid ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        columnWrapperStyle={grid ? { justifyContent: "space-between" } : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  iconBtn: {
    marginLeft: 10,
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 10,
  },

  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    flexWrap: "wrap",
  },

  sortText: {
    marginRight: 8,
    color: COLORS.subtext,
  },

  sortBtn: {
    backgroundColor: COLORS.card,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
    marginTop: 5,
  },

  gridCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },

  listCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },

  imageBox: {
    height: 120,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 6,
  },

  wishlistIcon: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 20,
  },

  name: {
    fontWeight: "600",
    color: COLORS.text,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  rating: {
    marginLeft: 4,
    color: COLORS.subtext,
  },

  price: {
    marginTop: 4,
    fontWeight: "700",
    color: COLORS.primary,
  },

  cartBtn: {
    marginTop: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
});