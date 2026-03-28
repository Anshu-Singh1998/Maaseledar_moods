import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── Dummy Order
const ORDER = {
  id: '#ORD1234',
  status: 'New',
  time: '2:30 PM',
  customer: {
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    address: 'Salt Lake, Kolkata',
  },
  items: [
    { id: '1', name: 'Bikaneri Bhujia', qty: 2, price: 60 },
    { id: '2', name: 'Sev', qty: 1, price: 80 },
  ],
  subtotal: 200,
  delivery: 40,
  total: 240,
};

// ─── MAIN
const OrderDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 🧾 HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.orderId}>{ORDER.id}</Text>
            <Text style={styles.time}>{ORDER.time}</Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{ORDER.status}</Text>
          </View>
        </View>

        {/* 👤 CUSTOMER */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Customer</Text>

          <Text style={styles.name}>{ORDER.customer.name}</Text>

          <View style={styles.row}>
            <Icon name="call-outline" size={16} />
            <Text style={styles.info}>{ORDER.customer.phone}</Text>
          </View>

          <View style={styles.row}>
            <Icon name="location-outline" size={16} />
            <Text style={styles.info}>{ORDER.customer.address}</Text>
          </View>
        </CustomCards>

        {/* 🛒 ITEMS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Items</Text>

          {ORDER.items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name} x{item.qty}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
            </View>
          ))}
        </CustomCards>

        {/* 💰 BILL */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Bill Details</Text>

          <Row label="Subtotal" value={`₹${ORDER.subtotal}`} />
          <Row label="Delivery Fee" value={`₹${ORDER.delivery}`} />
          <View style={styles.divider} />
          <Row label="Total" value={`₹${ORDER.total}`} highlight />
        </CustomCards>

        {/* ⚡ ACTIONS */}
        <View style={styles.actions}>
          {ORDER.status === 'New' && (
            <>
              <Pressable style={styles.rejectBtn}>
                <Text style={styles.rejectText}>Reject</Text>
              </Pressable>

              <Pressable style={styles.acceptBtn}>
                <Text style={styles.acceptText}>Accept Order</Text>
              </Pressable>
            </>
          )}

          {ORDER.status === 'Preparing' && (
            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryText}>Mark as Ready</Text>
            </Pressable>
          )}

          {ORDER.status === 'Ready' && (
            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryText}>Hand Over</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  orderId: {
    fontSize: 16,
    fontFamily: Fonts.family.bold,
  },

  time: {
    color: '#6B7280',
    fontSize: 12,
  },

  statusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  statusText: {
    color: '#D97706',
    fontSize: 12,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  name: {
    fontWeight: '600',
    marginBottom: 6,
  },

  row: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },

  info: {
    color: '#6B7280',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  itemName: {
    color: '#111827',
  },

  itemPrice: {
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },

  acceptBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  rejectBtn: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: '#F97316',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  acceptText: {
    color: '#fff',
    fontWeight: '700',
  },

  rejectText: {
    color: '#DC2626',
    fontWeight: '700',
  },

  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
export default OrderDetails;
