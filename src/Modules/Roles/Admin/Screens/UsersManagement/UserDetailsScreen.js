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

// ─── MOCK ORDERS
const ORDERS = [
  { id: '1', amount: '₹250', status: 'Delivered', date: '12 Mar' },
  { id: '2', amount: '₹180', status: 'Pending', date: '10 Mar' },
  { id: '3', amount: '₹420', status: 'Cancelled', date: '08 Mar' },
];

const UserDetailsScreen = ({ route }) => {
  const { user } = route.params;

  const [isActive, setIsActive] = useState(user.active);

  const RoleBadge = ({ role }) => {
    let bg = '#E5E7EB';
    let color = '#374151';

    if (role === 'Customer') {
      bg = '#DBEAFE';
      color = '#2563EB';
    }
    if (role === 'Vendor') {
      bg = '#FEF3C7';
      color = '#F59E0B';
    }
    if (role === 'Admin') {
      bg = '#DCFCE7';
      color = '#16A34A';
    }

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color }]}>{role}</Text>
      </View>
    );
  };
  const StatBox = ({ label, value }) => (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
        {/* 👤 PROFILE */}
        <CustomCards style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.phone}>{user.phone}</Text>

              <RoleBadge role={user.role} />
            </View>

            <Switch value={isActive} onValueChange={setIsActive} />
          </View>
        </CustomCards>

        {/* 📊 STATS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>User Stats</Text>

          <View style={styles.statsRow}>
            <StatBox label="Orders" value="24" />
            <StatBox label="Total Spend" value="₹4,560" />
            <StatBox label="Avg Order" value="₹190" />
          </View>
        </CustomCards>

        {/* 🏪 VENDOR INFO */}
        {user.role === 'Vendor' && (
          <CustomCards style={styles.card}>
            <Text style={styles.sectionTitle}>Shop Info</Text>

            <Text style={styles.info}>Shop Name: Snack Hub</Text>
            <Text style={styles.info}>Rating: ⭐ 4.5</Text>
            <Text style={styles.info}>Total Products: 18</Text>
          </CustomCards>
        )}

        {/* 📦 ORDERS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Order History</Text>

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

          <ActionRow icon="call-outline" label="Call User" />
          <ActionRow icon="mail-outline" label="Send Email" />
          <ActionRow icon="trash-outline" label="Delete User" danger />
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

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  email: {
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

  // INFO
  info: {
    fontSize: 13,
    marginBottom: 4,
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
export default UserDetailsScreen;
