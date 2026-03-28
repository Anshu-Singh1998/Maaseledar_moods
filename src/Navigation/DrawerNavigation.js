import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import BottomNavigation from './BottomNavigation';
import colors from '../Constants/Colors';

const Drawer = createDrawerNavigator();

// ─── Custom Drawer Content ────────────────────────────────────────────
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.drawerScroll}
    >
      {/* ── Header / User Info ── */}
      <View style={styles.drawerHeader}>
        <View style={styles.headerBlob} />
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>RK</Text>
        </View>
        <Text style={styles.userName}>Rajesh Kumar</Text>
        <Text style={styles.userEmail}>rajesh.kumar@gmail.com</Text>
        <View style={styles.memberBadge}>
          <Icon name="star" size={moderateScale(12)} color={colors.orange} />
          <Text style={styles.memberText}>Gold Member</Text>
        </View>
      </View>

      {/* ── Nav Items ── */}
      <View style={styles.itemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* ── Footer ── */}
      <View style={styles.drawerFooter}>
        <View style={styles.footerDivider} />

        <Pressable
          style={({ pressed }) => [styles.footerRow, pressed && { opacity: 0.6 }]}
          onPress={() => {}}
        >
          <View style={[styles.footerIconWrap, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="help-outline" size={moderateScale(18)} color="#F59E0B" />
          </View>
          <Text style={styles.footerLabel}>Help & Support</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.footerRow, pressed && { opacity: 0.6 }]}
          onPress={() => {}}
        >
          <View style={[styles.footerIconWrap, { backgroundColor: '#FEE2E2' }]}>
            <Icon name="logout" size={moderateScale(18)} color="#EF4444" />
          </View>
          <Text style={[styles.footerLabel, { color: '#EF4444' }]}>Logout</Text>
        </Pressable>

        <Text style={styles.versionText}>Namkeen Store • v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

// ─── Main Navigator ───────────────────────────────────────────────────
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,

        drawerActiveTintColor:       colors.orange,
        drawerInactiveTintColor:     colors.dark,
        drawerActiveBackgroundColor: colors.oraLight,

        drawerStyle: {
          backgroundColor: colors.background,
          width: moderateScale(280),
        },

        drawerLabelStyle: {
          fontSize: moderateScale(14),
          fontWeight: '500',
          marginLeft: -moderateScale(8),
        },

        drawerItemStyle: {
          borderRadius: moderateScale(12),
          marginVertical: moderateScale(2),
          paddingHorizontal: moderateScale(4),
        },

        drawerHideStatusBarOnOpen: true,
        drawerStatusBarAnimation: 'slide',
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={BottomNavigation}
        initialParams={{ screen: 'Home' }}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CategoriesDrawer"
        component={BottomNavigation}
        initialParams={{ screen: 'Categories' }}
        options={{
          title: 'Categories',
          drawerIcon: ({ color, size }) => (
            <Icon name="category" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FavouritesDrawer"
        component={BottomNavigation}
        initialParams={{ screen: 'Favourites' }}
        options={{
          title: 'Favourites',
          drawerIcon: ({ color, size }) => (
            <Icon name="favorite" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={BottomNavigation}
        initialParams={{ screen: 'Profile' }}
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  drawerScroll: {
    flexGrow: 1,
  },

  drawerHeader: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
    position: 'relative',
    overflow: 'hidden',
  },
  headerBlob: {
    position: 'absolute',
    width: moderateScale(180),
    height: moderateScale(180),
    borderRadius: moderateScale(90),
    backgroundColor: colors.oraLight,
    top: -moderateScale(60),
    right: -moderateScale(50),
  },
  avatarCircle: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(12),
    shadowColor: colors.orange,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  avatarInitials: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  userName: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: colors.dark,
  },
  userEmail: {
    fontSize: moderateScale(12),
    color: colors.textSecondary,
    marginTop: moderateScale(2),
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
    backgroundColor: colors.pale,
    alignSelf: 'flex-start',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    marginTop: moderateScale(10),
  },
  memberText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: colors.orange,
  },

  itemsContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(8),
    paddingTop: moderateScale(4),
  },

  drawerFooter: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(24),
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: verticalScale(12),
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
    paddingVertical: moderateScale(10),
  },
  footerIconWrap: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.dark,
  },
  versionText: {
    marginTop: moderateScale(16),
    fontSize: moderateScale(11),
    color: colors.textDisabled,
    textAlign: 'center',
  },
});

export default DrawerNavigation;