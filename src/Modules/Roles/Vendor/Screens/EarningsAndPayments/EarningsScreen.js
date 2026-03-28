import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── Dummy Data
const TABS = ['Today', 'Week', 'Month'];

const TRANSACTIONS = [
  { id: '1', customer: 'Rahul', amount: '₹120', time: '2:30 PM' },
  { id: '2', customer: 'Neha', amount: '₹80', time: '1:10 PM' },
  { id: '3', customer: 'Amit', amount: '₹240', time: '12:00 PM' },
];

// ─── MAIN
const Earnings = () => {
  const [selectedTab, setSelectedTab] = useState('Today');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 💰 EARNINGS CARD */}
        <LinearGradient
          colors={['#F97316', '#FB923C']}
          style={styles.earningsCard}
        >
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsAmount}>₹4,200</Text>

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.smallLabel}>Orders</Text>
              <Text style={styles.smallValue}>32</Text>
            </View>
            <View>
              <Text style={styles.smallLabel}>Avg Order</Text>
              <Text style={styles.smallValue}>₹130</Text>
            </View>
          </View>
        </LinearGradient>

        {/* 📊 TABS */}
        <View style={styles.tabsContainer}>
          {TABS.map(tab => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 📉 BREAKDOWN */}
        <CustomCards style={styles.breakdownCard}>
          <Text style={styles.sectionTitle}>Breakdown</Text>

          <Row label="Total Sales" value="₹5,000" />
          <Row label="Platform Fee" value="- ₹500" negative />
          <Row label="Delivery Charges" value="- ₹300" negative />
          <View style={styles.divider} />
          <Row label="Net Earnings" value="₹4,200" highlight />
        </CustomCards>

        {/* 📜 TRANSACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          <FlatList
            data={TRANSACTIONS}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <CustomCards style={styles.transactionCard}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.customer}>{item.customer}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>

                  <Text style={styles.amount}>{item.amount}</Text>
                </View>
              </CustomCards>
            )}
          />
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

  earningsCard: {
    margin: moderateScale(16),
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
  },

  earningsLabel: {
    color: '#fff',
    opacity: 0.8,
  },

  earningsAmount: {
    fontSize: moderateScale(28),
    fontFamily: Fonts.family.bold,
    color: '#fff',
    marginVertical: 6,
  },

  smallLabel: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 12,
  },

  smallValue: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 2,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  activeTab: {
    backgroundColor: '#F97316',
  },

  tabText: {
    fontSize: 12,
    color: '#374151',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },

  breakdownCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  section: {
    padding: 16,
  },

  transactionCard: {
    marginBottom: 10,
  },

  customer: {
    fontWeight: '600',
  },

  time: {
    fontSize: 11,
    color: '#6B7280',
  },

  amount: {
    color: '#16A34A',
    fontWeight: '700',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Earnings;
