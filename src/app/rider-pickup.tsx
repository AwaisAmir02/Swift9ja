import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { marketplaceNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { riderPickup } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');
const ACCENT = '#835500';

export default function RiderPickupScreen() {
  const [checklist, setChecklist] = useState(riderPickup.checklist);
  const [dispatchOn, setDispatchOn] = useState(true);

  const checkedCount = checklist.filter((item) => item.checked).length;
  const allChecked = checkedCount === checklist.length;

  const toggleItem = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleNavPress = (key: string) => {
    if (key === 'orders') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <View>
              <Text style={styles.headerBrand}>SWIFT9JA</Text>
              <Text style={styles.headerTitle}>Orders And Delivery</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={11} color={SwiftColors.textSecondary} />
                <Text style={styles.locationText}>{riderPickup.location}</Text>
                <Ionicons name="chevron-down" size={9} color={SwiftColors.textSecondary} />
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="search" size={15} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={16} color={SwiftColors.textPrimary} />
              <View style={styles.notifDot} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.dispatchRow}>
          <View style={styles.dispatchLeft}>
            <View style={styles.dispatchDot} />
            <Text style={styles.dispatchLabel}>ONLINE DISPATCH</Text>
            <Text style={styles.riderTag}>{riderPickup.riderTag}</Text>
          </View>
          <View style={styles.dispatchRight}>
            <View style={styles.sosBadge}>
              <Text style={styles.sosBadgeText}>SOS</Text>
            </View>
            <Switch
              value={dispatchOn}
              onValueChange={setDispatchOn}
              trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
              thumbColor={SwiftColors.white}
            />
          </View>
        </View>

        <View style={styles.assignmentRow}>
          <View>
            <Text style={styles.assignmentLabel}>ACTIVE ASSIGNMENT</Text>
            <Text style={styles.assignmentId}>{riderPickup.assignmentId}</Text>
          </View>
          <View style={styles.pickupBadge}>
            <Ionicons name="storefront" size={11} color={ACCENT} />
            <Text style={styles.pickupBadgeText}>{riderPickup.pickupBadge}</Text>
          </View>
        </View>

        <View style={[styles.mapStage, SwiftShadow.card]}>
          <View style={styles.mapInfoChip}>
            <Ionicons name="navigate" size={12} color={SwiftColors.amberDeep} />
            <Text style={styles.mapInfoText}>
              {riderPickup.etaMins} mins • {riderPickup.distanceKm} km away
            </Text>
            <Text style={styles.mapInfoSubtext}>{riderPickup.destinationLabel}</Text>
          </View>
          <Pressable style={[styles.navigateButton, SwiftShadow.card]}>
            <Ionicons name="navigate-circle" size={20} color={ACCENT} />
          </Pressable>
        </View>

        <View style={styles.storeRow}>
          <View style={styles.storeIconWrap}>
            <Ionicons name="storefront" size={18} color={SwiftColors.emeraldDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.storeName}>{riderPickup.store.name}</Text>
            <Text style={styles.storeAddress}>{riderPickup.store.address}</Text>
          </View>
        </View>

        <View style={styles.instructionBox}>
          <Ionicons name="warning-outline" size={13} color={SwiftColors.amberDeep} />
          <View style={{ flex: 1 }}>
            <Text style={styles.instructionTitle}>Special Pickup Instruction</Text>
            <Text style={styles.instructionText}>{riderPickup.instruction}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="call" size={14} color={SwiftColors.emeraldDark} />
            <Text style={styles.actionButtonText}>Call Merchant</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/chat-support')}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color={SwiftColors.textPrimary} />
            <Text style={styles.actionButtonText}>In-App Chat</Text>
          </Pressable>
        </View>

        <View style={styles.checklistHeaderRow}>
          <Text style={styles.sectionTitle}>Parcel Verification Checklist</Text>
          <Text style={styles.checklistCount}>
            {checkedCount} of {checklist.length} Checked
          </Text>
        </View>

        <View style={styles.checklistList}>
          {checklist.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.checklistRow, !item.checked && styles.checklistRowPending]}
              onPress={() => toggleItem(item.id)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.checklistTitle}>{item.title}</Text>
                <Text style={styles.checklistSubtitle}>{item.subtitle}</Text>
              </View>
              {item.checked ? (
                <Ionicons name="checkmark-circle" size={20} color={SwiftColors.emerald} />
              ) : (
                <View style={styles.scanButton}>
                  <Ionicons name="scan" size={12} color={SwiftColors.white} />
                  <Text style={styles.scanButtonText}>Scan</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.payoutCard}>
          <View style={styles.payoutIconWrap}>
            <Ionicons name="wallet" size={18} color={SwiftColors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.payoutLabel}>ESTIMATED TRIP PAYOUT</Text>
            <View style={styles.payoutValueRow}>
              <Text style={styles.payoutValue}>₦{riderPickup.payout.toLocaleString('en-NG')}</Text>
              <Text style={styles.payoutNote}>(Instantly Credited)</Text>
            </View>
            <View style={styles.payoutBreakdownRow}>
              <Text style={styles.payoutBreakdownText}>Base Parcel Rate: ₦{riderPickup.baseRate.toLocaleString('en-NG')}</Text>
              <Text style={styles.payoutBreakdownText}>+₦{riderPickup.peakSurge} Peak Surge</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.verifyButton, !allChecked && styles.verifyButtonDisabled]}
          disabled={!allChecked}
          onPress={() => router.push('/driver-navigation')}>
          <Ionicons name="qr-code" size={16} color={SwiftColors.white} />
          <Text style={styles.verifyButtonText}>Verify Order QR & Start Delivery</Text>
        </Pressable>
        <Text style={styles.verifyHint}>Ensure merchant counter scans your handheld pass before departing.</Text>
      </ScrollView>

      <BottomNav items={marketplaceNavItems} activeKey="orders" activeColor={ACCENT} onPress={handleNavPress} />
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerBrand: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: ACCENT,
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  locationText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.error,
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
    gap: 12,
  },
  dispatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dispatchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dispatchDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SwiftColors.emerald,
  },
  dispatchLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.emerald,
  },
  riderTag: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  dispatchRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sosBadge: {
    backgroundColor: 'rgba(255,218,214,0.6)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  sosBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.error,
  },
  assignmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assignmentLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  assignmentId: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  pickupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,221,180,0.5)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pickupBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: ACCENT,
  },
  mapStage: {
    height: 120,
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: SwiftRadius.md,
    padding: 10,
    justifyContent: 'flex-end',
  },
  mapInfoChip: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.sm,
    padding: 10,
    gap: 2,
  },
  mapInfoText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  mapInfoSubtext: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  navigateButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(138,245,180,0.2)',
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  storeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  storeAddress: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  instructionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  instructionText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    paddingVertical: 10,
    ...SwiftShadow.card,
  },
  actionButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  checklistHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  checklistCount: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  checklistList: {
    gap: 8,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(138,245,180,0.15)',
    borderRadius: SwiftRadius.sm,
    padding: 12,
  },
  checklistRowPending: {
    backgroundColor: 'rgba(255,221,180,0.3)',
  },
  checklistTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  checklistSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.amber,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  scanButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.white,
  },
  payoutCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    padding: 14,
  },
  payoutIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payoutLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.mint,
  },
  payoutValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 2,
  },
  payoutValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 22,
    color: SwiftColors.white,
  },
  payoutNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.mint,
  },
  payoutBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  payoutBreakdownText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    ...SwiftShadow.card,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.white,
  },
  verifyHint: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
    marginTop: -6,
  },
});
