import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';

const CustomImageCard = ({
  image,
  title,
  location,
  price,
  description,
  rating,
  owner,
  onPress,
  onWishlistPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
    >
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />

        {/* Wishlist */}
        <Pressable
          onPress={onWishlistPress}
          style={styles.wishlistBtn}
        >
          <Icon name="heart-outline" size={18} color="#16A34A" />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Location */}
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color="#16A34A" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Title */}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {/* Price */}
        <Text style={styles.price}>
          ${price}
          <Text style={styles.perDay}> / per day</Text>
        </Text>

        {/* Description */}
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.ownerRow}>
            <View style={styles.avatar} />
            <Text style={styles.ownerText}>By {owner}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>{rating}</Text>
            <Icon name="star" size={14} color="#F59E0B" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    overflow: 'hidden',

    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },

  pressed: {
    opacity: 0.95,
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: moderateScale(180),
  },

  wishlistBtn: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    padding: moderateScale(6),
  },

  content: {
    padding: moderateScale(14),
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },

  locationText: {
    marginLeft: 4,
    fontSize: moderateScale(12),
    color: '#16A34A',
    fontWeight: '500',
  },

  title: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#111827',
  },

  price: {
    marginTop: moderateScale(4),
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#16A34A',
  },

  perDay: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#16A34A',
  },

  description: {
    marginTop: moderateScale(6),
    fontSize: moderateScale(13),
    color: '#6B7280',
    lineHeight: moderateScale(18),
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: moderateScale(10),
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: 11,
    backgroundColor: '#E5E7EB',
    marginRight: 6,
  },

  ownerText: {
    fontSize: moderateScale(12),
    color: '#374151',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    marginRight: 4,
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#111827',
  },
});

export default CustomImageCard;