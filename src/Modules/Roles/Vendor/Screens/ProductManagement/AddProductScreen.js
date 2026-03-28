import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../../Constants/Colors';
import Fonts from '../../../../Theme/Fonts';
import CustomButton from '../../../../Components/Buttons/CustomButton';
import CustomCards from '../../../../Components/Card/CustomCards';

// ─── MAIN
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [inStock, setInStock] = useState(true);

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discount: '',
    stock: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 📸 IMAGE UPLOAD */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Product Image</Text>

          <Pressable style={styles.imageUpload}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <>
                <Icon name="camera-outline" size={28} color="#9CA3AF" />
                <Text style={styles.uploadText}>Upload Image</Text>
              </>
            )}
          </Pressable>
        </CustomCards>

        {/* 📝 BASIC INFO */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Info</Text>

          <Input
            label="Product Name"
            value={form.name}
            onChangeText={(v) => handleChange('name', v)}
          />

          <Input
            label="Description"
            value={form.description}
            onChangeText={(v) => handleChange('description', v)}
            multiline
          />

          <Input
            label="Category"
            value={form.category}
            onChangeText={(v) => handleChange('category', v)}
          />
        </CustomCards>

        {/* 💰 PRICING */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing</Text>

          <View style={styles.row}>
            <Input
              label="Price"
              value={form.price}
              onChangeText={(v) => handleChange('price', v)}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
            <Input
              label="Discount %"
              value={form.discount}
              onChangeText={(v) => handleChange('discount', v)}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
          </View>
        </CustomCards>

        {/* 📦 STOCK */}
        <CustomCards style={styles.card}>
          <Text style={styles.sectionTitle}>Inventory</Text>

          <Input
            label="Stock Quantity"
            value={form.stock}
            onChangeText={(v) => handleChange('stock', v)}
            keyboardType="numeric"
          />

          <View style={styles.switchRow}>
            <Text style={styles.label}>In Stock</Text>
            <Switch
              value={inStock}
              onValueChange={setInStock}
              thumbColor={inStock ? '#F97316' : '#ccc'}
            />
          </View>
        </CustomCards>

      </ScrollView>

      {/* 🔥 SAVE BUTTON */}
      <View style={styles.footer}>
        <CustomButton
          title="Save Product"
          onPress={() => {}}
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
    marginBottom: 12,
    fontSize: 14,
  },

  imageUpload: {
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadText: {
    marginTop: 6,
    color: '#6B7280',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

  inputWrapper: {
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: '#374151',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },

  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
});
export default AddProduct;