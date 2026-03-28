import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import CustomButton from '../../../../Components/Buttons/CustomButton';

// ─── MOCK DATA
const PENDING_VENDORS = [
  {
    id: '1',
    shopName: 'Crunchy Bites',
    owner: 'Neha Singh',
    phone: '+91 9000000000',
    address: 'Delhi, India',
    fssai: 'FSSAI123456',
    gst: 'GSTIN998877',
    image: 'https://i.pravatar.cc/100?img=21',
  },
  {
    id: '2',
    shopName: 'Spicy Treats',
    owner: 'Amit Patel',
    phone: '+91 9876543210',
    address: 'Mumbai, India',
    fssai: 'FSSAI987654',
    gst: 'GSTIN554433',
    image: 'https://i.pravatar.cc/100?img=22',
  },
];

const VendorApprovalScreen = () => {
  const [vendors, setVendors] = useState(PENDING_VENDORS);

  const handleApprove = id => {
    Alert.alert('Approved', 'Vendor approved successfully');
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  const handleReject = id => {
    Alert.alert('Rejected', 'Vendor rejected');
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  const VendorApprovalCard = ({ item, onApprove, onReject }) => {
    return (
      <CustomCards style={styles.card}>
        {/* TOP */}
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text style={styles.shopName}>{item.shopName}</Text>
            <Text style={styles.owner}>Owner: {item.owner}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.details}>
          <InfoRow icon="location-outline" text={item.address} />
          <InfoRow icon="document-text-outline" text={`FSSAI: ${item.fssai}`} />
          <InfoRow icon="receipt-outline" text={`GST: ${item.gst}`} />
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <CustomButton
            title="Reject"
            onPress={onReject}
            backgroundColor="#FEE2E2"
            textColor="#DC2626"
            style={styles.btn}
          />

          <CustomButton
            title="Approve"
            onPress={onApprove}
            backgroundColor="#DCFCE7"
            textColor="#16A34A"
            style={styles.btn}
          />
        </View>
      </CustomCards>
    );
  };

  const InfoRow = ({ icon, text }) => (
    <View style={styles.infoRow}>
      <Icon name={icon} size={16} color="#6B7280" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.empty}>
      <Icon name="checkmark-done-outline" size={40} color="#16A34A" />
      <Text style={styles.emptyText}>All vendors are reviewed 🎉</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Vendor Approvals</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={vendors}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <VendorApprovalCard
            item={item}
            onApprove={() => handleApprove(item.id)}
            onReject={() => handleReject(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  card: {
    marginBottom: 12,
    padding: 14,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  shopName: {
    fontSize: 15,
    fontWeight: '700',
  },

  owner: {
    fontSize: 12,
    color: '#6B7280',
  },

  phone: {
    fontSize: 12,
  },

  details: {
    marginTop: 10,
    gap: 6,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  infoText: {
    fontSize: 12,
    color: '#374151',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 10,
  },

  btn: {
    flex: 1,
    borderRadius: 10,
  },

  empty: {
    alignItems: 'center',
    marginTop: 100,
  },

  emptyText: {
    marginTop: 10,
    color: '#6B7280',
  },
});
export default VendorApprovalScreen;
