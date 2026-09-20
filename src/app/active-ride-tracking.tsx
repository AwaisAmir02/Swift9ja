import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { activeRideTrip } from '@/services/dummy-data';

export default function ActiveRideTrackingScreen() {
  const [audioProtection, setAudioProtection] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <Text style={styles.headerTitle}>Active Ride Tracking</Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person" size={13} color={SwiftColors.white} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mapStage}>
          <Pressable style={[styles.etaBanner, SwiftShadow.raised]} onPress={() => router.push('/trip-rating')}>
            <View style={styles.etaTopRow}>
              <View style={styles.etaStatusLeft}>
                <View style={styles.etaDot} />
                <Text style={styles.etaStatusText}>TRIP IN PROGRESS</Text>
              </View>
              <View style={styles.ntppBadge}>
                <Ionicons name="shield-checkmark" size={12} color={SwiftColors.emeraldDark} />
                <Text style={styles.ntppBadgeText}>NTPP SafeRide Certified</Text>
              </View>
            </View>
            <View style={styles.etaBottomRow}>
              <View>
                <Text style={styles.etaDestination}>{activeRideTrip.destination}</Text>
                <Text style={styles.etaSubtitle}>
                  Arriving in {activeRideTrip.etaMins} mins • {activeRideTrip.remainingKm} km remaining
                </Text>
              </View>
              <View style={styles.etaCountdown}>
                <Text style={styles.etaCountdownValue}>{activeRideTrip.etaMins}</Text>
                <Text style={styles.etaCountdownLabel}>MIN</Text>
              </View>
            </View>
          </Pressable>

          <View style={styles.pickupLabel}>
            <View style={[styles.pinLabel, SwiftShadow.card]}>
              <View style={styles.pinDot} />
              <Text style={styles.pinLabelText}>Maitama District</Text>
            </View>
          </View>

          <View style={styles.vehicleMarkerWrap}>
            <View style={styles.vehicleMarker}>
              <View style={styles.vehicleHeadingNeedle} />
              <View style={[styles.vehicleHub, SwiftShadow.raised]}>
                <Ionicons name="car" size={18} color={SwiftColors.white} />
              </View>
            </View>
            <View style={styles.vehicleLabel}>
              <Text style={styles.vehicleLabelText}>{activeRideTrip.vehicle.split(' ').slice(1).join(' ')}</Text>
            </View>
          </View>

          <View style={styles.destinationLabel}>
            <View style={[styles.pinLabel, SwiftShadow.card]}>
              <Ionicons name="flag" size={11} color={SwiftColors.textPrimary} />
              <Text style={styles.pinLabelText}>{activeRideTrip.destination.split(' ')[0]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={[styles.driverCard, SwiftShadow.card]}>
            <View style={styles.driverTopRow}>
              <View style={styles.driverAvatarWrap}>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={22} color={SwiftColors.textFaint} />
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={9} color={SwiftColors.amberDeepest} />
                  <Text style={styles.ratingBadgeText}>{activeRideTrip.rating}</Text>
                </View>
              </View>
              <View style={styles.driverInfo}>
                <View style={styles.driverNameRow}>
                  <Text style={styles.driverName} numberOfLines={1}>
                    {activeRideTrip.driverName}
                  </Text>
                  <Ionicons name="checkmark-circle" size={15} color={SwiftColors.emerald} />
                </View>
                <Text style={styles.driverVehicle}>{activeRideTrip.vehicle}</Text>
                <View style={styles.driverMetaRow}>
                  <View style={styles.plateBadge}>
                    <Text style={styles.plateBadgeText}>{activeRideTrip.plate}</Text>
                  </View>
                  <Text style={styles.driverTrips}>• {activeRideTrip.trips.toLocaleString('en-NG')} trips</Text>
                </View>
              </View>
              <View style={styles.pinPill}>
                <Text style={styles.pinPillLabel}>SAFETY PIN</Text>
                <Text style={styles.pinPillValue}>{activeRideTrip.safetyPin}</Text>
              </View>
            </View>

            <View style={styles.quickActionsRow}>
              <Pressable style={styles.quickAction}>
                <Ionicons name="call" size={15} color={SwiftColors.textPrimary} />
                <Text style={styles.quickActionText}>Call</Text>
              </Pressable>
              <Pressable style={styles.quickAction}>
                <Ionicons name="chatbubble-ellipses" size={17} color={SwiftColors.textPrimary} />
                <Text style={styles.quickActionText}>Chat</Text>
              </Pressable>
              <Pressable style={[styles.quickAction, styles.quickActionAccent]}>
                <Ionicons name="construct" size={16} color={SwiftColors.emeraldDark} />
                <Text style={[styles.quickActionText, { color: SwiftColors.emeraldDark }]}>Toolkit</Text>
              </Pressable>
              <Pressable style={styles.quickAction}>
                <Ionicons name="share-social" size={17} color={SwiftColors.textPrimary} />
                <Text style={styles.quickActionText}>Share</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.shieldSection}>
            <View style={styles.shieldHeaderRow}>
              <Text style={styles.shieldTitle}>Swift9JA Safety Shield</Text>
              <View style={styles.shieldStatusRow}>
                <View style={styles.shieldDot} />
                <Text style={styles.shieldStatusText}>Active & Guarded</Text>
              </View>
            </View>

            <View style={[styles.shieldCard, SwiftShadow.card]}>
              <View style={styles.sosRow}>
                <View style={styles.sosLeft}>
                  <View style={styles.sosIconWrap}>
                    <Ionicons name="warning" size={16} color={SwiftColors.white} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sosTitle}>Emergency SOS Dispatch</Text>
                    <Text style={styles.sosBody}>Direct 24/7 patrol & emergency dispatch</Text>
                  </View>
                </View>
                <Pressable style={styles.sosButton}>
                  <Text style={styles.sosButtonText}>Trigger</Text>
                </Pressable>
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingIconWrap}>
                    <Ionicons name="people" size={16} color={SwiftColors.textPrimary} />
                  </View>
                  <View>
                    <Text style={styles.settingTitle}>Live Route Sharing</Text>
                    <Text style={styles.settingBody}>Sharing with {activeRideTrip.sharingWith}</Text>
                  </View>
                </View>
                <Ionicons name="checkmark-circle" size={18} color={SwiftColors.emerald} />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingIconWrap}>
                    <Ionicons name="mic" size={14} color={SwiftColors.textPrimary} />
                  </View>
                  <View>
                    <Text style={styles.settingTitle}>Trip Audio Protection</Text>
                    <Text style={styles.settingBody}>Encrypted & kept strictly on device</Text>
                  </View>
                </View>
                <Switch
                  value={audioProtection}
                  onValueChange={setAudioProtection}
                  trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
                  thumbColor={SwiftColors.white}
                />
              </View>
            </View>
          </View>

          <View style={[styles.fareCard, SwiftShadow.card]}>
            <View style={styles.fareTopRow}>
              <View style={styles.fareLeft}>
                <View style={styles.fareIconWrap}>
                  <Ionicons name="pricetag" size={14} color={SwiftColors.amberDeep} />
                </View>
                <View>
                  <Text style={styles.fareLabel}>Trip Payment</Text>
                  <Text style={styles.fareMethod}>
                    Swift Wallet (₦{activeRideTrip.walletBalance.toLocaleString('en-NG')} bal)
                  </Text>
                </View>
              </View>
              <View style={styles.fareRight}>
                <Text style={styles.fareAmount}>₦{activeRideTrip.fare.toLocaleString('en-NG')}</Text>
                <Text style={styles.fareNote}>Guaranteed Fare</Text>
              </View>
            </View>
            <View style={styles.fareActionsRow}>
              <Pressable style={styles.fareActionButton}>
                <Ionicons name="add-circle-outline" size={16} color={SwiftColors.textPrimary} />
                <Text style={styles.fareActionText}>Add Stop</Text>
              </Pressable>
              <Pressable style={styles.fareActionButton}>
                <Ionicons name="location-outline" size={15} color={SwiftColors.textPrimary} />
                <Text style={styles.fareActionText}>Change Dest</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.supportBanner}>
            <View style={styles.supportIconWrap}>
              <Ionicons name="headset" size={16} color={SwiftColors.white} />
            </View>
            <Text style={styles.supportText}>
              Swift9JA Concierge is monitoring your trip live. Call helpline at{' '}
              <Text style={styles.supportTextStrong}>0800-SWIFT-CARE</Text> anytime.
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
    backgroundColor: 'rgba(248,250,249,0.85)',
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
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
    height: 380,
    backgroundColor: SwiftColors.surfaceMuted2,
    padding: 16,
  },
  etaBanner: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 10,
  },
  etaTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  etaStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etaDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SwiftColors.emerald,
  },
  etaStatusText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.emerald,
    textTransform: 'uppercase',
  },
  ntppBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ntppBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  etaBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  etaDestination: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  etaSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  etaCountdown: {
    alignItems: 'flex-end',
  },
  etaCountdownValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 28,
    color: SwiftColors.amber,
    letterSpacing: -0.56,
  },
  etaCountdownLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  pickupLabel: {
    position: 'absolute',
    left: 16,
    top: 88,
  },
  destinationLabel: {
    position: 'absolute',
    right: 16,
    top: 88,
  },
  pinLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: SwiftColors.emerald,
  },
  pinLabelText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  vehicleMarkerWrap: {
    position: 'absolute',
    top: '48%',
    left: '50%',
    marginLeft: -22,
    alignItems: 'center',
  },
  vehicleMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleHeadingNeedle: {
    position: 'absolute',
    top: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: SwiftColors.gold,
  },
  vehicleHub: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleLabel: {
    marginTop: 4,
    backgroundColor: 'rgba(46,49,49,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  vehicleLabelText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.background,
  },
  sheet: {
    backgroundColor: SwiftColors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 24,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: 'rgba(215,195,174,0.6)',
  },
  driverCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  driverTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatarWrap: {
    position: 'relative',
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  ratingBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDeepest,
  },
  driverInfo: {
    flex: 1,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
    flexShrink: 1,
  },
  driverVehicle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  driverMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  plateBadge: {
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  plateBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    letterSpacing: 0.325,
    color: SwiftColors.textPrimary,
  },
  driverTrips: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  pinPill: {
    backgroundColor: 'rgba(255,221,180,0.4)',
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  pinPillLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.55,
    color: SwiftColors.amberDeep,
    textTransform: 'uppercase',
  },
  pinPillValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    letterSpacing: 1.8,
    color: SwiftColors.amber,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingVertical: 8,
  },
  quickActionAccent: {
    backgroundColor: 'rgba(138,245,180,0.4)',
  },
  quickActionText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  shieldSection: {
    gap: 8,
  },
  shieldHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  shieldTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  shieldStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shieldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  shieldStatusText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  shieldCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  sosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,218,214,0.4)',
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  sosLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sosIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  sosBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  sosButton: {
    backgroundColor: SwiftColors.error,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sosButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  settingBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  fareCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  fareTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fareLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fareIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(255,221,180,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fareLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  fareMethod: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  fareRight: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.emerald,
  },
  fareNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  fareActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  fareActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    height: 44,
  },
  fareActionText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,109,64,0.06)',
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  supportIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  supportTextStrong: {
    fontFamily: SwiftFontFamily.bodySemiBold,
  },
});
