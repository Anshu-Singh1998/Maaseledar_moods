import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── Dummy Data
const STATS = [
  { title: 'Today Orders', value: '32', change: '+12%', icon: 'bag-handle' },
  { title: 'Revenue', value: '₹4,200', change: '+8%', icon: 'wallet' },
  { title: 'Pending', value: '8', change: '-3%', icon: 'time' },
];

const ORDERS = [
  { id: '1', name: 'Rahul', item: 'Bhujia x2', amount: '₹120', status: 'New' },
  { id: '2', name: 'Neha', item: 'Sev x1', amount: '₹80', status: 'Preparing' },
];

// ─── Dashboard
const VendorDashboard = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 PREMIUM HEADER */}
        <LinearGradient colors={['#F97316', '#FB923C']} style={styles.header}>
          <View>
            <Text style={styles.shopName}>Anshu Namkeen</Text>
            <Text style={styles.headerSub}>Kolkata • Fast Delivery</Text>
          </View>

          <Pressable
            style={styles.statusBtn}
            onPress={() => setIsOpen(!isOpen)}
          >
            <Text style={styles.statusText}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
          </Pressable>
        </LinearGradient>

        {/* 💰 BIG STATS */}
        <View style={styles.statsContainer}>
          {STATS.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <Icon name={item.icon} size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statTitle}>{item.title}</Text>

              <Text
                style={[
                  styles.changeText,
                  { color: item.change.includes('+') ? '#16A34A' : '#DC2626' },
                ]}
              >
                {item.change}
              </Text>
            </View>
          ))}
        </View>

        {/* ⚡ QUICK ACTIONS */}
        <View style={styles.quickActions}>
          <ActionBtn
            icon="add-circle"
            label="Add Product"
            onPress={() => navigation.navigate('Products')}
          />
          <ActionBtn
            icon="list"
            label="Orders"
            onPress={() => navigation.navigate('Orders')}
          />
          <ActionBtn
            icon="analytics"
            label="Analytics"
            onPress={() => navigation.navigate('Analytics')}
          />
          <ActionBtn
            icon="cash"
            label="Earnings"
            onPress={() => navigation.navigate('Earnings')}
          />
        </View>

        {/* 📦 LIVE ORDERS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Orders</Text>

          {ORDERS.map(order => (
            <CustomCards key={order.id} style={styles.orderCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.customer}>{order.name}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{order.status}</Text>
                </View>
              </View>

              <Text style={styles.item}>{order.item}</Text>

              <View style={styles.rowBetween}>
                <Text style={styles.amount}>{order.amount}</Text>
                <Pressable style={styles.acceptBtn}>
                  <Text style={styles.acceptText}>Accept</Text>
                </Pressable>
              </View>
            </CustomCards>
          ))}
        </View>

        {/* 💡 SMART INSIGHT */}
        <CustomCards style={styles.insightCard}>
          <Icon name="bulb" size={20} color="#F59E0B" />
          <Text style={styles.insightText}>
            Your orders increased by 12% today. Try adding combo offers 🚀
          </Text>
        </CustomCards>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Action Button
const ActionBtn = ({ icon, label, onPress }) => (
  <Pressable style={styles.actionBtn} onPress={onPress}>
    <Icon name={icon} size={22} color={Colors.primary} />
    <Text style={styles.actionText}>{label}</Text>
  </Pressable>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    padding: moderateScale(16),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  shopName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: Fonts.family.bold,
  },

  headerSub: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },

  statusBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: '#F97316',
    fontWeight: '700',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  statCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
  },

  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },

  statTitle: {
    fontSize: 12,
    color: '#6B7280',
  },

  changeText: {
    fontSize: 11,
    marginTop: 4,
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  actionBtn: {
    alignItems: 'center',
  },

  actionText: {
    fontSize: 11,
    marginTop: 4,
  },

  section: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  orderCard: {
    marginBottom: 10,
  },

  customer: {
    fontWeight: '700',
  },

  item: {
    color: '#6B7280',
    marginVertical: 4,
  },

  amount: {
    color: '#F97316',
    fontWeight: '700',
  },

  acceptBtn: {
    backgroundColor: '#F97316',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  acceptText: {
    color: '#fff',
    fontSize: 12,
  },

  statusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  statusBadgeText: {
    fontSize: 11,
    color: '#D97706',
  },

  insightCard: {
    flexDirection: 'row',
    gap: 10,
    margin: 16,
    padding: 14,
    backgroundColor: '#FFFBEB',
  },

  insightText: {
    flex: 1,
    fontSize: 13,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default VendorDashboard;
