import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
};

const ORDER = {
  id: "1001",
  status: "Delivered",
  date: "25 Mar 2026",
  items: [
    { id: "1", name: "Wireless Headphones", qty: 1, price: 120 },
    { id: "2", name: "Smart Watch", qty: 2, price: 165 },
  ],
  address: "Salt Lake, Kolkata, West Bengal",
};

const TIMELINE = [
  { id: "1", title: "Order Placed", completed: true },
  { id: "2", title: "Packed", completed: true },
  { id: "3", title: "Shipped", completed: true },
  { id: "4", title: "Out for Delivery", completed: true },
  { id: "5", title: "Delivered", completed: true },
];

const OrderDetailsScreen = () => {
  const subtotal = ORDER.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.sub}>
        Qty: {item.qty} • ₹{item.price}
      </Text>
    </View>
  );

  const renderTimeline = (step, index) => (
    <View key={index} style={styles.timelineRow}>
      <View style={styles.timelineIcon}>
        <Icon
          name={step.completed ? "checkmark-circle" : "ellipse-outline"}
          size={20}
          color={step.completed ? "#16A34A" : "#9CA3AF"}
        />
      </View>
      <Text style={styles.timelineText}>{step.title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.orderId}>Order #{ORDER.id}</Text>
        <Text style={styles.sub}>{ORDER.date}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{ORDER.status}</Text>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Tracking</Text>
        {TIMELINE.map(renderTimeline)}
      </View>

      {/* Items */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>
        <FlatList
          data={ORDER.items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>

      {/* Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.sub}>{ORDER.address}</Text>
      </View>

      {/* Price Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Price Details</Text>

        <View style={styles.rowBetween}>
          <Text>Subtotal</Text>
          <Text>₹{subtotal}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Delivery</Text>
          <Text>₹20</Text>
        </View>

        <View style={[styles.rowBetween, { marginTop: 10 }]}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>₹{subtotal + 20}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  headerCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.subtext,
    marginTop: 4,
  },

  statusBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    color: "#16A34A",
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.text,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  total: {
    fontWeight: "700",
    color: COLORS.text,
  },

  itemCard: {
    paddingVertical: 8,
  },

  itemName: {
    fontWeight: "600",
    color: COLORS.text,
  },

  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  timelineIcon: {
    marginRight: 10,
  },

  timelineText: {
    color: COLORS.text,
  },

  actions: {
    marginTop: 10,
    marginBottom: 20,
  },

  btn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  btnOutline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnOutlineText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});