import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius } from '@/constants/swift-colors';

const LOGO = require('../assets/images/logo.jpg');

export default function SplashScreen() {
  const pulse = useSharedValue(1);
  const ringRotation = useSharedValue(0);
  const progress = useSharedValue(0.12);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    ringRotation.value = withRepeat(withTiming(360, { duration: 6000, easing: Easing.linear }), -1, false);
    progress.value = withTiming(0.82, { duration: 2200, easing: Easing.out(Easing.cubic) });

    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 2600);

    return () => clearTimeout(timeout);
  }, [pulse, progress, ringRotation]);

  const crestStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[SwiftColors.sovereignStart, SwiftColors.sovereignMid, SwiftColors.sovereignEnd]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.glow, styles.glowTop]} />
      <View style={[styles.glow, styles.glowCenter]} />
      <View style={[styles.glow, styles.glowBottom]} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusPillText}>LAGOS CORE NODE 01</Text>
          </View>
          <View style={styles.sslPill}>
            <Ionicons name="shield-checkmark" size={12} color="#FFD572" />
            <Text style={styles.sslPillText}>256-BIT SSL</Text>
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.emblemWrap}>
            <Animated.View style={[styles.ring, styles.ringOuter, ringStyle]} />
            <View style={[styles.ring, styles.ringInner]} />
            <Animated.View style={[styles.crestFrame, crestStyle]}>
              <Image source={LOGO} style={styles.crestImage} resizeMode="cover" />
            </Animated.View>
            <View style={styles.versionBadge}>
              <Ionicons name="flash" size={11} color="#FFD572" />
              <Text style={styles.versionBadgeText}>V3.4 SOVEREIGN</Text>
            </View>
          </View>

          <Text style={styles.title}>SWIFT9JA</Text>
          <Text style={styles.tagline}>Move. Deliver. Eat. Shop. Live.</Text>
          <Text style={styles.subtitle}>Nigeria&apos;s Premier Super-App Ecosystem</Text>

          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, progressStyle]} />
            </View>
            <View style={styles.progressLabelRow}>
              <Ionicons name="lock-closed" size={10} color={SwiftColors.mint} />
              <Text style={styles.progressLabel}>Securing Biometric Neural Signature with 256-bit HSM...</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Ionicons name="shield-checkmark" size={12} color={SwiftColors.mint} />
            <Text style={styles.footerText}>CBN Licensed PSP • NDPR Compliant • Powered by NIBSS & NTPP</Text>
          </View>
          <Text style={styles.copyright}>© 2025 SWIFT9JA TECHNOLOGIES LTD. FEDERAL REPUBLIC OF NIGERIA.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.sovereignEnd,
  },
  glow: {
    position: 'absolute',
    borderRadius: 9999,
  },
  glowTop: {
    top: -130,
    alignSelf: 'center',
    width: 340,
    height: 340,
    backgroundColor: 'rgba(0,168,89,0.16)',
  },
  glowCenter: {
    top: '30%',
    alignSelf: 'center',
    width: 280,
    height: 280,
    backgroundColor: 'rgba(0,109,64,0.2)',
  },
  glowBottom: {
    bottom: -100,
    alignSelf: 'center',
    width: 360,
    height: 180,
    backgroundColor: 'rgba(245,166,35,0.08)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(0,168,89,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E676',
  },
  statusPillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 1,
    color: '#A7F3D0',
    textTransform: 'uppercase',
  },
  sslPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.25)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sslPillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: '#FFD572',
  },
  center: {
    alignItems: 'center',
    gap: 4,
  },
  emblemWrap: {
    width: 176,
    height: 176,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ring: {
    position: 'absolute',
    borderRadius: 9999,
  },
  ringOuter: {
    width: 176,
    height: 176,
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.25)',
    borderStyle: 'dashed',
  },
  ringInner: {
    width: 144,
    height: 144,
    borderWidth: 1,
    borderColor: 'rgba(0,168,89,0.3)',
  },
  crestFrame: {
    width: 112,
    height: 112,
    borderRadius: 9999,
    padding: 3,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F5A623',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  crestImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
  versionBadge: {
    position: 'absolute',
    bottom: -14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#181105',
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.7)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  versionBadgeText: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#FFD572',
  },
  title: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 34,
    letterSpacing: -0.85,
    color: SwiftColors.goldLight,
  },
  tagline: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.gold,
    marginTop: 4,
  },
  subtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12.5,
    color: '#93A89A',
    marginTop: 6,
  },
  progressWrap: {
    width: '100%',
    maxWidth: 290,
    marginTop: 28,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 5,
    borderRadius: 9999,
    backgroundColor: '#0A1E12',
    borderWidth: 1,
    borderColor: 'rgba(0,168,89,0.3)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 9999,
    backgroundColor: SwiftColors.emerald,
  },
  progressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingHorizontal: 8,
  },
  progressLabel: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 11,
    color: '#CBD5E1',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 8,
    gap: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10.5,
    color: '#BBF7D0',
    textAlign: 'center',
  },
  copyright: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
