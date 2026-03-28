import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    { id: "1", title: "My Orders", icon: "cube-outline", screen: "Orders" },
    { id: "2", title: "Wishlist", icon: "heart-outline", screen: "Wishlist" },
    { id: "3", title: "Addresses", icon: "location-outline", screen: "Address" },
    { id: "4", title: "Offers", icon: "pricetag-outline", screen: "Offers" },
    { id: "5", title: "Settings", icon: "settings-outline", screen: "Settings" },
  ];

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.menuLeft}>
        <Icon name={item.icon} size={20} color={COLORS.primary} />
        <Text style={styles.menuText}>{item.title}</Text>
      </View>

      <Icon name="chevron-forward-outline" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />

        <View style={{ marginLeft: 15 }}>
          <Text style={styles.name}>Anshu Singh</Text>
          <Text style={styles.sub}>anshu@email.com</Text>
        </View>
      </View>

      {/* Account Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>9999999999</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Member Since</Text>
          <Text style={styles.value}>2024</Text>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map(renderItem)}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.card,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.subtext,
  },

  card: {
    backgroundColor: COLORS.card,
    margin: 16,
    padding: 14,
    borderRadius: 12,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.text,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  label: {
    color: COLORS.subtext,
  },

  value: {
    color: COLORS.text,
    fontWeight: "600",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 10,
    color: COLORS.text,
    fontWeight: "500",
  },

  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#EF4444",
    margin: 16,
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "700",
  },
});