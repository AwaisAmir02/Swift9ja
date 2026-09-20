import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { onboardingSlide } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Image source={LOGO} style={styles.brandLogo} />
          <View>
            <Text style={styles.brandName}>Swift9JA</Text>
            <Text style={styles.brandTagline}>MOBILITY • PAY • LIFE</Text>
          </View>
        </View>
        <Pressable style={styles.skipButton} onPress={() => router.replace('/login')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.heroCard}>
        <LinearGradient colors={[SwiftColors.charcoal, '#0B0F0D']} style={StyleSheet.absoluteFill} />
        <View style={styles.heroBadge}>
          <Ionicons name="layers" size={11} color={SwiftColors.mint} />
          <Text style={styles.heroBadgeText}>{onboardingSlide.badge}</Text>
        </View>
        <Text style={styles.heroTitle}>{onboardingSlide.title}</Text>
        <Text style={styles.heroSubtitle}>{onboardingSlide.subtitle}</Text>
        <View style={styles.heroTagsRow}>
          <View style={styles.heroTagGold}>
            <Text style={styles.heroTagGoldText}>{onboardingSlide.tags[0]}</Text>
          </View>
          <View style={styles.heroTagGreen}>
            <Text style={styles.heroTagGreenText}>{onboardingSlide.tags[1]}</Text>
          </View>
        </View>
      </View>

      <View style={styles.paginationRow}>
        <View style={styles.dotsGroup}>
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
        </View>
        <Text style={styles.slideCounter}>
          0{onboardingSlide.slideIndex} / 0{onboardingSlide.slideTotal}
        </Text>
      </View>

      <View style={styles.featuresRow}>
        {onboardingSlide.features.map((feature) => (
          <View key={feature.id} style={[styles.featureCard, SwiftShadow.card]}>
            <View style={styles.featureIconWrap}>
              <Ionicons name={feature.icon as keyof typeof Ionicons.glyphMap} size={20} color={SwiftColors.amberDeep} />
            </View>
            <Text style={styles.featureLabel}>{feature.label}</Text>
            <Text style={styles.featureDetail}>{feature.detail}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.swiftcareBanner, SwiftShadow.card]}>
        <View style={styles.swiftcareIconWrap}>
          <Ionicons name="shield-checkmark" size={18} color={SwiftColors.emeraldDark} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.swiftcareTitle}>{onboardingSlide.swiftcareBanner.title}</Text>
          <Text style={styles.swiftcareSubtitle} numberOfLines={1}>
            {onboardingSlide.swiftcareBanner.subtitle}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.getStartedButton} onPress={() => router.replace('/login')}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </Pressable>
        <Pressable style={styles.signInButton} onPress={() => router.replace('/login')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>
        <Text style={styles.termsText}>
          By continuing, you agree to Swift9JA Terms & Privacy Policy{'\n'}• CBN & NDPR Compliant
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  brandName: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  brandTagline: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    letterSpacing: 0.8,
    color: SwiftColors.emerald,
  },
  skipButton: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textSecondary,
  },
  heroCard: {
    borderRadius: SwiftRadius.lg,
    padding: 20,
    marginTop: 8,
    overflow: 'hidden',
    gap: 10,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,109,64,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.mint,
  },
  heroTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 24,
    color: SwiftColors.white,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    lineHeight: 19,
    color: '#D8DADA',
  },
  heroTagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  heroTagGold: {
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroTagGoldText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amberDeepest,
  },
  heroTagGreen: {
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroTagGreenText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.mint,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dotsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.border,
  },
  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.gold,
  },
  slideCounter: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 6,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.md,
    backgroundColor: 'rgba(255,221,180,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
    textAlign: 'center',
  },
  featureDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
  },
  swiftcareBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    marginTop: 16,
  },
  swiftcareIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(138,245,180,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiftcareTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  swiftcareSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  actions: {
    marginTop: 'auto',
    paddingBottom: 8,
    gap: 10,
  },
  getStartedButton: {
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...SwiftShadow.card,
  },
  getStartedButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.white,
  },
  signInButton: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  termsText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
    lineHeight: 15,
  },
});
