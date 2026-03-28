import React, { useState, useRef, useEffect } from 'react';
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
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomTextInput from '../Components/TextInput/CustomTextInput';
import CustomButton from '../Components/Buttons/CustomButton';
import Fonts from '../Theme/Fonts';
import {
  background,
  surface,
  dark,
  orange,
  oraLight,
  pale,
  textSecondary,
  border,
} from '../../Constants/Colors';

const WHITE = '#FFFFFF';
const RED = '#EF4444';

// ─── Inline Checkbox ─────────────────────────────────────────────────
const CustomCheckbox = ({ value, onValueChange, label, error }) => (
  <Pressable
    onPress={() => onValueChange(!value)}
    style={styles.checkboxRow}
    hitSlop={6}
  >
    <View style={[
      styles.checkboxBox,
      value && styles.checkboxBoxChecked,
      error && !value && styles.checkboxBoxError,
    ]}>
      {value && <Icon name="checkmark" size={moderateScale(13)} color={WHITE} />}
    </View>
    <Text style={[styles.checkboxLabel, error && !value && { color: RED }]}>
      {label}
    </Text>
  </Pressable>
);

// ─── Step Indicator ───────────────────────────────────────────────────
const StepDot = ({ active, done }) => (
  <View style={[
    styles.stepDot,
    active && styles.stepDotActive,
    done && styles.stepDotDone,
  ]}>
    {done && <Icon name="checkmark" size={moderateScale(10)} color={WHITE} />}
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────
const Register = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = height < 700;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState(false);

  // ── Animations ──
  const blobScale  = useRef(new Animated.Value(0.85)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;
  const formFade   = useRef(new Animated.Value(0)).current;
  const formSlide  = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.spring(blobScale, {
      toValue: 1, friction: 6, tension: 40, useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 60, delay: 150, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(formFade, { toValue: 1, duration: 500, delay: 350, useNativeDriver: true }),
      Animated.spring(formSlide, { toValue: 0, friction: 8, tension: 60, delay: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  // simple inline progress: count filled fields
  const filledCount = [name, email, mobile, password, confirmPassword].filter(Boolean).length;
  const totalFields = 5;
  const progress = filledCount / totalFields;

  const handleSignup = () => {
    if (!accepted) {
      setError(true);
      Alert.alert('Terms Required', 'Please accept the Terms & Conditions to continue.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    setError(false);
    Alert.alert('Success', 'Account created!');
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

          {/* ── Decorative Top ── */}
          <View style={styles.topSection}>
            <Animated.View style={[styles.blob1, { transform: [{ scale: blobScale }] }]} />
            <Animated.View style={[styles.blob2, { transform: [{ scale: blobScale }] }]} />
            <Animated.View style={[styles.blob3, { transform: [{ scale: blobScale }] }]} />

            <Animated.View
              style={[
                styles.logoContainer,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              {/* Back button */}
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <Icon name="arrow-back" size={moderateScale(20)} color={dark} />
              </Pressable>

              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🧆</Text>
              </View>
              <Text style={styles.brandName}>Namkeen Store</Text>
              <Text style={styles.brandTagline}>JOIN THE SNACK FAMILY</Text>
            </Animated.View>
          </View>

          {/* ── Form Card ── */}
          <Animated.View
            style={[
              styles.formCard,
              { opacity: formFade, transform: [{ translateY: formSlide }] },
            ]}
          >
            {/* Title row */}
            <View style={styles.greetingRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Create Account ✨</Text>
                <Text style={styles.subtitle}>Fill in your details to sign up</Text>
              </View>
              {/* Dot cluster */}
              <View style={styles.dotCluster}>
                {[0,1,2,3,4,5,6,7,8].map(i => (
                  <View key={i} style={[styles.dot, { opacity: 0.15 + (i % 3) * 0.2 }]} />
                ))}
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressWrapper}>
              <View style={styles.progressTrack}>
                <Animated.View
                  style={[styles.progressFill, { width: `${progress * 100}%` }]}
                />
              </View>
              <Text style={styles.progressLabel}>{filledCount}/{totalFields} fields filled</Text>
            </View>

            <View style={styles.divider} />

            {/* ── Inputs ── */}
            <View style={styles.inputsContainer}>
              <CustomTextInput
                placeholder="Enter your full name"
                label="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                containerStyle={styles.inputSpacing}
              />
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
                placeholder="Enter your mobile number"
                label="Mobile"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                containerStyle={styles.inputSpacing}
              />
              <CustomTextInput
                placeholder="Create a password"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={styles.inputSpacing}
              />
              <CustomTextInput
                placeholder="Confirm your password"
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                containerStyle={styles.inputSpacing}
              />

              {/* Password match indicator */}
              {confirmPassword.length > 0 && (
                <View style={styles.matchRow}>
                  <Icon
                    name={password === confirmPassword ? 'checkmark-circle' : 'close-circle'}
                    size={moderateScale(14)}
                    color={password === confirmPassword ? '#16A34A' : RED}
                  />
                  <Text style={[
                    styles.matchText,
                    { color: password === confirmPassword ? '#16A34A' : RED }
                  ]}>
                    {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                  </Text>
                </View>
              )}

              {/* Terms checkbox */}
              <CustomCheckbox
                value={accepted}
                onValueChange={setAccepted}
                label="I accept the Terms & Conditions and Privacy Policy"
                error={error}
              />
            </View>

            {/* CTA */}
            <CustomButton
              title="Create Account"
              onPress={handleSignup}
              backgroundColor={orange}
              textColor={WHITE}
              style={styles.signupBtn}
            />

            {/* OR divider */}
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or sign up with</Text>
              <View style={styles.orLine} />
            </View>

            {/* Social stubs */}
            <View style={styles.socialRow}>
              <View style={styles.socialBtn}>
                <Text style={styles.socialIcon}>G</Text>
              </View>
              <View style={styles.socialBtn}>
                <Text style={styles.socialIcon}>f</Text>
              </View>
              <View style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🍎</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </View>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: oraLight,
  },
  flex: { flex: 1 },
  scrollContainer: { flexGrow: 1 },

  // Top section
  topSection: {
    height: verticalScale(200),
    backgroundColor: oraLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  blob1: {
    position: 'absolute',
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: moderateScale(110),
    backgroundColor: pale,
    top: -moderateScale(70),
    right: -moderateScale(50),
  },
  blob2: {
    position: 'absolute',
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: '#FED7AA',
    bottom: -moderateScale(40),
    left: -moderateScale(30),
  },
  blob3: {
    position: 'absolute',
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: pale,
    top: moderateScale(20),
    left: moderateScale(30),
  },

  logoContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  backBtn: {
    position: 'absolute',
    top: -verticalScale(60),
    left: -moderateScale(120),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  logoCircle: {
    width: moderateScale(72),
    height: moderateScale(72),
    borderRadius: moderateScale(36),
    backgroundColor: background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: orange,
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
    marginBottom: moderateScale(10),
  },
  logoEmoji: { fontSize: moderateScale(32) },
  brandName: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.family.bold,
    color: dark,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: moderateScale(9),
    fontFamily: Fonts.family.regular,
    color: orange,
    letterSpacing: 2,
    marginTop: moderateScale(2),
  },

  // Form card
  formCard: {
    flex: 1,
    backgroundColor: background,
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(28),
    paddingBottom: moderateScale(24),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },

  // Greeting
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(16),
  },
  title: {
    fontSize: Fonts.size.xxxl ?? moderateScale(22),
    fontFamily: Fonts.family.bold,
    color: dark,
    lineHeight: moderateScale(30),
  },
  subtitle: {
    marginTop: verticalScale(4),
    fontSize: Fonts.size.md ?? moderateScale(14),
    fontFamily: Fonts.family.regular,
    color: surface,
  },
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

  // Progress bar
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginBottom: moderateScale(16),
  },
  progressTrack: {
    flex: 1,
    height: moderateScale(6),
    backgroundColor: pale,
    borderRadius: moderateScale(3),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: orange,
    borderRadius: moderateScale(3),
  },
  progressLabel: {
    fontSize: moderateScale(11),
    color: surface,
    fontFamily: Fonts.family.regular,
    minWidth: moderateScale(70),
    textAlign: 'right',
  },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: moderateScale(20),
  },

  // Inputs
  inputsContainer: {
    marginBottom: moderateScale(4),
  },
  inputSpacing: {
    marginBottom: verticalScale(12),
  },

  // Password match
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
    marginTop: -verticalScale(4),
    marginBottom: verticalScale(10),
  },
  matchText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.family.regular,
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: moderateScale(10),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(16),
  },
  checkboxBox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(5),
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(1),
    flexShrink: 0,
  },
  checkboxBoxChecked: {
    backgroundColor: orange,
    borderColor: orange,
  },
  checkboxBoxError: {
    borderColor: RED,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: moderateScale(13),
    fontFamily: Fonts.family.regular,
    color: surface,
    lineHeight: moderateScale(19),
  },

  // CTA
  signupBtn: {
    borderRadius: moderateScale(14),
    shadowColor: orange,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  // OR divider
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(18),
    gap: moderateScale(10),
  },
  orLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: {
    fontSize: moderateScale(12),
    color: surface,
    fontFamily: Fonts.family.regular,
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(16),
    marginBottom: verticalScale(20),
  },
  socialBtn: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(14),
    backgroundColor: '#F9FAFB',
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

  // Footer
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
  loginText: {
    fontSize: Fonts.size.sm ?? moderateScale(13),
    fontFamily: Fonts.family.semiBold,
    color: orange,
  },
});

export default Register;