import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

// ✅ Use your colors file
import colors from "../../../../../Constants/Colors";

const ORDERS = [
  { id: "1001", date: "25 Mar 2026", status: "Delivered", total: 450, items: 3 },
  { id: "1002", date: "20 Mar 2026", status: "Processing", total: 1200, items: 5 },
  { id: "1003", date: "18 Mar 2026", status: "Cancelled", total: 300, items: 2 },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return colors.success;
    case "Processing":
      return colors.warning;
    case "Cancelled":
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const OrderListScreen = ({ navigation }) => {
  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("OrderDetails", { orderId: item.id })
      }
    >
      {/* 🔝 TOP ROW */}
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>Order #{item.id}</Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* 📅 DATE */}
      <Text style={styles.date}>{item.date}</Text>

      {/* 📦 DETAILS */}
      <View style={styles.rowBetween}>
        <Text style={styles.sub}>{item.items} items</Text>
        <Text style={styles.total}>₹{item.total}</Text>
      </View>

      {/* ➡️ ARROW */}
      <View style={styles.arrow}>
        <Icon name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 CONTENT */}
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={ORDERS}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderListScreen;

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
    backgroundColor: colors.background2,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontWeight: "700",
    fontSize: 14,
    color: colors.textPrimary,
  },

  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 6,
  },

  sub: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  total: {
    fontWeight: "700",
    fontSize: 15,
    color: colors.orange,
  },

  /* 🏷 STATUS */
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  /* ➡️ */
  arrow: {
    position: "absolute",
    right: 12,
    top: "45%",
  },
});