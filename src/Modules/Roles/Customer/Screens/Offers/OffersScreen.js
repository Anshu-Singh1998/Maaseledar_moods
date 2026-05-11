import React from "react";
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

const OffersScreen = ({ navigation }) => {
  const renderOffer = ({ item }) => (
    <View style={styles.card}>
      {/* 🖼 IMAGE */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* 📦 CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        {/* 🎟 COUPON ROW */}
        <View style={styles.codeRow}>
          <View style={styles.codeBox}>
            <Text style={styles.code}>{item.code}</Text>
          </View>

          <TouchableOpacity style={styles.copyBtn}>
            <Icon name="copy-outline" size={14} color="#fff" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Offers & Deals</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 CONTENT */}
      <View style={styles.contentArea}>
        <FlatList
          data={OFFERS}
          keyExtractor={(item) => item.id}
          renderItem={renderOffer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OffersScreen;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* 📱 CONTENT */
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom:30
  },

  /* 🎟 CARD */
  card: {
    backgroundColor: colors.pale,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: "100%",
    height: 150,
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  subtitle: {
    color: colors.textSecondary,
    marginVertical: 4,
    fontSize: 13,
  },

  /* 🎟 CODE ROW */
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  codeBox: {
    borderWidth: 1,
    borderColor: colors.orange,
    borderStyle: "dashed",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.oraLight,
  },

  code: {
    fontWeight: "700",
    color: colors.orange,
  },

  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.orange,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  copyText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "600",
  },
});