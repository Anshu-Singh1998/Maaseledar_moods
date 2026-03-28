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
];

const CategoriesListScreen = ({ route, navigation }) => {
  const { categoryName } = route?.params || { categoryName: "Category" };

  const [search, setSearch] = useState("");
  const [grid, setGrid] = useState(true);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={grid ? styles.gridCard : styles.listCard}
      onPress={() => navigation.navigate("ProductDetails")}
    >
      <View style={styles.imagePlaceholder} />

      <View style={{ flex: 1, marginLeft: grid ? 0 : 10 }}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>

        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color="#F59E0B" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Search + Controls */}
      <View style={styles.searchRow}>
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
          <Icon name="filter" size={20} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setGrid(!grid)}
        >
          <Icon
            name={grid ? "list" : "grid"}
            size={20}
            color={COLORS.text}
          />
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
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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

  imagePlaceholder: {
    height: 100,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 8,
    width: "100%",
  },

  productName: {
    fontWeight: "600",
    color: COLORS.text,
  },

  productPrice: {
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  ratingText: {
    marginLeft: 4,
    color: COLORS.subtext,
  },
});