import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import CustomButton from '../../../../Components/Buttons/CustomButton';
import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';

// ─── MAIN
const EditShop = () => {
  const [form, setForm] = useState({
    name: 'Sharma Namkeen Store',
    tagline: 'Authentic Taste of India',
    category: 'Namkeen & Snacks',
    address: 'Salt Lake, Kolkata',
    timing: '9:00 AM - 9:00 PM',
    description: 'Serving fresh and crispy namkeens with authentic flavors.',
  });

  const [banner, setBanner] = useState(
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800'
  );

  const [logo, setLogo] = useState('https://i.pravatar.cc/100');

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    console.log('Updated Shop:', form);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🖼 BANNER */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: banner }} style={styles.banner} />

          <Pressable style={styles.editBanner}>
            <Icon name="camera" size={16} color="#fff" />
          </Pressable>
        </View>

        {/* 🏪 LOGO */}
        <View style={styles.logoSection}>
          <View style={styles.logoWrapper}>
            <Image source={{ uri: logo }} style={styles.logo} />

            <Pressable style={styles.editLogo}>
              <Icon name="camera" size={14} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* 📝 BASIC INFO */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Info</Text>

          <Input label="Shop Name" value={form.name} onChangeText={(v) => handleChange('name', v)} />
          <Input label="Tagline" value={form.tagline} onChangeText={(v) => handleChange('tagline', v)} />
          <Input label="Category" value={form.category} onChangeText={(v) => handleChange('category', v)} />
        </CustomCards>

        {/* 📍 DETAILS */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Store Details</Text>

          <Input label="Address" value={form.address} onChangeText={(v) => handleChange('address', v)} />
          <Input label="Timings" value={form.timing} onChangeText={(v) => handleChange('timing', v)} />
        </CustomCards>

        {/* 📄 DESCRIPTION */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>

          <TextInput
            value={form.description}
            onChangeText={(v) => handleChange('description', v)}
            multiline
            style={styles.textArea}
          />
        </CustomCards>

      </ScrollView>

      {/* 🔥 SAVE */}
      <View style={styles.footer}>
        <CustomButton
          title="Save Changes"
          onPress={handleSave}
          backgroundColor={Colors.primary}
          textColor="#fff"
        />
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // 🖼 BANNER
  bannerContainer: {
    position: 'relative',
  },

  banner: {
    width: '100%',
    height: moderateScale(150),
  },

  editBanner: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#00000088',
    padding: 6,
    borderRadius: 20,
  },

  // 🏪 LOGO
  logoSection: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 10,
  },

  logoWrapper: {
    position: 'relative',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },

  editLogo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00000088',
    padding: 4,
    borderRadius: 20,
  },

  // 📦 CARD
  card: {
    margin: 16,
    marginBottom: 10,
    padding: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  // INPUT
  inputWrapper: {
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  textArea: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
  },

  // FOOTER
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
});
export default EditShop;