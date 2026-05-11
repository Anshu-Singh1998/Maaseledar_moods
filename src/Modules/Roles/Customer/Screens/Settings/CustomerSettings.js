import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from "../../../../Components/Header/CustomHeader"
import colors from '../../../../../Constants/Colors';

const INITIAL_ADDRESSES = [
  {
    id: '1',
    name: 'Anshu Singh',
    phone: '9999999999',
    address: 'Salt Lake, Kolkata, West Bengal',
  },
  {
    id: '2',
    name: 'Home',
    phone: '8888888888',
    address: 'Park Street, Kolkata',
  },
];

const AddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedId, setSelectedId] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleAddAddress = () => {
    if (!form.name || !form.phone || !form.address) return;

    const newAddress = {
      id: Date.now().toString(),
      ...form,
    };

    setAddresses([...addresses, newAddress]);
    setForm({ name: '', phone: '', address: '' });
    setModalVisible(false);
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, selectedId === item.id && styles.selectedCard]}
      onPress={() => setSelectedId(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <Icon
          name={selectedId === item.id ? 'radio-button-on' : 'radio-button-off'}
          size={20}
          color={colors.orange}
        />

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{item.phone}</Text>
          <Text style={styles.sub}>{item.address}</Text>
        </View>

        <Icon name="create-outline" size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
     

      {/* 🔥 HEADER */}
      <CustomHeader title="Settings" navigation={navigation} />

      {/* 📦 CONTENT */}
      <View style={styles.contentArea}>
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={renderAddress}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 120,
          }}
        />
      </View>

      {/* 🔥 CONTINUE BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutText}>Continue to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* ✏️ FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="pencil" size={20} color="#fff" />
      </TouchableOpacity>

      {/* 🧾 MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Address</Text>

            <TextInput
              placeholder="Full Name"
              value={form.name}
              onChangeText={t => setForm({ ...form, name: t })}
              style={styles.input}
              placeholderTextColor={colors.textSecondary}
            />

            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={t => setForm({ ...form, phone: t })}
              style={styles.input}
              placeholderTextColor={colors.textSecondary}
            />

            <TextInput
              placeholder="Full Address"
              value={form.address}
              onChangeText={t => setForm({ ...form, address: t })}
              style={[styles.input, { height: 90 }]}
              multiline
              placeholderTextColor={colors.textSecondary}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleAddAddress}>
              <Text style={styles.saveText}>Save Address</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  /* 🔥 SAFE AREA (MATCH SETTINGS SCREEN) */
  safeArea: {
    flex: 1,
    backgroundColor: colors.orange,
  },

  


  /* 📦 CONTENT */
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* 📍 ADDRESS CARD */
  card: {
    backgroundColor: colors.background2,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: colors.orange,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    fontWeight: '600',
    color: colors.textPrimary,
  },

  sub: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  /* 🔥 FAB */
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: colors.orange,
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  /* 🔥 BOTTOM BAR */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background2,
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.border,
  },

  checkoutBtn: {
    backgroundColor: colors.orange,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  checkoutText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* 🔥 MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
    color: colors.textPrimary,
  },

  input: {
    backgroundColor: colors.oraLight,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: colors.orange,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#fff',
    fontWeight: '700',
  },

  cancel: {
    textAlign: 'center',
    marginTop: 12,
    color: colors.textSecondary,
  },
});
