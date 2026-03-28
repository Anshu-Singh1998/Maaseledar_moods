import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
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

const EditProfileScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "Anshu Singh",
    email: "anshu@email.com",
    phone: "9999999999",
  });

  const handleSave = () => {
    // 🔌 Connect API here
    console.log("Updated Profile:", form);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/120" }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
          style={styles.input}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
  },

  label: {
    color: COLORS.subtext,
    marginBottom: 4,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
  },

  saveBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
});