import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
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
  danger: "#EF4444",
};

const CustomerSettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    // 🔌 Clear auth tokens here
    console.log("User logged out");
    navigation.replace("Login"); // adjust based on your auth flow
  };

  const SettingItem = ({ icon, title, subtitle, rightComponent, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Icon name={icon} size={22} color={COLORS.primary} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.card}>
        <SettingItem
          icon="person-outline"
          title="Edit Profile"
          subtitle="Update your personal info"
          onPress={() => navigation.navigate("EditProfile")}
        />

        <SettingItem
          icon="location-outline"
          title="Manage Addresses"
          subtitle="Add or edit delivery addresses"
          onPress={() => navigation.navigate("Address")}
        />

        <SettingItem
          icon="lock-closed-outline"
          title="Change Password"
          subtitle="Update your account password"
          onPress={() => console.log("Change Password")}
        />
      </View>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={styles.card}>
        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          rightComponent={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          }
        />

        <SettingItem
          icon="moon-outline"
          title="Dark Mode"
          rightComponent={
            <Switch value={darkMode} onValueChange={setDarkMode} />
          }
        />

        <SettingItem
          icon="location-outline"
          title="Location Services"
          rightComponent={
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
            />
          }
        />
      </View>

      {/* Support */}
      <Text style={styles.sectionTitle}>Support</Text>

      <View style={styles.card}>
        <SettingItem
          icon="help-circle-outline"
          title="Help Center"
          onPress={() => console.log("Help")}
        />

        <SettingItem
          icon="document-text-outline"
          title="Terms & Conditions"
          onPress={() => console.log("Terms")}
        />

        <SettingItem
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          onPress={() => console.log("Privacy")}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.subtext,
    marginTop: 20,
    marginBottom: 8,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 5,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },

  itemSubtitle: {
    fontSize: 12,
    color: COLORS.subtext,
  },

  logoutBtn: {
    marginTop: 30,
    backgroundColor: COLORS.danger,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
});