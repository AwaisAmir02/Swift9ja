import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { activeNavigation } from '@/services/dummy-data';

export default function DriverNavigationScreen() {
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
        <View style={styles.turnBanner}>
          <View style={styles.turnLeft}>
            <View style={styles.turnIconWrap}>
              <Ionicons name="arrow-redo" size={16} color={SwiftColors.white} />
            </View>
            <View>
              <View style={styles.turnDistanceRow}>
                <Text style={styles.turnDistance}>{activeNavigation.nextTurnDistance}</Text>
                <View style={styles.aheadBadge}>
                  <Text style={styles.aheadBadgeText}>AHEAD</Text>
                </View>
              </View>
              <Text style={styles.turnStreet}>{activeNavigation.nextTurnStreet}</Text>
            </View>
          </View>
          <View style={styles.turnRight}>
            <Text style={styles.turnEta}>↰ {activeNavigation.turnEta}</Text>
            <Text style={styles.turnRemaining}>{activeNavigation.turnRemaining}</Text>
          </View>
        </View>

        <View style={styles.mapStage}>
          <View style={styles.mapControls}>
            <Pressable style={[styles.mapControlButton, SwiftShadow.raised]}>
              <Ionicons name="locate" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={[styles.mapControlButton, SwiftShadow.raised]}>
              <Ionicons name="layers-outline" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={[styles.mapControlButton, SwiftShadow.raised]}>
              <Ionicons name="volume-high-outline" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
          </View>
          <View style={styles.vehicleMarkerWrap}>
            <View style={[styles.vehicleHub, SwiftShadow.raised]}>
              <Ionicons name="navigate" size={16} color={SwiftColors.white} />
            </View>
            <View style={styles.vehicleLabel}>
              <Text style={styles.vehicleLabelText}>{activeNavigation.vehicleLabel}</Text>
            </View>
          </View>
          <View style={styles.pickupNoteChip}>
            <View style={styles.pickupNoteDot} />
            <Text style={styles.pickupNoteText}>{activeNavigation.pickupNote}</Text>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={[styles.riderCard, SwiftShadow.card]}>
            <View style={styles.riderTopRow}>
              <View style={styles.riderAvatar}>
                <Ionicons name="person" size={20} color={SwiftColors.textFaint} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.riderNameRow}>
                  <Text style={styles.riderName}>{activeNavigation.rider.name}</Text>
                  <View style={styles.topRiderBadge}>
                    <Text style={styles.topRiderBadgeText}>{activeNavigation.rider.badge}</Text>
                  </View>
                </View>
                <Text style={styles.riderMeta}>
                  ★{activeNavigation.rider.rating} • {activeNavigation.rider.rides} verified rides
                </Text>
              </View>
              <Pressable style={styles.riderActionButton}>
                <Ionicons name="call" size={14} color={SwiftColors.white} />
              </Pressable>
              <Pressable style={[styles.riderActionButton, styles.riderActionButtonAlert]}>
                <Ionicons name="chatbubble" size={13} color={SwiftColors.amberDeep} />
                <View style={styles.unreadDot} />
              </Pressable>
            </View>
            <View style={styles.noteBox}>
              <Ionicons name="create-outline" size={12} color={SwiftColors.textSecondary} />
              <Text style={styles.noteText}>Rider Note: &quot;{activeNavigation.rider.note}&quot;</Text>
            </View>
          </View>

          <View style={styles.dropoffRow}>
            <View style={styles.dropoffLeft}>
              <Ionicons name="flag" size={14} color={SwiftColors.textPrimary} />
              <View>
                <Text style={styles.dropoffLabel}>DROP-OFF DESTINATION</Text>
                <Text style={styles.dropoffValue}>{activeNavigation.dropoff.label}</Text>
              </View>
            </View>
            <View style={styles.dropoffRight}>
              <Text style={styles.dropoffFareLabel}>EST. FARE</Text>
              <Text style={styles.dropoffFareValue}>₦{activeNavigation.dropoff.fare.toLocaleString('en-NG')}</Text>
            </View>
          </View>

          <View style={styles.pinSection}>
            <View style={styles.pinHeaderRow}>
              <View style={styles.pinHeaderLeft}>
                <Ionicons name="checkmark-circle" size={14} color={SwiftColors.emerald} />
                <Text style={styles.pinTitle}>Passenger Security PIN</Text>
              </View>
              <View style={styles.matchBadge}>
                <Ionicons name="lock-closed" size={10} color={SwiftColors.emeraldDark} />
                <Text style={styles.matchBadgeText}>Match Confirmed</Text>
              </View>
            </View>
            <Text style={styles.pinSubtitle}>Ask rider for their 4-digit security code before initiating dispatch.</Text>
            <View style={styles.pinBoxesRow}>
              {activeNavigation.securityPin.map((digit, index) => (
                <View key={index} style={[styles.pinBox, SwiftShadow.card]}>
                  <Text style={styles.pinBoxText}>{digit}</Text>
                </View>
              ))}
            </View>
            <View style={styles.pinVerifiedRow}>
              <Ionicons name="checkmark-circle" size={12} color={SwiftColors.emerald} />
              <Text style={styles.pinVerifiedText}>{activeNavigation.pinVerifiedNote}</Text>
            </View>
          </View>

          <Pressable style={styles.startButton} onPress={() => router.replace('/driver')}>
            <Ionicons name="car-sport" size={16} color={SwiftColors.amberDeepest} />
            <Text style={styles.startButtonText}>Start Trip to {activeNavigation.dropoff.label.split(',')[0]}</Text>
            <Ionicons name="arrow-forward" size={15} color={SwiftColors.amberDeepest} />
          </Pressable>
          <Text style={styles.startHint}>Tap start once rider is safely seated with seatbelt fastened.</Text>

          <Text style={styles.toolsTitle}>Swift9JA Safety & Trip Tools</Text>
          <View style={styles.toolsRow}>
            {activeNavigation.safetyTools.map((tool) => (
              <Pressable key={tool.id} style={[styles.toolCard, { backgroundColor: tool.bg }]}>
                <Ionicons name={tool.icon as keyof typeof Ionicons.glyphMap} size={16} color={tool.color} />
                <Text style={[styles.toolLabel, { color: tool.color }]}>{tool.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.supportRow}>
            <View style={styles.supportIconWrap}>
              <Ionicons name="headset" size={16} color={SwiftColors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>{activeNavigation.supportLine}</Text>
              <Text style={styles.supportSubtitle}>{activeNavigation.supportSubtitle}</Text>
            </View>
            <Pressable style={styles.callHubButton}>
              <Text style={styles.callHubButtonText}>Call Hub</Text>
            </Pressable>
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
  turnBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.charcoal,
    padding: 14,
  },
  turnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  turnIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  turnDistance: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    color: SwiftColors.gold,
  },
  aheadBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  aheadBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: '#D8DADA',
  },
  turnStreet: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: '#D8DADA',
  },
  turnRight: {
    alignItems: 'flex-end',
  },
  turnEta: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.white,
  },
  turnRemaining: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: '#D8DADA',
  },
  mapStage: {
    height: 220,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  mapControlButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleMarkerWrap: {
    alignItems: 'center',
  },
  vehicleHub: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.amber,
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
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.white,
  },
  pickupNoteChip: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pickupNoteDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  pickupNoteText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  sheet: {
    padding: 16,
    gap: 16,
  },
  riderCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 10,
  },
  riderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  riderAvatar: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riderName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  topRiderBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  topRiderBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  riderMeta: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  riderActionButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderActionButtonAlert: {
    backgroundColor: 'rgba(255,221,180,0.5)',
  },
  unreadDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.error,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  noteText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    fontStyle: 'italic',
  },
  dropoffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropoffLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropoffLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  dropoffValue: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
    marginTop: 1,
  },
  dropoffRight: {
    alignItems: 'flex-end',
  },
  dropoffFareLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.textSecondary,
  },
  dropoffFareValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 16,
    color: SwiftColors.emerald,
  },
  pinSection: {
    gap: 8,
  },
  pinHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pinTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  pinSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  pinBoxesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pinBox: {
    flex: 1,
    height: 48,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBoxText: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 20,
    color: SwiftColors.textPrimary,
  },
  pinVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pinVerifiedText: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    ...SwiftShadow.card,
  },
  startButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.amberDeepest,
  },
  startHint: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
    marginTop: -8,
  },
  toolsTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: -8,
  },
  toolCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  toolLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    textAlign: 'center',
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  supportIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  supportSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  callHubButton: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...SwiftShadow.card,
  },
  callHubButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
});
