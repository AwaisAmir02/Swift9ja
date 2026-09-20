import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { foodOrderTracking } from '@/services/dummy-data';

export default function FoodOrderTrackingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.headerButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <View>
              <View style={styles.orderIdRow}>
                <Text style={styles.orderId}>{foodOrderTracking.orderId}</Text>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>LIVE TRACKING</Text>
                </View>
              </View>
              <Text style={styles.orderSubtitle}>
                {foodOrderTracking.restaurant} • {foodOrderTracking.hub}
              </Text>
            </View>
          </View>
          <Pressable style={styles.helpButton} onPress={() => router.push('/chat-support')}>
            <Ionicons name="help-buoy-outline" size={13} color={SwiftColors.textPrimary} />
            <Text style={styles.helpButtonText}>Help</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.etaRow}>
          <View style={styles.etaLeft}>
            <View style={styles.etaLabelRow}>
              <Ionicons name="flash" size={13} color={SwiftColors.amber} />
              <Text style={styles.etaLabel}>EXPRESS DELIVERY</Text>
            </View>
            <Text style={styles.etaValue}>{foodOrderTracking.etaRange}</Text>
            <Text style={styles.etaSubtitle}>Estimated Arrival by {foodOrderTracking.arrivalTime}</Text>
          </View>
          <View style={styles.etaRight}>
            <Text style={styles.distanceText}>{foodOrderTracking.distanceAway}</Text>
            <View style={styles.distanceIconWrap}>
              <Ionicons name="navigate" size={16} color={SwiftColors.white} />
            </View>
          </View>
        </View>

        <View style={[styles.mapStage, SwiftShadow.card]}>
          <View style={styles.mapPinLeft}>
            <View style={[styles.mapDot, { backgroundColor: SwiftColors.emerald }]} />
          </View>
          <View style={styles.mapPinCenter}>
            <View style={styles.riderMarker}>
              <Ionicons name="bicycle" size={14} color={SwiftColors.white} />
            </View>
          </View>
          <View style={styles.mapPinRight}>
            <View style={[styles.mapDot, { backgroundColor: SwiftColors.emerald }]} />
          </View>
          <View style={styles.mapTrafficNote}>
            <Ionicons name="alert-circle" size={11} color={SwiftColors.amber} />
            <Text style={styles.mapTrafficText} numberOfLines={1}>
              {foodOrderTracking.trafficNote}
            </Text>
          </View>
        </View>

        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotDone]} />
          <View style={[styles.progressLine, styles.progressLineDone]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>

        <View style={styles.statusRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusStep}>{foodOrderTracking.statusStep}</Text>
            <Text style={styles.statusDetail}>{foodOrderTracking.statusDetail}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>{foodOrderTracking.statusBadge}</Text>
          </View>
        </View>

        <View style={styles.pinCard}>
          <View style={styles.pinCardHeaderRow}>
            <Ionicons name="lock-closed" size={13} color={SwiftColors.mint} />
            <Text style={styles.pinCardLabel}>DELIVERY HANDOVER PIN</Text>
          </View>
          <View style={styles.pinCardBottomRow}>
            <Text style={styles.pinCardText}>
              Share this code to {foodOrderTracking.rider.name.split(' ')[0]} upon handoff to ensure secure delivery.
            </Text>
            <View style={styles.pinBox}>
              <Text style={styles.pinBoxText}>{foodOrderTracking.handoverPin}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.riderRow, SwiftShadow.card]}>
          <View style={styles.riderAvatar}>
            <Ionicons name="person" size={20} color={SwiftColors.textFaint} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.riderNameRow}>
              <Text style={styles.riderName}>{foodOrderTracking.rider.name}</Text>
              <Ionicons name="checkmark-circle" size={13} color={SwiftColors.emerald} />
            </View>
            <Text style={styles.riderMeta}>
              ★{foodOrderTracking.rider.rating} • {foodOrderTracking.rider.deliveries.toLocaleString('en-NG')}+
              deliveries
            </Text>
            <Text style={styles.riderVehicle}>{foodOrderTracking.rider.vehicle}</Text>
          </View>
          <Pressable style={styles.riderActionButton}>
            <Ionicons name="call" size={15} color={SwiftColors.white} />
          </Pressable>
          <Pressable style={[styles.riderActionButton, styles.riderActionButtonMuted]}>
            <Ionicons name="chatbubble" size={14} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.quickRepliesRow}>
          {foodOrderTracking.quickReplies.map((reply) => (
            <View key={reply} style={styles.quickReplyChip}>
              <Text style={styles.quickReplyText}>{reply}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="cube" size={15} color={SwiftColors.textPrimary} />
            <Text style={styles.sectionTitle}>Package Contents</Text>
          </View>
          <Text style={styles.editLink}>Edit</Text>
        </View>

        <View style={[styles.packageCard, SwiftShadow.card]}>
          <View style={styles.packageMainItem}>
            <View style={styles.packageImage}>
              <Ionicons name="fast-food" size={20} color={SwiftColors.textFaint} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.packageItemName}>{foodOrderTracking.packageItems[0].name}</Text>
              <Text style={styles.packageItemDetail}>{foodOrderTracking.packageItems[0].detail}</Text>
              <Text style={styles.packageItemQty}>Qty: {foodOrderTracking.packageItems[0].qty}</Text>
            </View>
            <Text style={styles.packageItemPrice}>
              ₦{foodOrderTracking.packageItems[0].price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <View style={styles.packageList}>
            {foodOrderTracking.packageItems.slice(1).map((item) => (
              <View key={item.id} style={styles.packageListRow}>
                <Text style={styles.packageListLabel}>• {item.name}</Text>
                <Text style={[styles.packageListValue, item.free && styles.packageListValueFree]}>
                  {item.free ? 'Free' : `₦${item.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.packagePaymentRow}>
            <View style={styles.packagePaymentLeft}>
              <Ionicons name="wallet" size={14} color={SwiftColors.emeraldDark} />
              <Text style={styles.packagePaymentText}>
                {foodOrderTracking.paymentMethod} (₦
                {foodOrderTracking.paymentAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })})
              </Text>
            </View>
            <Text style={styles.digitalInvoiceLink}>Digital Invoice ›</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>DROP-OFF ADDRESS</Text>
          <Text style={styles.editLink}>Edit Note</Text>
        </View>

        <View style={styles.dropoffCard}>
          <View style={styles.dropoffTopRow}>
            <Ionicons name="location" size={15} color={SwiftColors.emeraldDark} />
            <View style={{ flex: 1 }}>
              <Text style={styles.dropoffName}>{foodOrderTracking.dropoff.name}</Text>
              <Text style={styles.dropoffAddress}>{foodOrderTracking.dropoff.address}</Text>
            </View>
          </View>
          <View style={styles.dropoffNoteBox}>
            <Ionicons name="information-circle-outline" size={12} color={SwiftColors.textSecondary} />
            <Text style={styles.dropoffNoteText}>
              Rider Instructions: {foodOrderTracking.dropoff.instructions}
            </Text>
          </View>
        </View>

        <View style={styles.footerActionsRow}>
          <Pressable style={styles.footerButton}>
            <Ionicons name="share-social-outline" size={14} color={SwiftColors.textPrimary} />
            <Text style={styles.footerButtonText}>Share Live Track</Text>
          </Pressable>
          <Pressable style={styles.footerButtonDanger} onPress={() => router.push('/chat-support')}>
            <Ionicons name="alert-circle-outline" size={14} color={SwiftColors.error} />
            <Text style={styles.footerButtonDangerText}>Help & Cancel</Text>
          </Pressable>
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
    height: 64,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderId: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  liveBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  liveBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  orderSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.surfaceMuted3,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  helpButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  etaLeft: {
    gap: 2,
  },
  etaLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  etaLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: SwiftColors.textSecondary,
  },
  etaValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 24,
    color: SwiftColors.textPrimary,
  },
  etaSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  etaRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  distanceText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  distanceIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStage: {
    height: 160,
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: SwiftRadius.md,
    overflow: 'hidden',
  },
  mapPinLeft: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  mapPinRight: {
    position: 'absolute',
    right: 20,
    bottom: 36,
  },
  mapPinCenter: {
    position: 'absolute',
    top: '45%',
    left: '48%',
  },
  mapDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: SwiftColors.white,
  },
  riderMarker: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    ...SwiftShadow.raised,
  },
  mapTrafficNote: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mapTrafficText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SwiftColors.border,
  },
  progressDotDone: {
    backgroundColor: SwiftColors.emerald,
  },
  progressDotActive: {
    backgroundColor: SwiftColors.gold,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: SwiftColors.border,
  },
  progressLineDone: {
    backgroundColor: SwiftColors.emerald,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 12,
  },
  statusStep: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  statusDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  statusBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  pinCard: {
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 10,
  },
  pinCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pinCardLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: SwiftColors.mint,
  },
  pinCardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pinCardText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: '#D8DADA',
  },
  pinBox: {
    backgroundColor: SwiftColors.white,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pinBoxText: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    letterSpacing: 2,
    color: SwiftColors.textPrimary,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
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
    gap: 4,
  },
  riderName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  riderMeta: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  riderVehicle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  riderActionButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderActionButtonMuted: {
    backgroundColor: SwiftColors.surfaceMuted2,
  },
  quickRepliesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  quickReplyChip: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quickReplyText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    letterSpacing: 0.3,
    color: SwiftColors.textPrimary,
  },
  editLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amber,
  },
  packageCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 12,
  },
  packageMainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  packageImage: {
    width: 48,
    height: 48,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageItemName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  packageItemDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  packageItemQty: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textFaint,
    marginTop: 1,
  },
  packageItemPrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  packageList: {
    gap: 6,
  },
  packageListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packageListLabel: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  packageListValue: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  packageListValueFree: {
    color: SwiftColors.emerald,
  },
  packagePaymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: SwiftColors.border,
    paddingTop: 12,
  },
  packagePaymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  packagePaymentText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  digitalInvoiceLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amber,
  },
  dropoffCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 10,
  },
  dropoffTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  dropoffName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  dropoffAddress: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  dropoffNoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  dropoffNoteText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  footerActionsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  footerButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  footerButtonDanger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,218,214,0.4)',
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  footerButtonDangerText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.error,
  },
});
