import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';

const LOGO = require('../assets/images/logo.jpg');

export default function LoginScreen() {
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('803 555 0192');

  const handleGetOtp = () => {
    router.push({ pathname: '/otp', params: { phone } });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={[styles.glow, styles.glowLeft]} />
            <View style={[styles.glow, styles.glowRight]} />

            <View style={styles.logoWrap}>
              <Image source={LOGO} style={styles.logo} resizeMode="cover" />
              <View style={styles.flagBadge}>
                <Text style={styles.flagText}>🇳🇬</Text>
              </View>
            </View>

            <View style={styles.brandPill}>
              <Ionicons name="shield-checkmark" size={12} color={SwiftColors.emeraldDark} />
              <Text style={styles.brandPillText}>Swift9JA Nigeria • Super App</Text>
            </View>

            <Text style={styles.title}>Welcome to Swift9JA</Text>
            <Text style={styles.subtitle}>Mobility, Food & Payments in One App.</Text>
          </View>

          <View style={[styles.card, SwiftShadow.card]}>
            <View style={styles.tabSwitcher}>
              <Pressable
                style={[styles.tabButton, tab === 'phone' && [styles.tabButtonActive, SwiftShadow.card]]}
                onPress={() => setTab('phone')}>
                <Ionicons
                  name="call"
                  size={14}
                  color={tab === 'phone' ? SwiftColors.textPrimary : SwiftColors.textSecondary}
                />
                <Text style={[styles.tabButtonText, tab === 'phone' && styles.tabButtonTextActive]}>
                  Phone Number
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tabButton, tab === 'email' && [styles.tabButtonActive, SwiftShadow.card]]}
                onPress={() => setTab('email')}>
                <Ionicons
                  name="mail"
                  size={14}
                  color={tab === 'email' ? SwiftColors.textPrimary : SwiftColors.textSecondary}
                />
                <Text style={[styles.tabButtonText, tab === 'email' && styles.tabButtonTextActive]}>
                  Email / BVN
                </Text>
              </Pressable>
            </View>

            {tab === 'phone' ? (
              <View style={styles.panel}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>MOBILE PHONE NUMBER</Text>
                  <Text style={styles.fieldLabelAccent}>INSTANT OTP</Text>
                </View>
                <View style={styles.phoneInputRow}>
                  <View style={[styles.countryPill, SwiftShadow.card]}>
                    <Text style={styles.flagInline}>🇳🇬</Text>
                    <Text style={styles.countryCode}>+234</Text>
                    <Ionicons name="chevron-down" size={10} color={SwiftColors.textPrimary} />
                  </View>
                  <TextInput
                    style={styles.phoneInput}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="803 555 0192"
                    placeholderTextColor={SwiftColors.textMuted}
                  />
                  <Ionicons name="checkmark-circle" size={18} color={SwiftColors.emerald} />
                </View>

                <View style={styles.benefitRow}>
                  <Ionicons name="flash" size={14} color={SwiftColors.amber} />
                  <Text style={styles.benefitText}>
                    SMS OTP arrives in &lt;10s via MTN, Airtel, Glo & 9mobile
                  </Text>
                </View>

                <Pressable style={styles.primaryButton} onPress={handleGetOtp}>
                  <Text style={styles.primaryButtonText}>Get 6-Digit OTP Code</Text>
                  <Ionicons name="arrow-forward" size={14} color={SwiftColors.white} />
                </Pressable>
              </View>
            ) : (
              <View style={styles.panel}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>EMAIL OR BVN</Text>
                </View>
                <View style={styles.phoneInputRow}>
                  <TextInput
                    style={[styles.phoneInput, { paddingLeft: 4 }]}
                    placeholder="you@example.com"
                    placeholderTextColor={SwiftColors.textMuted}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                <Pressable style={styles.primaryButton} onPress={handleGetOtp}>
                  <Text style={styles.primaryButtonText}>Continue</Text>
                  <Ionicons name="arrow-forward" size={14} color={SwiftColors.white} />
                </Pressable>
              </View>
            )}

            <View style={styles.trustNote}>
              <Ionicons name="lock-closed" size={14} color={SwiftColors.emeraldDark} style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.trustTitle}>Bank-Grade Data Protection</Text>
                <Text style={styles.trustBody}>
                  Secured by NDPR & Central Bank of Nigeria (CBN) regulatory compliance guidelines.
                </Text>
              </View>
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or quick connect with</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable style={styles.bvnButton} onPress={handleGetOtp}>
              <View style={styles.bvnButtonLeft}>
                <Ionicons name="finger-print" size={18} color={SwiftColors.amberDeep} />
                <Text style={styles.bvnButtonText}>Verify via BVN / NIN Instant</Text>
              </View>
              <View style={styles.fastestBadge}>
                <Text style={styles.fastestBadgeText}>FASTEST</Text>
              </View>
            </Pressable>

            <View style={styles.socialRow}>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-google" size={16} color={SwiftColors.textPrimary} />
                <Text style={styles.socialButtonText}>Google</Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-apple" size={16} color={SwiftColors.textPrimary} />
                <Text style={styles.socialButtonText}>Apple</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={[styles.partnerCard, SwiftShadow.card]} onPress={() => router.push('/driver')}>
            <View style={styles.partnerLeft}>
              <View style={styles.partnerIconWrap}>
                <Ionicons name="car-sport" size={18} color={SwiftColors.amberDeep} />
              </View>
              <View>
                <Text style={styles.partnerTitle}>Drive, Deliver or Sell</Text>
                <Text style={styles.partnerSubtitle}>Switch to Partner Portal</Text>
              </View>
            </View>
            <View style={styles.joinPill}>
              <Text style={styles.joinPillText}>Join ➔</Text>
            </View>
          </Pressable>

          <View style={styles.footer}>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Terms of Service</Text>
              <Text style={styles.footerDot}>•</Text>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerDot}>•</Text>
              <Text style={styles.footerLink}>Support</Text>
            </View>
            <View style={styles.footerSslRow}>
              <Ionicons name="lock-closed" size={11} color={SwiftColors.textSecondary} />
              <Text style={styles.footerSslText}>256-Bit SSL Encrypted • Lagos • Abuja • Port Harcourt</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    borderRadius: 9999,
  },
  glowLeft: {
    top: -48,
    left: 20,
    width: 220,
    height: 220,
    backgroundColor: 'rgba(138,245,180,0.25)',
  },
  glowRight: {
    top: 10,
    right: -40,
    width: 160,
    height: 160,
    backgroundColor: 'rgba(245,166,35,0.15)',
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: SwiftRadius.lg,
    backgroundColor: SwiftColors.surface,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    ...SwiftShadow.raised,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  flagBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 11,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 12,
  },
  brandPillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  title: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 26,
    color: SwiftColors.textPrimary,
    marginTop: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 14,
    color: SwiftColors.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    padding: 20,
    gap: 16,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 4,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: SwiftColors.surface,
  },
  tabButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textSecondary,
  },
  tabButtonTextActive: {
    color: SwiftColors.textPrimary,
  },
  panel: {
    gap: 12,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.textSecondary,
  },
  fieldLabelAccent: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.emerald,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surface,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  flagInline: {
    fontSize: 16,
  },
  countryCode: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
    paddingVertical: 10,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(242,244,243,0.7)',
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  benefitText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    paddingVertical: 16,
    ...SwiftShadow.card,
  },
  primaryButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.white,
  },
  trustNote: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(138,245,180,0.2)',
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  trustTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  trustBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: SwiftColors.border,
  },
  dividerText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  bvnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bvnButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bvnButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.amberDeep,
  },
  fastestBadge: {
    backgroundColor: SwiftColors.gold,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  fastestBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.amberDark,
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  socialButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    padding: 16,
    marginTop: 16,
  },
  partnerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  partnerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.md,
    backgroundColor: 'rgba(245,166,35,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  partnerSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  joinPill: {
    backgroundColor: SwiftColors.surfaceMuted3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  joinPillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  footer: {
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerLink: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    textDecorationLine: 'underline',
  },
  footerDot: {
    fontSize: 12,
    color: SwiftColors.border,
  },
  footerSslRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerSslText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: 'rgba(82,69,52,0.7)',
  },
});
