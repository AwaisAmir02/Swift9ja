import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { servicesNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { courierBooking, courierFleetOptions } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');
const ACCENT = SwiftColors.amber;

export default function CourierBookingScreen() {
  const [fleetId, setFleetId] = useState(courierFleetOptions[0].id);
  const [category, setCategory] = useState(courierBooking.defaultCategory);
  const [fragile, setFragile] = useState(courierBooking.fragileHandling);
  const [insurance, setInsurance] = useState(true);
  const [handoverPin, setHandoverPin] = useState(true);

  const fleet = courierFleetOptions.find((option) => option.id === fleetId) ?? courierFleetOptions[0];
  const { fareBreakdown } = courierBooking;
  const total = fleet.price + (insurance ? courierBooking.guaranteeInsurance : 0) + fareBreakdown.memberDiscount;

  const handleNavPress = (key: string) => {
    if (key === 'courier-booking') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <Text style={styles.headerTitle}>Parcel Courier Booking</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="receipt-outline" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <View style={styles.titleLeft}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={15} color={SwiftColors.textPrimary} />
            </Pressable>
            <View>
              <Text style={styles.titleText}>Send a Package</Text>
              <Text style={styles.titleSubtitle}>Fast, insured intracity dispatch</Text>
            </View>
          </View>
          <View style={styles.expressBadge}>
            <Text style={styles.expressBadgeText}>ABUJA EXPRESS</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Select Fleet Type</Text>
          <View style={styles.trafficLink}>
            <Ionicons name="pulse" size={12} color={SwiftColors.emerald} />
            <Text style={styles.trafficLinkText}>Live Traffic Optimized</Text>
          </View>
        </View>

        <View style={styles.fleetRow}>
          {courierFleetOptions.map((option) => {
            const isActive = option.id === fleetId;
            return (
              <Pressable
                key={option.id}
                style={[styles.fleetCard, isActive && styles.fleetCardActive]}
                onPress={() => setFleetId(option.id)}>
                <Ionicons
                  name={option.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color={isActive ? SwiftColors.emerald : SwiftColors.textSecondary}
                />
                {isActive ? (
                  <View style={styles.fleetEtaBadge}>
                    <Text style={styles.fleetEtaBadgeText}>{option.eta}</Text>
                  </View>
                ) : (
                  <Text style={styles.fleetEta}>{option.eta}</Text>
                )}
                <Text style={styles.fleetLabel}>{option.label}</Text>
                <Text style={styles.fleetCapacity}>{option.capacity}</Text>
                <Text style={styles.fleetPrice}>₦{option.price.toLocaleString('en-NG')}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Trip Routes</Text>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceBadgeText}>Intracity {courierBooking.distanceKm} km</Text>
          </View>
        </View>

        <View style={[styles.routeCard, SwiftShadow.card]}>
          <View style={styles.routeRow}>
            <View style={[styles.routeDot, { backgroundColor: SwiftColors.emerald }]} />
            <View style={{ flex: 1 }}>
              <View style={styles.routeLabelRow}>
                <Text style={styles.routeLabel}>PICKUP LOCATION</Text>
                <Text style={styles.routeRoleLabel}>Sender</Text>
              </View>
              <Text style={styles.routeLocation}>{courierBooking.pickup.location}</Text>
              <Text style={styles.routeContact}>{courierBooking.pickup.contact}</Text>
            </View>
          </View>

          <View style={styles.routeDivider} />

          <View style={styles.routeRow}>
            <View style={[styles.routeDot, { backgroundColor: SwiftColors.gold }]} />
            <View style={{ flex: 1 }}>
              <View style={styles.routeLabelRow}>
                <Text style={styles.routeLabel}>DROP-OFF DESTINATION</Text>
                <Text style={styles.routeRoleLabel}>Recipient</Text>
              </View>
              <Text style={styles.routeLocation}>{courierBooking.dropoff.location}</Text>
              <Text style={styles.routeContact}>{courierBooking.dropoff.contact}</Text>
            </View>
          </View>

          <View style={styles.routeNoteRow}>
            <Ionicons name="document-text-outline" size={13} color={SwiftColors.textSecondary} />
            <Text style={styles.routeNoteText}>{courierBooking.handlingNote}</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Package Classification</Text>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceBadgeText}>{courierBooking.estimatedWeight}</Text>
          </View>
        </View>

        <View style={styles.categoryRow}>
          {courierBooking.packageCategories.map((item) => {
            const isActive = item === category;
            return (
              <Pressable
                key={item}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setCategory(item)}>
                <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.weightSection}>
          <Text style={styles.weightLabel}>Approx. Weight</Text>
          <View style={styles.weightTrack}>
            <View style={styles.weightFill} />
          </View>
          <Text style={styles.weightRange}>{courierBooking.weightRange}</Text>
        </View>

        <View style={styles.fragileRow}>
          <View style={styles.fragileLeft}>
            <Ionicons name="warning" size={16} color={SwiftColors.amberDeep} />
            <View>
              <Text style={styles.fragileTitle}>Handle with Care / Fragile</Text>
              <Text style={styles.fragileSubtitle}>Rider equips cushioned dispatch pouch</Text>
            </View>
          </View>
          <View style={styles.fragileRight}>
            {fragile ? (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            ) : null}
            <Switch
              value={fragile}
              onValueChange={setFragile}
              trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
              thumbColor={SwiftColors.white}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Security & Guarantees</Text>

        <Pressable style={styles.guaranteeRow} onPress={() => setInsurance((prev) => !prev)}>
          <Ionicons
            name={insurance ? 'checkmark-circle' : 'ellipse-outline'}
            size={18}
            color={insurance ? SwiftColors.emerald : SwiftColors.textSecondary}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.guaranteeTitle}>
              SwiftGuarantee Insurance <Text style={styles.guaranteePrice}>+₦{courierBooking.guaranteeInsurance}</Text>
            </Text>
            <Text style={styles.guaranteeSubtitle}>
              Full coverage up to ₦150,000 for accidental loss, damage, or transit delay.
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.guaranteeRow} onPress={() => setHandoverPin((prev) => !prev)}>
          <Ionicons
            name={handoverPin ? 'checkmark-circle' : 'ellipse-outline'}
            size={18}
            color={handoverPin ? SwiftColors.emerald : SwiftColors.textSecondary}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.guaranteeTitle}>
              Require Handover PIN <Text style={styles.guaranteePrice}>+₦{courierBooking.handoverPinFee}</Text>
            </Text>
            <Text style={styles.guaranteeSubtitle}>
              Driver must verify unique 4-digit code with recipient before completing drop.
            </Text>
          </View>
        </Pressable>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Standard Courier Distance ({courierBooking.distanceKm} km)</Text>
            <Text style={styles.summaryValue}>₦{fleet.price.toLocaleString('en-NG')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>SwiftGuarantee Coverage</Text>
            <Text style={styles.summaryValue}>₦{courierBooking.guaranteeInsurance}</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLabelRow}>
              <Ionicons name="pricetag" size={11} color={SwiftColors.emerald} />
              <Text style={styles.summaryLabelAccent}>SwiftPass Member Discount</Text>
            </View>
            <Text style={styles.summaryValueAccent}>-₦{Math.abs(fareBreakdown.memberDiscount)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Fare</Text>
            <Text style={styles.totalValue}>₦{total.toLocaleString('en-NG')}</Text>
          </View>
        </View>

        <View style={styles.paymentRow}>
          <View style={styles.paymentLeft}>
            <Ionicons name="wallet" size={16} color={SwiftColors.emeraldDark} />
            <View>
              <Text style={styles.paymentTitle}>
                SwiftWallet (₦{courierBooking.walletBalance.toLocaleString('en-NG')})
              </Text>
              <Text style={styles.paymentSubtitle}>Instant debit • Zero gateway fee</Text>
            </View>
          </View>
          <Text style={styles.changeLink}>Change</Text>
        </View>

        <Pressable style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>
            Confirm & Dispatch Rider (₦{total.toLocaleString('en-NG')}) →
          </Text>
        </Pressable>
        <Text style={styles.insuredNote}>Insured transit powered by Swift9JA Logistics Network</Text>
      </ScrollView>

      <BottomNav
        items={servicesNavItems}
        activeKey="courier-booking"
        activeColor={ACCENT}
        onPress={handleNavPress}
      />
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
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-between',
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  expressBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  expressBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  trafficLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trafficLinkText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  fleetRow: {
    flexDirection: 'row',
    gap: 8,
  },
  fleetCard: {
    flex: 1,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    alignItems: 'flex-start',
    gap: 4,
    ...SwiftShadow.card,
  },
  fleetCardActive: {
    backgroundColor: 'rgba(138,245,180,0.2)',
    borderWidth: 1,
    borderColor: SwiftColors.emerald,
  },
  fleetEtaBadge: {
    backgroundColor: SwiftColors.emerald,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  fleetEtaBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.white,
  },
  fleetEta: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
  },
  fleetLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
    marginTop: 4,
  },
  fleetCapacity: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  fleetPrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.emerald,
    marginTop: 2,
  },
  distanceBadge: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  distanceBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  routeCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 10,
  },
  routeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  routeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  routeRoleLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
  },
  routeLocation: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
    marginTop: 2,
  },
  routeContact: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  routeDivider: {
    height: 1,
    backgroundColor: SwiftColors.border,
    marginLeft: 20,
  },
  routeNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  routeNoteText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryChipActive: {
    backgroundColor: SwiftColors.emerald,
  },
  categoryChipText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  categoryChipTextActive: {
    color: SwiftColors.white,
  },
  weightSection: {
    gap: 6,
  },
  weightLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  weightTrack: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: SwiftColors.surfaceMuted2,
    overflow: 'hidden',
  },
  weightFill: {
    width: '35%',
    height: '100%',
    backgroundColor: SwiftColors.emerald,
    borderRadius: 9999,
  },
  weightRange: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  fragileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    ...SwiftShadow.card,
  },
  fragileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  fragileTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  fragileSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  fragileRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeBadge: {
    backgroundColor: SwiftColors.goldPale,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.amberDeep,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    ...SwiftShadow.card,
  },
  guaranteeTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  guaranteePrice: {
    color: SwiftColors.emerald,
  },
  guaranteeSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  summarySection: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textSecondary,
  },
  summaryLabelAccent: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  summaryValue: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  summaryValueAccent: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: SwiftColors.border,
  },
  totalLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  totalValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(138,245,180,0.2)',
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  paymentSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  changeLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amber,
  },
  confirmButton: {
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...SwiftShadow.card,
  },
  confirmButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.amberDeepest,
  },
  insuredNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
  },
});
