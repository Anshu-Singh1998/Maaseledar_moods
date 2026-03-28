import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  Alert,
  Animated,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { loginSuccess } from '../../redux/slices/authSlice';
import CustomTextInput from '../Components/TextInput/CustomTextInput';
import CustomButton from '../Components/Buttons/CustomButton';
import Fonts from '../Theme/Fonts';
import {
  surface,
  surfaceLight,
  dark,
  orange,
  orange_dark,
  oraLight,
  pale,
  background,
} from '../../Constants/Colors';

const WHITE = '#FFFFFF';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ── Entrance animations ──
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const blobScale = useRef(new Animated.Value(0.85)).current;
  const formSlide = useRef(new Animated.Value(60)).current;
  const formFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Blob pulse in
    Animated.spring(blobScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Header fade + slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 60,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Form slides up
    Animated.parallel([
      Animated.timing(formFade, {
        toValue: 1,
        duration: 500,
        delay: 350,
        useNativeDriver: true,
      }),
      Animated.spring(formSlide, {
        toValue: 0,
        friction: 8,
        tension: 60,
        delay: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isSmallDevice = height < 700;

 const handleLogin = () => {
  // 🧪 Dummy credentials
  if (email === 'customer@test.com' && password === '123456') {
    dispatch(
      loginSuccess({
        role: 'customer',
        user: { name: 'Customer User', email },
      })
    );
  } 
  else if (email === 'vendor@test.com' && password === '123456') {
    dispatch(
      loginSuccess({
        role: 'vendor',
        user: { name: 'Vendor User', email },
      })
    );
  } 
  else if (email === 'admin@test.com' && password === '123456') {
    dispatch(
      loginSuccess({
        role: 'admin',
        user: { name: 'Admin User', email },
      })
    );
  } 
  else {
    Alert.alert('Invalid Credentials', 'Try test credentials');
  }
};
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Decorative Top Section ── */}
          <View style={styles.topSection}>
            {/* Background blobs */}
            <Animated.View
              style={[styles.blob1, { transform: [{ scale: blobScale }] }]}
            />
            <Animated.View
              style={[styles.blob2, { transform: [{ scale: blobScale }] }]}
            />

            {/* Logo / Icon area */}
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🧆</Text>
              </View>
              <Text style={styles.brandName}>Namkeen Store</Text>
              <Text style={styles.brandTagline}>AUTHENTIC INDIAN TASTE</Text>
            </Animated.View>
          </View>

          {/* ── Form Card ── */}
          <Animated.View
            style={[
              styles.formCard,
              {
                opacity: formFade,
                transform: [{ translateY: formSlide }],
              },
            ]}
          >
            {/* Greeting */}
            <View style={styles.greetingRow}>
              <View>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
              </View>
              {/* Decorative dot cluster */}
              <View style={styles.dotCluster}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <View
                    key={i}
                    style={[styles.dot, { opacity: 0.15 + (i % 3) * 0.2 }]}
                  />
                ))}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Inputs */}
            <View style={styles.inputsContainer}>
              <CustomTextInput
                placeholder="Enter your email"
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />
              <CustomTextInput
                placeholder="Enter your password"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={styles.inputSpacing}
              />

              {/* Forgot Password */}
              <Text style={styles.forgotText} onPress={() => {}}>
                Forgot Password?
              </Text>
            </View>

            {/* Login Button */}
            <CustomButton
              title="Login"
              onPress={handleLogin}
              backgroundColor={orange}
              textColor={WHITE}
              style={styles.loginBtn}
            />

            {/* OR divider */}
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or continue with</Text>
              <View style={styles.orLine} />
            </View>

            {/* Social stub (visual only) */}
            {/* <View style={styles.socialRow}>
              <View style={styles.socialBtn}>
                <Text style={styles.socialIcon}>G</Text>
              </View>
              <View style={styles.socialBtn}>
                <Text style={styles.socialIcon}>f</Text>
              </View>
              <View style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🍎</Text>
              </View>
            </View> */}

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <Text
                style={styles.signupText}
                onPress={() => navigation.navigate('Register')}
              >
                Sign Up
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: oraLight,
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // ── Top decorative section ──
  topSection: {
    height: verticalScale(220),
    backgroundColor: oraLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  blob1: {
    position: 'absolute',
    width: moderateScale(240),
    height: moderateScale(240),
    borderRadius: moderateScale(120),
    backgroundColor: pale,
    top: -moderateScale(60),
    right: -moderateScale(60),
  },

  blob2: {
    position: 'absolute',
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(80),
    backgroundColor: '#FED7AA',
    bottom: -moderateScale(40),
    left: -moderateScale(30),
  },

  logoContainer: {
    alignItems: 'center',
    zIndex: 10,
  },

  logoCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: orange,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    marginBottom: moderateScale(12),
  },

  logoEmoji: {
    fontSize: moderateScale(36),
  },

  brandName: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.family.bold,
    color: dark,
    letterSpacing: 0.5,
  },

  brandTagline: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.family.regular,
    color: orange,
    letterSpacing: 2,
    marginTop: moderateScale(2),
  },

  // ── Form Card ──
  formCard: {
    flex: 1,
    backgroundColor: background,
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },

  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(20),
  },

  title: {
    fontSize: Fonts.size.xxxl ?? moderateScale(24),
    fontFamily: Fonts.family.bold,
    color: dark,
    lineHeight: moderateScale(32),
  },

  subtitle: {
    marginTop: verticalScale(4),
    fontSize: Fonts.size.md ?? moderateScale(14),
    fontFamily: Fonts.family.regular,
    color: surface,
  },

  // 3x3 dot decoration
  dotCluster: {
    width: moderateScale(42),
    height: moderateScale(42),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(5),
    paddingTop: moderateScale(4),
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: orange,
  },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: moderateScale(24),
  },

  // ── Inputs ──
  inputsContainer: {
    marginBottom: moderateScale(4),
  },

  inputSpacing: {
    marginBottom: verticalScale(14),
  },

  forgotText: {
    alignSelf: 'flex-end',
    fontSize: Fonts.size.sm ?? moderateScale(13),
    fontFamily: Fonts.family.semiBold,
    color: orange,
    marginTop: verticalScale(-6),
    marginBottom: verticalScale(10),
  },

  // ── Login Button ──
  loginBtn: {
    marginTop: verticalScale(10),
    borderRadius: moderateScale(14),
    shadowColor: orange,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  // ── OR divider ──
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
    gap: moderateScale(10),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    fontSize: moderateScale(12),
    color: surface,
    fontFamily: Fonts.family.regular,
  },

  // ── Social ──
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(16),
    marginBottom: verticalScale(24),
  },
  socialBtn: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(14),
    backgroundColor: surfaceLight,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: dark,
  },

  // ── Footer ──
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: Fonts.size.sm ?? moderateScale(13),
    fontFamily: Fonts.family.regular,
    color: surface,
  },
  signupText: {
    fontSize: Fonts.size.sm ?? moderateScale(13),
    fontFamily: Fonts.family.semiBold,
    color: orange,
  },
});

export default Login;
