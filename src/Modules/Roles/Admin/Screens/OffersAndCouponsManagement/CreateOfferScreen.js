import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCards from '../../../../Components/Card/CustomCards';
import CustomButton from '../../../../Components/Buttons/CustomButton';
import Colors from '../../../../../Constants/Colors';

// ─── MAIN
const AdminCreateOfferScreen = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    value: '',
    minOrder: '',
    expiry: '',
    applyTo: 'all',
    isActive: true,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    console.log('Offer Created:', form);
  };

  const Input = ({ label, ...props }) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );

  const SelectBtn = ({ label, active, onPress }) => (
    <Pressable
      onPress={onPress}
      style={[styles.selectBtn, active && styles.selectBtnActive]}
    >
      <Text style={[styles.selectText, active && styles.selectTextActive]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 📝 BASIC INFO */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Offer Details</Text>

          <Input
            label="Offer Title"
            value={form.title}
            onChangeText={v => handleChange('title', v)}
          />
          <Input
            label="Description"
            value={form.description}
            onChangeText={v => handleChange('description', v)}
          />
        </CustomCards>

        {/* 💸 DISCOUNT */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Discount</Text>

          {/* TYPE */}
          <View style={styles.row}>
            <SelectBtn
              label="Percentage"
              active={form.discountType === 'percentage'}
              onPress={() => handleChange('discountType', 'percentage')}
            />
            <SelectBtn
              label="Flat ₹"
              active={form.discountType === 'flat'}
              onPress={() => handleChange('discountType', 'flat')}
            />
          </View>

          <Input
            label="Value"
            value={form.value}
            keyboardType="numeric"
            onChangeText={v => handleChange('value', v)}
          />

          <Input
            label="Minimum Order Amount"
            value={form.minOrder}
            keyboardType="numeric"
            onChangeText={v => handleChange('minOrder', v)}
          />
        </CustomCards>

        {/* 📅 VALIDITY */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Validity</Text>

          <Input
            label="Expiry Date (DD/MM/YYYY)"
            value={form.expiry}
            onChangeText={v => handleChange('expiry', v)}
          />
        </CustomCards>

        {/* 🎯 APPLY TO */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Apply To</Text>

          <View style={styles.row}>
            <SelectBtn
              label="All Products"
              active={form.applyTo === 'all'}
              onPress={() => handleChange('applyTo', 'all')}
            />
            <SelectBtn
              label="Specific"
              active={form.applyTo === 'specific'}
              onPress={() => handleChange('applyTo', 'specific')}
            />
          </View>

          {form.applyTo === 'specific' && (
            <Pressable style={styles.selectProducts}>
              <Icon name="list-outline" size={16} color="#F97316" />
              <Text style={styles.selectProductsText}>Select Products</Text>
            </Pressable>
          )}
        </CustomCards>

        {/* ⚙️ STATUS */}
        <CustomCards style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.sectionTitle}>Active Offer</Text>
            <Switch
              value={form.isActive}
              onValueChange={v => handleChange('isActive', v)}
            />
          </View>
        </CustomCards>
      </ScrollView>

      {/* 🔥 SAVE BUTTON */}
      <View style={styles.footer}>
        <CustomButton
          title="Create Offer"
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

  // ROW
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  // SELECT
  selectBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },

  selectBtnActive: {
    backgroundColor: '#F97316',
  },

  selectText: {
    fontSize: 12,
    color: '#374151',
  },

  selectTextActive: {
    color: '#fff',
  },

  // PRODUCTS
  selectProducts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },

  selectProductsText: {
    color: '#F97316',
    fontSize: 12,
  },

  // SWITCH
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // FOOTER
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
});
export default AdminCreateOfferScreen;
