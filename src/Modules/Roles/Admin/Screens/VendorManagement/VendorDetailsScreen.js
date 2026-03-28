import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';

// ─── MOCK DATA
const ORDERS = [
  { id: '1', amount: '₹340', status: 'Delivered', date: '12 Mar' },
  { id: '2', amount: '₹120', status: 'Pending', date: '10 Mar' },
];

const PRODUCTS = [
  { id: '1', name: 'Bikaneri Bhujia', price: '₹120' },
  { id: '2', name: 'Ratlami Sev', price: '₹95' },
];

const VendorDetailsScreen = ({ route }) => {
  const { vendor } = route.params;

  const [isActive, setIsActive] = useState(vendor.active);
  const StatusBadge = ({ status }) => {
    let bg = '#E5E7EB';
    let color = '#374151';

    if (status === 'Active') {
      bg = '#DCFCE7';
      color = '#16A34A';
    }
    if (status === 'Blocked') {
      bg = '#FEE2E2';
      color = '#DC2626';
    }
    if (status === 'Pending') {
      bg = '#FEF3C7';
      color = '#F59E0B';
    }

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color }]}>{status}</Text>
      </View>
    );
  };
  const StatBox = ({ label, value }) => (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
  const ProductRow = ({ item }) => (
    <View style={styles.productRow}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );
  const OrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.orderAmount}>{item.amount}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>
    </View>
  );

  const ActionRow = ({ icon, label, danger }) => (
    <Pressable style={styles.actionRow}>
      <Icon name={icon} size={18} color={danger ? 'red' : '#374151'} />
      <Text style={[styles.actionText, danger && { color: 'red' }]}>
        {label}
      </Text>
    </Pressable>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 🏪 SHOP PROFILE */}
        <CustomCards style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={{ uri: vendor.image }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.shopName}>{vendor.shopName}</Text>
              <Text style={styles.owner}>Owner: {vendor.owner}</Text>
              <Text style={styles.phone}>{vendor.phone}</Text>

              <StatusBadge status={vendor.status} />
            </View>

            <Switch value={isActive} onValueChange={setIsActive} />
          </View>
        </CustomCards>

        {/* 📊 STATS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Vendor Stats</Text>

          <View style={styles.statsRow}>
            <StatBox label="Orders" value="245" />
            <StatBox label="Earnings" value="₹52K" />
            <StatBox label="Rating" value="⭐ 4.6" />
          </View>
        </CustomCards>

        {/* 📦 PRODUCTS */}
        <CustomCards style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Products</Text>
            <Pressable>
              <Text style={styles.link}>View All</Text>
            </Pressable>
          </View>

          {PRODUCTS.map(item => (
            <View key={item.id} style={styles.productRow}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          ))}
        </CustomCards>

        {/* 📦 ORDERS */}
        <CustomCards style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <Pressable>
              <Text style={styles.link}>View All</Text>
            </Pressable>
          </View>

          <FlatList
            data={ORDERS}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => <OrderItem item={item} />}
          />
        </CustomCards>

        {/* ⚡ ACTIONS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Actions</Text>

          {vendor.status === 'Pending' && (
            <ActionRow icon="checkmark-circle-outline" label="Approve Vendor" />
          )}

          <ActionRow icon="call-outline" label="Call Vendor" />
          <ActionRow icon="mail-outline" label="Send Email" />
          <ActionRow icon="ban-outline" label="Block Vendor" danger />
          <ActionRow icon="trash-outline" label="Delete Vendor" danger />
        </CustomCards>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  card: {
    marginBottom: 12,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  link: {
    color: '#F97316',
    fontSize: 12,
    fontWeight: '600',
  },

  // PROFILE
  profileRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  shopName: {
    fontSize: 16,
    fontWeight: '700',
  },

  owner: {
    fontSize: 12,
    color: '#6B7280',
  },

  phone: {
    fontSize: 12,
  },

  badge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  badgeText: {
    fontSize: 10,
  },

  // STATS
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontWeight: '700',
    fontSize: 16,
  },

  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  // PRODUCT
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  productName: {
    fontSize: 13,
  },

  productPrice: {
    fontWeight: '700',
  },

  // ORDER
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  orderId: {
    fontWeight: '600',
  },

  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },

  orderAmount: {
    fontWeight: '700',
  },

  orderStatus: {
    fontSize: 12,
    color: '#6B7280',
  },

  // ACTION
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },

  actionText: {
    fontSize: 14,
  },
});
export default VendorDetailsScreen;
