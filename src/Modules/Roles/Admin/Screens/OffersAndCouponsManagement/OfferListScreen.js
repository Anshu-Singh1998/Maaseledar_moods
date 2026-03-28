import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import Colors from '../../../../../Constants/Colors';

// ─── MOCK DATA
const INITIAL_OFFERS = [
  {
    id: '1',
    title: 'Flat ₹50 OFF',
    type: 'flat',
    value: 50,
    minOrder: 299,
    expiry: '30 Mar 2026',
    isActive: true,
  },
  {
    id: '2',
    title: '20% OFF',
    type: 'percentage',
    value: 20,
    minOrder: 199,
    expiry: '28 Mar 2026',
    isActive: false,
  },
];

// ─── MAIN
const AdminOfferListScreen = ({ navigation }) => {
  const [offers, setOffers] = useState(INITIAL_OFFERS);

  const toggleStatus = id => {
    setOffers(prev =>
      prev.map(o => (o.id === id ? { ...o, isActive: !o.isActive } : o)),
    );
  };

  const handleDelete = id => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const OfferCard = ({ item, onToggle, onDelete, onEdit }) => {
    return (
      <CustomCards style={styles.card}>
        {/* TOP ROW */}
        <View style={styles.topRow}>
          <Text style={styles.offerTitle}>{item.title}</Text>

          <View
            style={[
              styles.badge,
              item.isActive ? styles.active : styles.inactive,
            ]}
          >
            <Text style={styles.badgeText}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* DETAILS */}
        <Text style={styles.detail}>
          {item.type === 'percentage'
            ? `${item.value}% OFF`
            : `₹${item.value} OFF`}
        </Text>

        <Text style={styles.subDetail}>Min Order: ₹{item.minOrder}</Text>

        <Text style={styles.subDetail}>Expires: {item.expiry}</Text>

        {/* ACTION ROW */}
        <View style={styles.actionRow}>
          <Switch value={item.isActive} onValueChange={onToggle} />

          <View style={styles.actions}>
            <Pressable onPress={onEdit}>
              <Icon name="create-outline" size={18} color="#374151" />
            </Pressable>

            <Pressable onPress={onDelete}>
              <Icon name="trash-outline" size={18} color="red" />
            </Pressable>
          </View>
        </View>
      </CustomCards>
    );
  };
  const EmptyState = () => (
    <View style={styles.empty}>
      <Icon name="pricetags-outline" size={40} color="#9CA3AF" />
      <Text style={styles.emptyText}>No offers created yet</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Offers</Text>

        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate('CreateOffer')}
        >
          <Icon name="add" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* 📋 LIST */}
      <FlatList
        data={offers}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <OfferCard
            item={item}
            onToggle={() => toggleStatus(item.id)}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate('CreateOffer', { edit: item })}
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

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  addBtn: {
    backgroundColor: '#F97316',
    padding: 8,
    borderRadius: 20,
  },

  // CARD
  card: {
    marginBottom: 12,
    padding: 14,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  offerTitle: {
    fontWeight: '700',
    fontSize: 14,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  active: {
    backgroundColor: '#DCFCE7',
  },

  inactive: {
    backgroundColor: '#FEE2E2',
  },

  badgeText: {
    fontSize: 10,
  },

  detail: {
    fontWeight: '600',
    color: '#F97316',
  },

  subDetail: {
    fontSize: 12,
    color: '#6B7280',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },

  actions: {
    flexDirection: 'row',
    gap: 14,
  },

  // EMPTY
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: '#6B7280',
  },
});
export default AdminOfferListScreen;
