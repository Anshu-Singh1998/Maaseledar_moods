import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
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

const INITIAL_ADDRESSES = [
  {
    id: "1",
    name: "Anshu Singh",
    phone: "9999999999",
    address: "Salt Lake, Kolkata, West Bengal",
  },
  {
    id: "2",
    name: "Home",
    phone: "8888888888",
    address: "Park Street, Kolkata",
  },
];

const AddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedId, setSelectedId] = useState("1");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleAddAddress = () => {
    if (!form.name || !form.phone || !form.address) return;

    const newAddress = {
      id: Date.now().toString(),
      ...form,
    };

    setAddresses([...addresses, newAddress]);
    setForm({ name: "", phone: "", address: "" });
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedId === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedId(item.id)}
    >
      <View style={styles.row}>
        <Icon
          name={
            selectedId === item.id
              ? "radio-button-on"
              : "radio-button-off"
          }
          size={20}
          color={COLORS.primary}
        />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{item.phone}</Text>
          <Text style={styles.sub}>{item.address}</Text>
        </View>

        <TouchableOpacity>
          <Icon name="create-outline" size={20} color={COLORS.subtext} />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Icon name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

      {/* Saved Addresses */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddress}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Add New Address */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Add New Address</Text>

        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          style={styles.input}
        />

        <TextInput
          placeholder="Phone"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
          style={styles.input}
        />

        <TextInput
          placeholder="Full Address"
          value={form.address}
          onChangeText={(t) => setForm({ ...form, address: t })}
          style={[styles.input, { height: 80 }]}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Save Address
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          Continue to Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontWeight: "600",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.subtext,
    fontSize: 12,
  },

  form: {
    marginTop: 20,
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.text,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  checkoutBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
});