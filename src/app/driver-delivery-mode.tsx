import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { driverNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { deliveryMode } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

export default function DriverDeliveryModeScreen() {
  const [activeTab, setActiveTab] = useState(deliveryMode.tabs[0]);
  const [modeActive, setModeActive] = useState(deliveryMode.active);

  const handleNavPress = (key: string) => {
    router.push(`/${key}` as never);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Eatery') {
      router.push('/rider-pickup');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <Text style={styles.headerBrand}>Swift9JA</Text>
            <Text style={styles.headerSubtitle}>DRIVER PARTNER</Text>
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
        <View style={styles.titleRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={15} color={SwiftColors.textPrimary} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>Delivery & Courier Mode</Text>
            <Text style={styles.titleSubtitle}>Multi-Modal Dispatch Mode</Text>
          </View>
          <View style={styles.dispatchActiveBadge}>
            <Text style={styles.dispatchActiveBadgeText}>DISPATCH ACTIVE</Text>
          </View>
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIconWrap}>
              <Ionicons name="cube" size={16} color={SwiftColors.amberDeep} />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Rides + Deliveries Active</Text>
              <Text style={styles.toggleSubtitle}>{deliveryMode.capacityNote}</Text>
            </View>
          </View>
          <Switch
            value={modeActive}
            onValueChange={setModeActive}
            trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
            thumbColor={SwiftColors.white}
          />
        </View>

        <View style={styles.tabsRow}>
          {deliveryMode.tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <Pressable
                key={tab}
                style={[styles.tabChip, isActive && styles.tabChipActive]}
                onPress={() => handleTabPress(tab)}>
                <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>{tab}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.surgeBanner}>
          <View style={styles.surgeLeft}>
            <Ionicons name="flash" size={14} color={SwiftColors.amberDeep} />
            <View>
              <Text style={styles.surgeTitle}>{deliveryMode.surgeBanner.title}</Text>
              <Text style={styles.surgeSubtitle}>{deliveryMode.surgeBanner.subtitle}</Text>
            </View>
          </View>
          <View style={styles.boostBadge}>
            <Text style={styles.boostBadgeText}>BOOST</Text>
          </View>
        </View>

        <View style={[styles.mapStage, SwiftShadow.card]}>
          <View style={styles.mapTopRow}>
            <Text style={styles.mapLabel}>{deliveryMode.hubsLabel}</Text>
            <View style={styles.surgeActiveBadge}>
              <Text style={styles.surgeActiveBadgeText}>⚡ Surge Active</Text>
            </View>
          </View>
          <View style={styles.mapBottomRow}>
            <Text style={styles.mapBottomText}>{deliveryMode.hubPickupCount}</Text>
            <Text style={styles.mapBottomText}>{deliveryMode.hubReadyCount}</Text>
          </View>
        </View>

        <View style={styles.jobCard}>
          <View style={styles.jobTopRow}>
            <View style={styles.jobBadge}>
              <Text style={styles.jobBadgeText}>EXPRESS COURIER</Text>
            </View>
            <Text style={styles.jobId}>{deliveryMode.job.id}</Text>
          </View>
          <View style={styles.jobPayoutRow}>
            <Text style={styles.jobPayout}>₦{deliveryMode.job.payout.toLocaleString('en-NG')}</Text>
            <Text style={styles.jobPayoutLabel}>Net Driver Payout</Text>
          </View>
          <Text style={styles.jobPayoutNote}>{deliveryMode.job.payoutNote}</Text>
        </View>

        <View style={styles.categoryRow}>
          <Ionicons name="shield-checkmark-outline" size={14} color={SwiftColors.textSecondary} />
          <Text style={styles.categoryText}>{deliveryMode.job.category}</Text>
          <View style={styles.fragileBadge}>
            <Text style={styles.fragileBadgeText}>FRAGILE</Text>
          </View>
        </View>
        <View style={styles.handlingRow}>
          <Text style={styles.handlingText}>{deliveryMode.job.weight}</Text>
          <Text style={styles.handlingText}>{deliveryMode.job.handling}</Text>
        </View>

        <View style={styles.stopRow}>
          <View style={styles.stopDot} />
          <View style={{ flex: 1 }}>
            <View style={styles.stopLabelRow}>
              <Text style={styles.stopLabel}>NEXT STOP • PICKUP</Text>
              <Text style={styles.stopEta}>
                {deliveryMode.pickup.distanceKm} km • {deliveryMode.pickup.etaMins} mins away
              </Text>
            </View>
            <Text style={styles.stopTitle}>{deliveryMode.pickup.label}</Text>
            <Text style={styles.stopAddress}>
              {deliveryMode.pickup.address} • {deliveryMode.pickup.sender}
            </Text>
          </View>
          <View style={styles.stopActions}>
            <Pressable style={styles.stopActionButton}>
              <Ionicons name="call" size={13} color={SwiftColors.white} />
            </Pressable>
            <Pressable style={[styles.stopActionButton, styles.stopActionButtonMuted]}>
              <Ionicons name="chatbubble" size={12} color={SwiftColors.textPrimary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.stopRow}>
          <View style={[styles.stopDot, styles.stopDotMuted]} />
          <View style={{ flex: 1 }}>
            <View style={styles.stopLabelRow}>
              <Text style={styles.stopLabel}>FINAL DESTINATION • DROP-OFF</Text>
              <Text style={styles.stopEta}>{deliveryMode.dropoff.distanceKm} km</Text>
            </View>
            <Text style={styles.stopTitle}>{deliveryMode.dropoff.label}</Text>
            <Text style={styles.stopAddress}>
              {deliveryMode.dropoff.address} • {deliveryMode.dropoff.recipient}
            </Text>
          </View>
        </View>

        <View style={styles.securitySection}>
          <View style={styles.securityHeaderRow}>
            <Ionicons name="lock-closed" size={13} color={SwiftColors.textPrimary} />
            <Text style={styles.securityTitle}>Security Protocol Enforced</Text>
          </View>
          {deliveryMode.securityProtocol.map((step, index) => (
            <Text key={step} style={styles.securityStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        <Pressable style={styles.arriveButton} onPress={() => router.push('/rider-pickup')}>
          <Ionicons name="qr-code" size={16} color={SwiftColors.white} />
          <Text style={styles.arriveButtonText}>Arrive at Pickup & Scan Parcel</Text>
          <Ionicons name="arrow-forward" size={15} color={SwiftColors.white} />
        </Pressable>

        <View style={styles.secondaryActionsRow}>
          <Pressable style={styles.secondaryActionButton}>
            <Ionicons name="alert-circle-outline" size={14} color={SwiftColors.error} />
            <Text style={styles.secondaryActionTextDanger}>Item Too Large</Text>
          </Pressable>
          <Pressable style={styles.secondaryActionButton} onPress={() => router.push('/chat-support')}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color={SwiftColors.textPrimary} />
            <Text style={styles.secondaryActionText}>Courier Support</Text>
          </Pressable>
        </View>

        <View style={styles.stackRow}>
          <View style={styles.stackIconWrap}>
            <Ionicons name="person" size={14} color={SwiftColors.emeraldDark} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.stackTitleRow}>
              <Text style={styles.stackTitle}>Stack Extra Delivery</Text>
              <View style={styles.stackRewardBadge}>
                <Text style={styles.stackRewardText}>+₦{deliveryMode.stackDelivery.reward.toLocaleString('en-NG')}</Text>
              </View>
            </View>
            <Text style={styles.stackSubtitle}>{deliveryMode.stackDelivery.subtitle}</Text>
          </View>
          <Pressable style={styles.addDropButton}>
            <Text style={styles.addDropButtonText}>Add Drop</Text>
          </Pressable>
        </View>

        <View style={styles.statsHeaderRow}>
          <Text style={styles.sectionTitle}>Today&apos;s Courier Earnings</Text>
          <Text style={styles.shiftText}>{deliveryMode.todayStats.shift}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{deliveryMode.todayStats.dropsDone}</Text>
            <Text style={styles.statLabel}>Drops Done</Text>
            <Text style={styles.statNote}>{deliveryMode.todayStats.dropsNote}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{deliveryMode.todayStats.grossEarned}</Text>
            <Text style={styles.statLabel}>Gross Earned</Text>
            <Text style={styles.statNote}>{deliveryMode.todayStats.grossNote}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{deliveryMode.todayStats.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statNote}>{deliveryMode.todayStats.ratingNote}</Text>
          </View>
        </View>
        <Text style={styles.footerText}>Payout transferred automatically to Swift Bank Card</Text>
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
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  headerBrand: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    letterSpacing: 0.4,
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
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  titleSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  dispatchActiveBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dispatchActiveBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    ...SwiftShadow.card,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  toggleIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.sm,
    backgroundColor: 'rgba(255,221,180,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  toggleSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tabChip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingVertical: 8,
  },
  tabChipActive: {
    backgroundColor: SwiftColors.emerald,
  },
  tabChipText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  tabChipTextActive: {
    color: SwiftColors.white,
  },
  surgeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  surgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  surgeTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amberDeepest,
  },
  surgeSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.amberDeep,
  },
  boostBadge: {
    backgroundColor: SwiftColors.amber,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  boostBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.white,
  },
  mapStage: {
    height: 90,
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: SwiftRadius.md,
    padding: 10,
    justifyContent: 'space-between',
  },
  mapTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  surgeActiveBadge: {
    backgroundColor: 'rgba(138,245,180,0.5)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  surgeActiveBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  mapBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapBottomText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: SwiftColors.textSecondary,
    overflow: 'hidden',
  },
  jobCard: {
    gap: 2,
  },
  jobTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  jobBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  jobId: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  jobPayoutRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  jobPayout: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 22,
    color: SwiftColors.textPrimary,
  },
  jobPayoutLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  jobPayoutNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  fragileBadge: {
    backgroundColor: SwiftColors.goldPale,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  fragileBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.amberDeep,
  },
  handlingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -6,
  },
  handlingText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
  },
  stopRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  stopDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: SwiftColors.emerald,
    marginTop: 4,
  },
  stopDotMuted: {
    backgroundColor: SwiftColors.border,
  },
  stopLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stopLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  stopEta: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  stopTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
    marginTop: 1,
  },
  stopAddress: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  stopActions: {
    flexDirection: 'row',
    gap: 6,
  },
  stopActionButton: {
    width: 28,
    height: 28,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopActionButtonMuted: {
    backgroundColor: SwiftColors.surfaceMuted2,
  },
  securitySection: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
    gap: 2,
  },
  securityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  securityTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  securityStep: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  arriveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    ...SwiftShadow.card,
  },
  arriveButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.white,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingVertical: 10,
  },
  secondaryActionText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  secondaryActionTextDanger: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.error,
  },
  stackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 10,
  },
  stackIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(138,245,180,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stackTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  stackRewardBadge: {
    backgroundColor: 'rgba(138,245,180,0.5)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  stackRewardText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  stackSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  addDropButton: {
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addDropButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amberDeepest,
  },
  statsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  shiftText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
    gap: 2,
    ...SwiftShadow.card,
  },
  statValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  statLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  statNote: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emerald,
  },
  footerText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
  },
});
