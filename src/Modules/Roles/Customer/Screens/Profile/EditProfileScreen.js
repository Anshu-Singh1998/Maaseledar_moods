import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../../../../../Constants/Colors";

const EditProfileScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "Anshu Singh",
    email: "anshu@email.com",
    phone: "9999999999",
  });

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* 🔥 FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📱 CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        style={styles.contentArea}
      >
        {/* 👤 AVATAR */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://via.placeholder.com/120" }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.cameraBtn}>
              <Icon name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.changePhoto}>Change Profile Photo</Text>
        </View>

        {/* 📦 FORM */}
        <View style={styles.card}>
          {/* NAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputBox}>
              <Icon name="person-outline" size={18} color={colors.orange} />
              <TextInput
                value={form.name}
                onChangeText={(t) => setForm({ ...form, name: t })}
                style={styles.input}
                placeholder="Enter your name"
              />
            </View>
          </View>

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputBox}>
              <Icon name="mail-outline" size={18} color={colors.orange} />
              <TextInput
                value={form.email}
                onChangeText={(t) => setForm({ ...form, email: t })}
                style={styles.input}
                keyboardType="email-address"
                placeholder="Enter your email"
              />
            </View>
          </View>

          {/* PHONE */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputBox}>
              <Icon name="call-outline" size={18} color={colors.orange} />
              <TextInput
                value={form.phone}
                onChangeText={(t) => setForm({ ...form, phone: t })}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
              />
            </View>
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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
  },

  /* 👤 AVATAR */
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor:colors.orange,
    paddingTop:10,
    paddingBottom:10,
       borderRadius: 20,

  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },

  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.orange,
    padding: 8,
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#fff"
  },

  changePhoto: {
    marginTop: 10,
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },

  /* 📦 CARD */
  card: {
    backgroundColor: colors.background2,
    padding: 16,
    borderRadius: 16,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  /* INPUT */
  inputGroup: {
    marginBottom: 14,
  },

  label: {
    color: colors.textSecondary,
    marginBottom: 6,
    fontSize: 12,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    color: colors.textPrimary,
  },

  /* SAVE */
  saveBtn: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});