import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { driverNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import {
  driverActiveQuest,
  driverHotspots,
  driverQuickActions,
  driverStats,
  driverWeatherDemand,
} from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

export default function DriverScreen() {
  const radarScale = useSharedValue(1);

  useEffect(() => {
    radarScale.value = withRepeat(withTiming(1.35, { duration: 1800, easing: Easing.out(Easing.ease) }), -1, false);
  }, [radarScale]);

  const radarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: radarScale.value }],
    opacity: 1 - (radarScale.value - 1) / 0.35,
  }));

  const handleNavPress = (key: string) => {
    if (key === 'trips') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <View>
              <Text style={styles.headerBrand}>Swift9JA</Text>
              <Text style={styles.headerSubtitle}>DRIVER PARTNER</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlinePillText}>ONLINE</Text>
            </View>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.metricCard, SwiftShadow.card]}>
          <View style={styles.metricTopRow}>
            <View style={styles.pingRow}>
              <View style={styles.pingDot} />
              <Text style={styles.pingLabel}>ACTIVE DISPATCH PINGS</Text>
            </View>
            <Pressable style={styles.offlinePill}>
              <Text style={styles.offlinePillText}>Go Offline</Text>
              <Ionicons name="power" size={13} color={SwiftColors.error} />
            </Pressable>
          </View>

          <View style={styles.earningsRow}>
            <View>
              <Text style={styles.earningsLabel}>Today&apos;s Earnings</Text>
              <Text style={styles.earningsValue}>₦{driverStats.todayEarnings.toLocaleString('en-NG')}</Text>
            </View>
            <View style={styles.surgeBadge}>
              <Ionicons name="trending-up" size={13} color={SwiftColors.amberDeepest} />
              <Text style={styles.surgeBadgeText}>₦{driverStats.surgeEarned.toLocaleString('en-NG')} Surge Earned</Text>
            </View>
          </View>

          <View style={styles.quickMetricsRow}>
            <View style={styles.quickMetricGroup}>
              <Ionicons name="car-sport" size={14} color={SwiftColors.textPrimary} />
              <Text style={styles.quickMetricText}>{driverStats.trips} Trips</Text>
            </View>
            <View style={styles.metricDot} />
            <View style={styles.quickMetricGroup}>
              <Ionicons name="time-outline" size={14} color={SwiftColors.textPrimary} />
              <Text style={styles.quickMetricText}>{driverStats.hoursOnline} hrs</Text>
            </View>
            <View style={styles.metricDot} />
            <View style={styles.quickMetricGroup}>
              <Ionicons name="star" size={13} color={SwiftColors.gold} />
              <Text style={styles.quickMetricTextBold}>{driverStats.rating}</Text>
              <Text style={styles.quickMetricSub}>({driverStats.ratingPercentile})</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.dispatchToast} onPress={() => router.push('/driver-incoming-request')}>
          <View style={styles.dispatchToastLeft}>
            <Ionicons name="pulse" size={16} color={SwiftColors.textPrimary} />
            <Text style={styles.dispatchToastText}>High ping rate: {driverStats.pingArea}</Text>
          </View>
          <View style={styles.highChancePill}>
            <Text style={styles.highChanceText}>High Chance</Text>
          </View>
        </Pressable>

        <View style={[styles.mapViewport, SwiftShadow.raised]}>
          <View style={[styles.hotspotChip, styles.hotspotTopLeft, SwiftShadow.raised]}>
            <View style={[styles.hotspotIconWrap, { backgroundColor: SwiftColors.gold }]}>
              <Ionicons name="trending-up" size={13} color={SwiftColors.amberDeepest} />
            </View>
            <View>
              <Text style={styles.hotspotLabel}>{driverHotspots[0].label}</Text>
              <Text style={styles.hotspotLocation}>{driverHotspots[0].location}</Text>
            </View>
          </View>

          <View style={[styles.hotspotChip, styles.hotspotTopRight, SwiftShadow.raised]}>
            <View style={[styles.hotspotIconWrap, { backgroundColor: SwiftColors.mint }]}>
              <Ionicons name="airplane" size={12} color={SwiftColors.emeraldDark} />
            </View>
            <View>
              <Text style={[styles.hotspotLabel, { color: SwiftColors.emeraldDark }]}>{driverHotspots[1].label}</Text>
              <Text style={styles.hotspotLocation}>{driverHotspots[1].location}</Text>
            </View>
          </View>

          <View style={styles.mapCenter}>
            <Animated.View style={[styles.radarRing, radarStyle]} />
            <View style={styles.radarRingStatic} />
            <View style={[styles.vehicleHub, SwiftShadow.raised]}>
              <Ionicons name="navigate" size={18} color={SwiftColors.white} />
            </View>
            <View style={styles.hereChip}>
              <Text style={styles.hereChipText}>You are here</Text>
            </View>
          </View>

          <View style={styles.mapControls}>
            <Pressable style={[styles.mapControlButton, SwiftShadow.raised]}>
              <Ionicons name="layers-outline" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={[styles.mapControlButton, SwiftShadow.raised]}>
              <Ionicons name="locate" size={18} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={[styles.mapControlButton, styles.mapControlButtonDanger, SwiftShadow.raised]}>
              <Ionicons name="alert-circle" size={17} color={SwiftColors.white} />
            </Pressable>
          </View>

          <View style={styles.gpsChip}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsText}>{driverStats.gpsStatus}</Text>
          </View>
        </View>

        <View style={styles.weatherCard}>
          <View style={styles.weatherIconWrap}>
            <Ionicons name="rainy" size={22} color={SwiftColors.amberDeepest} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.weatherTitleRow}>
              <Text style={styles.weatherTitle}>{driverWeatherDemand.title}</Text>
              <View style={styles.weatherBoostBadge}>
                <Text style={styles.weatherBoostText}>{driverWeatherDemand.boostPercent}</Text>
              </View>
            </View>
            <Text style={styles.weatherSubtitle}>{driverWeatherDemand.subtitle}</Text>
          </View>
          <Pressable style={styles.weatherChevron}>
            <Ionicons name="chevron-forward" size={14} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={[styles.questCard, SwiftShadow.card]}>
          <View style={styles.questTopRow}>
            <View style={styles.questTopLeft}>
              <View style={styles.questIconWrap}>
                <Ionicons name="flash" size={16} color={SwiftColors.emeraldDark} />
              </View>
              <View>
                <Text style={styles.questTitle}>{driverActiveQuest.title}</Text>
                <Text style={styles.questExpiry}>{driverActiveQuest.expiry}</Text>
              </View>
            </View>
            <View style={styles.questRewardWrap}>
              <Text style={styles.questReward}>{driverActiveQuest.reward}</Text>
              <Text style={styles.questRewardLabel}>{driverActiveQuest.rewardLabel}</Text>
            </View>
          </View>

          <View style={styles.questProgressSection}>
            <View style={styles.questProgressHeader}>
              <Text style={styles.questProgressLabel}>
                Progress ({driverActiveQuest.completed} of {driverActiveQuest.total} completed)
              </Text>
              <Text style={styles.questProgressPercent}>{driverActiveQuest.progressPercent}%</Text>
            </View>
            <View style={styles.questProgressTrack}>
              <View style={[styles.questProgressFill, { width: `${driverActiveQuest.progressPercent}%` }]} />
            </View>
          </View>

          <View style={styles.questBottomRow}>
            <Text style={styles.questHint}>{driverActiveQuest.hint}</Text>
            <Pressable>
              <Text style={styles.questLink}>View Quest Details</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.quickActionsRow}>
          {driverQuickActions.map((action) => {
            const isDanger = action.id === 'sos';
            return (
              <Pressable
                key={action.id}
                style={[styles.quickActionButton, SwiftShadow.card]}
                onPress={action.id === 'destination' ? () => router.push('/driver-delivery-mode') : undefined}>
                <View style={[styles.quickActionIconWrap, isDanger && styles.quickActionIconWrapDanger]}>
                  <Ionicons
                    name={action.icon as keyof typeof Ionicons.glyphMap}
                    size={16}
                    color={isDanger ? SwiftColors.error : SwiftColors.textPrimary}
                  />
                </View>
                <Text style={[styles.quickActionLabel, isDanger && styles.quickActionLabelDanger]}>
                  {action.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.partnershipBanner}>
          <View style={styles.partnershipLeft}>
            <View style={styles.partnershipIconWrap}>
              <Ionicons name="shield-checkmark" size={18} color={SwiftColors.white} />
            </View>
            <View>
              <View style={styles.partnershipTitleRow}>
                <Text style={styles.partnershipTitle}>NTPP Verified Carrier</Text>
                <View style={styles.partnershipDot} />
              </View>
              <Text style={styles.partnershipSubtitle}>Abuja Urban Transport Regulatory Permit Active</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={14} color={SwiftColors.textSecondary} />
        </View>
      </ScrollView>

      <BottomNav items={driverNavItems} activeKey="trips" onPress={handleNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
  },
  header: {
    backgroundColor: 'rgba(248,250,249,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: SwiftColors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerBrand: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.44,
    color: SwiftColors.emerald,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SwiftColors.emerald,
  },
  onlinePillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 96,
    gap: 8,
  },
  metricCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 4,
  },
  metricTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: SwiftColors.emerald,
  },
  pingLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.275,
    color: SwiftColors.emerald,
    textTransform: 'uppercase',
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  offlinePillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.error,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  earningsLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textFaint,
  },
  earningsValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 28,
    color: SwiftColors.textPrimary,
    letterSpacing: -0.7,
    marginTop: 2,
  },
  surgeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,221,180,0.4)',
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  surgeBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDeepest,
  },
  quickMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(242,244,243,0.7)',
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  quickMetricGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickMetricText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  quickMetricTextBold: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  quickMetricSub: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textFaint,
  },
  metricDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D7C3AE',
  },
  dispatchToast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.border,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dispatchToastLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  dispatchToastText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  highChancePill: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  highChanceText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  mapViewport: {
    height: 320,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surfaceMuted2,
    overflow: 'hidden',
  },
  hotspotChip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.sm,
    padding: 8,
  },
  hotspotTopLeft: {
    top: 24,
    left: 24,
  },
  hotspotTopRight: {
    top: 64,
    right: 20,
  },
  hotspotIconWrap: {
    width: 24,
    height: 24,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotspotLabel: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  hotspotLocation: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textFaint,
    marginTop: 1,
  },
  mapCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -28,
    marginTop: -28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing: {
    position: 'absolute',
    width: 176,
    height: 176,
    borderRadius: 9999,
    backgroundColor: 'rgba(0,109,64,0.15)',
  },
  radarRingStatic: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 9999,
    backgroundColor: 'rgba(245,166,35,0.2)',
  },
  vehicleHub: {
    width: 56,
    height: 44,
    borderRadius: 9999,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hereChip: {
    position: 'absolute',
    bottom: -32,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...SwiftShadow.card,
  },
  hereChipText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  mapControls: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    gap: 8,
  },
  mapControlButton: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapControlButtonDanger: {
    backgroundColor: SwiftColors.error,
  },
  gpsChip: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  gpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SwiftColors.emerald,
  },
  gpsText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  weatherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.md,
    padding: 16,
  },
  weatherIconWrap: {
    width: 48,
    height: 48,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weatherTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  weatherBoostBadge: {
    backgroundColor: SwiftColors.goldPale,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  weatherBoostText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amber,
  },
  weatherSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  weatherChevron: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 8,
  },
  questTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  questTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  questIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.sm,
    backgroundColor: 'rgba(138,245,180,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  questExpiry: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textFaint,
    marginTop: 1,
  },
  questRewardWrap: {
    alignItems: 'flex-end',
  },
  questReward: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 15,
    color: SwiftColors.emerald,
  },
  questRewardLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  questProgressSection: {
    gap: 6,
  },
  questProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questProgressLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  questProgressPercent: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  questProgressTrack: {
    height: 12,
    borderRadius: 9999,
    backgroundColor: SwiftColors.surfaceMuted2,
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    borderRadius: 9999,
    backgroundColor: SwiftColors.emerald,
  },
  questBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questHint: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textFaint,
  },
  questLink: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDeep,
    textAlign: 'right',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickActionButton: {
    flex: 1,
    height: 80,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  quickActionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIconWrapDanger: {
    backgroundColor: SwiftColors.errorBg,
  },
  quickActionLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
    textAlign: 'center',
  },
  quickActionLabelDanger: {
    color: SwiftColors.error,
  },
  partnershipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 16,
  },
  partnershipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  partnershipIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnershipTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  partnershipTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  partnershipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  partnershipSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textFaint,
    marginTop: 2,
  },
});
