import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
};

const ORDERS = [
  {
    id: "1001",
    date: "25 Mar 2026",
    status: "Delivered",
    total: 450,
    items: 3,
  },
  {
    id: "1002",
    date: "20 Mar 2026",
    status: "Processing",
    total: 1200,
    items: 5,
  },
  {
    id: "1003",
    date: "18 Mar 2026",
    status: "Cancelled",
    total: 300,
    items: 2,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "#16A34A";
    case "Processing":
      return "#F59E0B";
    case "Cancelled":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

const OrderListScreen = ({ navigation }) => {
  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("OrderDetails", { orderId: item.id })
      }
    >
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sub}>{item.items} Items</Text>
        <Text style={styles.total}>₹{item.total}</Text>
      </View>

      <View style={styles.rowBetween}>
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

        <Icon name="chevron-forward-outline" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default OrderListScreen;

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
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    alignItems: "center",
  },

  orderId: {
    fontWeight: "700",
    color: COLORS.text,
  },

  date: {
    color: COLORS.subtext,
    fontSize: 12,
  },

  sub: {
    color: COLORS.subtext,
  },

  total: {
    fontWeight: "700",
    color: COLORS.text,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});