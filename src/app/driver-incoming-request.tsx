import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { incomingRequest } from '@/services/dummy-data';

export default function DriverIncomingRequestScreen() {
  const [secondsLeft, setSecondsLeft] = useState(incomingRequest.respondSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = (secondsLeft / incomingRequest.respondSeconds) * 100;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Active Trip Session</Text>
          <View style={styles.avatar}>
            <Ionicons name="person" size={13} color={SwiftColors.white} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mapStage}>
          <View style={styles.mapBadgesRow}>
            <View style={styles.dispatchBadge}>
              <Text style={styles.dispatchBadgeText}>LIVE INCOMING DISPATCH</Text>
            </View>
            <View style={styles.insuredBadge}>
              <Ionicons name="shield-checkmark" size={11} color={SwiftColors.emeraldDark} />
              <Text style={styles.insuredBadgeText}>NTPP SafeRide Insured</Text>
            </View>
          </View>
          <View style={styles.mapMarker}>
            <Ionicons name="location" size={18} color={SwiftColors.white} />
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.respondRow}>
            <View style={styles.respondLeft}>
              <Ionicons name="time-outline" size={13} color={SwiftColors.textSecondary} />
              <Text style={styles.respondLabel}>TIME TO RESPOND</Text>
            </View>
            <Text style={styles.respondValue}>{secondsLeft}s</Text>
          </View>
          <View style={styles.respondTrack}>
            <View style={[styles.respondFill, { width: `${progressPercent}%` }]} />
          </View>

          <View style={styles.categoryRow}>
            <View style={styles.categoryPill}>
              <Ionicons name="car-sport" size={13} color={SwiftColors.textPrimary} />
              <Text style={styles.categoryPillText}>{incomingRequest.category}</Text>
            </View>
            <View style={styles.surgePill}>
              <Ionicons name="flash" size={12} color={SwiftColors.amberDeep} />
              <Text style={styles.surgePillText}>{incomingRequest.surgeMultiplier}</Text>
            </View>
          </View>

          <View style={[styles.fareCard, SwiftShadow.card]}>
            <View style={styles.fareTopRow}>
              <Text style={styles.fareLabel}>GUARANTEED GROSS FARE</Text>
              <Ionicons name="qr-code-outline" size={22} color={SwiftColors.surfaceMuted2} />
            </View>
            <View style={styles.fareValueRow}>
              <Text style={styles.fareValue}>₦{incomingRequest.grossFare.toLocaleString('en-NG')}</Text>
              <View style={styles.instantBadge}>
                <Text style={styles.instantBadgeText}>Instant</Text>
              </View>
            </View>
            <Text style={styles.fareNote}>
              Includes +₦{incomingRequest.surgeBonus.toLocaleString('en-NG')} Surge Bonus • Swift Wallet Instant
              Payout
            </Text>
          </View>

          <View style={[styles.passengerRow, SwiftShadow.card]}>
            <View style={styles.passengerAvatar}>
              <Ionicons name="person" size={20} color={SwiftColors.textFaint} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.passengerName}>{incomingRequest.passenger.name}</Text>
              <Text style={styles.passengerMeta}>
                ★{incomingRequest.passenger.rating} • {incomingRequest.passenger.rides} rides
              </Text>
            </View>
            {incomingRequest.passenger.verified ? (
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={11} color={SwiftColors.emeraldDark} />
                <Text style={styles.verifiedBadgeText}>Verified Rider</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.routeCard}>
            <View style={styles.routeRow}>
              <Ionicons name="arrow-up-circle" size={16} color={SwiftColors.emerald} />
              <View style={{ flex: 1 }}>
                <View style={styles.routeLabelRow}>
                  <Text style={styles.routeLabel}>PICKUP POINT</Text>
                  <Text style={styles.routeEta}>
                    {incomingRequest.pickup.etaMins} mins ({incomingRequest.pickup.distanceKm} km) away
                  </Text>
                </View>
                <Text style={styles.routeTitle}>{incomingRequest.pickup.label}</Text>
                <Text style={styles.routeAddress}>{incomingRequest.pickup.address}</Text>
              </View>
            </View>
            <View style={styles.routeRow}>
              <Ionicons name="location" size={16} color={SwiftColors.gold} />
              <View style={{ flex: 1 }}>
                <View style={styles.routeLabelRow}>
                  <Text style={styles.routeLabel}>DROP-OFF DESTINATION</Text>
                  <Text style={styles.routeEta}>
                    {incomingRequest.dropoff.etaMins} mins • {incomingRequest.dropoff.distanceKm} km
                  </Text>
                </View>
                <Text style={styles.routeTitle}>{incomingRequest.dropoff.label}</Text>
                <Text style={styles.routeAddress}>{incomingRequest.dropoff.address}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoChipsRow}>
            <View style={styles.infoChip}>
              <Ionicons name="checkmark-circle" size={14} color={SwiftColors.emerald} />
              <View>
                <Text style={styles.infoChipTitle}>Protected Trip</Text>
                <Text style={styles.infoChipSubtitle}>In-app SOS enabled</Text>
              </View>
            </View>
            <View style={styles.infoChip}>
              <Ionicons name="navigate" size={14} color={SwiftColors.textPrimary} />
              <View>
                <Text style={styles.infoChipTitle}>Direct Corridor</Text>
                <Text style={styles.infoChipSubtitle}>Express toll included</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.acceptButton} onPress={() => router.push('/driver-navigation')}>
            <Ionicons name="checkmark-circle" size={17} color={SwiftColors.white} />
            <Text style={styles.acceptButtonText}>Accept Trip</Text>
            <View style={styles.acceptFareBadge}>
              <Text style={styles.acceptFareBadgeText}>₦{incomingRequest.grossFare.toLocaleString('en-NG')}</Text>
            </View>
          </Pressable>

          <Pressable style={styles.declineButton} onPress={() => router.back()}>
            <Ionicons name="close" size={14} color={SwiftColors.textSecondary} />
            <Text style={styles.declineButtonText}>Decline Ride (Keeps priority tier safe)</Text>
          </Pressable>

          <View style={styles.footerRow}>
            <Ionicons name="lock-closed" size={11} color={SwiftColors.textFaint} />
            <Text style={styles.footerText}>
              Federal Capital Territory Transport Authority • Certified Driver Protocol
            </Text>
          </View>
        </View>
      </ScrollView>
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
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStage: {
    height: 240,
    backgroundColor: SwiftColors.surfaceMuted2,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBadgesRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dispatchBadge: {
    backgroundColor: 'rgba(46,49,49,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dispatchBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.white,
  },
  insuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.5)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  insuredBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  mapMarker: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    ...SwiftShadow.raised,
  },
  sheet: {
    backgroundColor: SwiftColors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 16,
    gap: 14,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: SwiftColors.border,
  },
  respondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  respondLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  respondLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  respondValue: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.amber,
  },
  respondTrack: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: SwiftColors.surfaceMuted2,
    overflow: 'hidden',
  },
  respondFill: {
    height: '100%',
    borderRadius: 9999,
    backgroundColor: SwiftColors.gold,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryPillText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  surgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,221,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  surgePillText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amberDeep,
  },
  fareCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 4,
  },
  fareTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fareLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: SwiftColors.textSecondary,
  },
  fareValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fareValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 28,
    color: SwiftColors.textPrimary,
  },
  instantBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  instantBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  fareNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  passengerAvatar: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  passengerMeta: {
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
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  routeCard: {
    gap: 12,
  },
  routeRow: {
    flexDirection: 'row',
    gap: 10,
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
  routeEta: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  routeTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
    marginTop: 2,
  },
  routeAddress: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  infoChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  infoChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  infoChipTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  infoChipSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 9,
    color: SwiftColors.textSecondary,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    ...SwiftShadow.card,
  },
  acceptButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.white,
  },
  acceptFareBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  acceptFareBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  declineButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  footerText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
  },
});
