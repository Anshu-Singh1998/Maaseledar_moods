import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
};

const PRODUCT = {
  name: "Wireless Headphones",
  price: 120,
  rating: 4.5,
  description:
    "High quality wireless headphones with noise cancellation, long battery life, and premium sound.",
  images: [
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
  ],
  variants: ["Black", "White", "Blue"],
};

const ProductDetailsScreen = ({ navigation }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    PRODUCT.variants[0]
  );

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <FlatList
          data={PRODUCT.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImage}
        />

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.name}>{PRODUCT.name}</Text>

          <View style={styles.row}>
            <Icon name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{PRODUCT.rating}</Text>
          </View>

          <Text style={styles.price}>₹{PRODUCT.price}</Text>

          {/* Variants */}
          <Text style={styles.sectionTitle}>Select Variant</Text>
          <View style={styles.variantRow}>
            {PRODUCT.variants.map((variant) => (
              <TouchableOpacity
                key={variant}
                style={[
                  styles.variantBtn,
                  selectedVariant === variant && styles.variantSelected,
                ]}
                onPress={() => setSelectedVariant(variant)}
              >
                <Text
                  style={[
                    styles.variantText,
                    selectedVariant === variant && {
                      color: "#fff",
                    },
                  ]}
                >
                  {variant}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{PRODUCT.description}</Text>

          {/* Reviews Preview */}
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>
              ⭐⭐⭐⭐☆ Great product, value for money!
            </Text>
            <Text style={styles.sub}>- User123</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.price}>₹{PRODUCT.price}</Text>
          <Text style={styles.sub}>Inclusive of all taxes</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.btnText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  image: {
    width: width,
    height: 300,
  },

  content: {
    padding: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  rating: {
    marginLeft: 5,
    color: COLORS.subtext,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginVertical: 6,
  },

  sectionTitle: {
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 8,
    color: COLORS.text,
  },

  variantRow: {
    flexDirection: "row",
  },

  variantBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },

  variantSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  variantText: {
    color: COLORS.text,
  },

  description: {
    color: COLORS.subtext,
    lineHeight: 20,
  },

  reviewCard: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  reviewText: {
    color: COLORS.text,
  },

  sub: {
    color: COLORS.subtext,
    fontSize: 12,
    marginTop: 4,
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },

  actions: {
    flexDirection: "row",
  },

  cartBtn: {
    backgroundColor: "#6B7280",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },

  buyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});