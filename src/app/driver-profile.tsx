import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { driverNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { driverKyc } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: 'rgba(138,245,180,0.4)', color: SwiftColors.emeraldDark },
  'EXPIRES SOON': { bg: SwiftColors.goldPale, color: SwiftColors.amberDeep },
  REVIEWING: { bg: SwiftColors.surfaceMuted2, color: SwiftColors.textSecondary },
};

export default function DriverProfileScreen() {
  const [activeTab, setActiveTab] = useState(driverKyc.tabs[0]);

  const handleNavPress = (key: string) => {
    if (key === 'driver-profile') return;
    router.push(`/${key}` as never);
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
            <Text style={styles.titleText}>Driver Profile & KYC</Text>
            <Text style={styles.titleSubtitle}>Fleet ID & Regulatory Verification</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={11} color={SwiftColors.emeraldDark} />
            <Text style={styles.verifiedBadgeText}>VERIFIED</Text>
          </View>
        </View>

        <View style={styles.photoCard}>
          <View style={styles.photoPlaceholder}>
            <Ionicons name="person" size={64} color={SwiftColors.surfaceMuted2} />
          </View>
          <View style={styles.photoActionsRow}>
            <Pressable style={[styles.photoActionButton, SwiftShadow.card]}>
              <Ionicons name="create-outline" size={13} color={SwiftColors.textPrimary} />
              <Text style={styles.photoActionText}>Edit Profile</Text>
            </Pressable>
            <Pressable style={[styles.photoActionButton, SwiftShadow.card]}>
              <Ionicons name="eye-outline" size={13} color={SwiftColors.textPrimary} />
              <Text style={styles.photoActionText}>Public Rider View</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.complianceRow}>
          <Text style={styles.complianceLabel}>COMPLIANCE STATUS</Text>
          <Text style={styles.complianceScore}>
            {driverKyc.complianceScore}/{driverKyc.complianceTotal}
          </Text>
        </View>
        <View style={styles.complianceTrack}>
          <View style={[styles.complianceFill, { width: `${driverKyc.compliancePercent}%` }]} />
        </View>
        <Text style={styles.complianceCaption}>{driverKyc.complianceLabel}</Text>

        <View style={styles.warningBox}>
          <Ionicons name="warning" size={14} color={SwiftColors.amberDeep} />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>{driverKyc.expiryWarning.title}</Text>
            <Text style={styles.warningSubtitle}>{driverKyc.expiryWarning.subtitle}</Text>
          </View>
        </View>

        <View style={styles.tabsRow}>
          {driverKyc.tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <Pressable
                key={tab}
                style={[styles.tabChip, isActive && styles.tabChipActive]}
                onPress={() => setActiveTab(tab)}>
                <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>{tab}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.documentsList}>
          {driverKyc.documents.map((doc) => {
            const statusStyle = STATUS_STYLES[doc.status] ?? STATUS_STYLES.REVIEWING;
            return (
              <View
                key={doc.id}
                style={[
                  styles.documentRow,
                  SwiftShadow.card,
                  doc.attention && styles.documentRowAttention,
                ]}>
                <View style={styles.documentTopRow}>
                  <Text style={styles.documentTitle}>{doc.title}</Text>
                  <View style={[styles.documentStatusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.documentStatusText, { color: statusStyle.color }]}>{doc.status}</Text>
                  </View>
                </View>
                <Text style={styles.documentDetail}>{doc.detail}</Text>
                <View style={styles.documentBottomRow}>
                  <Text style={styles.documentSubtitle}>{doc.subtitle}</Text>
                  <Text style={styles.documentAction}>{doc.action}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Registered Active Vehicle</Text>
        <View style={[styles.vehicleCard, SwiftShadow.card]}>
          <View style={styles.vehicleImageWrap}>
            <Ionicons name="car-sport" size={28} color={SwiftColors.textFaint} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.vehicleTopRow}>
              <Text style={styles.vehicleName}>{driverKyc.vehicle.name}</Text>
              <View style={styles.vehicleColorBadge}>
                <Text style={styles.vehicleColorBadgeText}>{driverKyc.vehicle.colorBadge}</Text>
              </View>
            </View>
            <View style={styles.vehicleTopRow}>
              <Text style={styles.vehiclePlate}>{driverKyc.vehicle.plate}</Text>
              <View style={styles.vehicleColorBadge}>
                <Text style={styles.vehicleColorBadgeText}>{driverKyc.vehicle.regionBadge}</Text>
              </View>
            </View>
            <View style={styles.vehicleTagsRow}>
              {driverKyc.vehicle.tags.map((tag) => (
                <View key={tag} style={styles.vehicleTag}>
                  <Text style={styles.vehicleTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.vehicleActionsRow}>
          <Pressable style={styles.vehicleActionButton}>
            <Ionicons name="swap-horizontal" size={14} color={SwiftColors.textPrimary} />
            <Text style={styles.vehicleActionText}>Switch Car</Text>
          </Pressable>
          <Pressable style={styles.vehicleActionButton}>
            <Ionicons name="add" size={14} color={SwiftColors.textPrimary} />
            <Text style={styles.vehicleActionText}>Add New Vehicle</Text>
          </Pressable>
        </View>

        <View style={styles.supportBanner}>
          <View style={styles.supportIconWrap}>
            <Ionicons name="headset" size={18} color={SwiftColors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.supportTitle}>{driverKyc.supportBanner.title}</Text>
            <Text style={styles.supportSubtitle}>{driverKyc.supportBanner.subtitle}</Text>
          </View>
        </View>
        <Pressable style={styles.chatButton} onPress={() => router.push('/chat-support')}>
          <Ionicons name="chatbubble-ellipses" size={14} color={SwiftColors.white} />
          <Text style={styles.chatButtonText}>{driverKyc.supportBanner.cta}</Text>
        </Pressable>

        <Text style={styles.footerText}>{driverKyc.footer}</Text>
      </ScrollView>

      <BottomNav items={driverNavItems} activeKey="driver-profile" onPress={handleNavPress} />
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
    gap: 12,
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
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  verifiedBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  photoCard: {
    borderRadius: SwiftRadius.lg,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 200,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoActionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: -18,
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  photoActionText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  complianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  complianceLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  complianceScore: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  complianceTrack: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: SwiftColors.surfaceMuted2,
    overflow: 'hidden',
  },
  complianceFill: {
    height: '100%',
    borderRadius: 9999,
    backgroundColor: SwiftColors.emerald,
  },
  complianceCaption: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emeraldDark,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  warningTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amberDeepest,
  },
  warningSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.amberDeep,
    marginTop: 1,
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
  documentsList: {
    gap: 8,
  },
  documentRow: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 4,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  documentRowAttention: {
    borderColor: SwiftColors.gold,
  },
  documentTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentTitle: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  documentStatusBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  documentStatusText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
  },
  documentDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  documentBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
  },
  documentAction: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amber,
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  vehicleCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
  },
  vehicleImageWrap: {
    width: 56,
    height: 56,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vehicleName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  vehiclePlate: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  vehicleColorBadge: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  vehicleColorBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.textSecondary,
  },
  vehicleTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  vehicleTag: {
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  vehicleTagText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  vehicleActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  vehicleActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingVertical: 10,
  },
  vehicleActionText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    padding: 14,
    marginTop: 8,
  },
  supportIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
  supportSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.mint,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
    marginTop: -4,
  },
  chatButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
  footerText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
  },
});
