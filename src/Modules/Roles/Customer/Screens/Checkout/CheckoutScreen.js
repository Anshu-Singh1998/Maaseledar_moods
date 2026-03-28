import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
};

const CheckoutScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [promo, setPromo] = useState("");

  const orderSummary = {
    subtotal: 250,
    discount: 50,
    delivery: 20,
  };

  const total =
    orderSummary.subtotal -
    orderSummary.discount +
    orderSummary.delivery;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.title}>Checkout</Text>

        {/* Address Section */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Address")}>
              <Text style={styles.link}>Change</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textBold}>Anshu Singh</Text>
          <Text style={styles.sub}>Salt Lake, Kolkata</Text>
          <Text style={styles.sub}>9999999999</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.rowBetween}>
            <Text>Subtotal</Text>
            <Text>₹{orderSummary.subtotal}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Discount</Text>
            <Text>- ₹{orderSummary.discount}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Delivery</Text>
            <Text>₹{orderSummary.delivery}</Text>
          </View>

          <View style={[styles.rowBetween, { marginTop: 10 }]}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>₹{total}</Text>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Promo Code</Text>

          <View style={styles.promoRow}>
            <TextInput
              placeholder="Enter promo code"
              value={promo}
              onChangeText={setPromo}
              style={styles.input}
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={{ color: "#fff" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setPaymentMethod("upi")}
          >
            <Icon
              name={
                paymentMethod === "upi"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.radioText}>UPI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setPaymentMethod("card")}
          >
            <Icon
              name={
                paymentMethod === "card"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.radioText}>Credit / Debit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setPaymentMethod("cod")}
          >
            <Icon
              name={
                paymentMethod === "cod"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.radioText}>Cash on Delivery</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ color: COLORS.subtext }}>Total Payable</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() => navigation.navigate("Orders")}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    margin: 16,
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
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

  textBold: {
    fontWeight: "700",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.subtext,
    fontSize: 12,
  },

  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  promoRow: {
    flexDirection: "row",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 10,
  },

  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 8,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  radioText: {
    marginLeft: 10,
    color: COLORS.text,
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

  total: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  placeOrderBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});