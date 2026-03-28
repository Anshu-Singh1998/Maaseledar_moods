import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
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

const categories = [
  { id: "1", name: "Food" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Fashion" },
  { id: "4", name: "Home" },
  { id: "5", name: "Beauty" },
];

const products = [
  { id: "1", name: "Smart Watch", price: 99 },
  { id: "2", name: "Headphones", price: 149 },
  { id: "3", name: "Shoes", price: 79 },
  { id: "4", name: "Bag", price: 59 },
];

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = (item) => (
    <TouchableOpacity style={styles.productCard} key={item.id}>
      <View style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hi, Anshu 👋</Text>
          <Text style={styles.subtitle}>Find your products</Text>
        </View>
        <Icon name="notifications-outline" size={24} color={COLORS.text} />
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color={COLORS.subtext} />
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>🔥 Mega Sale</Text>
        <Text style={styles.bannerText}>Up to 50% off</Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      />

      {/* Featured Products */}
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <View style={styles.productGrid}>
        {products.map(renderProduct)}
      </View>

      {/* Deals */}
      <Text style={styles.sectionTitle}>Deals of the Day</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((item) => (
          <View key={item.id} style={styles.dealCard}>
            <View style={styles.dealImage} />
            <Text>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        ))}
      </ScrollView>

    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    color: COLORS.subtext,
  },

  searchBar: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  banner: {
    height: 160,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginTop: 16,
    justifyContent: "center",
    padding: 16,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  bannerText: {
    color: "#fff",
    marginTop: 4,
  },

  sectionTitle: {
    marginTop: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  categoryCard: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    marginRight: 10,
  },

  categoryText: {
    fontWeight: "600",
  },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  productCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },

  productImage: {
    height: 120,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 8,
  },

  productName: {
    fontWeight: "600",
  },

  productPrice: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  dealCard: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    width: 140,
  },

  dealImage: {
    height: 80,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 6,
  },
});