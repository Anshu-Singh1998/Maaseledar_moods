import React from "react";
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

const OFFERS = [
  {
    id: "1",
    title: "Flat 50% OFF",
    subtitle: "On selected electronics",
    image: "https://via.placeholder.com/300x150",
    code: "ELEC50",
  },
  {
    id: "2",
    title: "₹100 OFF",
    subtitle: "On orders above ₹500",
    image: "https://via.placeholder.com/300x150",
    code: "SAVE100",
  },
  {
    id: "3",
    title: "Free Delivery",
    subtitle: "On your first 3 orders",
    image: "https://via.placeholder.com/300x150",
    code: "FREESHIP",
  },
];

const OffersScreen = () => {
  const renderOffer = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <View style={styles.codeRow}>
          <Text style={styles.code}>Code: {item.code}</Text>

          <TouchableOpacity style={styles.copyBtn}>
            <Icon name="copy-outline" size={16} color="#fff" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offers & Deals</Text>

      <FlatList
        data={OFFERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 150,
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    color: COLORS.subtext,
    marginVertical: 4,
  },

  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  code: {
    fontWeight: "600",
    color: COLORS.primary,
  },

  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  copyText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
});