import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';

// ─── FILTERS
const FILTERS = ['All', 'Active', 'Blocked', 'Pending'];

// ─── MOCK DATA
const VENDORS = [
  {
    id: '1',
    shopName: 'Snack Hub',
    owner: 'Rahul Sharma',
    phone: '+91 9876543210',
    rating: 4.5,
    totalOrders: 120,
    active: true,
    status: 'Active',
    image: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: '2',
    shopName: 'Masala Junction',
    owner: 'Amit Verma',
    phone: '+91 9123456789',
    rating: 4.2,
    totalOrders: 80,
    active: false,
    status: 'Blocked',
    image: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: '3',
    shopName: 'Crunchy Bites',
    owner: 'Neha Singh',
    phone: '+91 9000000000',
    rating: 4.8,
    totalOrders: 200,
    active: true,
    status: 'Pending',
    image: 'https://i.pravatar.cc/100?img=13',
  },
];

const VendorListScreen = ({ navigation }) => {
  const [vendors, setVendors] = useState(VENDORS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const toggleStatus = id => {
    setVendors(prev =>
      prev.map(v =>
        v.id === id
          ? { ...v, active: !v.active, status: v.active ? 'Blocked' : 'Active' }
          : v,
      ),
    );
  };

  const filteredVendors = vendors.filter(v => {
    const matchSearch =
      v.shopName.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === 'All' || v.status === filter;

    return matchSearch && matchFilter;
  });

  const VendorCard = ({ item, onToggle, onPress }) => {
    return (
      <Pressable onPress={onPress}>
        <CustomCards style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.shopName}>{item.shopName}</Text>
              <Text style={styles.owner}>Owner: {item.owner}</Text>
              <Text style={styles.phone}>{item.phone}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                <Text style={styles.orders}>{item.totalOrders} orders</Text>
              </View>

              <StatusBadge status={item.status} />
            </View>

            <Switch value={item.active} onValueChange={onToggle} />
          </View>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <Pressable>
              <Icon name="call-outline" size={18} />
            </Pressable>

            {item.status === 'Pending' && (
              <Pressable>
                <Icon name="checkmark-circle-outline" size={18} color="green" />
              </Pressable>
            )}

            <Pressable>
              <Icon name="eye-outline" size={18} />
            </Pressable>
          </View>
        </CustomCards>
      </Pressable>
    );
  };
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

  const EmptyState = () => (
    <View style={styles.empty}>
      <Icon name="storefront-outline" size={40} color="#9CA3AF" />
      <Text style={styles.emptyText}>No vendors found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Vendors</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="search" size={16} color="#6B7280" />
        <TextInput
          placeholder="Search vendors..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* FILTER */}
      <View style={styles.filterRow}>
        {FILTERS.map(item => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filterBtn, filter === item && styles.filterActive]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.filterTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredVendors}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <VendorCard
            item={item}
            onToggle={() => toggleStatus(item.id)}
            onPress={() =>
              navigation.navigate('VendorDetails', { vendor: item })
            }
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

  // SEARCH
  searchBox: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    gap: 6,
  },

  searchInput: {
    flex: 1,
  },

  // FILTER
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8,
  },

  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  filterActive: {
    backgroundColor: '#F97316',
  },

  filterText: {
    fontSize: 12,
  },

  filterTextActive: {
    color: '#fff',
  },

  // CARD
  card: {
    marginBottom: 12,
    padding: 12,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  shopName: {
    fontWeight: '700',
  },

  owner: {
    fontSize: 12,
    color: '#6B7280',
  },

  phone: {
    fontSize: 12,
  },

  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },

  rating: {
    fontSize: 12,
  },

  orders: {
    fontSize: 12,
    color: '#6B7280',
  },

  badge: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 10,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 16,
  },

  empty: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: '#6B7280',
  },
});
export default VendorListScreen;
