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
const FILTERS = ['All', 'Customer', 'Vendor', 'Admin'];

// ─── MOCK USERS
const USERS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '+91 9876543210',
    role: 'Customer',
    active: true,
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: '2',
    name: 'Snack Hub',
    email: 'vendor@snackhub.com',
    phone: '+91 9123456789',
    role: 'Vendor',
    active: true,
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@store.com',
    phone: '+91 9000000000',
    role: 'Admin',
    active: true,
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
];

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const toggleStatus = id => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, active: !u.active } : u)),
    );
  };

  const filteredUsers = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === 'All' || u.role === filter;

    return matchSearch && matchFilter;
  });

  const UserCard = ({ item, onToggle, onPress }) => {
    return (
      <Pressable onPress={onPress}>
        <CustomCards style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.phone}>{item.phone}</Text>

              <RoleBadge role={item.role} />
            </View>

            <Switch value={item.active} onValueChange={onToggle} />
          </View>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <Pressable>
              <Icon name="call-outline" size={18} />
            </Pressable>

            <Pressable>
              <Icon name="mail-outline" size={18} />
            </Pressable>
          </View>
        </CustomCards>
      </Pressable>
    );
  };

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

  const EmptyState = () => (
    <View style={styles.empty}>
      <Icon name="people-outline" size={40} color="#9CA3AF" />
      <Text style={styles.emptyText}>No users found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="search" size={16} color="#6B7280" />
        <TextInput
          placeholder="Search users..."
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
        data={filteredUsers}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <UserCard
            item={item}
            onToggle={() => toggleStatus(item.id)}
            onPress={() => navigation.navigate('UserDetails', { user: item })}
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

  name: {
    fontWeight: '700',
  },

  email: {
    fontSize: 12,
    color: '#6B7280',
  },

  phone: {
    fontSize: 12,
    color: '#374151',
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
export default UserListScreen;
